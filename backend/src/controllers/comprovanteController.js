// src/controllers/comprovanteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Lista todos os comprovantes de um cliente
  async findByCliente(req, res, next) {
    try {
      const clienteId = Number(req.query.clienteId);
      const vendas = await prisma.venda.findMany({
        where: { clienteId },
        include: {
          parcelas: {
            include: { comprovante: true }
          }
        }
      });
      // extrai apenas comprovantes
      const comprovantes = vendas.flatMap(v =>
        v.parcelas
          .filter(p => p.comprovante)
          .map(p => ({ parcelaId: p.id, ...p.comprovante }))
      );
      res.json(comprovantes);
    } catch (err) {
      next(err);
    }
  }
};
