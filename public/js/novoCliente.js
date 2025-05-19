// public/js/novoCliente.js

import { criarCliente } from "./api.js";

const formNovoCliente = document.getElementById("formNovoCliente");
const erroCliente = document.getElementById("erroCliente");

formNovoCliente.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroCliente.textContent = "";
  erroCliente.classList.remove("visivel");

  const nome = formNovoCliente.nome.value.trim();
  const cpf = formNovoCliente.cpf.value.trim();
  const telefone = formNovoCliente.telefone.value.trim();
  const endereco = formNovoCliente.endereco.value.trim();

  if (!nome || !cpf) {
    erroCliente.textContent = "Nome e CPF são obrigatórios.";
    erroCliente.classList.add("visivel");
    return;
  }

  try {
    await criarCliente({ nome, cpf, telefone, endereco });
    alert("Cliente cadastrado com sucesso!");
    formNovoCliente.reset();
  } catch (err) {
    erroCliente.textContent = err.message;
    erroCliente.classList.add("visivel");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Se não estiver logado, redireciona para login
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
});
