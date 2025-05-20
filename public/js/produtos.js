import {
  getProdutos,
  excluirProduto,
  BASE_URL,
} from "./api.js";

const container = document.getElementById("listaProdutos");
const buscaInput = document.getElementById("buscaProduto");
let listaCompleta = [];

function fmtBRL(v) {
  return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
}

async function carregarLista() {
  const produtos = await getProdutos();
  listaCompleta = produtos;
  renderizarLista(produtos);
}

function filtrar() {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtrados = termo
    ? listaCompleta.filter(p=>p.nome.toLowerCase().includes(termo))
    : listaCompleta;
  renderizarLista(filtrados);
}

function renderizarLista(produtos) {
  container.innerHTML = "";
  produtos.forEach(p => {
    // carrossel de fotos
    const fotos = (p.fotos||[]).map((f,i)=>`
      <img src="${BASE_URL}${f.caminho}"
           alt="${p.nome}"
           class="${i===0?'active':''}">`
    ).join("") ||
    `<img src="https://via.placeholder.com/200?text=Sem+Foto" class="active">`;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="gallery-container">
        ${fotos}
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
      <h4>${p.nome}</h4>
      <p>${p.descricao||""}</p>
      <p>Valor: ${fmtBRL(p.valorUnitario)}</p>
      <p>Em estoque: ${p.quantidadeEstoque}</p>
      <button class="editar-btn" data-id="${p.id}">Editar</button>
      <button class="excluir-btn" data-id="${p.id}">Excluir</button>
    `;
    container.appendChild(card);

    // carrossel
    const imgs = card.querySelectorAll("img");
    let idx = 0;
    card.querySelector(".prev").onclick = ()=>{
      imgs[idx].classList.remove("active");
      idx = (idx - 1 + imgs.length) % imgs.length;
      imgs[idx].classList.add("active");
    };
    card.querySelector(".next").onclick = ()=>{
      imgs[idx].classList.remove("active");
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add("active");
    };
  });

  // editar
  document.querySelectorAll(".editar-btn").forEach(btn=>{
    btn.onclick = ()=> {
      const id = btn.dataset.id;
      window.location.href = `novoProduto.html?edit=${id}`;
    };
  });
  // excluir
  document.querySelectorAll(".excluir-btn").forEach(btn=>{
    btn.onclick = async ()=>{
      if(confirm(`Excluir produto #${btn.dataset.id}?`)) {
        await excluirProduto(btn.dataset.id);
        carregarLista();
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  carregarLista();
  buscaInput.addEventListener("input", filtrar);
});
