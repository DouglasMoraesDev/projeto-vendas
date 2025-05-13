// src/pages/parcelas.js
import { api } from '../api.js';

export function parcelasPage() {
  return {
    template() {
      return `
        <h2>Parcelas em Aberto</h2>
        <ul id="lista-parcelas"></ul>
      `;
    },
    async init() {
      const ul = document.getElementById('lista-parcelas');
      const res = await api.getParcelasPending();
      ul.innerHTML = res.data.map(p =>
        `<li>
           Venda #${p.vendaId} • Parcela ${p.numParcela} • Vence em ${new Date(p.dataVencimento).toLocaleDateString()}
           <input type="file" id="file-${p.id}"/>
           <input placeholder="Recebido por" id="rec-${p.id}"/>
           <button data-id="${p.id}">Pagar</button>
         </li>`
      ).join('');
      // attach handlers
      ul.querySelectorAll('button').forEach(btn => {
        btn.onclick = async () => {
          const id = btn.dataset.id;
          const file = document.getElementById(`file-${id}`).files[0];
          const rec  = document.getElementById(`rec-${id}`).value;
          try {
            await api.payParcela(id, file, rec);
            this.init();
          } catch (err) {
            alert(err.response?.data?.error || err.message);
          }
        };
      });
    }
  };
}
