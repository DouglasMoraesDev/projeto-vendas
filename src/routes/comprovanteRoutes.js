// src/routes/comprovanteRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/comprovanteController');

// Rota pública para baixar PDF de comprovante (não exige token)
router.get('/:parcelaId/pdf', ctrl.pdfByParcela);

// Rota protegida para listar comprovantes de um cliente
router.get('/', ctrl.findByCliente);

module.exports = router;
