require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

// Rotas
const authRoutes        = require('./routes/authRoutes');
const clienteRoutes     = require('./routes/clienteRoutes');
const mercadoriaRoutes  = require('./routes/mercadoriaRoutes');
const vendaRoutes       = require('./routes/vendaRoutes');
const parcelaRoutes     = require('./routes/parcelaRoutes');
const comprovanteRoutes = require('./routes/comprovanteRoutes');

// Middleware de autenticação
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Servir uploads estáticos 
// Ajuste o path para apontar para a pasta correta de uploads (do root do projeto)
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Health-check
app.get('/api/health', (req, res) =>
  res.json({ status: 'OK', timestamp: new Date() })
);

// Rotas públicas de auth
app.use('/api/auth', authRoutes);

// Rotas protegidas
app.use('/api/clientes',     authMiddleware, clienteRoutes);
app.use('/api/mercadorias',  authMiddleware, mercadoriaRoutes);
app.use('/api/vendas',       authMiddleware, vendaRoutes);
app.use('/api/parcelas',     authMiddleware, parcelaRoutes);
app.use('/api/comprovantes', authMiddleware, comprovanteRoutes);

// Servir SPA (front-end) do diretório public
const frontendDir = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDir));
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Inicia servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
