// src/controllers/comprovanteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const gerarPdfRecibo = require('../utils/pdfGenerator');
const path = require('path');

module.exports = {
  // GET /api/comprovantes?clienteId=#
  async findByCliente(req, res, next) {
    try {
      const clienteId = Number(req.query.clienteId);
      const vendas = await prisma.venda.findMany({
        where: { clienteId },
        include: {
          parcelas: {
            include: { comprovante: true }
          }
        }
      });
      const comps = vendas.flatMap(v =>
        v.parcelas
         .filter(p => p.comprovante)
         .map(p => p.comprovante)
      );
      return res.json(comps);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/comprovantes/:parcelaId/pdf  ← agora pública
  async pdfByParcela(req, res, next) {
    try {
      const parcelaId = Number(req.params.parcelaId);
      const parcela = await prisma.parcela.findUnique({
        where: { id: parcelaId },
        include: { venda: { include: { cliente: true } }, comprovante: true }
      });
      if (!parcela || !parcela.comprovante) {
        return res.status(404).json({ error: 'Comprovante não encontrado' });
      }

      // Gera Buffer do PDF com as informações de parcela + cliente
      const pdfBuf = await gerarPdfRecibo({
        clienteNome: parcela.venda.cliente.nome,
        parcelaNum: parcela.numParcela,
        valor: parcela.valorParcela,
        dataPagamento: parcela.dataPagamento,
        recebidoPor: parcela.comprovante.recebidoPor
      });

      // Retorna o PDF
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=recibo_parcela_${parcelaId}.pdf`
      });
      return res.send(pdfBuf);
    } catch (e) {
      next(e);
    }
  }
};
