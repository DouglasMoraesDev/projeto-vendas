// src/app.js

require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

const authRoutes        = require("./routes/authRoutes");
const clienteRoutes     = require("./routes/clienteRoutes");
const mercadoriaRoutes  = require("./routes/mercadoriaRoutes");
const vendaRoutes       = require("./routes/vendaRoutes");
const parcelaRoutes     = require("./routes/parcelaRoutes");
const comprovanteRoutes = require("./routes/comprovanteRoutes");
const dashboardRoutes   = require("./routes/dashboardRoutes");

const publicMercadoriaRoutes = require("./routes/publicMercadoriaRoutes");
const storeAuthRoutes        = require("./routes/storeAuthRoutes");
const visitaRoutes           = require("./routes/visitaRoutes");
const comprovanteController  = require("./controllers/comprovanteController");

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

// ─── (1) Middleware GLOBAL: cors e JSON parser ─────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── (2) Expor a pasta “uploads” ANTES de servir qualquer HTML estático ────────
//      Qualquer GET /uploads/... vai diretamente ao arquivo em disco.
const uploadsDir = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsDir));

// ─── (3) Rotas de autenticação (ADMIN) — sem token ─────────────────────────────
app.use("/api/auth", authRoutes);

// ─── (4) Dashboard (ADMIN protegido) ─────────────────────────────────────────
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

// ─── (5) ROTAS PROTEGIDAS (ADMIN) ─────────────────────────────────────────────
app.use("/api/clientes",     authMiddleware, clienteRoutes);
app.use("/api/mercadorias",  authMiddleware, mercadoriaRoutes);
app.use("/api/vendas",       authMiddleware, vendaRoutes);
app.use("/api/parcelas",     authMiddleware, parcelaRoutes);
app.use("/api/comprovantes", authMiddleware, comprovanteRoutes);

// ─── (6) Rota pública para baixar PDF de comprovante ──────────────────────────
app.get(
  "/api/comprovantes/:parcelaId/pdf",
  comprovanteController.pdfByParcela
);

// ─── (7) Rotas da LOJA PÚBLICA (visitantes, catálogo público) ─────────────────
app.use("/api/store", storeAuthRoutes);
app.use("/api/visitas", visitaRoutes);
app.use("/api/public", publicMercadoriaRoutes);

// ─── (8) Servir front-end estático (pasta “public”) ────────────────────────────
const frontendDir = path.resolve(__dirname, "..", "public");
app.use(express.static(frontendDir));

// ─── (9) Catch-all para ROTAS NÃO /api e NÃO /uploads: devolve index.html ─────
app.get(/^(?!\/api\/|\/uploads\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// ─── (10) Tratamento genérico de erros ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// ─── (11) Iniciar servidor ────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
