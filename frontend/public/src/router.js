// src/router.js

import { loginPage }      from './pages/login.js';
import { dashboardPage }  from './pages/dashboard.js';
import { clientesPage }   from './pages/clientes.js';
import { mercadoriasPage }from './pages/mercadorias.js';
import { vendasPage }     from './pages/vendas.js';
import { parcelasPage }   from './pages/parcelas.js';
import { historicoPage }  from './pages/historico.js';
import { lojaPage }       from './pages/loja.js';

const routes = {
  '/login':      loginPage,
  '/dashboard':  dashboardPage,
  '/clientes':   clientesPage,
  '/mercadorias':mercadoriasPage,
  '/vendas':     vendasPage,
  '/parcelas':   parcelasPage,
  '/historico':  historicoPage,
  '/loja':       lojaPage,
};

export function router() {
  const token = localStorage.getItem('token');
  let path = location.hash.slice(1) || (token ? '/dashboard' : '/login');

  // se não logado, força /login
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
