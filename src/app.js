// src/app.js
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

// Importa todas as rotas
const authRoutes        = require('./routes/authRoutes');
const clienteRoutes     = require('./routes/clienteRoutes');
const mercadoriaRoutes  = require('./routes/mercadoriaRoutes');
const vendaRoutes       = require('./routes/vendaRoutes');
const parcelaRoutes     = require('./routes/parcelaRoutes');
const comprovanteRoutes = require('./routes/comprovanteRoutes');
const dashboardRoutes   = require('./routes/dashboardRoutes');

// Controller de comprovante (para rota PDF sem auth)
const comprovanteController = require('./controllers/comprovanteController');

const authMiddleware = require('./middlewares/authMiddleware');
const app = express();

// --- Middlewares Globais ---
app.use(cors());
app.use(express.json());

// Expor uploads (imagens e PDFs) publicamente
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Health‐check
app.get('/api/health', (req, res) =>
  res.json({ status: 'OK', timestamp: new Date() })
);

// Rotas de autenticação (públicas)
app.use('/api/auth', authRoutes);

// Rotas protegidas (aplicam authMiddleware)
app.use('/api/clientes', authMiddleware, clienteRoutes);
app.use('/api/mercadorias', authMiddleware, mercadoriaRoutes);
app.use('/api/vendas', authMiddleware, vendaRoutes);
app.use('/api/parcelas', authMiddleware, parcelaRoutes);
// Rotas do dashboard (com autenticação)
app.use('/api/dashboard', dashboardRoutes);

// Rotas de comprovantes:
//  • Baixar PDF não exige token
app.get('/api/comprovantes/:parcelaId/pdf', comprovanteController.pdfByParcela);
//  • Listar comprovantes exige autenticação
app.use('/api/comprovantes', authMiddleware, comprovanteRoutes);

// Serve o frontend a partir de public/
const frontendDir = path.resolve(__dirname, '..', 'public');
app.use(express.static(frontendDir));

// Qualquer rota que NÃO comece com /api/, envia index.html
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Tratamento de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Porta
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
