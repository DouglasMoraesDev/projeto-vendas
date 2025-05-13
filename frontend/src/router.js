// src/router.js
import { loginPage } from './pages/login.js';
import { dashboardPage } from './pages/dashboard.js';
import { mercadoriasPage } from './pages/mercadorias.js';
import { clientesPage } from './pages/clientes.js';
// … importe as demais páginas …

const routes = {
  '/login':     loginPage,
  '/dashboard': dashboardPage,
  '/clientes':  clientesPage,
  '/mercadorias': mercadoriasPage,
  // … demais rotas …
};

export function router() {
  const token = localStorage.getItem('token');
  let path = location.hash.slice(1) || (token ? '/dashboard' : '/login');

  if (!token && path !== '/login') {
    path = '/login';
    location.hash = '#/login';
  }

  const page = routes[path] || dashboardPage;
  document.getElementById('app').innerHTML = page.template();
  page.init();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
