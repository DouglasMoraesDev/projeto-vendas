// src/services/api.js
const API_URL = 'http://localhost:4000';

export async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers || {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

// chamadas específicas
export const api = {
  login: creds => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(creds),
  }),
  getClientes: () => request('/clientes'),
  getMercadorias: () => request('/mercadorias'),
  createMercadoria: (data, files) => {
    // usa FormData quando houver fotos
    const form = new FormData();
    Object.entries(data).forEach(([k,v]) => form.append(k, v));
    files.forEach(file => form.append('fotos', file));
    return fetch(`${API_URL}/mercadorias`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: form,
    }).then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    });
  },
  // ... demais chamadas (updateMercadoria, deleteMercadoria, etc.)
};
