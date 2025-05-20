// public/js/clientesList.js

import {
  getClientes,
  excluirCliente
} from "./api.js";

const containerListaClientes = document.getElementById("listaClientes");
const buscaInput = document.getElementById("buscaCliente");

let listaClientesCache = [];

// Carrega todos os clientes e renderiza
async function carregarLista() {
  try {
    const clientes = await getClientes();
    listaClientesCache = clientes;
    filtrarERenderizar(clientes);
  } catch (err) {
    console.error(err);
  }
}

// Filtra a lista pelo nome e chama renderizar
function filtrarERenderizar(clientes) {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(termo)
  );
  renderizarClientes(filtrados);
}

// Renderiza os cards de clientes
function renderizarClientes(clientes) {
  if (!containerListaClientes) return;
  containerListaClientes.innerHTML = "";

  clientes.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h4>${c.nome}</h4>
      <p>CPF: ${c.cpf}</p>
      <p>Telefone: ${c.telefone || "-"}</p>
      <p>Endereço: ${c.endereco || "-"}</p>
      <button class="editar-btn" data-id="${c.id}">Editar</button>
      <button class="excluir-btn" data-id="${c.id}">Excluir</button>
    `;
    containerListaClientes.appendChild(card);
  });

  // Botão “Editar” agora redireciona para a página de edição
  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      window.location.href = `novoCliente.html?edit=${id}`;
    });
  });

  document.querySelectorAll(".excluir-btn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const id = e.target.dataset.id;
      if (confirm("Tem certeza que deseja excluir este cliente?")) {
        try {
          await excluirCliente(id);
          carregarLista();
        } catch (err) {
          alert("Erro ao excluir cliente: " + err.message);
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Se não estiver logado, redireciona
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }
  carregarLista();

  // Filtrar conforme digita
  buscaInput.addEventListener("input", () => {
    filtrarERenderizar(listaClientesCache);
  });
});
