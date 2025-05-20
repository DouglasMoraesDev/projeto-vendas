const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/storeAuthController");

// POST /api/store/register
router.post("/register", ctrl.register);
// POST /api/store/login
router.post("/login",    ctrl.login);
// GET  /api/store/me
router.get("/me",        ctrl.me);

module.exports = router;
