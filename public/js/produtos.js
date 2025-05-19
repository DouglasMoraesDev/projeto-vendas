// public/js/produtos.js

import {
  getProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto,
  BASE_URL
} from "./api.js";

const containerListaProdutos = document.getElementById("listaProdutos");
const formProduto = document.getElementById("formProduto");
const erroProduto = document.getElementById("erroProduto");

// Formata moeda em BRL
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Converte “15.000,00” → 15000.00
function parseMoedaBr(valorStr) {
  return parseFloat(valorStr.replace(/\./g, "").replace(",", ".")) || 0;
}

async function carregarLista() {
  try {
    const produtos = await getProdutos();
    containerListaProdutos.innerHTML = "";

    produtos.forEach((p) => {
      // Renderiza todas as fotos no card
      let fotosHtml = "";
      if (Array.isArray(p.fotos) && p.fotos.length > 0) {
        fotosHtml = p.fotos
          .map(
            (foto) => `
            <img 
              src="${BASE_URL}${foto.caminho}"
              alt="${p.nome}" 
              width="80" 
            />
          `
          )
          .join("");
      }

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="fotos-container">${fotosHtml}</div>
        <h4>${p.nome}</h4>
        <p>Descrição: ${p.descricao || ""}</p>
        <p>Valor: ${formatarMoedaBr(p.valorUnitario)}</p>
        <p>Em estoque: ${p.quantidadeEstoque}</p>
        <button class="editar-btn" data-id="${p.id}">Editar</button>
        <button class="excluir-btn" data-id="${p.id}">Excluir</button>
      `;
      containerListaProdutos.appendChild(card);
    });

    // Botões de editar/excluir
    document.querySelectorAll(".editar-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        preencherFormParaEdicao(id);
      });
    });
    document.querySelectorAll(".excluir-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Deseja realmente excluir este produto?")) {
          try {
            await excluirProduto(id);
            carregarLista();
          } catch (err) {
            alert("Erro ao excluir produto: " + err.message);
          }
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// Preencher form para edição (faz GET `/api/mercadorias/:id`)
async function preencherFormParaEdicao(id) {
  try {
    const produto = (await getProdutos()).find((p) => p.id == id);
    if (!produto) throw new Error("Produto não encontrado");

    formProduto.nome.value = produto.nome;
    formProduto.descricao.value = produto.descricao;
    formProduto.valor.value = produto.valorUnitario.toFixed(2).replace(".", ",");
    formProduto.quantidade.value = produto.quantidadeEstoque;

    formProduto.dataset.id = produto.id;
    formProduto.querySelector("button[type=submit]").textContent = "Atualizar Produto";
  } catch (err) {
    alert("Erro: " + err.message);
  }
}

// Envia formulário (criar ou atualizar)
if (formProduto) {
  formProduto.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroProduto.textContent = "";
    erroProduto.classList.remove("visivel");

    const idEdicao = formProduto.dataset.id;
    const nome = formProduto.nome.value.trim();
    const descricao = formProduto.descricao.value.trim();
    const valorUnitario = parseMoedaBr(formProduto.valor.value);
    const quantidadeEstoque = parseInt(formProduto.quantidade.value) || 0;
    const fotos = Array.from(formProduto.fotos.files);

    if (!nome || valorUnitario <= 0 || quantidadeEstoque < 0) {
      erroProduto.textContent = "Preencha nome, valor e quantidade corretamente.";
      erroProduto.classList.add("visivel");
      return;
    }

    try {
      if (idEdicao) {
        await atualizarProduto(idEdicao, { nome, descricao, valorUnitario, quantidadeEstoque });
        formProduto.removeAttribute("data-id");
        formProduto.querySelector("button[type=submit]").textContent = "Cadastrar Produto";
      } else {
        await criarProduto({ nome, descricao, valorUnitario, quantidadeEstoque, fotos });
      }
      formProduto.reset();
      carregarLista();
    } catch (err) {
      erroProduto.textContent = err.message;
      erroProduto.classList.add("visivel");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarLista();
});
