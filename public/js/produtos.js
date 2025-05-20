// public/js/produtos.js

import {
  getProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto,
  BASE_URL,
} from "./api.js";

const containerListaProdutos = document.getElementById("listaProdutos");
const buscaInput = document.getElementById("buscaProduto");

// Formata moeda em BRL (ex.: 15000 → “R$ 15.000,00”)
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Converte “15.000,00” → 15000.00 (usado em cadastro de produto, se necessário)
function parseMoedaBr(valorStr) {
  return parseFloat(valorStr.replace(/\./g, "").replace(",", ".")) || 0;
}

// Armazena lista original completa para filtrar depois
let listaCompleta = [];

/**
 * Carrega todas as mercadorias do backend e chama renderizarLista().
 */
async function carregarLista() {
  try {
    const produtos = await getProdutos();
    listaCompleta = produtos; // guarda para filtragem
    renderizarLista(produtos);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
  }
}

/**
 * Filtra a lista de produtos pelo nome (buscaInput.value) e re-renderiza.
 */
function filtrarPorNome() {
  const termo = buscaInput.value.trim().toLowerCase();
  if (!termo) {
    renderizarLista(listaCompleta);
  } else {
    const filtrados = listaCompleta.filter((p) =>
      p.nome.toLowerCase().includes(termo)
    );
    renderizarLista(filtrados);
  }
}

/**
 * Recebe um array de produtos e monta os cards com carrossel de fotos.
 */
function renderizarLista(produtos) {
  containerListaProdutos.innerHTML = "";

  produtos.forEach((p) => {
    // Monta o HTML das fotos (carrossel)
    let fotosHtml = "";
    if (Array.isArray(p.fotos) && p.fotos.length > 0) {
      p.fotos.forEach((foto, idx) => {
        // A primeira foto recebe a classe “active”
        const classeActive = idx === 0 ? "active" : "";
        // Usa BASE_URL + caminho salvo no BD
        fotosHtml += `
          <img
            src="${BASE_URL}${foto.caminho}"
            alt="${p.nome}"
            class="${classeActive}"
          />
        `;
      });
    } else {
      // Se não houver foto cadastrada, exibe placeholder
      fotosHtml = `
        <img
          src="https://via.placeholder.com/300x150?text=Sem+Foto"
          alt="Sem Foto"
          class="active"
        />
      `;
    }

    // Cria o card de produto
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="gallery-container">
        ${fotosHtml}
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
      <h4>${p.nome}</h4>
      <p>Descrição: ${p.descricao || ""}</p>
      <p>Valor: ${formatarMoedaBr(p.valorUnitario)}</p>
      <p>Em estoque: ${p.quantidadeEstoque}</p>
      <button class="editar-btn" data-id="${p.id}">Editar</button>
      <button class="excluir-btn" data-id="${p.id}">Excluir</button>
    `;
    containerListaProdutos.appendChild(card);

    // —————— Carrossel de imagens para este card ——————
    const imgs = card.querySelectorAll(".gallery-container img");
    let currentIndex = 0;
    const prevBtn = card.querySelector(".gallery-container .prev");
    const nextBtn = card.querySelector(".gallery-container .next");

    prevBtn.addEventListener("click", () => {
      imgs[currentIndex].classList.remove("active");
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      imgs[currentIndex].classList.add("active");
    });

    nextBtn.addEventListener("click", () => {
      imgs[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % imgs.length;
      imgs[currentIndex].classList.add("active");
    });
    // —————————————————————————————————————————————
  });

  // Botões “Editar”
  document.querySelectorAll(".editar-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      window.location.href = `novoProduto.html?edit=${id}`;
      // Redireciona para a página de cadastro/edição, passando ?edit=id
    });
  });

  // Botões “Excluir”
  document.querySelectorAll(".excluir-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      if (confirm(`Deseja realmente excluir o produto #${id}?`)) {
        try {
          await excluirProduto(id);
          alert("Produto excluído com sucesso!");
          carregarLista();
        } catch (err) {
          alert("Erro ao excluir produto: " + err.message);
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1) Carrega lista completa
  carregarLista();

  // 2) Liga o filtro de busca
  buscaInput.addEventListener("input", filtrarPorNome);
});
