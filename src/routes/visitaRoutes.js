// src/routes/visitaRoutes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/visitaController");

// Rota para registrar visita
router.post("/tick", ctrl.tick);

// Rota para obter total de visitas
router.get("/count", ctrl.count);

module.exports = router;
