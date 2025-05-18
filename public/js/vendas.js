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
const infoParcelas = document.getElementById("infoParcelas"); // para mostrar valor e datas de vencimento

let listaProdutosCache = [];
let listaClientesCache = [];

// Formata número para “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Converte string “1.234,56” para float 1234.56
function parseMoedaBr(valorStr) {
  return parseFloat(valorStr.replace(/\./g, '').replace(',', '.')) || 0;
}

// Carrega clientes e produtos nos selects
async function carregarOpcoes() {
  try {
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
  } catch (err) {
    console.error(err);
  }
}

// Ao mudar produto, exibe o valor já formatado
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

// Quando muda tipo “À vista” x “Parcelado”, mostra/oculta campos
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

// A cada input dentro do form, recalcula e mostra valor de cada parcela + datas
formVenda?.addEventListener("input", () => {
  const tipo = document.querySelector("input[name='tipoPagamento']:checked")?.value;
  if (tipo === "PARCELADO") {
    const valorTotal = parseMoedaBr(valorUnit.value);
    const entrada = parseMoedaBr(document.getElementById("entrada").value);
    const numParcelas = parseInt(document.getElementById("quantParcelas").value);

    if (!isNaN(valorTotal) && !isNaN(entrada) && !isNaN(numParcelas) && numParcelas > 0) {
      const saldo = valorTotal - entrada;
      const valorParcela = saldo / numParcelas;

      const hoje = new Date();
      const diaMes = hoje.getDate();

      let texto = `<p>Valor de cada parcela: <strong>${formatarMoedaBr(valorParcela)}</strong></p>`;
      texto += "<p>Datas de vencimento:</p><ul>";
      for (let i = 1; i <= numParcelas; i++) {
        const dataVenc = new Date(hoje.getFullYear(), hoje.getMonth() + i, diaMes);
        texto += `<li>Parcela ${i}: ${dataVenc.toLocaleDateString('pt-BR')}</li>`;
      }
      texto += "</ul>";

      infoParcelas.innerHTML = texto;
    } else {
      infoParcelas.innerHTML = "";
    }
  }
});

// Ao submeter formulário, prepara objeto e chama a API
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

      if (isNaN(entrada) || isNaN(numParcelas) || numParcelas < 1) {
        erroVenda.textContent = "Preencha corretamente entrada e número de parcelas.";
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
      window.location.href = "historico.html";
    } catch (err) {
      erroVenda.textContent = err.message;
      erroVenda.classList.add("visivel");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarOpcoes();
  divParcelamento.style.display = "none";
});
