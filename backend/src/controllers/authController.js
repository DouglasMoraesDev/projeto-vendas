// src/controllers/authController.js
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

module.exports = {
  async register(req, res, next) {
    try {
      const { nome, email, telefone, endereco, senha } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
      }
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(409).json({ error: 'E-mail já cadastrado' });

      const hash = await bcrypt.hash(senha, SALT_ROUNDS);
      const user = await prisma.user.create({
        data: { nome, email, telefone, endereco, senha: hash },
      });
      const { senha: _, ...safe } = user;
      res.status(201).json(safe);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

      const valid = await bcrypt.compare(senha, user.senha);
      if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '8h',
      });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  },
};
