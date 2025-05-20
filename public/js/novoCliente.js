// public/js/novoCliente.js

import { criarCliente, getClienteById, atualizarCliente } from "./api.js";

const formNovoCliente = document.getElementById("formNovoCliente");
const erroCliente = document.getElementById("erroCliente");
const titulo = document.querySelector("h1"); // o <h1> em novoCliente.html
const botaoSubmit = formNovoCliente.querySelector("button[type='submit']");

let modoEdicao = false;
let clienteId = null;

// 1. Detecta se veio ?edit=<id>
const paramsCli = new URLSearchParams(location.search);
if (paramsCli.has("edit")) {
  modoEdicao = true;
  clienteId = paramsCli.get("edit");
  titulo.textContent = `Editar Cliente #${clienteId}`;       // muda o título da página
  botaoSubmit.textContent = "Atualizar Cliente";             // muda o texto do botão

  // Buscar dados do cliente e preencher os campos
  getClienteById(clienteId)
    .then(c => {
      formNovoCliente.nome.value = c.nome;
      formNovoCliente.cpf.value = c.cpf;
      formNovoCliente.telefone.value = c.telefone || "";
      formNovoCliente.endereco.value = c.endereco || "";
    })
    .catch(() => {
      erroCliente.textContent = "Não foi possível carregar os dados do cliente.";
      erroCliente.classList.add("visivel");
    });
}

// 2. Submissão do formulário (criar ou atualizar)
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
    if (modoEdicao) {
      // Atualiza no backend
      await atualizarCliente(clienteId, { nome, cpf, telefone, endereco });
      alert("Cliente atualizado com sucesso!");
    } else {
      // Cria novo
      await criarCliente({ nome, cpf, telefone, endereco });
      alert("Cliente cadastrado com sucesso!");
    }
    // Após criar/atualizar, volta para a lista
    window.location.href = "clientesList.html";
  } catch (err) {
    erroCliente.textContent = err.message;
    erroCliente.classList.add("visivel");
  }
});

// 3. Se não estiver logado, volta para login
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
});
