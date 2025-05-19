// src/controllers/comprovanteController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

      // Para cada parcela que tenha comprovante, retornamos o caminho do arquivo
      const comps = vendas.flatMap(v =>
        v.parcelas
         .filter(p => p.comprovante)
         .map(p => ({
           parcelaId: p.id,
           vendaId: p.vendaId,
           caminho: p.comprovante.caminho,   // caminho para o arquivo enviado
           recebidoPor: p.comprovante.recebidoPor,
           criadoEm: p.comprovante.criadoEm
         }))
      );
      return res.json(comps);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/comprovantes/:parcelaId/pdf  (continua como rota para gerar recibo)
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

      // Gera Buffer do PDF de recibo com as informações
      const gerarPdfRecibo = require('../utils/pdfGenerator');
      const pdfBuf = await gerarPdfRecibo({
        clienteNome: parcela.venda.cliente.nome,
        parcelaNum: parcela.numParcela,
        valor: parcela.valorParcela,
        dataPagamento: parcela.dataPagamento,
        recebidoPor: parcela.comprovante.recebidoPor
      });

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
