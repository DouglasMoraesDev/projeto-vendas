// src/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// importar roteadores
const authRoutes        = require('./routes/authRoutes');
const clienteRoutes     = require('./routes/clienteRoutes');
const mercadoriaRoutes  = require('./routes/mercadoriaRoutes');
const vendaRoutes       = require('./routes/vendaRoutes');
const parcelaRoutes     = require('./routes/parcelaRoutes');
const comprovanteRoutes = require('./routes/comprovanteRoutes');
const authMiddleware    = require('./middlewares/authMiddleware');

const app = express();

// --------------------
// MIDDLEWARES GLOBAIS
// --------------------

// Permite chamadas de qualquer origem (CORS)
// Em produção, restrinja ao domínio do frontend
app.use(cors({ origin: '*' }));

// Parse application/json
app.use(express.json());

// --------------------
// SERVIR UPLOADS
// --------------------
// Arquivos enviados (produtos e comprovantes)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --------------------
// ROTAS PÚBLICAS (API)
// --------------------

// Health-check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Autenticação
app.use('/api/auth', authRoutes);

// --------------------
// ROTAS PROTEGIDAS (JWT)
// --------------------
// Prefixo /api para diferenciar do frontend estático
app.use('/api/clientes',     authMiddleware, clienteRoutes);
app.use('/api/mercadorias',  authMiddleware, mercadoriaRoutes);
app.use('/api/vendas',       authMiddleware, vendaRoutes);
app.use('/api/parcelas',     authMiddleware, parcelaRoutes);
app.use('/api/comprovantes', authMiddleware, comprovanteRoutes);

// --------------------
// SERVIR FRONTEND ESTÁTICO
// --------------------
// Todo arquivo em frontend/public será servido em /
const frontendPath = path.join(__dirname, '../../frontend/public');
app.use(express.static(frontendPath));

// Para qualquer outra rota não API, retorna o index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// --------------------
// TRATAMENTO DE ERROS
// --------------------
app.use((err, req, res, next) => {
  console.error('❗ Erro capturado:', err);
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// --------------------
// INICIALIZAÇÃO DO SERVIDOR
// --------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
