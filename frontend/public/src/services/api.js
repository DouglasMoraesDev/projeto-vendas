// src/services/api.js
import axios from 'axios';

// Configura a URL base para o backend no Railway
const API = axios.create({
  baseURL: 'https://projeto-vendas-production.up.railway.app',
});

// Injeta automaticamente o token em todas as requisições
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export const api = {
  // --- Autenticação ---
  register: data => API.post('/auth/register', data),
  login:    data => API.post('/auth/login', data),

  // --- Clientes ---
  getClientes:    () => API.get('/clientes'),
  getClienteById: id => API.get(`/clientes/${id}`),
  createCliente:  data => API.post('/clientes', data),
  updateCliente:  (id, data) => API.put(`/clientes/${id}`, data),
  deleteCliente:  id => API.delete(`/clientes/${id}`),

  // --- Mercadorias ---
  getMercadorias:    () => API.get('/mercadorias'),
  getMercadoriaById: id => API.get(`/mercadorias/${id}`),
  createMercadoria: (data, files) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    files.slice(0, 5).forEach(f => form.append('fotos', f));
    // Permitir que o browser defina multipart boundary
    return API.post('/mercadorias', form, {
      headers: form.getHeaders ? form.getHeaders() : {},
    });
  },
  updateMercadoria: (id, data) => API.put(`/mercadorias/${id}`, data),
  deleteMercadoria: id => API.delete(`/mercadorias/${id}`),

  // --- Vendas ---
  createVenda:      data => API.post('/vendas', data),
  getVendas:        () => API.get('/vendas'),
  getVendaById:     id => API.get(`/vendas/${id}`),

  // --- Parcelas ---
  getParcelasPending:   () => API.get('/parcelas/pending'),
  payParcela: (id, file, recebidoPor) => {
    const form = new FormData();
    form.append('comprovante', file);
    form.append('recebidoPor', recebidoPor);
    return API.post(`/parcelas/${id}/pay`, form, {
      headers: form.getHeaders ? form.getHeaders() : {},
    });
  },
  getParcelasByCliente: clienteId => API.get(`/parcelas?clienteId=${clienteId}`),

  // --- Comprovantes ---
  getComprovantes: clienteId => API.get(`/comprovantes?clienteId=${clienteId}`),
};
