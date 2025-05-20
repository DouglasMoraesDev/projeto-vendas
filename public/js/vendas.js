// public/js/vendas.js

import {
  getClientes,
  getProdutos,
  criarVenda,
  atualizarVenda,
  getVendaById
} from "./api.js";

const formVenda       = document.getElementById("formVenda");
const selectCliente   = document.getElementById("selectCliente");
const selectProduto   = document.getElementById("selectProduto");
const valorUnit       = document.getElementById("valorUnitario");
const tipoVendaRadios = document.querySelectorAll("input[name='tipoVenda']");
const dadosParcel     = document.getElementById("dadosParcelamento");
const infoParcelaP    = document.getElementById("infoParcela");
const erroVenda       = document.getElementById("erroVenda");
const dataVendaInput  = document.getElementById("dataVenda");
const entradaInput    = document.getElementById("entrada");
const quantParcInput  = document.getElementById("quantParcelas");
const parcPagasInput  = document.getElementById("parcelasPagas");
const diaVencInput    = document.getElementById("diaVencimento");
const tituloVenda     = document.getElementById("tituloVenda");
const botaoSubmit     = document.getElementById("btnSubmitVenda");

let clientes = [], produtos = [];
let modoEdicao = false, vendaId = null;

// utilitários para converter moeda “pt-BR” ↔ número
function parseMoeda(str) {
  return parseFloat(str.replace(/\./g, "").replace(",", ".")) || 0;
}
function fmtMoeda(v) {
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
}

async function init() {
  // 0) redirecionar se não estiver autenticado
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }

  // 1) Buscar clientes e produtos para popular os <select>
  clientes = await getClientes();
  produtos = await getProdutos();
  clientes.forEach(c => {
    const o = new Option(c.nome, c.id);
    selectCliente.add(o);
  });
  produtos.forEach(p => {
    const o = new Option(p.nome, p.id);
    selectProduto.add(o);
  });

  // 2) Checar modo edição (a URL é ?edit=<id>)
  const params = new URLSearchParams(location.search);
  if (params.has("edit")) {
    modoEdicao = true;
    vendaId = params.get("edit");
    tituloVenda.textContent = `Editar Venda #${vendaId}`;
    botaoSubmit.textContent = "Atualizar Venda";

    // 2.1) Buscar a venda para pré‐preencher
    try {
      const v = await getVendaById(vendaId);
      // dataVenda vem como “YYYY-MM-DDTHH:mm:ss.sssZ”; converter para “YYYY-MM-DD”
      dataVendaInput.value = v.criadoEm.split("T")[0];

      // preencher cliente e produto
      selectCliente.value = v.clienteId;
      // Quando mudamos selectProduto, programaticamente disparamos onchange para preencher valorUnit
      selectProduto.value = v.itens[0].mercadoriaId;
      // Forçar disparar onchange:
      const event = new Event("change");
      selectProduto.dispatchEvent(event);

      // tipo de venda
      if (v.tipoPagamento === "PARCELADO") {
        document.querySelector("input[name='tipoVenda'][value='PARCELADO']").checked = true;
        dadosParcel.style.display = "block";
        entradaInput.value = v.entrada?.toFixed(2).replace(".", ",") || "";
        quantParcInput.value = v.numParcelas || "";
        parcPagasInput.value = v.parcelasRestantes != null 
                           ? (v.numParcelas - v.parcelasRestantes) 
                           : 0;
        diaVencInput.value = new Date(v.parcelas[0].dataVencimento).getDate(); 
        // calcula infoParcela
        calcularParcela();
      } else {
        document.querySelector("input[name='tipoVenda'][value='AVISTA']").checked = true;
        dadosParcel.style.display = "none";
        infoParcelaP.textContent = "";
      }
    } catch (err) {
      erroVenda.textContent = "Não foi possível carregar os dados da venda.";
      erroVenda.classList.add("visivel");
    }
  }

  // 3) Listeners

  // Quando muda produto, atualiza valorUnit
  selectProduto.addEventListener("change", () => {
    const sel = produtos.find(x => x.id == selectProduto.value);
    valorUnit.value = sel ? fmtMoeda(sel.valorUnitario) : "";
    calcularParcela();
  });

  // Quando muda tipo de venda, mostra/oculta dados de parcelamento
  tipoVendaRadios.forEach(r => {
    r.addEventListener("change", () => {
      if (r.value === "PARCELADO" && r.checked) {
        dadosParcel.style.display = "block";
      } else {
        dadosParcel.style.display = "none";
        infoParcelaP.textContent = "";
      }
      calcularParcela();
    });
  });

  // Se qualquer campo dentro do form alterar, recalcula o valor da parcela
  formVenda.addEventListener("input", calcularParcela);

  // Por fim, submete o form
  formVenda.addEventListener("submit", submitForm);
}
window.addEventListener("DOMContentLoaded", init);

// 4) calcular valor de cada parcela
function calcularParcela() {
  const tipo = document.querySelector("input[name='tipoVenda']:checked")?.value;
  if (tipo !== "PARCELADO") {
    infoParcelaP.textContent = "";
    return;
  }
  const vUni = parseMoeda(valorUnit.value);
  const entrada = parseMoeda(entradaInput.value);
  const total = parseInt(quantParcInput.value) || 0;
  const pagas = parseInt(parcPagasInput.value) || 0;
  if (!vUni || !total) {
    infoParcelaP.textContent = "";
    return;
  }
  const saldo = vUni - entrada;
  const valParc = saldo / total;
  infoParcelaP.textContent = `Valor de cada parcela: ${fmtMoeda(valParc)}`;
}

// 5) no submit, criar ou atualizar
async function submitForm(e) {
  e.preventDefault();
  erroVenda.textContent = "";
  erroVenda.classList.remove("visivel");

  const dataVenda = dataVendaInput.value;
  const cliId = Number(selectCliente.value);
  const prodId = Number(selectProduto.value);
  const tipo = document.querySelector("input[name='tipoVenda']:checked").value;

  if (!dataVenda || !cliId || !prodId) {
    erroVenda.textContent = "Data, cliente e produto são obrigatórios.";
    erroVenda.classList.add("visivel");
    return;
  }

  // Montar payload básico
  const payload = {
    dataVenda,
    clienteId: cliId,
    itens: [{ mercadoriaId: prodId, quantidade: 1 }],
    tipoPagamento: tipo
  };

  // Se for parcelado, coleta campos de parcelamento
  if (tipo === "PARCELADO") {
    const entrada  = parseMoeda(entradaInput.value);
    const totalParc = parseInt(quantParcInput.value) || 0;
    const pagas   = parseInt(parcPagasInput.value) || 0;
    const dia     = parseInt(diaVencInput.value) || 0;

    if (totalParc < 1 || dia < 1 || dia > 28) {
      erroVenda.textContent = "Preencha corretamente quant. parcelas e dia (1–28).";
      erroVenda.classList.add("visivel");
      return;
    }
    payload.entrada       = entrada;
    payload.numParcelas   = totalParc;
    payload.parcelasPagas = pagas;
    payload.diaVencimento = dia;
  }

  try {
    if (modoEdicao) {
      await atualizarVenda(vendaId, payload);
      alert("Venda atualizada!");
    } else {
      await criarVenda(payload);
      alert("Venda registrada!");
    }
    window.location.href = "historico.html";
  } catch (err) {
    erroVenda.textContent = err.message;
    erroVenda.classList.add("visivel");
  }
}
