// public/js/vendas.js
import {
  getClientes,
  getProdutos,
  criarVenda,
} from "./api.js";

const selectCliente = document.getElementById("selectCliente");
const selectProduto = document.getElementById("selectProduto");
const valorUnit = document.getElementById("valorUnitario");
const tipoPagamentoRadios = document.querySelectorAll("input[name='tipoPagamento']");
const divParcelamento = document.getElementById("dadosParcelamento");
const formVenda = document.getElementById("formVenda");
const erroVenda = document.getElementById("erroVenda");

let listaProdutosCache = []; // para não buscar toda hora
let listaClientesCache = [];

// ---------------------------
// 1. CARREGA CLIENTES E PRODUTOS NO SELECT
// ---------------------------
async function carregarOpcoes() {
  try {
    listaClientesCache = await getClientes();
    listaProdutosCache = await getProdutos();

    // Popular select de clientes
    listaClientesCache.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.nome;
      selectCliente.appendChild(opt);
    });

    // Popular select de produtos
    listaProdutosCache.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.nome;
      selectProduto.appendChild(opt);
    });
  } catch (err) {
    console.error(err);
  }
}

// Quando usuário muda de produto no select, preenche o valor unitário
selectProduto?.addEventListener("change", () => {
  const id = selectProduto.value;
  if (!id) {
    valorUnit.value = "";
    return;
  }
  const produto = listaProdutosCache.find((item) => item.id == id);
  if (produto) {
    valorUnit.value = produto.valorUnitario.toFixed(2);
  }
});

// Controla exibição dos campos de parcelamento
tipoPagamentoRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "parcelado" && radio.checked) {
      divParcelamento.style.display = "block";
    } else if (radio.value === "avista" && radio.checked) {
      divParcelamento.style.display = "none";
    }
  });
});

// ---------------------------
// 2. ENVIA FORM DE NOVA VENDA
// ---------------------------
if (formVenda) {
  formVenda.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroVenda.textContent = "";
    erroVenda.classList.remove("visivel");

    const clienteId = selectCliente.value;
    const produtoId = selectProduto.value;
    const valor = parseFloat(valorUnit.value);
    const tipoPagamento = document.querySelector(
      "input[name='tipoPagamento']:checked"
    ).value;

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
          quantidade: 1, // neste exemplo, vendemos 1 unidade sempre; pode ampliar
        },
      ],
      tipoPagamento: tipoPagamento,
    };

    if (tipoPagamento === "parcelado") {
      const entrada = parseFloat(formVenda.entrada.value);
      const numParcelas = parseInt(formVenda.quantParcelas.value);

      if (isNaN(entrada) || isNaN(numParcelas) || numParcelas < 1) {
        erroVenda.textContent = "Preencha entrada e número de parcelas.";
        erroVenda.classList.add("visivel");
        return;
      }

      dados.entrada = entrada;
      dados.numParcelas = numParcelas;
    }

    try {
      await criarVenda(dados);
      alert("Venda cadastrada com sucesso!");
      formVenda.reset();
      // opcional: redirecionar para histórico de vendas
      window.location.href = "historico.html";
    } catch (err) {
      erroVenda.textContent = err.message;
      erroVenda.classList.add("visivel");
    }
  });
}

// ---------------------------
// 3. INICIALIZAÇÃO
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  carregarOpcoes();
  // Por padrão, esconde o div de parcelamento
  divParcelamento.style.display = "none";
});
