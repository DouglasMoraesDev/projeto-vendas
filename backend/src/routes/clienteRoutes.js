// src/routes/clienteRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

// --------------------
// ROTAS DE CLIENTES
// --------------------

// GET    /clientes       → listar todos os clientes
router.get('/', controller.findAll);

// GET    /clientes/:id   → buscar cliente por ID
router.get('/:id', controller.findById);

// POST   /clientes       → criar novo cliente
router.post('/', controller.create);

// PUT    /clientes/:id   → atualizar dados de um cliente existente
router.put('/:id', controller.update);

// DELETE /clientes/:id   → remover cliente
router.delete('/:id', controller.remove);

module.exports = router;
