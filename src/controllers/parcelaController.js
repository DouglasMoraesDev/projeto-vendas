// Listar e pagar parcelas
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

module.exports = {
  // GET /api/parcelas/pending
  async findPending(req, res, next) {
    try {
      const pend = await prisma.parcela.findMany({
        where: { pago: false },
        include: { venda: { include: { cliente: true } } }
      });
      res.json(pend);
    } catch (e) { next(e); }
  },

  // GET /api/parcelas?clienteId=#
  async findByCliente(req, res, next) {
    try {
      const clienteId = Number(req.query.clienteId);
      const list = await prisma.parcela.findMany({
        where: { venda: { clienteId } },
        include: { comprovante: true }
      });
      res.json(list);
    } catch (e) { next(e); }
  },

  // POST /api/parcelas/:id/pay (com multer.single('comprovante'))
  async pay(req, res, next) {
    try {
      const id = Number(req.params.id);
      const parcela = await prisma.parcela.findUnique({
        where: { id },
        include: { venda: { include: { cliente: true } } }
      });
      if (!parcela) return res.status(404).json({ error: 'Parcela não existe' });
      if (parcela.pago) return res.status(400).json({ error: 'Parcela já paga' });

      // Grava arquivo
      const file = req.file;
      const destDir = path.join(__dirname, '../../uploads/comprovantes', String(id));
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      const ext = path.extname(file.originalname);
      const filename = file.filename + ext;
      fs.renameSync(file.path, path.join(destDir, filename));
      const caminho = `/uploads/comprovantes/${id}/${filename}`;

      // Atualiza parcela e criação de comprovante
      await prisma.parcela.update({
        where: { id },
        data: {
          pago: true,
          dataPagamento: new Date(),
          comprovante: {
            create: {
              caminho,
              recebidoPor: req.body.recebidoPor || 'Operador'
            }
          }
        }
      });

      res.json({ message: 'Pagamento registrado' });
    } catch (e) { next(e); }
  },
};
