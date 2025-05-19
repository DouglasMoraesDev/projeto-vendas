// public/js/storeLogin.js

import { BASE_URL } from "./api.js";

const formStoreLogin = document.getElementById("formStoreLogin");
const erroLoginStore = document.getElementById("erroLoginStore");

formStoreLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroLoginStore.textContent = "";
  erroLoginStore.classList.remove("visivel");

  const email = formStoreLogin.email.value.trim();
  const senha = formStoreLogin.senha.value;

  if (!email || !senha) {
    erroLoginStore.textContent = "E-mail e senha são obrigatórios.";
    erroLoginStore.classList.add("visivel");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/store/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro no login");
    }
    const data = await res.json();
    // Armazena token e dados básicos do visitante
    localStorage.setItem("lojavisitante_token", data.token);
    localStorage.setItem(
      "lojavisitante",
      JSON.stringify({
        id: data.id,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      })
    );
    window.location.href = "loja.html";
  } catch (err) {
    erroLoginStore.textContent = err.message;
    erroLoginStore.classList.add("visivel");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("lojavisitante_token")) {
    window.location.href = "loja.html";
  }
});
