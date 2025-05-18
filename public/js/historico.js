// public/js/historico.js
import { getVendas } from "./api.js";

const containerHistorico = document.getElementById("historicoContainer");

// Renderiza cada venda como um card
function renderizarHistorico(vendas) {
  if (!containerHistorico) return;
  containerHistorico.innerHTML = "";

  vendas.forEach((v) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Exibe todas as fotos do produto
    const fotosHtml = v.itens[0].mercadoria.fotos
      .map(
        (foto) =>
          `<img src="${foto.caminho}" alt="${v.itens[0].mercadoria.nome}" width="80" />`
      )
      .join("");

    // Monta o HTML do card
    card.innerHTML = `
      <h4>Venda #${v.id} — ${new Date(v.criadoEm).toLocaleString()}</h4>
      <p>Cliente: ${v.cliente.nome}</p>
      <p>Produto: ${v.itens[0].mercadoria.nome}</p>
      <div class="fotos-container">${fotosHtml}</div>
      <p>Descrição: ${v.itens[0].mercadoria.descricao}</p>
      <p>Valor Total: R$ ${v.valorTotal.toFixed(2)}</p>
      <p>Tipo de Pagamento: ${v.tipoPagamento}</p>
      ${
        v.tipoPagamento === "PARCELADO"
          ? `
      <p>Entrada: R$ ${v.entrada.toFixed(2)}</p>
      <p>Parcelas: ${v.numParcelas} de R$ ${(
              (v.valorTotal - v.entrada) /
              v.numParcelas
            ).toFixed(2)}</p>
      <p>Parcelas Restantes: ${v.parcelasRestantes}</p>
      `
          : ""
      }
    `;

    containerHistorico.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const vendas = await getVendas();
    renderizarHistorico(vendas);
  } catch (err) {
    console.error(err);
  }
});
