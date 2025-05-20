// public/js/parcelas.js

import {
  getParcelasPendentes,
  pagarParcela,
  BASE_URL,
} from "./api.js";

const containerVendasPendentes = document.getElementById("vendasPendentes");

// Formata R$ 1.234,56
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
}

// 1) Busca todas as parcelas pendentes e agrupa por vendaId
async function renderizarVendasPendentes() {
  try {
    const parcelas = await getParcelasPendentes();
    if (!containerVendasPendentes) return;
    containerVendasPendentes.innerHTML = "";

    // Agrupa parcelas por venda
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
        <button class="toggleParcelasBtn" data-venda="${vendaInfo.id}">Ver Parcela(s)</button>
        <div class="parcelasDetalhes" id="detalhes-${vendaInfo.id}" style="display: none;"></div>
      `;
      containerVendasPendentes.appendChild(divVenda);
    });

    // Click em “Ver Parcela(s)” → abre ou fecha
    document.querySelectorAll(".toggleParcelasBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const vendaId = btn.dataset.venda;
        const detalhesDiv = document.getElementById(`detalhes-${vendaId}`);
        if (detalhesDiv.style.display === "none") {
          detalhesDiv.style.display = "block";
          btn.textContent = "Fechar Parcela(s)";
          mostrarDetalhesParcela(vendaId, agrupado[vendaId].parcelas, detalhesDiv);
        } else {
          detalhesDiv.style.display = "none";
          btn.textContent = "Ver Parcela(s)";
          detalhesDiv.innerHTML = ""; // limpa conteúdo
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// Exibe formulário de pagamento para cada parcela daquela venda
function mostrarDetalhesParcela(vendaId, parcelas, container) {
  container.innerHTML = ""; // limpa antes de reencher

  parcelas.forEach(p => {
    // *** AQUI EXTRAIR E FORMATAR A DATA SEM CONVERSÃO ***
    // Exemplo: p.dataVencimento = "2023-05-10T00:00:00.000Z"
    const isoDateTime = p.dataVencimento;         // "YYYY-MM-DDTHH:mm:ss.sssZ"
    const isoDate = isoDateTime.split("T")[0];    // pega "YYYY-MM-DD"
    const [yyyy, mm, dd] = isoDate.split("-");    // separa em [YYYY, MM, DD]
    const dataVencimentoBr = `${dd}/${mm}/${yyyy}`; // monta "DD/MM/YYYY"

    const form = document.createElement("form");
    form.id = `formPag-${p.id}`;
    form.innerHTML = `
      <p>Parcela ${p.numParcela} — Valor: ${formatarMoedaBr(p.valorParcela)} — Vencimento: ${dataVencimentoBr}</p>
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

      const arquivoInput = document.getElementById(`arquivo-${p.id}`);
      const arquivo = arquivoInput.files[0];
      const recebidoPor = document.getElementById(`recebidoPor-${p.id}`).value.trim();

      if (!arquivo || !recebidoPor) {
        erroPag.textContent = "Envie arquivo e preencha 'Recebido Por'.";
        erroPag.classList.add("visivel");
        return;
      }

      try {
        // 1) Envia ao backend para salvar o comprovante e marcar parcela como paga
        await pagarParcela(p.id, { recebidoPor, arquivo });

        // 2) Busca o PDF de recibo gerado e força o download
        const pdfUrl = `${BASE_URL}/api/comprovantes/${p.id}/pdf`;
        const pdfResponse = await fetch(pdfUrl);
        if (!pdfResponse.ok) {
          throw new Error("Falha ao gerar recibo em PDF.");
        }
        const pdfBlob = await pdfResponse.blob();
        // Cria URL temporária para download
        const urlTemp = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = urlTemp;
        a.download = `recibo_parcela_${p.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(urlTemp);

        // 3) Abre o WhatsApp para conversar com o cliente
        //    O PDF já está baixado; o usuário só precisará anexá-lo manualmente
        const telefoneRaw = p.venda.cliente.telefone.replace(/\D/g, '');
        const nomeCli = encodeURIComponent(p.venda.cliente.nome);
        const textoWhats = encodeURIComponent(
          `Olá ${nomeCli}, o recibo da parcela ${p.numParcela} foi gerado e baixado.`
        );
        window.open(`https://wa.me/${telefoneRaw}?text=${textoWhats}`, "_blank");

        alert("Parcela paga com sucesso! O PDF do recibo foi baixado e o WhatsApp foi aberto.");

        // 4) Recarrega toda a lista de parcelas pendentes
        renderizarVendasPendentes();
      } catch (err) {
        erroPag.textContent = err.message;
        erroPag.classList.add("visivel");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Se não estiver logado, redireciona para login
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }
  renderizarVendasPendentes();
});
