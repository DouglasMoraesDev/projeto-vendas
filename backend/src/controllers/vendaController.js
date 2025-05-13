// src/controllers/vendaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Cadastra uma venda (à vista ou parcelada)
  async create(req, res, next) {
    try {
      const {
        clienteId,
        mercadoriaId,
        tipoPagamento,    // "avista" ou "parcelado"
        entrada,         // obrigatório se parcelado
        numParcelas      // idem
      } = req.body;

      // busca o produto
      const produto = await prisma.mercadoria.findUnique({ where: { id: Number(mercadoriaId) } });
      if (!produto) return res.status(404).json({ error: 'Mercadoria não encontrada' });

      // calcula valor total
      const valorTotal = produto.valorUnitario;

      // cria venda
      const venda = await prisma.venda.create({
        data: {
          clienteId: Number(clienteId),
          tipoPagamento,
          valorTotal,
          entrada: tipoPagamento === 'parcelado' ? parseFloat(entrada) : null,
          numParcelas: tipoPagamento === 'parcelado' ? Number(numParcelas) : null,
          parcelasRestantes: tipoPagamento === 'parcelado' ? Number(numParcelas) : null,
        }
      });

      // se parcelado, gera as parcelas com datas mensais automáticas
      if (tipoPagamento === 'parcelado') {
        const parcelasData = [];
        const valorParcelas = (valorTotal - parseFloat(entrada)) / Number(numParcelas);
        const hoje = new Date();
        for (let i = 1; i <= Number(numParcelas); i++) {
          const venc = new Date(hoje.getFullYear(), hoje.getMonth() + i, hoje.getDate());
          parcelasData.push({
            vendaId: venda.id,
            numParcela: i,
            valorParcela: parseFloat(valorParcelas.toFixed(2)),
            dataVencimento: venc,
          });
        }
        await prisma.parcela.createMany({ data: parcelasData });
      }

      const completa = await prisma.venda.findUnique({
        where: { id: venda.id },
        include: { cliente: true, parcelas: true },
      });
      res.status(201).json(completa);
    } catch (err) {
      next(err);
    }
  },

  // Lista todas as vendas
  async findAll(req, res, next) {
    try {
      const list = await prisma.venda.findMany({
        include: { cliente: true, parcelas: true },
        orderBy: { dataVenda: 'desc' },
      });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  // Detalha uma venda específica
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const venda = await prisma.venda.findUnique({
        where: { id },
        include: { cliente: true, parcelas: true },
      });
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });
      res.json(venda);
    } catch (err) {
      next(err);
    }
  },
};
