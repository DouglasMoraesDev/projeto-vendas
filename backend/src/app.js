// src/app.js
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

// Instâncias
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(express.json());

// Configuração de uploads (Multer)
const upload = multer({
  dest: path.join(__dirname, '../uploads/temp'),
  limits: { fileSize: 5 * 1024 * 1024 },        // 5 MB
});

// Servir arquivos estáticos (imagens e comprovantes)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota de health‐check
app.get('/', (req, res) => {
  res.send({ status: 'OK', timestamp: new Date() });
});

// Exemplo: listar todos os clientes (apenas para testar Prisma)
app.get('/clientes', async (req, res, next) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch(err) {
    next(err);
  }
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
