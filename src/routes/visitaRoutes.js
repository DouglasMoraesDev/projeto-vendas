// src/routes/visitaRoutes.js

const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * POST /api/visitas/tick
 * Cada vez que o usuário carrega a página da loja, faremos um "tick":
 * basta inserir um registro de Visita no banco.
 */
router.post("/tick", async (req, res, next) => {
  try {
    // Insere um novo registro em Visita (com dataHora = now())
    await prisma.visita.create({ data: {} });
    return res.json({ message: "Visita registrada" });
  } catch (err) {
    next(err);
  }
});

/**
 * Opcional: GET /api/visitas/count
 * Retorna o total de visitas já registradas. Útil para mostrar na dashboard.
 */
router.get("/count", async (req, res, next) => {
  try {
    const total = await prisma.visita.count();
    return res.json({ total });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
