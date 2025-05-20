// src/controllers/vendaController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // POST /api/vendas
  async create(req, res, next) {
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

    // 1) Validações básicas
    if (!dataVenda || !clienteId || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: "Dados obrigatórios faltando" });
    }

    try {
      // 2) Abrimos uma transação para ler/atualizar estoque e criar venda de forma atômica
      const venda = await prisma.$transaction(async (prismaTx) => {
        // 2.1) Validar estoque para cada item
        for (const it of itens) {
          const prod = await prismaTx.mercadoria.findUnique({
            where: { id: it.mercadoriaId }
          });
          if (!prod) {
            throw { status: 404, message: `Produto ${it.mercadoriaId} não encontrado` };
          }

          // Se estoque está ≤ 0, já abortamos
          if (prod.quantidadeEstoque <= 0) {
            throw {
              status: 400,
              message: `Estoque zerado ou negativo para o produto "${prod.nome}". Disponível: ${prod.quantidadeEstoque}.`
            };
          }

          // Se estoque for menor que quantidade solicitada, aborta
          if (prod.quantidadeEstoque < it.quantidade) {
            throw {
              status: 400,
              message: `Estoque insuficiente para o produto "${prod.nome}". Disponível: ${prod.quantidadeEstoque}, solicitado: ${it.quantidade}.`
            };
          }
        }

        // 2.2) Calcular valor total e montar detalhes (sem ainda criar nada no banco)
        let valorTotal = 0;
        const detalhes = [];
        for (const it of itens) {
          // Note: aqui podemos ler novamente ou usar os dados anteriores, mas para simplicidade vamos buscar de novo
          const prod = await prismaTx.mercadoria.findUnique({
            where: { id: it.mercadoriaId }
          });
          valorTotal += prod.valorUnitario * it.quantidade;
          detalhes.push({
            mercadoriaId: it.mercadoriaId,
            quantidade: it.quantidade,
            precoUnitario: prod.valorUnitario,
            nomeMercadoria: prod.nome
          });
        }

        // 2.3) Criar a venda (sem as parcelas ainda, somente venda + itens)
        const novaVenda = await prismaTx.venda.create({
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

        // 2.4) Decrementar o estoque de cada mercadoria
        for (const it of itens) {
          await prismaTx.mercadoria.update({
            where: { id: it.mercadoriaId },
            data: { quantidadeEstoque: { decrement: it.quantidade } }
          });
        }

        // 2.5) Se for parcelado, criar as parcelas
        if (tipoPagamento === "PARCELADO") {
          const saldo = valorTotal - entrada;
          const valorParcela = parseFloat((saldo / numParcelas).toFixed(2));
          const [ano0, mes0] = dataVenda.split("-").map(Number);
          const referencia = new Date(ano0, mes0 - 1, 1);
          const parcelasData = [];

          for (let i = 1; i <= numParcelas; i++) {
            const year = referencia.getFullYear();
            const monthIndex = referencia.getMonth() + i;
            // Gravamos no meio-dia local para evitar problemas de fuso
            const vencLocalMeioDia = new Date(year, monthIndex, diaVencimento, 12, 0, 0);

            parcelasData.push({
              vendaId: novaVenda.id,
              numParcela: i,
              valorParcela,
              dataVencimento: vencLocalMeioDia,
              pago: i <= parcelasPagas
            });
          }

          await prismaTx.parcela.createMany({
            data: parcelasData
          });
        }

        // Retorna a venda criada (com ID e sem necessidade de reconsultar)
        return novaVenda;
      }); // fim do prisma.$transaction

      // Se chegamos aqui sem exceção, a venda foi criada com sucesso
      return res.status(201).json(venda);
    } catch (error) {
      // Se jogamos um objeto com { status, message }, usamos esses valores
      if (error && error.status && error.message) {
        return res.status(error.status).json({ error: error.message });
      }
      // Qualquer outro erro cai aqui:
      return next(error);
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

      // Atualiza apenas os campos principais da venda
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

      // (Opcional: reprovisionar parcelas, mas não faremos aqui)
      res.json({ message: "Venda atualizada com sucesso" });
    } catch (e) {
      next(e);
    }
  },

  // DELETE /api/vendas/:id
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);

      // Exclui comprovantes, parcelas, itens e por fim a venda
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
