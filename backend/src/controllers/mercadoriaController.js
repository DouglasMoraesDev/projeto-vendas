// src/controllers/mercadoriaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

module.exports = {
  async findAll(req, res, next) {
    try {
      const list = await prisma.mercadoria.findMany({ include: { fotos: true } });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },

  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const item = await prisma.mercadoria.findUnique({
        where: { id },
        include: { fotos: true },
      });
      if (!item) return res.status(404).json({ error: 'Não encontrada' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { nome, valorUnitario, quantidadeEstoque, descricao } = req.body;
      // cria registro base
      const nova = await prisma.mercadoria.create({
        data: {
          nome,
          valorUnitario: parseFloat(valorUnitario),
          quantidadeEstoque: parseInt(quantidadeEstoque),
          descricao,
        },
      });
      // prepara pasta destino
      const dest = path.join(__dirname, '../../uploads/produtos', String(nova.id));
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

      // processa cada arquivo
      const fotosData = [];
      (req.files || []).slice(0, 5).forEach(file => {
        const destPath = path.join(dest, file.filename);
        fs.renameSync(file.path, destPath);
        fotosData.push({ mercadoriaId: nova.id, path: `/uploads/produtos/${nova.id}/${file.filename}` });
      });
      if (fotosData.length) {
        await prisma.foto.createMany({ data: fotosData });
      }

      // retorna registro completo
      const completa = await prisma.mercadoria.findUnique({
        where: { id: nova.id },
        include: { fotos: true },
      });
      res.status(201).json(completa);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nome, valorUnitario, quantidadeEstoque, descricao } = req.body;
      const updated = await prisma.mercadoria.update({
        where: { id },
        data: {
          nome,
          valorUnitario: parseFloat(valorUnitario),
          quantidadeEstoque: parseInt(quantidadeEstoque),
          descricao,
        },
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      const dir = path.join(__dirname, '../../uploads/produtos', String(id));
      if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
      await prisma.foto.deleteMany({ where: { mercadoriaId: id } });
      await prisma.mercadoria.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
