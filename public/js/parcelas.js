// public/js/parcelas.js
import {
  getParcelasPendentes,
  pagarParcela,
  BASE_URL,
} from "./api.js";

const containerVendasPendentes = document.getElementById("vendasPendentes");

// Formata para “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// 1) Busca todas as parcelas pendentes e agrupa por vendaId
async function renderizarVendasPendentes() {
  try {
    const parcelas = await getParcelasPendentes();
    if (!containerVendasPendentes) return;
    containerVendasPendentes.innerHTML = "";

    const agrupado = {};
    parcelas.forEach(p => {
      if (!agrupado[p.vendaId]) {
        agrupado[p.vendaId] = { venda: p.venda, parcelas: [] };
      }
      agrupado[p.vendaId].parcelas.push(p);
    });

    Object.values(agrupado).forEach(grupo => {
      const vendaInfo = grupo.venda;
      const divVenda = document.createElement("div");
      divVenda.classList.add("card");

      divVenda.innerHTML = `
        <h4>Venda #${vendaInfo.id} — Cliente: ${vendaInfo.cliente.nome}</h4>
        <p>Parcelas pendentes: ${grupo.parcelas.length}</p>
        <button class="verParcelasBtn" data-venda="${vendaInfo.id}">Ver Parcela(s)</button>
        <div class="parcelasDetalhes" id="detalhes-${vendaInfo.id}" style="display: none;"></div>
      `;
      containerVendasPendentes.appendChild(divVenda);
    });

    // 2) Ao clicar em “Ver Parcela(s)”, exibe detalhes agrupados
    document.querySelectorAll(".verParcelasBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const vendaId = btn.dataset.venda;
        const detalhesDiv = document.getElementById(`detalhes-${vendaId}`);
        if (detalhesDiv.style.display === "none") {
          detalhesDiv.style.display = "block";
          mostrarDetalhesParcela(vendaId, agrupado[vendaId].parcelas, detalhesDiv);
        } else {
          detalhesDiv.style.display = "none";
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// Exibe formulário de pagamento para cada parcela daquela venda
function mostrarDetalhesParcela(vendaId, parcelas, container) {
  container.innerHTML = ""; // limpa conteúdo
  parcelas.forEach(p => {
    const form = document.createElement("form");
    form.id = `formPag-${p.id}`;
    form.innerHTML = `
      <p>Parcela ${p.numParcela} — Valor: ${formatarMoedaBr(p.valorParcela)} — Vencimento: ${new Date(p.dataVencimento).toLocaleDateString('pt-BR')}</p>
      <label for="arquivo-${p.id}">Comprovante (PDF/imagem):</label>
      <input type="file" id="arquivo-${p.id}" name="comprovante" accept="image/*,.pdf" required />
      <label for="recebidoPor-${p.id}">Recebido Por:</label>
      <input type="text" id="recebidoPor-${p.id}" name="recebidoPor" required />
      <button type="submit">Pagar</button>
      <div class="erro" id="erroPag-${p.id}"></div>
      <hr />
    `;
    container.appendChild(form);

    const erroPag = document.getElementById(`erroPag-${p.id}`);
    form.addEventListener("submit", async e => {
      e.preventDefault();
      erroPag.textContent = "";
      erroPag.classList.remove("visivel");

      const arquivo = document.getElementById(`arquivo-${p.id}`).files[0];
      const recebidoPor = document.getElementById(`recebidoPor-${p.id}`).value.trim();

      if (!arquivo || !recebidoPor) {
        erroPag.textContent = "Envie arquivo e preencha 'Recebido Por'.";
        erroPag.classList.add("visivel");
        return;
      }

      // Monta FormData para enviar ao backend
      const formData = new FormData();
      formData.append("comprovante", arquivo);
      formData.append("recebidoPor", recebidoPor);

      try {
        await pagarParcela(p.id, { recebidoPor, arquivo });
        // Abre PDF do recibo (rota pública)
        window.open(`${BASE_URL}/api/comprovantes/${p.id}/pdf`, "_blank");
        // Abre WhatsApp com mensagem pronta
        const telefone = p.venda.cliente.telefone.replace(/\D/g, '');
        const nomeCli = p.venda.cliente.nome;
        const textoWhats = encodeURIComponent(`Olá ${nomeCli}, comprovante da parcela ${p.numParcela}`);
        window.open(`https://wa.me/${telefone}?text=${textoWhats}`, "_blank");

        alert("Parcela paga com sucesso!");
        renderizarVendasPendentes(); // atualiza lista
      } catch (err) {
        erroPag.textContent = err.message;
        erroPag.classList.add("visivel");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarVendasPendentes();
});
