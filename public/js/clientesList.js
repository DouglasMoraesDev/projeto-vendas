// public/js/clientesList.js

import {
  getClientes,
  atualizarCliente,
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

  // Adiciona listeners aos botões
  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      editarCliente(id);
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

// Exibe prompts para edição (simples)
async function editarCliente(id) {
  const cliente = listaClientesCache.find(c => c.id == id);
  if (!cliente) return alert("Cliente não encontrado.");

  // Solicita novos valores via prompt
  const novoNome = prompt("Novo nome:", cliente.nome);
  if (novoNome === null) return; // cancelou

  const novoCpf = prompt("Novo CPF:", cliente.cpf);
  if (novoCpf === null) return; // cancelou

  const novoTel = prompt("Novo telefone:", cliente.telefone || "");
  if (novoTel === null) return;

  const novoEnd = prompt("Novo endereço:", cliente.endereco || "");
  if (novoEnd === null) return;

  if (!novoNome.trim() || !novoCpf.trim()) {
    return alert("Nome e CPF são obrigatórios.");
  }

  try {
    await atualizarCliente(id, {
      nome: novoNome.trim(),
      cpf: novoCpf.trim(),
      telefone: novoTel.trim(),
      endereco: novoEnd.trim()
    });
    carregarLista();
  } catch (err) {
    alert("Erro ao atualizar cliente: " + err.message);
  }
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
