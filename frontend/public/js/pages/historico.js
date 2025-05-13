// src/pages/historico.js
import { api } from '../api.js';

export function historicoPage() {
  return {
    template() {
      return `
        <h2>Histórico Completo</h2>
        <ul id="hist-list"></ul>
      `;
    },
    async init() {
      const ul = document.getElementById('hist-list');
      const vendas = (await api.getVendas()).data;
      ul.innerHTML = vendas.map(v => {
        const parcelas = v.parcelas.map(p =>
          `Parcela ${p.numParcela}: ${p.pago ? 'Pago' : 'Aberto'}`
        ).join('; ');
        return `<li>
          #${v.id} • ${v.cliente.nome} • ${v.tipoPagamento} • R$${v.valorTotal.toFixed(2)} • ${parcelas}
        </li>`;
      }).join('');
    }
  };
}
