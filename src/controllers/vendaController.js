// src/controllers/vendaController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // POST /api/vendas
  async create(req, res, next) {
    try {
      const {
        dataVenda,
        clienteId,
        itens,
        tipoPagamento,
        entrada,
        numParcelas,
        parcelasPagas = 0,
        diaVencimento
      } = req.body;

      // 1) validações básicas
      if (!dataVenda || !clienteId || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: "Dados obrigatórios faltando" });
      }

      // 2) cálculo de valor total e preparação de itens
      let valorTotal = 0;
      const detalhes = [];

      for (const it of itens) {
        const prod = await prisma.mercadoria.findUnique({
          where: { id: it.mercadoriaId }
        });
        if (!prod) {
          return res.status(404).json({ error: `Produto ${it.mercadoriaId} não encontrado` });
        }
        valorTotal += prod.valorUnitario * it.quantidade;
        detalhes.push({
          mercadoriaId: it.mercadoriaId,
          quantidade: it.quantidade,
          precoUnitario: prod.valorUnitario,
          nomeMercadoria: prod.nome
        });
      }

      // 3) cria a venda
      const venda = await prisma.venda.create({
        data: {
          criadoEm: new Date(dataVenda),
          clienteId,
          valorTotal,
          tipoPagamento: tipoPagamento.toUpperCase(),
          entrada: tipoPagamento === "PARCELADO" ? entrada : null,
          numParcelas: tipoPagamento === "PARCELADO" ? numParcelas : null,
          parcelasRestantes:
            tipoPagamento === "PARCELADO" ? numParcelas - parcelasPagas : null,
          produtoNome: detalhes[0]?.nomeMercadoria || null,
          itens: { create: detalhes }
        }
      });

      // 4) decrementa estoque
      for (const it of itens) {
        await prisma.mercadoria.update({
          where: { id: it.mercadoriaId },
          data: { quantidadeEstoque: { decrement: it.quantidade } }
        });
      }

      // 5) gera parcelas se PARCELADO
      if (tipoPagamento === "PARCELADO") {
        const saldo = valorTotal - entrada;
        const valorParcela = parseFloat((saldo / numParcelas).toFixed(2));
        const [ano0, mes0] = dataVenda.split("-").map(Number);
        const referencia = new Date(ano0, mes0 - 1, 1);
        const parcelasData = [];

        for (let i = 1; i <= numParcelas; i++) {
          const venc = new Date(
            referencia.getFullYear(),
            referencia.getMonth() + i,
            diaVencimento
          );
          parcelasData.push({
            vendaId: venda.id,
            numParcela: i,
            valorParcela,
            dataVencimento: venc,
            pago: i <= parcelasPagas
          });
        }
        await prisma.parcela.createMany({ data: parcelasData });
      }

      return res.status(201).json(venda);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/vendas
  async findAll(req, res, next) {
    try {
      const list = await prisma.venda.findMany({
        include: {
          cliente: true,
          itens: true,
          parcelas: true
        },
        orderBy: { criadoEm: "desc" }
      });
      res.json(list);
    } catch (e) {
      next(e);
    }
  },

  // GET /api/vendas/:id
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const venda = await prisma.venda.findUnique({
        where: { id },
        include: { cliente: true, itens: true, parcelas: true }
      });
      if (!venda) return res.status(404).json({ error: "Venda não encontrada" });
      res.json(venda);
    } catch (e) {
      next(e);
    }
  },

  // PUT /api/vendas/:id
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const {
        dataVenda,
        clienteId,
        tipoPagamento,
        entrada,
        numParcelas,
        parcelasPagas = 0,
        diaVencimento
      } = req.body;

      // 1) atualiza campos principais
      await prisma.venda.update({
        where: { id },
        data: {
          criadoEm: dataVenda ? new Date(dataVenda) : undefined,
          clienteId,
          tipoPagamento: tipoPagamento.toUpperCase(),
          entrada: tipoPagamento === "PARCELADO" ? entrada : null,
          numParcelas: tipoPagamento === "PARCELADO" ? numParcelas : null,
          parcelasRestantes:
            tipoPagamento === "PARCELADO" ? numParcelas - parcelasPagas : undefined
        }
      });

      // 2) (Opcional) aqui você poderia reprovisionar as parcelas, se quiser...

      res.json({ message: "Venda atualizada com sucesso" });
    } catch (e) {
      next(e);
    }
  },

  // DELETE /api/vendas/:id
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);

      // exclui comprovantes, parcelas, itens e por fim a venda
      await prisma.comprovante.deleteMany({ where: { parcela: { vendaId: id } } });
      await prisma.parcela.deleteMany({ where: { vendaId: id } });
      await prisma.itemVenda.deleteMany({ where: { vendaId: id } });
      await prisma.venda.delete({ where: { id } });

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
};
