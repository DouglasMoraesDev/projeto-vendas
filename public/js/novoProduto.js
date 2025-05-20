// public/js/novoProduto.js

import {
  getProdutoById,
  criarProduto,
  atualizarProduto,
} from "./api.js";

const form = document.getElementById("formProduto");
const titulo = document.getElementById("tituloForm");
const erro = document.getElementById("erroProd");
const previewExist = document.getElementById("previewExistente");

let modoEdicao = false;
let produtoId = null;

// Detecta modo edição
const params = new URLSearchParams(location.search);
if (params.has("edit")) {
  modoEdicao = true;
  produtoId = params.get("edit");
  titulo.textContent = `Editar Produto #${produtoId}`;

  // Busca dados e pré-preenche
  getProdutoById(produtoId)
    .then(p => {
      form.nome.value = p.nome;
      form.descricao.value = p.descricao;
      // converte ponto para vírgula
      form.valorUnitario.value = p.valorUnitario.toFixed(2).replace(".", ",");
      form.quantidadeEstoque.value = p.quantidadeEstoque;

      // preview das fotos atuais
      previewExist.innerHTML = "";
      (p.fotos || []).forEach(f => {
        const img = document.createElement("img");
        img.src = `${f.caminho}`;
        img.classList.add("thumb-produto");
        previewExist.appendChild(img);
      });
    })
    .catch(() => (erro.textContent = "Não foi possível carregar o produto."));
}

// Submissão
form.addEventListener("submit", async e => {
  e.preventDefault();
  erro.textContent = "";

  const data = new FormData(form);
  try {
    if (modoEdicao) {
      await atualizarProduto(produtoId, data);
      alert("Produto atualizado!");
    } else {
      await criarProduto(data);
      alert("Produto criado!");
    }
    location.href = "produtos.html";
  } catch (err) {
    erro.textContent = err.message;
  }
});
