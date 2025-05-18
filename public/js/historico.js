// public/js/historico.js
import { getVendas, excluirVenda } from "./api.js";

// Formata R$ 1.234,56
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

const containerHistorico = document.getElementById("historicoContainer");

function renderizarHistorico(vendas) {
  if (!containerHistorico) return;
  containerHistorico.innerHTML = "";

  vendas.forEach(v => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Pega o primeiro item para mostrar nome e fotos
    const item = (v.itens && v.itens.length > 0) ? v.itens[0] : null;
    const mercadoria = item?.mercadoria;
    const fotos = mercadoria?.fotos || [];
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
      <button class="editarVendaBtn" data-id="${v.id}">Editar</button>
      <button class="excluirVendaBtn" data-id="${v.id}">Excluir</button>
    `;

    containerHistorico.appendChild(card);
  });

  // Botão “Editar”
  document.querySelectorAll(".editarVendaBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      // Redireciona para vendas.html em modo edição
      window.location.href = `vendas.html?edit=${id}`;
    });
  });

  // Botão “Excluir”
  document.querySelectorAll(".excluirVendaBtn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const id = e.target.dataset.id;
      if (confirm(`Deseja realmente excluir a venda #${id}?`)) {
        try {
          await excluirVenda(id);
          alert("Venda excluída com sucesso!");
          carregarHistorico(); // recarrega após exclusão
        } catch (err) {
          alert("Erro ao excluir: " + err.message);
        }
      }
    });
  });
}

async function carregarHistorico() {
  try {
    const vendas = await getVendas();
    renderizarHistorico(vendas);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarHistorico();
});
