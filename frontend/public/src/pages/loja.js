// src/pages/loja.js
import { api } from '../services/api.js';

export function lojaPage() {
  return {
    template() {
      return `<h2>Loja Pública</h2><div id="loja-cards"></div>`;
    },
    async init() {
      const div = document.getElementById('loja-cards');
      const mercs = (await api.getMercadorias()).data;
      div.innerHTML = mercs.map(m => `
        <div class="card">
          <h4>${m.nome}</h4>
          <p>R$ ${m.valorUnitario.toFixed(2)}</p>
          <button data-id="${m.id}">Conversar</button>
        </div>
      `).join('');
      div.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
          const m = mercs.find(x => x.id == btn.dataset.id);
          const txt = encodeURIComponent(`Olá, tenho interesse em: ${m.nome} (R$${m.valorUnitario.toFixed(2)})`);
          window.open(`https://wa.me/<SEU_TELEFONE>?text=${txt}`, '_blank');
        };
      });
    }
  };
}
