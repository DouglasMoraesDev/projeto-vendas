// api.js – centraliza chamadas à API
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm';

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // ajuste conforme deploy
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const api = {
  register: data => API.post('/auth/register', data),
  login:    data => API.post('/auth/login',    data),

  getClientes:    () => API.get('/clientes'),
  createCliente:  d => API.post('/clientes', d),

  getMercadorias:    () => API.get('/mercadorias'),
  createMercadoria: (d, files) => {
    const form = new FormData();
    Object.entries(d).forEach(([k,v]) => form.append(k,v));
    files.slice(0,5).forEach(f => form.append('fotos', f));
    return API.post('/mercadorias', form);
  },

  createVenda:   d => API.post('/vendas', d),
  getVendas:     () => API.get('/vendas'),

  getParcelasPending: () => API.get('/parcelas/pending'),
  payParcela: (id, file, recebidoPor) => {
    const form = new FormData();
    form.append('comprovante', file);
    form.append('recebidoPor', recebidoPor);
    return API.post(`/parcelas/${id}/pay`, form);
  },

  getComprovantes: clienteId => API.get(`/comprovantes?clienteId=${clienteId}`),
  baixarPdf: parcelaId => window.open(`${API.defaults.baseURL}/comprovantes/${parcelaId}/pdf`, '_blank'),
};
