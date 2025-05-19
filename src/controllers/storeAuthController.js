// src/controllers/storeAuthController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "algumSegredoLoja"; // ideal usar outra variável

module.exports = {
  // POST /api/store/register
  async register(req, res, next) {
    try {
      const { nome, email, telefone, senha } = req.body;
      if (!nome || !email || !senha || !telefone) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }
      const exists = await prisma.lojaVisitante.findUnique({ where: { email } });
      if (exists) return res.status(409).json({ error: "Email já cadastrado" });

      const hash = await bcrypt.hash(senha, SALT_ROUNDS);
      const visitor = await prisma.lojaVisitante.create({
        data: { nome, email, telefone, senha: hash },
      });
      // não retornar senha
      const { senha: _, ...rest } = visitor;
      res.status(201).json(rest);
    } catch (e) {
      next(e);
    }
  },

  // POST /api/store/login
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }
      const visitor = await prisma.lojaVisitante.findUnique({ where: { email } });
      if (!visitor) return res.status(401).json({ error: "Credenciais inválidas" });

      const valid = await bcrypt.compare(senha, visitor.senha);
      if (!valid) return res.status(401).json({ error: "Credenciais inválidas" });

      // Cria token JWT com dados do visitante
      const token = jwt.sign(
        { id: visitor.id, nome: visitor.nome, telefone: visitor.telefone },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ token, nome: visitor.nome, email: visitor.email, telefone: visitor.telefone });
    } catch (e) {
      next(e);
    }
  },

  // GET /api/store/me  (retorna dados do visitante autenticado)
  async me(req, res, next) {
    try {
      const auth = req.headers.authorization || "";
      const token = auth.replace(/^Bearer\s+/, "");
      if (!token) return res.status(401).json({ error: "Token não fornecido" });

      const payload = jwt.verify(token, JWT_SECRET);
      const visitor = await prisma.lojaVisitante.findUnique({ where: { id: payload.id } });
      if (!visitor) return res.status(404).json({ error: "Visitante não encontrado" });

      const { senha, ...rest } = visitor;
      res.json(rest);
    } catch (e) {
      res.status(401).json({ error: "Token inválido" });
    }
  },
};
