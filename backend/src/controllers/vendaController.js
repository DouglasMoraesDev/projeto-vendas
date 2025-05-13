// Cria vendas, gera parcelas, lista vendas
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
      // calcula valor total e atualiza estoque
      let valorTotal = 0;
      for (const { mercadoriaId, quantidade } of itens) {
        const prod = await prisma.mercadoria.findUnique({ where: { id: mercadoriaId } });
        if (!prod) return res.status(404).json({ error: `Mercadoria ${mercadoriaId} não encontrada` });
        if (prod.quantidadeEstoque < quantidade) {
          return res.status(400).json({ error: `Estoque insuficiente para ${prod.nome}` });
        }
        valorTotal += prod.valorUnitario * quantidade;
      }

      // cria venda
      const venda = await prisma.venda.create({
        data: {
          clienteId: Number(clienteId),
          valorTotal,
          tipoPagamento: tipoPagamento.toUpperCase(),
          entrada: tipoPagamento === 'parcelado' ? parseFloat(entrada) : null,
          numParcelas: tipoPagamento === 'parcelado' ? Number(numParcelas) : null,
          parcelasRestantes: tipoPagamento === 'parcelado' ? Number(numParcelas) : null,
          itens: {
            create: itens.map(({ mercadoriaId, quantidade }) => ({
              mercadoriaId,
              quantidade,
              precoUnitario: Number((valorTotal / quantidade).toFixed(2)),
            }))
          }
        }
      });

      // reduz estoque
      for (const { mercadoriaId, quantidade } of itens) {
        await prisma.mercadoria.update({
          where: { id: mercadoriaId },
          data: { quantidadeEstoque: { decrement: quantidade } }
        });
      }

      // gera parcelas se for parcelado
      if (tipoPagamento === 'parcelado') {
        const saldo = valorTotal - parseFloat(entrada);
        const valorParcela = parseFloat((saldo / Number(numParcelas)).toFixed(2));
        const hoje = new Date();
        const parcelasData = [];
        for (let i = 1; i <= Number(numParcelas); i++) {
          parcelasData.push({
            vendaId: venda.id,
            numParcela: i,
            valorParcela,
            dataVencimento: new Date(hoje.getFullYear(), hoje.getMonth() + i, hoje.getDate())
          });
        }
        await prisma.parcela.createMany({ data: parcelasData });
      }

      const completa = await prisma.venda.findUnique({
        where: { id: venda.id },
        include: { cliente: true, itens: { include: { mercadoria: true } }, parcelas: true }
      });
      res.status(201).json(completa);
    } catch (e) { next(e); }
  },

  // GET /api/vendas
  async findAll(req, res, next) {
    try {
      const list = await prisma.venda.findMany({
        include: { cliente: true, itens: { include: { mercadoria: true } }, parcelas: true },
        orderBy: { criadoEm: 'desc' }
      });
      res.json(list);
    } catch (e) { next(e); }
  },

  // GET /api/vendas/:id
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const venda = await prisma.venda.findUnique({
        where: { id },
        include: { cliente: true, itens: { include: { mercadoria: true } }, parcelas: true }
      });
      if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });
      res.json(venda);
    } catch (e) { next(e); }
  },
};
