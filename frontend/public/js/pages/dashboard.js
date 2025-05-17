// public/js/pages/dashboard.js
import { router } from '../main.js';  // se precisar navegar de dentro
export function dashboardPage() {
  return {
    template() {
      return `
        <h1>Dashboard</h1>
        <nav>
          <a href="#/clientes">Clientes</a> |
          <a href="#/mercadorias">Mercadorias</a> |
          <a href="#/vendas">Vendas</a> |
          <a href="#/parcelas">Parcelas</a> |
          <a href="#/historico">Histórico</a> |
          <a href="#/comprovantes">Comprovantes</a> |
          <a href="#/loja">Loja</a>
        </nav>
        <button id="btn-logout">Sair</button>
      `;
    },
    init() {
      document.getElementById('btn-logout').onclick = () => {
        localStorage.removeItem('token');
        location.hash = '#/login';
      };
    }
  };
}
