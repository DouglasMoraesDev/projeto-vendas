// src/routes/publicMercadoriaRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET /api/public/mercadorias
 * Retorna todas as mercadorias (sem precisar de token).
 * Inclui o array de fotos para cada mercadoria.
 */
router.get("/mercadorias", async (req, res, next) => {
  try {
    const mercadorias = await prisma.mercadoria.findMany({
      include: { fotos: true },
    });
    return res.json(mercadorias);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
