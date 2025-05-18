// src/controllers/vendaController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // ----------------------------
  // POST /api/vendas
  // Cria nova venda, grava itens com nomeMercadoria e gera parcelas se for parcelado
  // ----------------------------
  async create(req, res, next) {
    try {
      const { clienteId, itens, tipoPagamento, entrada, numParcelas } = req.body;
      // itens = [ { mercadoriaId, quantidade }, ... ]
      if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ error: 'Itens da venda são obrigatórios' });
      }

      // 1) Valida estoque, calcula valorTotal e monta itensComNome
      let valorTotal = 0;
      const itensComNome = [];

      for (const { mercadoriaId, quantidade } of itens) {
        const prod = await prisma.mercadoria.findUnique({
          where: { id: mercadoriaId }
        });
        if (!prod) {
          return res.status(404).json({ error: `Mercadoria ${mercadoriaId} não encontrada` });
        }
        if (prod.quantidadeEstoque < quantidade) {
          return res.status(400).json({ error: `Estoque insuficiente para ${prod.nome}` });
        }
        valorTotal += prod.valorUnitario * quantidade;

        // Inclui nomeMercadoria no item
        itensComNome.push({
          mercadoriaId,
          quantidade,
          precoUnitario: Number(prod.valorUnitario.toFixed(2)),
          nomeMercadoria: prod.nome
        });
      }

      // 2) Define produtoNome (usa o primeiro item)
      const produtoNomePrincipal = itensComNome.length > 0
        ? itensComNome[0].nomeMercadoria
        : null;

      // 3) Cria a Venda
      const venda = await prisma.venda.create({
        data: {
          clienteId: Number(clienteId),
          valorTotal,
          tipoPagamento: tipoPagamento.toUpperCase(),
          entrada: tipoPagamento === 'PARCELADO' ? parseFloat(entrada) : null,
          numParcelas: tipoPagamento === 'PARCELADO' ? Number(numParcelas) : null,
          parcelasRestantes: tipoPagamento === 'PARCELADO' ? Number(numParcelas) : null,
          produtoNome: produtoNomePrincipal,
          itens: {
            create: itensComNome
          }
        }
      });

      // 4) Decrementa estoque de cada mercadoria vendida
      for (const { mercadoriaId, quantidade } of itens) {
        await prisma.mercadoria.update({
          where: { id: mercadoriaId },
          data: { quantidadeEstoque: { decrement: quantidade } }
        });
      }

      // 5) Se parcelado, gera as parcelas
      if (tipoPagamento === 'PARCELADO') {
        const saldo = valorTotal - parseFloat(entrada);
        const valorParcela = parseFloat((saldo / Number(numParcelas)).toFixed(2));
        const hoje = new Date();
        const parcelasData = [];

        for (let i = 1; i <= Number(numParcelas); i++) {
          parcelasData.push({
            vendaId: venda.id,
            numParcela: i,
            valorParcela,
            dataVencimento: new Date(
              hoje.getFullYear(),
              hoje.getMonth() + i,
              hoje.getDate()
            )
          });
        }
        await prisma.parcela.createMany({ data: parcelasData });
      }

      // 6) Retorna a venda completa (com cliente, itens e parcelas)
      const completa = await prisma.venda.findUnique({
        where: { id: venda.id },
        include: {
          cliente: true,
          itens: {
            include: {
              mercadoria: { include: { fotos: true } }
            }
          },
          parcelas: true
        }
      });

      return res.status(201).json(completa);
    } catch (e) {
      next(e);
    }
  },

  // ----------------------------
  // GET /api/vendas
  // Lista todas as vendas (com cliente, itens e parcelas)
  // ----------------------------
  async findAll(req, res, next) {
    try {
      const list = await prisma.venda.findMany({
        include: {
          cliente: true,
          itens: {
            include: {
              mercadoria: { include: { fotos: true } }
            }
          },
          parcelas: true
        },
        orderBy: { criadoEm: 'desc' }
      });
      return res.json(list);
    } catch (e) {
      next(e);
    }
  },

  // ----------------------------
  // GET /api/vendas/:id
  // Busca uma venda pelo ID (com cliente, itens e parcelas)
  // ----------------------------
  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      const venda = await prisma.venda.findUnique({
        where: { id },
        include: {
          cliente: true,
          itens: {
            include: { mercadoria: { include: { fotos: true } } }
          },
          parcelas: true
        }
      });
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      return res.json(venda);
    } catch (e) {
      next(e);
    }
  },

  // ----------------------------
  // PUT /api/vendas/:id
  // Atualiza campos básicos de uma venda (clienteId, tipoPagamento, entrada, numParcelas)
  // ----------------------------
  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { clienteId, tipoPagamento, entrada, numParcelas } = req.body;

      const upd = await prisma.venda.update({
        where: { id },
        data: {
          clienteId: clienteId !== undefined ? Number(clienteId) : undefined,
          tipoPagamento: tipoPagamento ? tipoPagamento.toUpperCase() : undefined,
          entrada: entrada !== undefined ? parseFloat(entrada) : undefined,
          numParcelas: numParcelas !== undefined ? Number(numParcelas) : undefined,
          // Não alteramos itens nem recalculamos estoque aqui
        }
      });
      return res.json(upd);
    } catch (e) {
      next(e);
    }
  },

  // ----------------------------
  // DELETE /api/vendas/:id
  // Remove uma venda e todas as entidades dependentes (comprovantes, parcelas, itens)
  // ----------------------------
  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);

      // 1) Buscar todas as parcelas da venda
      const parcelas = await prisma.parcela.findMany({
        where: { vendaId: id }
      });

      // 2) Para cada parcela, excluir o comprovante associado (se existir)
      for (const p of parcelas) {
        await prisma.comprovante.deleteMany({
          where: { parcelaId: p.id }
        });
      }

      // 3) Excluir todas as parcelas da venda
      await prisma.parcela.deleteMany({
        where: { vendaId: id }
      });

      // 4) Excluir todos os itens de venda
      await prisma.itemVenda.deleteMany({
        where: { vendaId: id }
      });

      // 5) Finalmente, excluir a própria venda
      await prisma.venda.delete({ where: { id } });

      return res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
};
