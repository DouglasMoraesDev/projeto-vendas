// src/controllers/authController.js

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

module.exports = {
  // Registro de novo usuário (dev/admin)
  async register(req, res, next) {
    try {
      const { nome, email, telefone, endereco, senha } = req.body;

      // Verifica se já existe um usuário com esse email
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(409).json({ error: 'E-mail já cadastrado' });

      // Hash da senha
      const hash = await bcrypt.hash(senha, SALT_ROUNDS);

      // Cria o usuário
      const user = await prisma.user.create({
        data: { nome, email, telefone, endereco, senha: hash }
      });

      // Retorna dados sem a senha
      const { senha: _, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (err) {
      next(err);
    }
  },

  // Login: gera JWT
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

      // Compara senha
      const valid = await bcrypt.compare(senha, user.senha);
      if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

      // Gera token
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '8h'
      });

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
};
