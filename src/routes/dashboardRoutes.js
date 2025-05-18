// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, ctrl.getResumo);

module.exports = router;
