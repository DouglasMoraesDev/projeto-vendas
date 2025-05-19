// public/js/storeRegister.js

import { BASE_URL } from "./api.js";

const formStoreRegister = document.getElementById("formStoreRegister");
const erroStore = document.getElementById("erroStore");

formStoreRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroStore.textContent = "";
  erroStore.classList.remove("visivel");

  const nome = formStoreRegister.nome.value.trim();
  const email = formStoreRegister.email.value.trim();
  const telefone = formStoreRegister.telefone.value.trim();
  const senha = formStoreRegister.senha.value;

  if (!nome || !email || !telefone || !senha) {
    erroStore.textContent = "Todos os campos são obrigatórios.";
    erroStore.classList.add("visivel");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/store/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, senha }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Erro no cadastro");
    }
    alert("Cadastro realizado com sucesso! Faça login.");
    window.location.href = "storeLogin.html";
  } catch (err) {
    erroStore.textContent = err.message;
    erroStore.classList.add("visivel");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("lojavisitante_token")) {
    window.location.href = "loja.html";
  }
});
