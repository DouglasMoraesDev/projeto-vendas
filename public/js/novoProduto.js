import {
  getProdutoById,
  criarProduto,
  atualizarProduto,
} from "./api.js";

const form = document.getElementById("formProduto");
const titulo = document.getElementById("tituloForm");
const erro = document.getElementById("erroProd");
const previewExist = document.getElementById("previewExistente");
const inputFotos = document.getElementById("fotos");

let modoEdicao = false;
let produtoId = null;

function fmtBRL(v){
  return v.toFixed(2).replace(".",",");
}

// extrai query string
const params = new URLSearchParams(location.search);
if(params.has("edit")){
  modoEdicao = true;
  produtoId = params.get("edit");
  titulo.textContent = `Editar Produto #${produtoId}`;

  // busca dados existentes
  getProdutoById(produtoId).then(p=>{
    form.nome.value = p.nome;
    form.descricao.value = p.descricao;
    form.valorUnitario.value = p.valorUnitario.toFixed(2).replace(".",",");
    form.quantidadeEstoque.value = p.quantidadeEstoque;

    // mostra preview de cada foto atual
    previewExist.innerHTML = "";
    (p.fotos||[]).forEach(f=>{
      const img = document.createElement("img");
      img.src = `${f.caminho}`;
      img.style.width = img.style.height = "var(--card-img-size)";
      img.style.objectFit = "cover";
      previewExist.appendChild(img);
    });
  }).catch(()=> erro.textContent = "Não foi possível carregar o produto.");
}

form.addEventListener("submit", async e=>{
  e.preventDefault();
  erro.textContent = "";

  const data = new FormData(form);
  try {
    if(modoEdicao){
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
