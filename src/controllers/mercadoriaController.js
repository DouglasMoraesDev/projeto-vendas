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

  // POST /api/mercadorias (upload.array('fotos', 5))
  async create(req, res, next) {
    try {
      // 1. Cria o registro inicial
      const { nome, descricao, valorUnitario, quantidadeEstoque } = req.body;
      const nova = await prisma.mercadoria.create({
        data: {
          nome,
          descricao,
          valorUnitario: parseFloat(valorUnitario),
          quantidadeEstoque: parseInt(quantidadeEstoque, 10)
        }
      });

      // 2. Garante array mesmo que undefined
      const arquivos = Array.isArray(req.files) ? req.files : [];

      // 3. Prepara pasta destino
      const dest = path.join(__dirname, '../../uploads/produtos', String(nova.id));
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      // 4. Move e coleta metadados
      const fotosData = [];
      arquivos.slice(0, 5).forEach(file => {
        const ext = path.extname(file.originalname);
        const filename = file.filename + ext;
        const finalPath = path.join(dest, filename);
        fs.renameSync(file.path, finalPath);
        fotosData.push({
          mercadoriaId: nova.id,
          caminho: `/uploads/produtos/${nova.id}/${filename}`
        });
      });

      // 5. Persiste no banco
      if (fotosData.length) {
        await prisma.foto.createMany({ data: fotosData });
      }

      // 6. Retorna o registro completo
      const completa = await prisma.mercadoria.findUnique({
        where: { id: nova.id },
        include: { fotos: true }
      });
      res.status(201).json(completa);

    } catch (e) {
      next(e);
    }
  },

  // PUT /api/mercadorias/:id (upload.array('fotos', 5))
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { nome, descricao, valorUnitario, quantidadeEstoque } = req.body;

      // 1. Atualiza campos básicos
      const updated = await prisma.mercadoria.update({
        where: { id },
        data: {
          nome,
          descricao,
          valorUnitario: parseFloat(valorUnitario),
          quantidadeEstoque: parseInt(quantidadeEstoque, 10)
        }
      });

      // 2. Processa novos arquivos, se houver
      const arquivos = Array.isArray(req.files) ? req.files : [];
      if (arquivos.length > 0) {
        const dest = path.join(__dirname, '../../uploads/produtos', String(id));
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }

        for (const file of arquivos.slice(0, 5)) {
          const ext = path.extname(file.originalname);
          const filename = file.filename + ext;
          const finalPath = path.join(dest, filename);
          fs.renameSync(file.path, finalPath);
          await prisma.foto.create({
            data: {
              mercadoriaId: id,
              caminho: `/uploads/produtos/${id}/${filename}`
            }
          });
        }
      }

      res.json(updated);

    } catch (e) {
      next(e);
    }
  },

  // DELETE /api/mercadorias/:id
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);

      // 1. Apaga pasta de fotos
      const dir = path.join(__dirname, '../../uploads/produtos', String(id));
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }

      // 2. Apaga registros no banco
      await prisma.foto.deleteMany({ where: { mercadoriaId: id } });
      await prisma.mercadoria.delete({ where: { id } });

      res.status(204).send();

    } catch (e) {
      next(e);
    }
  }
};
