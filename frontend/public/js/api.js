// api.js – centraliza chamadas à API
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

// Se quiser alterar o host/porta de um deploy, basta definir:
// window.API_BASE_URL = 'https://meu-dominio.com/api';
const IS_LOCAL = window.location.hostname === 'localhost';
const API_BASE = IS_LOCAL
  ? 'http://localhost:4000/api'
  : 'https://projeto-vendas-production.up.railway.app/api';

const API = axios.create({
  baseURL: API_BASE,
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
}, err => Promise.reject(err));

export const api = {
  // Autenticação
  register: data => API.post('/auth/register', data),
  login:    data => API.post('/auth/login',    data),

  // Clientes
  getClientes:   () => API.get('/clientes'),
  createCliente: d  => API.post('/clientes', d),

  // Mercadorias
  getMercadorias:    () => API.get('/mercadorias'),
  createMercadoria: (d, files) => {
    const form = new FormData();
    // adiciona todos os campos do objeto d
    Object.entries(d).forEach(([key, val]) => form.append(key, val));
    // envia até 5 imagens por upload
    files.slice(0, 5).forEach(file => form.append('fotos', file));
    return API.post('/mercadorias', form);
  },

  // Vendas
  createVenda: d => API.post('/vendas', d),
  getVendas:   () => API.get('/vendas'),

  // Parcelas
  getParcelasPending: () => API.get('/parcelas/pending'),
  payParcela: (id, file, recebidoPor) => {
    const form = new FormData();
    form.append('comprovante', file);
    form.append('recebidoPor', recebidoPor);
    return API.post(`/parcelas/${id}/pay`, form);
  },

  // Comprovantes
  getComprovantes: clienteId =>
    API.get(`/comprovantes?clienteId=${clienteId}`),
  baixarPdf: parcelaId => {
    // abre o PDF numa nova aba
    const pdfUrl = `${API_BASE}/comprovantes/${parcelaId}/pdf`;
    window.open(pdfUrl, '_blank');
  }
};
