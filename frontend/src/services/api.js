// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
});

// injetar token automaticamente
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const api = {
  // Auth
  register: data => API.post('/auth/register', data),
  login:    data => API.post('/auth/login', data),

  // Clientes
  getClientes:      () => API.get('/clientes'),
  getClienteById:   id => API.get(`/clientes/${id}`),
  createCliente:    data => API.post('/clientes', data),
  updateCliente:    (id, data) => API.put(`/clientes/${id}`, data),
  deleteCliente:    id => API.delete(`/clientes/${id}`),

  // Mercadorias
  getMercadorias:    () => API.get('/mercadorias'),
  getMercadoriaById: id => API.get(`/mercadorias/${id}`),
  createMercadoria: (data, files) => {
    const form = new FormData();
    Object.entries(data).forEach(([k,v]) => form.append(k,v));
    files.slice(0,5).forEach(f => form.append('fotos', f));
    return API.post('/mercadorias', form, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  updateMercadoria: (id, data) => API.put(`/mercadorias/${id}`, data),
  deleteMercadoria: id => API.delete(`/mercadorias/${id}`),

  // TODO: vendas, parcelas, comprovantes…
};
