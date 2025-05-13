// src/controllers/parcelaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

module.exports = {
  // Lista parcelas em aberto
  async findPending(req, res, next) {
    try {
      const pendentes = await prisma.parcela.findMany({
        where: { pago: false },
        include: { venda: { include: { cliente: true } } },
      });
      res.json(pendentes);
    } catch (err) {
      next(err);
    }
  },

  // Registra pagamento de uma parcela: recebe upload de comprovante
  async pay(req, res, next) {
    try {
      const parcelaId = Number(req.params.id);
      const parcela = await prisma.parcela.findUnique({
        where: { id: parcelaId },
        include: { venda: { include: { cliente: true } } },
      });
      if (!parcela) return res.status(404).json({ error: 'Parcela não existe' });
      if (parcela.pago) return res.status(400).json({ error: 'Parcela já paga' });

      // Salva o arquivo de comprovante
      const file = req.file;
      const destDir = path.join(__dirname, '../../uploads/comprovantes', String(parcelaId));
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

      // Mantém a extensão original
      const ext = path.extname(file.originalname);
      const destFilename = file.filename + ext;
      const destPath = path.join(destDir, destFilename);
      fs.renameSync(file.path, destPath);

      // Atualiza parcela para pago e cria registro de comprovante
      await prisma.parcela.update({
        where: { id: parcelaId },
        data: {
          pago: true,
          dataPagamento: new Date(),
          comprovante: {
            create: {
              arquivoPath: `/uploads/comprovantes/${parcelaId}/${destFilename}`,
              recebidoPor: req.body.recebidoPor || 'Operador',
            }
          },
        }
      });

      res.json({ message: 'Pagamento registrado com sucesso' });
    } catch (err) {
      next(err);
    }
  },

  // Lista todas parcelas de um cliente, incluindo comprovantes
  async findByCliente(req, res, next) {
    try {
      const clienteId = Number(req.query.clienteId);
      const list = await prisma.parcela.findMany({
        where: { venda: { clienteId } },
        include: { comprovante: true },
      });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },
};
