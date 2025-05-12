// src/routes/mercadoriaRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mercadoriaController');
const multer = require('multer');
const path = require('path');

// Configura Multer: usa pasta temp para uploads
const upload = multer({
  dest: path.join(__dirname, '../../uploads/temp'),
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB
});

// --------------------
// ROTAS DE MERCADORIAS
// --------------------

// GET    /mercadorias       → listar
router.get('/', controller.findAll);

// GET    /mercadorias/:id   → por ID
router.get('/:id', controller.findById);

// POST   /mercadorias       → criar + up a 5 fotos
router.post('/', upload.array('fotos', 5), controller.create);

// PUT    /mercadorias/:id   → atualizar (não altera fotos)
router.put('/:id', controller.update);

// DELETE /mercadorias/:id   → remover
router.delete('/:id', controller.remove);

module.exports = router;
