// src/controllers/mercadoriaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

module.exports = {
  // Listar todas as mercadorias
  async findAll(req, res, next) {
    try {
      const mercadorias = await prisma.mercadoria.findMany({
        include: { fotos: true },
      });
      res.json(mercadorias);
    } catch (err) {
      next(err);
    }
  },

  // Buscar mercadoria por ID
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const mercadoria = await prisma.mercadoria.findUnique({
        where: { id: Number(id) },
        include: { fotos: true },
      });
      if (!mercadoria) return res.status(404).json({ error: 'Não encontrada' });
      res.json(mercadoria);
    } catch (err) {
      next(err);
    }
  },

  // Criar nova mercadoria (com até 5 fotos)
  async create(req, res, next) {
    try {
      const { nome, valorUnitario, quantidadeEstoque, descricao } = req.body;
      // Cria registro da mercadoria
      const nova = await prisma.mercadoria.create({
        data: { nome, valorUnitario: parseFloat(valorUnitario), quantidadeEstoque: parseInt(quantidadeEstoque), descricao },
      });
      // Processa uploads de fotos
      const fotosData = (req.files || []).slice(0, 5).map(file => ({
        mercadoriaId: nova.id,
        path: `/uploads/produtos/${nova.id}/${file.filename}`
      }));
      // Criar pasta de destino e mover arquivos
      const destDir = path.join(__dirname, '../../uploads/produtos', String(nova.id));
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      (req.files || []).slice(0,5).forEach(file => {
        fs.renameSync(
          path.join(__dirname, '../uploads/temp', file.filename),
          path.join(destDir, file.filename)
        );
      });
      // Grava registros de foto no DB
      if (fotosData.length) {
        await prisma.foto.createMany({ data: fotosData });
      }
      // Retorna mercadoria completa com fotos
      const completa = await prisma.mercadoria.findUnique({
        where: { id: nova.id },
        include: { fotos: true },
      });
      res.status(201).json(completa);
    } catch (err) {
      next(err);
    }
  },

  // Atualizar mercadoria (sem remover fotos antigas)
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { nome, valorUnitario, quantidadeEstoque, descricao } = req.body;
      const atualizado = await prisma.mercadoria.update({
        where: { id: Number(id) },
        data: { nome, valorUnitario: parseFloat(valorUnitario), quantidadeEstoque: parseInt(quantidadeEstoque), descricao },
      });
      res.json(atualizado);
    } catch (err) {
      next(err);
    }
  },

  // Deletar mercadoria e suas fotos
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      // Remove arquivos da pasta
      const dir = path.join(__dirname, '../../uploads/produtos', String(id));
      if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
      // Remove registros de fotos e da mercadoria
      await prisma.foto.deleteMany({ where: { mercadoriaId: Number(id) } });
      await prisma.mercadoria.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
