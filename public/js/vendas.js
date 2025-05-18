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

// Se vier “?edit=<id>”, preenche o formulário
async function verificarModoEdicao() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("edit")) {
    modoEdicao = true;
    vendaEditId = params.get("edit");
    tituloVenda.textContent = `Editar Venda #${vendaEditId}`;
    btnSubmitVenda.textContent = "Atualizar Venda";

    try {
      const v = await getVendaById(vendaEditId);
      // Preenche cliente e produto
      selectCliente.value = v.clienteId;
      // Se a venda tiver vários itens, pega o primeiro
      const item = (v.itens && v.itens.length > 0) ? v.itens[0] : null;
      if (item) {
        selectProduto.value = item.mercadoriaId;
        valorUnit.value = formatarMoedaBr(item.precoUnitario);
      }
      // Preenche tipo de pagamento
      document.querySelector(`input[name="tipoPagamento"][value="${v.tipoPagamento}"]`).checked = true;
      if (v.tipoPagamento === "PARCELADO") {
        divParcelamento.style.display = "block";
        document.getElementById("entrada").value = v.entrada.toFixed(2).replace(".", ",");
        document.getElementById("quantParcelas").value = v.numParcelas;
        // Dispara o cálculo das parcelas para mostrar infoParcelas
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

// Recalcula valor e datas das parcelas conforme input
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

// Envia formulário (POST ou PUT, dependendo de modoEdicao)
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
      if (modoEdicao && vendaEditId) {
        // Apenas atualiza campos básicos (não itens)
        await atualizarVenda(vendaEditId, {
          clienteId: Number(clienteId),
          tipoPagamento,
          entrada: dados.entrada,
          numParcelas: dados.numParcelas
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
  // Se não estiver logado, redireciona
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }
  await carregarOpcoes();
  divParcelamento.style.display = "none";
  await verificarModoEdicao();
});

