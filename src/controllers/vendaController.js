const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // POST /api/vendas
  async create(req,res,next){
    try {
      const { dataVenda, clienteId, itens, tipoPagamento,
              entrada, numParcelas, parcelasPagas, diaVencimento } = req.body;

      // 1) validações básicas...
      if(!dataVenda||!clienteId||!Array.isArray(itens)||!itens.length) {
        return res.status(400).json({ error:"Dados obrigatórios faltando" });
      }

      // 2) cálculo de valor total e itens
      let valorTotal = 0, detalhes = [];
      for(const it of itens){
        const prod = await prisma.mercadoria.findUnique({ where:{id:it.mercadoriaId} });
        if(!prod) return res.status(404).json({error:"Produto não encontrado"});
        valorTotal += prod.valorUnitario * it.quantidade;
        detalhes.push({
          mercadoriaId:it.mercadoriaId,
          quantidade:it.quantidade,
          precoUnitario:prod.valorUnitario,
          nomeMercadoria:prod.nome
        });
      }

      // 3) criar venda
      const venda = await prisma.venda.create({
        data:{
          criadoEm: new Date(dataVenda),
          clienteId,
          valorTotal,
          tipoPagamento,
          entrada: tipoPagamento==="PARCELADO"?entrada:null,
          numParcelas: tipoPagamento==="PARCELADO"?numParcelas:null,
          parcelasRestantes: tipoPagamento==="PARCELADO"?(numParcelas - parcelasPagas):null,
          produtoNome: detalhes[0].nomeMercadoria,
          itens:{ create: detalhes }
        }
      });

      // 4) gerar parcelas se for parcelado
      if(tipoPagamento==="PARCELADO"){
        const saldo = valorTotal - entrada;
        const valParc = Number((saldo/numParcelas).toFixed(2));
        const [ano0,mes0] = dataVenda.split("-").map(Number);
        let dataRef = new Date(ano0,mes0-1,1);

        const arr = [];
        for(let i=1;i<=numParcelas;i++){
          // mês i: acrescenta i
          const dt = new Date(dataRef.getFullYear(), dataRef.getMonth()+i, diaVencimento);
          arr.push({ vendaId:venda.id, numParcela:i, valorParcela:valParc, dataVencimento:dt, pago: i<=parcelasPagas });
        }
        await prisma.parcela.createMany({ data:arr });
      }

      return res.status(201).json(venda);
    } catch(e){ next(e); }
  },

  // PUT /api/vendas/:id
  async update(req,res,next){
    try {
      const id = Number(req.params.id);
      const { dataVenda, clienteId, tipoPagamento,
              entrada, numParcelas, parcelasPagas, diaVencimento } = req.body;

      // 1) atualiza campos principais
      await prisma.venda.update({
        where:{ id },
        data:{
          criadoEm: dataVenda?new Date(dataVenda):undefined,
          clienteId,
          tipoPagamento,
          entrada: tipoPagamento==="PARCELADO"?entrada:null,
          numParcelas: tipoPagamento==="PARCELADO"?numParcelas:null,
          parcelasRestantes: tipoPagamento==="PARCELADO"? (numParcelas - parcelasPagas):undefined
        }
      });

      // 2) opcional: re-gerar parcelas? (dependendo do seu fluxo)

      return res.json({ message:"Atualizado" });
    } catch(e){ next(e); }
  },

  // demais métodos (findAll, findById, delete) continuam iguais...
};
