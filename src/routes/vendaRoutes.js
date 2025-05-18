// src/routes/vendaRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/vendaController');

router.post('/', ctrl.create);
router.get('/', ctrl.findAll);
router.get('/:id', ctrl.findById);

module.exports = router;
