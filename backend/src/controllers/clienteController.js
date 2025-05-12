// src/controllers/clienteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Listar todos os clientes
  async findAll(req, res, next) {
    try {
      const clientes = await prisma.cliente.findMany();
      res.json(clientes);
    } catch (err) {
      next(err);
    }
  },

  // Buscar um cliente por ID
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.findUnique({ where: { id: Number(id) } });
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      res.json(cliente);
    } catch (err) {
      next(err);
    }
  },

  // Criar novo cliente
  async create(req, res, next) {
    try {
      const { nome, telefone, cpf, endereco } = req.body;
      const novo = await prisma.cliente.create({
        data: { nome, telefone, cpf, endereco }
      });
      res.status(201).json(novo);
    } catch (err) {
      next(err);
    }
  },

  // Atualizar cliente
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nome, telefone, cpf, endereco } = req.body;
      const atualizado = await prisma.cliente.update({
        where: { id: Number(id) },
        data: { nome, telefone, cpf, endereco }
      });
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  // Deletar cliente
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await prisma.cliente.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
