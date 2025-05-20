// src/controllers/mercadoriaController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

module.exports = {
  // GET /api/mercadorias
  async findAll(req, res, next) {
    try {
      const list = await prisma.mercadoria.findMany({
        include: { fotos: true }
      });
      res.json(list);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/mercadorias/:id
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const item = await prisma.mercadoria.findUnique({
        where: { id },
        include: { fotos: true }
      });
      if (!item) {
        return res.status(404).json({ error: 'Mercadoria não encontrada' });
      }
      res.json(item);
    } catch (e) {
      next(e);
    }
  },

  // POST /api/mercadorias (com upload.array('fotos', 5))
  async create(req, res, next) {
    try {
      const { nome, descricao, valorUnitario, quantidadeEstoque } = req.body;
      const nova = await prisma.mercadoria.create({
        data: {
          nome,
          descricao,
          valorUnitario: parseFloat(valorUnitario),
          quantidadeEstoque: parseInt(quantidadeEstoque, 10)
        }
      });

      // Cria pasta para fotos
      const dest = path.join(__dirname, '../../uploads/produtos', String(nova.id));
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      // Move cada arquivo e registra no banco
      const fotosData = [];
      (req.files || []).slice(0, 5).forEach(file => {
        const ext = path.extname(file.originalname);
        const filename = file.filename + ext;
        const fullPath = path.join(dest, filename);
        fs.renameSync(file.path, fullPath);
        fotosData.push({
          mercadoriaId: nova.id,
          caminho: `/uploads/produtos/${nova.id}/${filename}`
        });
      });

      if (fotosData.length) {
        await prisma.foto.createMany({ data: fotosData });
      }

      const completa = await prisma.mercadoria.findUnique({
        where: { id: nova.id },
        include: { fotos: true }
      });
      res.status(201).json(completa);
    } catch (e) {
      next(e);
    }
  },

  // PUT /api/mercadorias/:id (aceita upload.array('fotos', 5))
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nome, descricao, valorUnitario, quantidadeEstoque } = req.body;

      // Atualiza campos básicos
      const updated = await prisma.mercadoria.update({
        where: { id },
        data: {
          nome,
          descricao,
          valorUnitario: parseFloat(valorUnitario),
          quantidadeEstoque: parseInt(quantidadeEstoque, 10)
        }
      });

      // Se vierem arquivos novos, grava-os
      if (req.files && req.files.length > 0) {
        const dest = path.join(__dirname, '../../uploads/produtos', String(id));
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }

        const fotosData = [];
        req.files.slice(0, 5).forEach(file => {
          const ext = path.extname(file.originalname);
          const filename = file.filename + ext;
          const fullPath = path.join(dest, filename);
          fs.renameSync(file.path, fullPath);
          fotosData.push({
            mercadoriaId: id,
            caminho: `/uploads/produtos/${id}/${filename}`
          });
        });

        if (fotosData.length) {
          await prisma.foto.createMany({ data: fotosData });
        }
      }

      res.json(updated);
    } catch (e) {
      next(e);
    }
  },

  // DELETE /api/mercadorias/:id (remove fotos e registro)
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      const dir = path.join(__dirname, '../../uploads/produtos', String(id));
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
      await prisma.foto.deleteMany({ where: { mercadoriaId: id } });
      await prisma.mercadoria.delete({ where: { id } });
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
};
