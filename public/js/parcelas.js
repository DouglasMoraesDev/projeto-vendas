// public/js/parcelas.js
import {
  getParcelasPendentes,
  pagarParcela,
  BASE_URL,
} from "./api.js";

const listaParcelasContainer = document.getElementById("listaParcelas");

// Renderiza cada parcela pendente como item na lista
async function renderizarParcelas() {
  try {
    const parcelas = await getParcelasPendentes();
    if (!listaParcelasContainer) return;
    listaParcelasContainer.innerHTML = "";

    parcelas.forEach((p) => {
      const item = document.createElement("div");
      item.classList.add("card");

      // Monta o HTML do item
      item.innerHTML = `
        <h4>Venda #${p.vendaId} — Cliente: ${p.venda.cliente.nome}</h4>
        <p>Parcela n.º ${p.numParcela} — Valor: R$ ${p.valorParcela.toFixed(
        2
      )}</p>
        <p>Vencimento: ${new Date(p.dataVencimento).toLocaleDateString()}</p>
        <form id="formPag-${p.id}" enctype="multipart/form-data">
          <label for="arquivo-${p.id}">Upload Comprovante (PDF/imagem):</label>
          <input type="file" id="arquivo-${p.id}" name="comprovante" accept="image/*,.pdf" required />
          <label for="recebidoPor-${p.id}">Recebido Por:</label>
          <input type="text" id="recebidoPor-${p.id}" name="recebidoPor" required />
          <button type="submit">Pagar Parcela</button>
          <div class="erro" id="erroPag-${p.id}"></div>
        </form>
      `;

      listaParcelasContainer.appendChild(item);

      // Adiciona listener para o form de pagamento daquela parcela
      const formPag = document.getElementById(`formPag-${p.id}`);
      const erroPag = document.getElementById(`erroPag-${p.id}`);

      formPag.addEventListener("submit", async (e) => {
        e.preventDefault();
        erroPag.textContent = "";
        erroPag.classList.remove("visivel");

        const arquivoInput = document.getElementById(`arquivo-${p.id}`);
        const recebidoPorInput = document.getElementById(`recebidoPor-${p.id}`);

        const arquivo = arquivoInput.files[0];
        const recebidoPor = recebidoPorInput.value.trim();

        if (!arquivo || !recebidoPor) {
          erroPag.textContent = "Envie arquivo e preencha 'Recebido Por'.";
          erroPag.classList.add("visivel");
          return;
        }

        const dadosPagamento = { recebidoPor, arquivo };

        try {
          await pagarParcela(p.id, dadosPagamento);
          // Abre PDF do recibo gerado pelo backend
          window.open(`${BASE_URL}/api/comprovantes/${p.id}/pdf`, "_blank");
          // Gera link para WhatsApp (abre numa nova aba)
          // Supondo que o backend retorne o telefone do cliente (ou podemos usar p.venda.cliente.telefone), 
          // mas aqui o pagarParcela não retorna o cliente. Se fosse retornar, usaríamos:
          // const telefone = p.venda.cliente.telefone.replace(/\D/g, '');
          // const urlWhats = `https://wa.me/${telefone}?text=Pagamento%20da%20parcela%20${p.id}%20confirmado.`;
          // window.open(urlWhats, "_blank");

          alert("Parcela paga com sucesso!");
          renderizarParcelas(); // atualiza a lista (remove a que foi paga)
        } catch (err) {
          erroPag.textContent = err.message;
          erroPag.classList.add("visivel");
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarParcelas();
});
