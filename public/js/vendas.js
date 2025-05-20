import { getClientes, getProdutos, criarVenda, atualizarVenda } from "./api.js";

const formVenda       = document.getElementById("formVenda");
const selectCliente   = document.getElementById("selectCliente");
const selectProduto   = document.getElementById("selectProduto");
const valorUnit       = document.getElementById("valorUnitario");
const tipoVendaRadios = document.querySelectorAll("input[name='tipoVenda']");
const dadosParcel     = document.getElementById("dadosParcelamento");
const infoParcelaP    = document.getElementById("infoParcela");
const erroVenda       = document.getElementById("erroVenda");
const dataVendaInput  = document.getElementById("dataVenda");

let clientes = [], produtos = [];
let modoEdicao = false, vendaId = null;

// utilitários
function parseMoeda(str) {
  return parseFloat(str.replace(/\./g,'').replace(',','.')||0);
}
function fmtMoeda(v) {
  return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v);
}

// load inicial
async function init(){
  if(!localStorage.getItem("token")) return window.location.href="index.html";
  clientes = await getClientes();
  produtos = await getProdutos();
  clientes.forEach(c=>{
    const o = new Option(c.nome, c.id);
    selectCliente.add(o);
  });
  produtos.forEach(p=>{
    const o = new Option(p.nome, p.id);
    selectProduto.add(o);
  });

  // checar modo edição
  const p = new URLSearchParams(location.search);
  if(p.has("edit")){
    modoEdicao = true;
    vendaId = p.get("edit");
    document.getElementById("tituloVenda").textContent = `Editar Venda #${vendaId}`;
    document.getElementById("btnSubmitVenda").textContent = "Atualizar Venda";
    // TODO: fetch detalhes da venda e pré-preencher campos...
  }

  // listeners
  selectProduto.onchange = ()=>{
    const sel = produtos.find(x=>x.id==selectProduto.value);
    valorUnit.value = sel ? fmtMoeda(sel.valorUnitario) : "";
    calcularParcela();
  };
  tipoVendaRadios.forEach(r=>{
    r.onchange = ()=>{
      if(r.value==="PARCELADO" && r.checked) dadosParcel.style.display="block";
      else {
        dadosParcel.style.display="none";
        infoParcelaP.textContent="";
      }
      calcularParcela();
    };
  });
  formVenda.oninput = calcularParcela;
  formVenda.onsubmit = submitForm;
}
window.addEventListener("DOMContentLoaded", init);

// cálculo de valor da parcela único
function calcularParcela(){
  const tipo = document.querySelector("input[name='tipoVenda']:checked")?.value;
  if(tipo!=="PARCELADO") return infoParcelaP.textContent="";
  const vUni = parseMoeda(valorUnit.value);
  const entrada = parseMoeda(document.getElementById("entrada").value);
  const total = parseInt(document.getElementById("quantParcelas").value)||0;
  const paid  = parseInt(document.getElementById("parcelasPagas").value)||0;
  if(!vUni||!total) return infoParcelaP.textContent="";
  const saldo = vUni - entrada;
  const valParc = saldo/total;
  infoParcelaP.textContent = `Valor de cada parcela: ${fmtMoeda(valParc)}`;
}

// submit
async function submitForm(e){
  e.preventDefault();
  erroVenda.textContent=""; erroVenda.classList.remove("visivel");

  const dataVenda = dataVendaInput.value;
  const cliId     = Number(selectCliente.value);
  const prodId    = Number(selectProduto.value);
  const tipo      = document.querySelector("input[name='tipoVenda']:checked").value;

  if(!dataVenda||!cliId||!prodId){
    erroVenda.textContent="Data, cliente e produto são obrigatórios.";
    erroVenda.classList.add("visivel");
    return;
  }

  const payload = {
    dataVenda, clienteId:cliId,
    itens: [{ mercadoriaId: prodId, quantidade:1 }],
    tipoPagamento: tipo
  };

  if(tipo==="PARCELADO"){
    const entrada   = parseMoeda(document.getElementById("entrada").value);
    const totalParc = parseInt(document.getElementById("quantParcelas").value)||0;
    const pagas     = parseInt(document.getElementById("parcelasPagas").value)||0;
    const dia       = parseInt(document.getElementById("diaVencimento").value)||0;

    if(totalParc<1||dia<1||dia>28){
      erroVenda.textContent="Preencha corretamente quant. parcelas e dia (1–28).";
      erroVenda.classList.add("visivel");
      return;
    }
    payload.entrada      = entrada;
    payload.numParcelas  = totalParc;
    payload.parcelasPagas= pagas;
    payload.diaVencimento= dia;
  }

  try {
    if(modoEdicao){
      await atualizarVenda(vendaId, payload);
      alert("Venda atualizada!");
    } else {
      await criarVenda(payload);
      alert("Venda registrada!");
    }
    location.href="historico.html";
  } catch(err){
    erroVenda.textContent=err.message;
    erroVenda.classList.add("visivel");
  }
}
