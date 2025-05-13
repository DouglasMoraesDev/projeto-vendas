import { loginPage }      from './pages/login.js';
import { dashboardPage }  from './pages/dashboard.js';
import { clientesPage }   from './pages/clientes.js';
import { mercadoriasPage }from './pages/mercadorias.js';
import { vendasPage }     from './pages/vendas.js';
import { parcelasPage }   from './pages/parcelas.js';
import { historicoPage }  from './pages/historico.js';
import { comprovantesPage } from './pages/comprovantes.js';
import { lojaPage }       from './pages/loja.js';

const routes = {
  '/login':       loginPage,
  '/dashboard':   dashboardPage,
  '/clientes':    clientesPage,
  '/mercadorias': mercadoriasPage,
  '/vendas':      vendasPage,
  '/parcelas':    parcelasPage,
  '/historico':   historicoPage,
  '/comprovantes': comprovantesPage,
  '/loja':        lojaPage,
};

export function router() {
  const token = localStorage.getItem('token');
  let path = location.hash.slice(1) || (token ? '/dashboard' : '/login');

  if (!token && path !== '/login') {
    // força login se não autenticado
    path = '/login';
    location.hash = '#/login';
  }

  // pega a função de página, depois chama para obter o objeto
  const pageFunc = routes[path] || dashboardPage;
  const page = pageFunc();

  // renderiza e inicializa
  document.getElementById('app').innerHTML = page.template();
  page.init();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
