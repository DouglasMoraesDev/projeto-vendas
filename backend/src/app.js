// src/app.js
require('dotenv').config();
const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const mercadoriaRoutes = require('./routes/mercadoriaRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Global middleware: parse JSON
app.use(express.json());

// Serve uploads (produtos, comprovantes)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Public routes
app.get('/', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
app.use('/auth', authRoutes);

// Protected routes (require JWT)
app.use('/clientes', authMiddleware, clienteRoutes);
app.use('/mercadorias', authMiddleware, mercadoriaRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
