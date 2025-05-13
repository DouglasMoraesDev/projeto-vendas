// src/pages/login.js
import { api } from '../api.js';

export function loginPage() {
  return {
    template() {
      return `
        <h2>Login</h2>
        <form id="login-form">
          <input name="email"     type="email"    placeholder="E-mail" required />
          <input name="senha"     type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
        <p id="error" style="color:red;"></p>
      `;
    },
    init() {
      const form = document.getElementById('login-form');
      const errEl = document.getElementById('error');
      form.onsubmit = async e => {
        e.preventDefault();
        errEl.textContent = '';
        const data = {
          email: form.email.value,
          senha: form.senha.value,
        };
        try {
          const res = await api.login(data);
          localStorage.setItem('token', res.data.token);
          location.hash = '#/dashboard';
        } catch (err) {
          errEl.textContent = err.response?.data?.error || err.message;
        }
      };
    }
  };
}
