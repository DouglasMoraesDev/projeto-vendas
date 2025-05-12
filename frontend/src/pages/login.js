// src/pages/login.js
import { api } from '../services/api.js';

export function loginPage() {
  return {
    template() {
      return `
        <div class="login-container">
          <h2>Entrar no Gerenciador</h2>
          <form id="login-form">
            <label>
              E-mail:
              <input type="email" name="email" required />
            </label>
            <label>
              Senha:
              <input type="password" name="senha" required />
            </label>
            <button type="submit">Login</button>
          </form>
          <p id="error-msg" style="color: red; display: none;"></p>
        </div>
      `;
    },
    init() {
      const form = document.getElementById('login-form');
      const errorMsg = document.getElementById('error-msg');

      form.onsubmit = async (e) => {
        e.preventDefault();
        errorMsg.style.display = 'none';

        const email = form.email.value.trim();
        const senha = form.senha.value;

        try {
          const { token } = await api.login({ email, senha });
          // guarda token e redireciona
          localStorage.setItem('token', token);
          location.hash = '#/mercadorias';
        } catch (err) {
          errorMsg.textContent = err.message;
          errorMsg.style.display = 'block';
        }
      };
    }
  };
}
