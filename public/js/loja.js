// public/js/loja.js
import { getProdutosLoja } from "./api.js";

const containerLoja = document.getElementById("lojaContainer");

// Renderiza cada produto como card público
function renderizarLoja(produtos) {
  if (!containerLoja) return;
  containerLoja.innerHTML = "";

  produtos.forEach((p) => {
    // Se houver fotos, exibe a primeira; senão, deixa em branco
    const foto = p.fotos.length
      ? `<img src="${p.fotos[0].caminho}" alt="${p.nome}" width="100" />`
      : "";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      ${foto}
      <h4>${p.nome}</h4>
      <p>R$ ${p.valorUnitario.toFixed(2)}</p>
      <button class="whatsappBtn" data-id="${p.id}" data-nome="${encodeURIComponent(
      p.nome
    )}">Conversar</button>
    `;

    containerLoja.appendChild(card);
  });

  // Configura evento do botão “Conversar” para abrir WhatsApp
  document.querySelectorAll(".whatsappBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const nomeProd = e.target.dataset.nome;
      // Substitua este telefone pelo número real cadastrado no sistema
      const telefoneVendedor = "5511999999999";
      const url = `https://wa.me/${telefoneVendedor}?text=Olá, tenho interesse no produto ${nomeProd}`;
      window.open(url, "_blank");
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const produtos = await getProdutosLoja();
    renderizarLoja(produtos);
  } catch (err) {
    console.error(err);
  }
});
