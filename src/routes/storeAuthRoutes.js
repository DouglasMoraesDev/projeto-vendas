// src/routes/storeAuthRoutes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/storeAuthController");

// Registro e login para visitantes da loja (público)
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/me", ctrl.me);

module.exports = router;
