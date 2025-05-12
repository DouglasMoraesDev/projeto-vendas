// src/services/api.js

const API_URL = 'http://localhost:4000';

function buildUrl(path) {
  // Garante que o path comece com /
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers || {};

  // Só define Content-Type para JSON (não para FormData)
  if (!options.body || typeof options.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path), {
    ...options,
    headers,
  });

  if (!res.ok) {
    // Tenta extrair mensagem de erro do JSON; se não, usa statusText
    let errMsg;
    try {
      const err = await res.json();
      errMsg = err.error || err.message || res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }

  // Se for 204 No Content, não tenta parsear JSON
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Autenticação
  login: creds =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    }),

  // Clientes
  getClientes: () => request('/clientes'),
  getClienteById: id => request(`/clientes/${id}`),
  createCliente: data =>
    request('/clientes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateCliente: (id, data) =>
    request(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteCliente: id =>
    request(`/clientes/${id}`, {
      method: 'DELETE',
    }),

  // Mercadorias
  getMercadorias: () => request('/mercadorias'),
  getMercadoriaById: id => request(`/mercadorias/${id}`),
  createMercadoria: (data, files) => {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, v));
    files.slice(0, 5).forEach(file => form.append('fotos', file));

    return fetch(buildUrl('/mercadorias'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // Não definir Content-Type aqui para deixar o browser setá-lo
      },
      body: form,
    }).then(async res => {
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }
      return res.json();
    });
  },
  updateMercadoria: (id, data) =>
    request(`/mercadorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteMercadoria: id =>
    request(`/mercadorias/${id}`, {
      method: 'DELETE',
    }),

  // TODO: adicionar chamadas para Vendas, Parcelas, Comprovantes...
};
