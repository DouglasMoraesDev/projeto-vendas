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

// Detecta modo edição pela query
const params = new URLSearchParams(location.search);
if (params.has("edit")) {
  modoEdicao = true;
  produtoId = params.get("edit");
  titulo.textContent = `Editar Produto #${produtoId}`;

  getProdutoById(produtoId)
    .then(p => {
      form.nome.value = p.nome;
      form.descricao.value = p.descricao;
      form.valorUnitario.value = p.valorUnitario.toFixed(2).replace(".", ",");
      form.quantidadeEstoque.value = p.quantidadeEstoque;

      previewExist.innerHTML = "";
      (p.fotos || []).forEach(f => {
        const img = document.createElement("img");
        img.src = f.caminho;
        img.style.width = img.style.height = "200px";  // 200×200 px
        img.style.objectFit = "cover";
        previewExist.appendChild(img);
      });
    })
    .catch(() => {
      erro.textContent = "Não foi possível carregar o produto.";
      erro.classList.add("visivel");
    });
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  erro.textContent = "";
  erro.classList.remove("visivel");

  // 1) Vamos “limpar” a string que o usuário digitou
  //    Suponha que ele escreva “R$ 15.000,00” ou “15.000,00” ou “15000,00”
  let rawValor = form.valorUnitario.value.trim();

  // - Remove “R$”, espaços e pontos (milhares)
  // - Troca vírgula por ponto
  rawValor = rawValor
    .replace(/[R$\s]/g, "")   // tira “R$” e espaços em branco
    .replace(/\./g, "")       // tira todos os pontos
    .replace(",", ".");       // troca vírgula por ponto

  // 2) Monta o FormData COM o campo “valorUnitario” já no formato numérico “pt-BR → en-US”
  const data = new FormData(form);
  data.set("valorUnitario", rawValor);

  try {
    if (modoEdicao) {
      await atualizarProduto(produtoId, data);
      alert("Produto atualizado com sucesso!");
    } else {
      await criarProduto(data);
      alert("Produto criado com sucesso!");
    }
    location.href = "produtos.html";
  } catch (err) {
    erro.textContent = err.message;
    erro.classList.add("visivel");
  }
});
