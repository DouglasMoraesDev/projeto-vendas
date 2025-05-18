// src/controllers/dashboardController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // GET /api/dashboard
  async getResumo(req, res, next) {
    try {
      // Total de clientes
      const totalClientes = await prisma.cliente.count();
      // Total de produtos (mercadorias)
      const totalProdutos = await prisma.mercadoria.count();
      // Total de vendas
      const totalVendas = await prisma.venda.count();

      // Parcela com vencimento hoje (para notificar)
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const amanha = new Date(hoje);
      amanha.setDate(hoje.getDate() + 1);

      const parcelasVencendoHoje = await prisma.parcela.findMany({
        where: {
          pago: false,
          dataVencimento: {
            gte: hoje,
            lt: amanha
          }
        },
        include: {
          venda: { include: { cliente: true } }
        }
      });

      // Monta array de notificações
      const notificacoes = parcelasVencendoHoje.map(p => ({
        clienteNome: p.venda.cliente.nome,
        numParcela: p.numParcela,
        valorParcela: p.valorParcela,
        vendaId: p.vendaId
      }));

      return res.json({ totalClientes, totalProdutos, totalVendas, notificacoes });
    } catch (e) {
      next(e);
    }
  }
};
