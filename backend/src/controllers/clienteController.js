// CRUD de clientes
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // GET /api/clientes
  async findAll(req, res, next) {
    try {
      const lista = await prisma.cliente.findMany();
      res.json(lista);
    } catch (e) { next(e); }
  },

  // GET /api/clientes/:id
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const item = await prisma.cliente.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: 'Cliente não encontrado' });
      res.json(item);
    } catch (e) { next(e); }
  },

  // POST /api/clientes
  async create(req, res, next) {
    try {
      const { nome, cpf, telefone, endereco } = req.body;
      const novo = await prisma.cliente.create({ data: { nome, cpf, telefone, endereco } });
      res.status(201).json(novo);
    } catch (e) { next(e); }
  },

  // PUT /api/clientes/:id
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nome, cpf, telefone, endereco } = req.body;
      const upd = await prisma.cliente.update({ where: { id }, data: { nome, cpf, telefone, endereco } });
      res.json(upd);
    } catch (e) { next(e); }
  },

  // DELETE /api/clientes/:id
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.cliente.delete({ where: { id } });
      res.status(204).send();
    } catch (e) { next(e); }
  },
};
