// comprovantes.js
import { api } from '../api.js';

export function comprovantesPage() {
  return {
    template() {
      return `
        <h2>Comprovantes</h2>
        <input id="cli-id" type="number" placeholder="ID Cliente">
        <button id="btn-buscar">Buscar</button>
        <ul id="lista-comps"></ul>
      `;
    },
    init() {
      document.getElementById('btn-buscar').onclick = async () => {
        const id = document.getElementById('cli-id').value;
        const res = await api.getComprovantes(id);
        const ul = document.getElementById('lista-comps');
        ul.innerHTML = res.data.map(c => `
          <li>
            Comprovante #${c.id} • ${new Date(c.criadoEm).toLocaleString()} • 
            Recebido por: ${c.recebidoPor}
            <button data-id="${c.parcelaId}">Baixar PDF</button>
          </li>
        `).join('');
        ul.querySelectorAll('button').forEach(btn => {
          btn.onclick = () => api.baixarPdf(btn.dataset.id);
        });
      };
    }
  };
}
