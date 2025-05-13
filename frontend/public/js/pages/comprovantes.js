import { api } from './api.js';

async function buscarComprovantes() {
  const id = document.getElementById('cli-id').value;
  const res = await api.getComprovantes(id);
  const ul = document.getElementById('lista-comps');
  ul.innerHTML = res.data.map(c => `
    <li>
      #${c.id} • ${new Date(c.criadoEm).toLocaleString()} • Recebido por: ${c.recebidoPor}
      <button data-id="${c.parcelaId}">Baixar PDF</button>
    </li>
  `).join('');
  ul.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => api.baixarPdf(btn.dataset.id);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-buscar').onclick = buscarComprovantes;
});
