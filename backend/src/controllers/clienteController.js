// src/controllers/clienteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async findAll(req, res, next) {
    try {
      const list = await prisma.cliente.findMany();
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const item = await prisma.cliente.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: 'Cliente não encontrado' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { nome, telefone, cpf, endereco } = req.body;
      const nova = await prisma.cliente.create({
        data: { nome, telefone, cpf, endereco },
      });
      res.status(201).json(nova);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nome, telefone, cpf, endereco } = req.body;
      const updated = await prisma.cliente.update({
        where: { id },
        data: { nome, telefone, cpf, endereco },
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await prisma.cliente.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
