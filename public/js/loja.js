// public/js/loja.js

import { getProdutosLoja, tickVisita, BASE_URL } from "./api.js";

const containerLoja = document.getElementById("lojaContainer");

// Formata “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

function renderizarLoja(produtos) {
  if (!containerLoja) return;
  containerLoja.innerHTML = "";

  produtos.forEach((p) => {
    // Monta as tags <img> para cada foto no carrossel
    let fotosHtml = "";
    if (Array.isArray(p.fotos) && p.fotos.length > 0) {
      p.fotos.forEach((foto, idx) => {
        const classeActive = idx === 0 ? "active" : "";
        fotosHtml += `
          <img
            src="${BASE_URL}${foto.caminho}"
            alt="${p.nome}"
            class="${classeActive}"
          />
        `;
      });
    } else {
      fotosHtml = `
        <img
          src="https://via.placeholder.com/300x150?text=Sem+Foto"
          alt="Sem Foto"
          class="active"
        />
      `;
    }

    // Cria o card com carrossel
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
      <button class="whatsappBtn" data-id="${p.id}" data-nome="${encodeURIComponent(p.nome)}">
        Conversar
      </button>
    `;
    containerLoja.appendChild(card);

    // —————————————— Lógica do carrossel para ESTE card ——————————————
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
    // ——————————————————————————————————————————————————————————————
  });

  // Botões “Conversar” abrem WhatsApp do lojista e preenchem mensagem
  document.querySelectorAll(".whatsappBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const nomeProd = decodeURIComponent(e.target.dataset.nome);
      const telefoneVendedor = "5512997610410"; // número fixo do seu irmão

      // Se for visitante logado, podemos pegar nome+telefone dele em localStorage
      const visitaStr = localStorage.getItem("lojavisitante");
      let visitante = null;
      if (visitaStr) visitante = JSON.parse(visitaStr);

      const mensagem = visitante
        ? `Olá, sou ${visitante.nome} e me interessei pelo produto "${nomeProd}".`
        : `Tenho interesse no produto "${nomeProd}".`;

      const url = `https://wa.me/${telefoneVendedor}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // 1) Se não estiver logado como visitante, leva ao login da loja
  if (!localStorage.getItem("lojavisitante_token")) {
    window.location.href = "storeLogin.html";
    return;
  }

  // 2) Marca a visita (tick)
  try {
    await tickVisita();
  } catch (err) {
    console.warn("Não foi possível marcar visita:", err);
  }

  // 3) Busca e exibe os produtos
  try {
    const produtos = await getProdutosLoja();
    renderizarLoja(produtos);
  } catch (err) {
    console.error("Falha ao buscar produtos:", err);
    document.body.innerHTML =
      "<p>Erro ao carregar produtos. Faça login novamente.</p>";
  }
});
