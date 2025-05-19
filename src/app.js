// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

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

const comprovanteController = require("./controllers/comprovanteController");
const authMiddleware        = require("./middlewares/authMiddleware");

const app = express();

// ─── Middlewares Globais ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── 1) Expor a pasta "uploads" ANTES de servir o front-end ────────────────
//     Isso faz com que todo GET /uploads/... retorne o arquivo em "projeto-raiz/uploads/..."
//     sem nunca cair no catch-all ou no serveStatic do public.
const uploadsDir = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsDir));

// ─── 2) Rotas PÚBLICAS DE AUTENTICAÇÃO (admin interno) ─────────────────────
app.use("/api/auth", authRoutes);

// ─── 3) Rotas do dashboard (exigem token de admin) ─────────────────────────
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

// ─── 4) Rotas protegidas (admin) ───────────────────────────────────────────
app.use("/api/clientes", authMiddleware, clienteRoutes);
app.use("/api/mercadorias", authMiddleware, mercadoriaRoutes);
app.use("/api/vendas", authMiddleware, vendaRoutes);
app.use("/api/parcelas", authMiddleware, parcelaRoutes);
app.use("/api/comprovantes", authMiddleware, comprovanteRoutes);

// ─── 5) Rota pública para baixar PDF de comprovante ────────────────────────
app.get(
  "/api/comprovantes/:parcelaId/pdf",
  comprovanteController.pdfByParcela
);

// ─── 6) Rotas da loja pública (visitas, cadastro visitante, lista de produtos) ─
app.use("/api/store", storeAuthRoutes);
app.use("/api/visitas", visitaRoutes);
app.use("/api/public", publicMercadoriaRoutes);

// ─── 7) Servir o front-end estático (arquivos HTML/CSS/JS em /public) ──────
const frontendDir = path.resolve(__dirname, "..", "public");
app.use(express.static(frontendDir));

// ─── 8) Catch-all: se não bateu nenhuma rota /api nem /uploads nem /static, envia index.html 
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// ─── Tratamento genérico de erros ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// ─── Iniciar servidor ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
