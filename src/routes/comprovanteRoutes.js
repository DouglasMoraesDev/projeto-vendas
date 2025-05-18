const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/comprovanteController');

// lista todos comprovantes de um cliente
router.get('/', ctrl.findByCliente);

// baixa PDF de comprovante de uma parcela
router.get('/:parcelaId/pdf', ctrl.pdfByParcela);

module.exports = router;
