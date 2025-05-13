require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// roteadores
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
app.use(cors({ origin: '*' }));
app.use(express.json());

// --------------------
// SERVIR UPLOADS
// --------------------
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);

// --------------------
// ROTAS PÚBLICAS
// --------------------
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
app.use('/api/auth', authRoutes);

// --------------------
// ROTAS PROTEGIDAS
// --------------------
app.use('/api/clientes',     authMiddleware, clienteRoutes);
app.use('/api/mercadorias',  authMiddleware, mercadoriaRoutes);
app.use('/api/vendas',       authMiddleware, vendaRoutes);
app.use('/api/parcelas',     authMiddleware, parcelaRoutes);
app.use('/api/comprovantes', authMiddleware, comprovanteRoutes);

// --------------------
// SERVIR FRONTEND ESTÁTICO
// --------------------
const frontendDir = path.join(__dirname, '../../frontend/public');
app.use(express.static(frontendDir));

// fallback SPA: qualquer rota que NÃO comece com "/api/"
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
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
