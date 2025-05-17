import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

// Detecta ambiente local vs. produção
const IS_LOCAL = window.location.hostname === 'localhost';

// Host da API (sem o /api) — usado para montar URLs de imagem/PDF
const API_HOST = IS_LOCAL
  ? 'http://localhost:4000'
  : 'https://projeto-vendas-production.up.railway.app';

// Base para chamadas REST (inclui /api)
const API_BASE = `${API_HOST}/api`;

// Exports
export { API_HOST, API_BASE };

// Cria instância do axios
const API = axios.create({ baseURL: API_BASE });

// Adiciona Bearer token em todas as requisições, se presente
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
}, err => Promise.reject(err));

// Métodos de chamada à API
export const api = {
  register: data => API.post('/auth/register', data),
  login:    data => API.post('/auth/login',    data),

  getClientes:   () => API.get('/clientes'),
  createCliente: d  => API.post('/clientes', d),

  getMercadorias:    () => API.get('/mercadorias'),
  createMercadoria: (d, files) => {
    const form = new FormData();
    Object.entries(d).forEach(([k,v]) => form.append(k, v));
    files.slice(0,5).forEach(f => form.append('fotos', f));
    return API.post('/mercadorias', form);
  },

  getVendas:   () => API.get('/vendas'),
  createVenda: d => API.post('/vendas', d),

  getParcelasPending: () => API.get('/parcelas/pending'),
  payParcela: (id, file, recebidoPor) => {
    const form = new FormData();
    form.append('comprovante', file);
    form.append('recebidoPor', recebidoPor);
    return API.post(`/parcelas/${id}/pay`, form);
  },

  getComprovantes: clienteId =>
    API.get(`/comprovantes?clienteId=${clienteId}`),
  baixarPdf: parcelaId => {
    const pdfUrl = `${API_HOST}/api/comprovantes/${parcelaId}/pdf`;
    window.open(pdfUrl, '_blank');
  }
};
