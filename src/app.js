// src/app.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Importa todos os controladores de rota
const authRoutes = require("./routes/authRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const mercadoriaRoutes = require("./routes/mercadoriaRoutes");
const vendaRoutes = require("./routes/vendaRoutes");
const parcelaRoutes = require("./routes/parcelaRoutes");
const comprovanteRoutes = require("./routes/comprovanteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Rotas da loja pública
const publicMercadoriaRoutes = require("./routes/publicMercadoriaRoutes");
const storeAuthRoutes = require("./routes/storeAuthRoutes");
const visitaRoutes = require("./routes/visitaRoutes");

// Controlador de comprovante (rota pública para PDF)
const comprovanteController = require("./controllers/comprovanteController");

// Middleware de autenticação para rotas protegidas
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

// --- Middlewares Globais ---
app.use(cors());
app.use(express.json());

// Expor a pasta 'uploads' publicamente, para servir imagens e PDFs
const uploadsDir = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsDir));

// Health‐check simples
app.get("/api/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date() })
);

// ----- ROTAS PÚBLICAS -----
// Autenticação interna (admin)
app.use("/api/auth", authRoutes);

// Loja pública: cadastro/login de visitante
app.use("/api/store", storeAuthRoutes);
// Loja pública: conta visitas
app.use("/api/visitas", visitaRoutes);
// Loja pública: lista de mercadorias
app.use("/api/public", publicMercadoriaRoutes);

// Comprovante PDF (público, sem token)
app.get(
  "/api/comprovantes/:parcelaId/pdf",
  comprovanteController.pdfByParcela
);

// ----- ROTAS PROTEGIDAS (APLICAM authMiddleware) -----
// Clientes (admin)
app.use("/api/clientes", authMiddleware, clienteRoutes);
// Mercadorias (admin)
app.use("/api/mercadorias", authMiddleware, mercadoriaRoutes);
// Vendas (admin)
app.use("/api/vendas", authMiddleware, vendaRoutes);
// Parcelas (admin)
app.use("/api/parcelas", authMiddleware, parcelaRoutes);
// Comprovantes (listar, protegido)
app.use("/api/comprovantes", authMiddleware, comprovanteRoutes);
// Dashboard (estatísticas de admin)
app.use("/api/dashboard", authMiddleware, dashboardRoutes);

// ----- SERVIR FRONT-END (pasta 'public') -----
const frontendDir = path.resolve(__dirname, "..", "public");
app.use(express.static(frontendDir));

// Qualquer rota que não comece com /api/ retorna o index.html (SPA ou páginas estáticas)
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// Tratamento genérico de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
