// public/js/loja.js

import { getProdutosLoja, BASE_URL } from "./api.js";

const containerLoja = document.getElementById("lojaContainer");

// Formata “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// Para cada produto, renderiza um carrossel simplificado de imagens
function renderizarLoja(produtos) {
  if (!containerLoja) return;
  containerLoja.innerHTML = "";

  produtos.forEach((p) => {
    // Monta o HTML das imagens (carrossel)
    let fotosHtml = "";
    if (Array.isArray(p.fotos) && p.fotos.length > 0) {
      p.fotos.forEach((foto, idx) => {
        const classeActive = idx === 0 ? "active" : "";
        // Concatena BASE_URL + foto.caminho para formar a URL completa
        fotosHtml += `
          <img
            src="${BASE_URL}${foto.caminho}"
            alt="${p.nome}"
            class="${classeActive}"
          />
        `;
      });
    } else {
      // Caso não haja fotos, exibe um placeholder
      fotosHtml = `
        <img
          src="https://via.placeholder.com/300x150?text=Sem+Foto"
          alt="Sem Foto"
          class="active"
        />
      `;
    }

    // Cria o card do produto
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="gallery-container">
        ${fotosHtml}
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
      <h4>${p.nome}</h4>
      <p>${p.descricao || ""}</p>
      <p class="valor-loja">${formatarMoedaBr(p.valorUnitario)}</p>
      <button
        class="whatsappBtn"
        data-id="${p.id}"
        data-nome="${encodeURIComponent(p.nome)}"
      >
        Conversar
      </button>
    `;
    containerLoja.appendChild(card);

    // —————— Lógica do carrossel para este card ——————
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
    // ————————————————————————————————————————
  });

  // Botão “Conversar” abre WhatsApp do visitante → conversa com vendedor
  document.querySelectorAll(".whatsappBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const nomeProd = decodeURIComponent(e.target.dataset.nome);
      // Número fixo do vendedor (seu irmão)
      const telefoneVendedor = "5512997610410";

      // Recupera dados do visitante no localStorage (armazenados em storeLogin.js)
      const visitaStr = localStorage.getItem("lojavisitante");
      let visitante = null;
      if (visitaStr) {
        try {
          visitante = JSON.parse(visitaStr);
        } catch {
          visitante = null;
        }
      }

      // Monta mensagem pré‐preenchida
      const mensagem = visitante
        ? `Olá, sou ${visitante.nome} e me interessei pelo produto "${nomeProd}".`
        : `Tenho interesse no produto "${nomeProd}".`;

      // Abre o WhatsApp Web no número do vendedor, com a mensagem
      const url = `https://wa.me/${telefoneVendedor}?text=${encodeURIComponent(
        mensagem
      )}`;
      window.open(url, "_blank");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Verifica se visitante da loja está logado; se não, redireciona para login da loja
  if (!localStorage.getItem("lojavisitante_token")) {
    window.location.href = "storeLogin.html";
    return;
  }

  // 2) Registra visita no backend (para contagem de visitas)
  fetch(`${BASE_URL}/api/visitas/tick`, { method: "POST" }).catch(console.error);

  // 3) Busca produtos públicos da loja e renderiza
  try {
    const produtos = await getProdutosLoja();
    renderizarLoja(produtos);
  } catch (err) {
    console.error(err);
    document.body.innerHTML =
      "<p>Erro ao carregar produtos. Faça login novamente.</p>";
  }
});
