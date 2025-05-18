// src/controllers/vendaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // POST /api/vendas
  async create(req, res, next) {
    try {
      const { clienteId, itens, tipoPagamento, entrada, numParcelas } = req.body;
      // itens = [ { mercadoriaId, quantidade }, ... ]
      if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: 'Itens da venda são obrigatórios' });
      }

      // 1) Busca cada produto para validar estoque, calcular valorTotal e montar "itensComNome"
      let valorTotal = 0;
      const itensComNome = [];

      for (const { mercadoriaId, quantidade } of itens) {
        const prod = await prisma.mercadoria.findUnique({
          where: { id: mercadoriaId }
        });
        if (!prod) {
          return res.status(404).json({ error: `Mercadoria ${mercadoriaId} não encontrada` });
        }
        if (prod.quantidadeEstoque < quantidade) {
          return res.status(400).json({ error: `Estoque insuficiente para ${prod.nome}` });
        }
        valorTotal += prod.valorUnitario * quantidade;

        // Adiciona ao array com o nome capturado
        itensComNome.push({
          mercadoriaId,
          quantidade,
          precoUnitario: Number(prod.valorUnitario.toFixed(2)),
          nomeMercadoria: prod.nome  // <-- aqui preenche o campo novo (não é mais obrigatório em DB, pois é nullable)
        });
      }

      // 2) Define o nome principal do produto (usando o primeiro item do array)
      const produtoNomePrincipal = itensComNome.length > 0
        ? itensComNome[0].nomeMercadoria
        : null;

      // 3) Cria a venda no banco, salvando também o "produtoNome" e cada ItemVenda com "nomeMercadoria"
      const venda = await prisma.venda.create({
        data: {
          clienteId: Number(clienteId),
          valorTotal,
          tipoPagamento: tipoPagamento.toUpperCase(),
          entrada: tipoPagamento === 'PARCELADO' ? parseFloat(entrada) : null,
          numParcelas: tipoPagamento === 'PARCELADO' ? Number(numParcelas) : null,
          parcelasRestantes: tipoPagamento === 'PARCELADO' ? Number(numParcelas) : null,
          produtoNome: produtoNomePrincipal,      // <-- aqui preenche a nova coluna
          itens: {
            create: itensComNome                // <-- aqui cada item já traz "nomeMercadoria"
          }
        }
      });

      // 4) Atualiza estoque de cada mercadoria
      for (const { mercadoriaId, quantidade } of itens) {
        await prisma.mercadoria.update({
          where: { id: mercadoriaId },
          data: { quantidadeEstoque: { decrement: quantidade } }
        });
      }

      // 5) Se for parcelado, gera as parcelas
      if (tipoPagamento === 'PARCELADO') {
        const saldo = valorTotal - parseFloat(entrada);
        const valorParcela = parseFloat((saldo / Number(numParcelas)).toFixed(2));
        const hoje = new Date();
        const parcelasData = [];

        for (let i = 1; i <= Number(numParcelas); i++) {
          parcelasData.push({
            vendaId: venda.id,
            numParcela: i,
            valorParcela,
            dataVencimento: new Date(
              hoje.getFullYear(),
              hoje.getMonth() + i,
              hoje.getDate()
            )
          });
        }
        await prisma.parcela.createMany({ data: parcelasData });
      }

      // 6) Retorna a venda com dados completos (incluindo cliente, itens e parcelas)
      const completa = await prisma.venda.findUnique({
        where: { id: venda.id },
        include: {
          cliente: true,
          itens: {
            include: {
              mercadoria: { include: { fotos: true } }
            }
          },
          parcelas: true
        }
      });

      return res.status(201).json(completa);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/vendas
  async findAll(req, res, next) {
    try {
      const list = await prisma.venda.findMany({
        include: {
          cliente: true,
          itens: {
            include: {
              mercadoria: { include: { fotos: true } }
            }
          },
          parcelas: true
        },
        orderBy: { criadoEm: 'desc' }
      });
      return res.json(list);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/vendas/:id
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const venda = await prisma.venda.findUnique({
        where: { id },
        include: {
          cliente: true,
          itens: {
            include: { mercadoria: { include: { fotos: true } } }
          },
          parcelas: true
        }
      });
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      return res.json(venda);
    } catch (e) {
      next(e);
    }
  }
};
