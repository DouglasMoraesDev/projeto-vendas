import { api, API_BASE } from '../api.js';

export function comprovantesPage() {
  return {
    template() {
      return `
        <h1>Comprovantes de Pagamento</h1>
        <input id="cli-id" type="number" placeholder="ID Cliente">
        <button id="btn-buscar">Buscar</button>
        <ul id="lista-comps"></ul>
        <button id="btn-logout">Sair</button>
      `;
    },
    init() {
      // Botão busca comprovantes pelo ID de cliente
      document.getElementById('btn-buscar').onclick = async () => {
        const id = document.getElementById('cli-id').value;
        const res = await api.getComprovantes(id);
        const ul  = document.getElementById('lista-comps');
        ul.innerHTML = res.data.map(c => `
          <li>
            #${c.id} • ${new Date(c.criadoEm).toLocaleString()} • Recebido por: ${c.recebidoPor}
            <button data-id="${c.parcelaId}">Baixar PDF</button>
          </li>
        `).join('');
        // Anexa handler para cada botão de baixar
        ul.querySelectorAll('button').forEach(btn => {
          btn.onclick = () => api.baixarPdf(btn.dataset.id);
        });
      };

      // Logout volta ao login
      document.getElementById('btn-logout').onclick = () => {
        localStorage.removeItem('token');
        location.hash = '#/login';
      };
    }
  };
}
