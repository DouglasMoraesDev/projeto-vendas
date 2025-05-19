// src/controllers/visitaController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // POST /api/visitas/tick  → registra uma nova visita
  async tick(req, res, next) {
    try {
      await prisma.visita.create({ data: {} });
      return res.status(201).json({ message: "Visita registrada" });
    } catch (e) {
      next(e);
    }
  },

  // GET /api/visitas/count → retorna o total de visitas
  async count(req, res, next) {
    try {
      const total = await prisma.visita.count();
      return res.json({ total });
    } catch (e) {
      next(e);
    }
  },
};
