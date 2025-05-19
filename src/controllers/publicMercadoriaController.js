// src/controllers/publicMercadoriaController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // GET /api/public/mercadorias
  async findAllPublic(req, res, next) {
    try {
      // retorna todas as mercadorias com fotos
      const list = await prisma.mercadoria.findMany({
        include: { fotos: true }
      });
      return res.json(list);
    } catch (e) {
      next(e);
    }
  }
};
