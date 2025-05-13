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
// Em produção, substitua '*' pelo domínio do frontend
app.use(cors({ origin: '*' }));

// Parse application/json
app.use(express.json());

// --------------------
// SERVIR UPLOADS
// --------------------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --------------------
// ROTAS PÚBLICAS
// --------------------
app.get('/', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
app.use('/auth', authRoutes);

// --------------------
// ROTAS PROTEGIDAS (JWT)
// --------------------
app.use('/clientes',     authMiddleware, clienteRoutes);
app.use('/mercadorias',  authMiddleware, mercadoriaRoutes);
app.use('/vendas',       authMiddleware, vendaRoutes);
app.use('/parcelas',     authMiddleware, parcelaRoutes);
app.use('/comprovantes', authMiddleware, comprovanteRoutes);

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
