import { api } from '../api.js';

export function loginPage() {
  return {
    template() {
      return `
        <h2>Login</h2>
        <form id="form-login">
          <label>E-mail: <input type="email" name="email" required></label>
          <label>Senha:  <input type="password" name="senha" required></label>
          <button>Entrar</button>
        </form>
        <p id="error" style="color:red;"></p>
      `;
    },
    init() {
      const form = document.getElementById('form-login');
      const err  = document.getElementById('error');
      form.onsubmit = async e => {
        e.preventDefault();
        err.textContent = '';
        try {
          const res = await api.login({
            email: form.email.value,
            senha: form.senha.value
          });
          localStorage.setItem('token', res.data.token);
          location.hash = '#/dashboard';
        } catch (e) {
          err.textContent = e.response?.data?.error || e.message;
        }
      };
    }
  };
}
