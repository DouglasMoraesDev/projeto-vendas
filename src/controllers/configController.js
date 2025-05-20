// src/controllers/configController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -----------------------
// Trocar senha do usuário autenticado
// -----------------------
async function changePassword(req, res, next) {
  try {
    // req.user foi preenchido pelo authMiddleware
    const userId = req.user.userId;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res
        .status(400)
        .json({ error: "Senha atual e nova senha são obrigatórios." });
    }

    // 1) Busca usuário no banco
    const usuario = await prisma.usuario.findUnique({ where: { id: userId } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // 2) Verifica se senhaAtual bate com o hash armazenado
    const isValid = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!isValid) {
      return res.status(401).json({ error: "Senha atual incorreta." });
    }

    // 3) Gera o hash da nova senha
    const SALT_ROUNDS = 10;
    const novoHash = await bcrypt.hash(novaSenha, SALT_ROUNDS);

    // 4) Atualiza no banco
    await prisma.usuario.update({
      where: { id: userId },
      data: { senha: novoHash },
    });

    return res.json({ message: "Senha atualizada com sucesso." });
  } catch (err) {
    next(err);
  }
}

// -----------------------
// Gerar backup completo do banco (todas as tabelas e dados) em JSON
// -----------------------
async function backupDatabase(req, res, next) {
  try {
    // 1) Busca todos os registros de cada tabela. Se houver relacionamentos, inclui as associações.
    const usuarios = await prisma.usuario.findMany();
    const clientes = await prisma.cliente.findMany();
    const mercadorias = await prisma.mercadoria.findMany({
      include: { fotos: true },
    });
    const vendas = await prisma.venda.findMany({
      include: {
        cliente: true,
        itens: true,
        parcelas: {
          include: { comprovante: true },
        },
      },
    });
    const itensVenda = await prisma.itemVenda.findMany();
    const parcelas = await prisma.parcela.findMany({
      include: { comprovante: true },
    });
    const comprovantes = await prisma.comprovante.findMany();
    const fotos = await prisma.foto.findMany();

    // 2) Estrutura o JSON de backup
    const backup = {
      usuarios,
      clientes,
      mercadorias,
      fotos,
      vendas,
      itensVenda,
      parcelas,
      comprovantes,
    };

    // 3) Retorna o JSON completo
    return res.json(backup);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  changePassword,
  backupDatabase,
};
