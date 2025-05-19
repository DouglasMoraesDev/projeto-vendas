// public/js/vendas.js

import {
  getClientes,
  getProdutos,
  criarVenda,
  getVendaById,
  atualizarVenda
} from "./api.js";

const selectCliente = document.getElementById("selectCliente");
const selectProduto = document.getElementById("selectProduto");
const valorUnit = document.getElementById("valorUnitario");
const tipoPagamentoRadios = document.querySelectorAll("input[name='tipoPagamento']");
const divParcelamento = document.getElementById("dadosParcelamento");
const formVenda = document.getElementById("formVenda");
const erroVenda = document.getElementById("erroVenda");
const infoParcelas = document.getElementById("infoParcelas");
const tituloVenda = document.getElementById("tituloVenda");
const btnSubmitVenda = document.getElementById("btnSubmitVenda");

// NOVO: campo de dia de vencimento
const inputDiaVencimento = document.getElementById("diaVencimento");

let listaProdutosCache = [];
let listaClientesCache = [];
let modoEdicao = false;
let vendaEditId = null;

// Converte “1.234,56” → 1234.56
function parseMoedaBr(valorStr) {
  return parseFloat(valorStr.replace(/\./g, "").replace(",", ".")) || 0;
}

// Formata R$ 1.234,56
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Carrega selects de cliente e produto
async function carregarOpcoes() {
  listaClientesCache = await getClientes();
  listaProdutosCache = await getProdutos();
  listaClientesCache.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nome;
    selectCliente.appendChild(opt);
  });
  listaProdutosCache.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.nome;
    selectProduto.appendChild(opt);
  });
}

// Verifica se veio ?edit=<id> na URL para pré-preencher valores
async function verificarModoEdicao() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("edit")) {
    modoEdicao = true;
    vendaEditId = params.get("edit");
    tituloVenda.textContent = `Editar Venda #${vendaEditId}`;
    btnSubmitVenda.textContent = "Atualizar Venda";

    try {
      const v = await getVendaById(vendaEditId);

      // Preenche cliente
      selectCliente.value = v.clienteId;

      // Se houver itens, pega o primeiro
      const item = (v.itens && v.itens.length > 0) ? v.itens[0] : null;
      if (item) {
        selectProduto.value = item.mercadoriaId;
        valorUnit.value = formatarMoedaBr(item.precoUnitario);
      }

      // Preenche tipo de pagamento
      document.querySelector(`input[name="tipoPagamento"][value="${v.tipoPagamento}"]`).checked = true;

      if (v.tipoPagamento === "PARCELADO") {
        divParcelamento.style.display = "block";

        // Preenche entrada
        document.getElementById("entrada").value = v.entrada.toFixed(2).replace(".", ",");

        // Preenche número de parcelas
        document.getElementById("quantParcelas").value = v.numParcelas;

        // Preenche dia de vencimento: pega a dataVencimento da primeira parcela
        if (v.parcelas && v.parcelas.length > 0) {
          const primeira = new Date(v.parcelas[0].dataVencimento);
          inputDiaVencimento.value = primeira.getDate(); // dia do mês
        }

        // Força disparar o evento "input" para recalcular infoParcelas
        formVenda.dispatchEvent(new Event("input"));
      }
    } catch (err) {
      alert("Erro ao carregar venda: " + err.message);
      window.location.href = "historico.html";
    }
  }
}

// Ao mudar produto, atualiza valorUnitário
selectProduto?.addEventListener("change", () => {
  const id = selectProduto.value;
  if (!id) {
    valorUnit.value = "";
    return;
  }
  const produto = listaProdutosCache.find(item => item.id == id);
  if (produto) {
    valorUnit.value = formatarMoedaBr(produto.valorUnitario);
  }
});

// Mostrar/ocultar campos de parcelamento
tipoPagamentoRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.value === "PARCELADO" && radio.checked) {
      divParcelamento.style.display = "block";
    } else {
      divParcelamento.style.display = "none";
      infoParcelas.innerHTML = "";
    }
  });
});

