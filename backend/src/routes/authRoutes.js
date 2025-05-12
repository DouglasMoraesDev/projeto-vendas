// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

// POST /auth/register → registro de novo usuário
router.post('/register', controller.register);

// POST /auth/login → retorna { token }
router.post('/login', controller.login);

module.exports = router;
