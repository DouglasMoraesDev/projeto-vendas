// src/app.js

require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

// Importa rotas já existentes...
const authRoutes        = require("./routes/authRoutes");
const clienteRoutes     = require("./routes/clienteRoutes");
const mercadoriaRoutes  = require("./routes/mercadoriaRoutes");
const vendaRoutes       = require("./routes/vendaRoutes");
const parcelaRoutes     = require("./routes/parcelaRoutes");
const comprovanteRoutes = require("./routes/comprovanteRoutes");
const dashboardRoutes   = require("./routes/dashboardRoutes");

// Novas rotas:
const publicMercadoriaRoutes = require("./routes/publicMercadoriaRoutes");
const visitaRoutes           = require("./routes/visitaRoutes");

// Controlador de comprovantes para rota pública de PDF
const comprovanteController = require("./controllers/comprovanteController");

const authMiddleware = require("./middlewares/authMiddleware");
const app = express();

// --- Middlewares globais ---
app.use(cors());
app.use(express.json());

// Expor pasta “uploads” publicamente (imagens e PDFs)
const uploadsDir = path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsDir));

// Health-check
app.get("/api/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date() })
);

// Rotas públicas de auth
app.use("/api/auth", authRoutes);

// Rotas protegidas (token via authMiddleware)
app.use("/api/clientes",     authMiddleware, clienteRoutes);
app.use("/api/mercadorias",  authMiddleware, mercadoriaRoutes);
app.use("/api/vendas",       authMiddleware, vendaRoutes);
app.use("/api/parcelas",     authMiddleware, parcelaRoutes);
app.use("/api/comprovantes", authMiddleware, comprovanteRoutes);
app.use("/api/dashboard",    authMiddleware, dashboardRoutes);

// Rotas de configuração (troca de senha, backup)… (se você as criou)
const configRoutes = require("./routes/configRoutes");
app.use("/api/config", authMiddleware, configRoutes);

// ———————————————— NOVAS ROTAS DE LOJA ————————————————
// Monta rota pública de mercadorias (não exige token)
app.use("/api/public", publicMercadoriaRoutes);

// Monta rota de visitas (tick e count).  
// Se quiser que seja acessível PUBLICAMENTE, não aplique authMiddleware aqui.
// O ideal é que qualquer visitante da loja mande POST /api/visitas/tick.
app.use("/api/visitas", visitaRoutes);

// Rota pública para download de PDF de comprovante (não exige token)
app.get("/api/comprovantes/:parcelaId/pdf", comprovanteController.pdfByParcela);

// Serve o frontend a partir de “public/”
const frontendDir = path.resolve(__dirname, "..", "public");
app.use(express.static(frontendDir));

// Qualquer rota que NÃO comece em /api/, retorna index.html
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// Tratamento de erro global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
