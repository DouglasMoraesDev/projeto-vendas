// src/routes/vendaRoutes.js

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vendaController');

// Cria nova venda
router.post('/', ctrl.create);

// Lista todas as vendas
router.get('/', ctrl.findAll);

// Busca venda por ID
router.get('/:id', ctrl.findById);

// Atualiza venda por ID (edição básica)
router.put('/:id', ctrl.update);

// Exclui venda por ID
router.delete('/:id', ctrl.remove);

module.exports = router;
