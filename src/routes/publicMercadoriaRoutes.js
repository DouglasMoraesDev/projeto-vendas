// src/routes/publicMercadoriaRoutes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/publicMercadoriaController");

// Rota pública para listar mercadorias na loja
router.get("/mercadorias", ctrl.findAllPublic);

module.exports = router;
