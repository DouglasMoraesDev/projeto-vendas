// src/routes/configRoutes.js

const express = require("express");
const router = express.Router();
const configCtrl = require("../controllers/configController");
const authMiddleware = require("../middlewares/authMiddleware");

// Todas as rotas aqui exigem autenticação
router.use(authMiddleware);

// POST /api/config/change-password
router.post("/change-password", configCtrl.changePassword);

// GET /api/config/backup
router.get("/backup", configCtrl.backupDatabase);

module.exports = router;
