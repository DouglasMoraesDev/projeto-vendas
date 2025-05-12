// src/middlewares/authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/, '');
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { userId, email, iat, exp }
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
