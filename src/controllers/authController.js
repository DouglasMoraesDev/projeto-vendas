// Cadastra e autentica usuários
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  // POST /api/auth/register
  async register(req, res, next) {
    try {
      const { nome, email, senha, telefone, endereco } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'nome, email e senha são obrigatórios' });
      }
      const exists = await prisma.usuario.findUnique({ where: { email } });
      if (exists) return res.status(409).json({ error: 'E-mail já cadastrado' });

      const hash = await bcrypt.hash(senha, SALT_ROUNDS);
      const user = await prisma.usuario.create({
        data: { nome, email, senha: hash, telefone, endereco },
      });
      // não retornar senha
      const { senha: _, ...rest } = user;
      res.status(201).json(rest);
    } catch (e) {
      next(e);
    }
  },

  // POST /api/auth/login
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const user = await prisma.usuario.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

      const valid = await bcrypt.compare(senha, user.senha);
      if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
      res.json({ token });
    } catch (e) {
      next(e);
    }
  },
};
