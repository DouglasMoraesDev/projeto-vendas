// public/js/historico.js
import { getVendas } from "./api.js";

const containerHistorico = document.getElementById("historicoContainer");

// Formata número para “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function renderizarHistorico(vendas) {
  if (!containerHistorico) return;
  containerHistorico.innerHTML = "";

  vendas.forEach(v => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Pode não haver itens ⇒ tratar com segurança
    const item = (v.itens && v.itens.length > 0) ? v.itens[0] : null;
    const mercadoria = item?.mercadoria;
    const fotos = mercadoria?.fotos || [];

    // Garante que aqui não dê erro ao chamar .map
    const fotosHtml = fotos.map(foto => 
      `<img src="${foto.caminho}" alt="${mercadoria.nome}" width="80" />`
    ).join("");

    card.innerHTML = `
      <h4>Venda #${v.id} — ${new Date(v.criadoEm).toLocaleString('pt-BR')}</h4>
      <p>Cliente: ${v.cliente.nome}</p>
      ${ mercadoria 
         ? `<p>Produto: ${item.nomeMercadoria || mercadoria.nome}</p>` 
         : "" }
      <div class="fotos-container">${fotosHtml}</div>
      ${ mercadoria 
         ? `<p>Descrição: ${mercadoria.descricao || ""}</p>` 
         : "" }
      <p>Valor Total: ${formatarMoedaBr(v.valorTotal)}</p>
      <p>Tipo de Pagamento: ${v.tipoPagamento}</p>
      ${ v.tipoPagamento === "PARCELADO"
         ? `
        <p>Entrada: ${formatarMoedaBr(v.entrada)}</p>
        <p>Parcelas: ${v.numParcelas} de ${formatarMoedaBr((v.valorTotal - v.entrada) / v.numParcelas)}</p>
        <p>Parcelas Restantes: ${v.parcelasRestantes}</p>
      `
         : "" }
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
