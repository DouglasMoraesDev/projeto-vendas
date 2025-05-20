const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET /api/public/mercadorias
 * Retorna todas as mercadorias (público; frontend esconde já sem estoque).
 */
router.get("/mercadorias", async (req, res, next) => {
  try {
    const mercadorias = await prisma.mercadoria.findMany({
      include: { fotos: true }
    });
    res.json(mercadorias);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
