// src/app.js

// Carrega variáveis de ambiente de .env
require('dotenv').config();

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

// Instância do Express e do Prisma Client
const app = express();
const prisma = new PrismaClient();

// --------------------
// MIDDLEWARES GLOBAIS
// --------------------

// Parseia JSON no body das requisições
app.use(express.json());

// Configuração do Multer para uploads (usado nas rotas específicas)
const upload = multer({
  dest: path.join(__dirname, '../uploads/temp'), // pasta temporária
  limits: { fileSize: 5 * 1024 * 1024 },          // máximo 5 MB por arquivo
});

// Serve arquivos estáticos (produtos e comprovantes)
// URLs ficam em http://localhost:4000/uploads/...
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);

// --------------------
// IMPORTAÇÃO DE ROTAS
// --------------------

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const mercadoriaRoutes = require('./routes/mercadoriaRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// --------------------
// ROTAS PÚBLICAS
// --------------------

// Health-check
app.get('/', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Autenticação: registro e login
app.use('/auth', authRoutes);

// --------------------
// ROTAS PROTEGIDAS
// --------------------
// A partir daqui, é necessário enviar header Authorization: Bearer <token>

// Clientes (CRUD)
app.use('/clientes', authMiddleware, clienteRoutes);

// Mercadorias (CRUD + upload de fotos)
app.use('/mercadorias', authMiddleware, mercadoriaRoutes);

// --------------------
// TRATAMENTO DE ERROS
// --------------------
app.use((err, req, res, next) => {
  console.error('❗ Erro capturado:', err);
  res.status(500).json({
    error: err.message,
    // Exibe stack trace apenas em dev
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
