// public/js/login.js
import { loginUser } from "./api.js";

const form = document.querySelector("#loginForm");
const erroDiv = document.querySelector("#erroLogin");

// Se o formulário de login existir nesta página, adiciona o event listener
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const senha = form.senha.value.trim();

    // Limpa mensagem de erro antes de tentar
    erroDiv.textContent = "";
    erroDiv.classList.remove("visivel");

    try {
      // Chama a API para autenticar
      const { token } = await loginUser(email, senha);
      // Salva o token no localStorage
      localStorage.setItem("token", token);
      // Redireciona para a página principal após login
      window.location.href = "dashboard.html";
    } catch (err) {
      // Mostra a mensagem de erro retornada pela API
      erroDiv.textContent = err.message;
      erroDiv.classList.add("visivel");
    }
  });
}
