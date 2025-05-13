const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/comprovanteController');

// GET /api/comprovantes?clienteId=123
router.get('/', ctrl.findByCliente);

module.exports = router;
