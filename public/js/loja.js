// public/js/loja.js

import { getProdutosLoja, BASE_URL } from "./api.js";

const containerLoja = document.getElementById("lojaContainer");

// Formata “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function renderizarLoja(produtos) {
  if (!containerLoja) return;
  containerLoja.innerHTML = "";

  produtos.forEach(p => {
    // Se houver fotos, gera um HTML com todas elas
    const fotosHtml = Array.isArray(p.fotos) && p.fotos.length > 0
      ? p.fotos.map(foto => 
          `<img src="${BASE_URL}${foto.caminho}" alt="${p.nome}" class="produto-img" />`
        ).join("")
      : "";

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="fotos-loja">
        ${fotosHtml}
      </div>
      <h4>${p.nome}</h4>
      <p>${p.descricao || ""}</p>
      <p class="valor-loja">${formatarMoedaBr(p.valorUnitario)}</p>
      <button class="whatsappBtn" data-id="${p.id}" data-nome="${encodeURIComponent(p.nome)}">
        Conversar
      </button>
    `;
    containerLoja.appendChild(card);
  });

  document.querySelectorAll(".whatsappBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const nomeProd = e.target.dataset.nome;
      // Substitua pelo telefone real do vendedor cadastrado
      const telefoneVendedor = "5511999999999";
      const url = `https://wa.me/${telefoneVendedor}?text=Olá, tenho interesse no produto ${nomeProd}`;
      window.open(url, "_blank");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Se não estiver logado, redireciona
    if (!localStorage.getItem("token")) {
      window.location.href = "index.html";
      return;
    }

    const produtos = await getProdutosLoja();
    renderizarLoja(produtos);
  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<p>Erro ao carregar produtos. Tente fazer login novamente.</p>";
  }
});
