// src/app.js

require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

const app = express();

// --- Importa rotas já existentes ---
// Autenticação do sistema principal
const authRoutes        = require("./routes/authRoutes");
// Recursos protegidos do sistema principal
const clienteRoutes     = require("./routes/clienteRoutes");
const mercadoriaRoutes  = require("./routes/mercadoriaRoutes");
const vendaRoutes       = require("./routes/vendaRoutes");
const parcelaRoutes     = require("./routes/parcelaRoutes");
const comprovanteRoutes = require("./routes/comprovanteRoutes");
const dashboardRoutes   = require("./routes/dashboardRoutes");

// Novas rotas públicas do frontend da loja
const publicMercadoriaRoutes = require("./routes/publicMercadoriaRoutes");
const visitaRoutes           = require("./routes/visitaRoutes");

// Rotas de visitante da loja (registro e login)
const storeAuthRoutes = require("./routes/storeAuthRoutes");

// Controlador de download de comprovante público
const comprovanteController = require("./controllers/comprovanteController");

// Middleware de autenticação (JWT) para rotas protegidas do sistema principal
const authMiddleware = require("./middlewares/authMiddleware");

// --- Middlewares globais ---
app.use(cors());
app.use(express.json());

// Expondo a pasta “uploads” para servir imagens e PDFs
const uploadsDir = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsDir));

// Health-check
app.get("/api/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date() })
);

// ------------------ ROTAS PÚBLICAS ------------------

// Autenticação do sistema principal (usuários do sistema)
app.use("/api/auth", authRoutes);

// Autenticação de visitantes da loja (registro, login e perfil)
// Agora montamos corretamente o endpoint /api/store
app.use("/api/store", storeAuthRoutes);

// Rotas públicas de mercadorias para a loja (não exigem token)
app.use("/api/public", publicMercadoriaRoutes);

// Monta rota de visitas (tick e count) para analytics de loja
app.use("/api/visitas", visitaRoutes);

// Rota pública para download de PDF de comprovante (não exige token)
app.get(
  "/api/comprovantes/:parcelaId/pdf",
  comprovanteController.pdfByParcela
);

// ---------------- ROTAS PROTEGIDAS -------------------
// A partir daqui, todas as rotas exigem token via authMiddleware

app.use("/api/clientes",     authMiddleware, clienteRoutes);
app.use("/api/mercadorias",  authMiddleware, mercadoriaRoutes);
app.use("/api/vendas",       authMiddleware, vendaRoutes);
app.use("/api/parcelas",     authMiddleware, parcelaRoutes);
app.use("/api/comprovantes", authMiddleware, comprovanteRoutes);
app.use("/api/dashboard",    authMiddleware, dashboardRoutes);

// Rotas de configuração extras (troca de senha, backup, etc)
const configRoutes = require("./routes/configRoutes");
app.use("/api/config", authMiddleware, configRoutes);

// Serve o frontend estático (HTML/CSS/JS) na raiz
const frontendDir = path.resolve(__dirname, "..", "public");
app.use(express.static(frontendDir));

// Qualquer rota que NÃO comece com /api/ retorna index.html
// (permitindo SPA ou múltiplas páginas frontend)
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// --- Tratamento de erro global ---
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Inicia o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