// Recalcula valor e datas das parcelas conforme input (incluindo diaVencimento)
formVenda?.addEventListener("input", () => {
  const tipo = document.querySelector("input[name='tipoPagamento']:checked")?.value;
  if (tipo === "PARCELADO") {
    const valorTotal = parseMoedaBr(valorUnit.value);
    const entrada = parseMoedaBr(document.getElementById("entrada").value);
    const numParcelas = parseInt(document.getElementById("quantParcelas").value);
    const dia = parseInt(inputDiaVencimento.value);

    // Só calcula se tiver todos os valores válidos
    if (!isNaN(valorTotal) &&
        !isNaN(entrada) &&
        !isNaN(numParcelas) && numParcelas > 0 &&
        !isNaN(dia) && dia >= 1 && dia <= 28) {
      const saldo = valorTotal - entrada;
      const valorParcela = saldo / numParcelas;

      let texto = `<p>Valor de cada parcela: <strong>${formatarMoedaBr(valorParcela)}</strong></p>`;
      texto += "<p>Datas de vencimento:</p><ul>";

      // Para cada parcela, usamos o mês atual + i, mas substituímos o dia pelo escolhido
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();

      for (let i = 1; i <= numParcelas; i++) {
        // Mês de vencimento: mês atual + i (1 = próximo mês, etc.)
        const dataVenc = new Date(anoAtual, mesAtual + i, dia);
        texto += `<li>Parcela ${i}: ${dataVenc.toLocaleDateString('pt-BR')}</li>`;
      }
      texto += "</ul>";

      infoParcelas.innerHTML = texto;
    } else {
      infoParcelas.innerHTML = "";
    }
  }
});

// Submete o formulário (POST ou PUT)
if (formVenda) {
  formVenda.addEventListener("submit", async e => {
    e.preventDefault();
    erroVenda.textContent = "";
    erroVenda.classList.remove("visivel");

    const clienteId = selectCliente.value;
    const produtoId = selectProduto.value;
    const valor = parseMoedaBr(valorUnit.value);
    const tipoPagamento = document.querySelector("input[name='tipoPagamento']:checked").value;

    if (!clienteId || !produtoId) {
      erroVenda.textContent = "Selecione cliente e produto.";
      erroVenda.classList.add("visivel");
      return;
    }

    let dados = {
      clienteId: Number(clienteId),
      itens: [
        {
          mercadoriaId: Number(produtoId),
          quantidade: 1
        }
      ],
      tipoPagamento: tipoPagamento,
    };

    if (tipoPagamento === "PARCELADO") {
      const entrada = parseMoedaBr(document.getElementById("entrada").value);
      const numParcelas = parseInt(document.getElementById("quantParcelas").value);
      const dia = parseInt(inputDiaVencimento.value);

      if (isNaN(entrada) || isNaN(numParcelas) || numParcelas < 1 || isNaN(dia) || dia < 1 || dia > 28) {
        erroVenda.textContent = "Preencha corretamente entrada, nº de parcelas e dia de vencimento (1–28).";
        erroVenda.classList.add("visivel");
        return;
      }

      dados.entrada = entrada;
      dados.numParcelas = numParcelas;
      dados.diaVencimento = dia; // <-- incluímos o dia de vencimento
    }

    try {
      if (modoEdicao && vendaEditId) {
        // Atualiza somente campos básicos (não itens)
        await atualizarVenda(vendaEditId, {
          clienteId: Number(clienteId),
          tipoPagamento,
          entrada: dados.entrada,
          numParcelas: dados.numParcelas,
          diaVencimento: dados.diaVencimento   // opcionalmente, enviar para o backend
        });
        alert("Venda atualizada com sucesso!");
      } else {
        await criarVenda(dados);
        alert("Venda cadastrada com sucesso!");
      }
      window.location.href = "historico.html";
    } catch (err) {
      erroVenda.textContent = err.message;
      erroVenda.classList.add("visivel");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }
  await carregarOpcoes();
  divParcelamento.style.display = "none";
  await verificarModoEdicao();
});
