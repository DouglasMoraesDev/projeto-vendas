// public/js/cadastroUsuario.js
import { registerUser } from "./api.js";

const formUser = document.getElementById("formUsuario");
const erroUser = document.getElementById("erroUsuario");

if (formUser) {
  formUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroUser.textContent = "";
    erroUser.classList.remove("visivel");

    const nome = formUser.nome.value.trim();
    const email = formUser.email.value.trim();
    const senha = formUser.senha.value.trim();
    const telefone = formUser.telefone.value.trim();
    const endereco = formUser.endereco.value.trim();

    if (!nome || !email || !senha) {
      erroUser.textContent = "Nome, e-mail e senha são obrigatórios.";
      erroUser.classList.add("visivel");
      return;
    }

    const dados = { nome, email, senha, telefone, endereco };

    try {
      await registerUser(dados);
      alert("Cadastro realizado com sucesso! Faça login.");
      window.location.href = "index.html";
    } catch (err) {
      erroUser.textContent = err.message;
      erroUser.classList.add("visivel");
    }
  });
}
