// public/js/clientes.js
import {
  getClientes,
  criarCliente,
  atualizarCliente,
  excluirCliente,
} from "./api.js";

// Container onde listaremos os clientes (se existir)
const containerListaClientes = document.getElementById("listaClientes");
// Formulário de cadastro/edição (se existir)
const formCliente = document.getElementById("formCliente");
// Mensagem de erro
const erroCliente = document.getElementById("erroCliente");

// ---------------------------
// 1. CARREGAR LISTA DE CLIENTES
// ---------------------------
async function carregarLista() {
  try {
    const clientes = await getClientes();
    // Se não existir o container, sai
    if (!containerListaClientes) return;

    // Limpa o container antes de renderizar
    containerListaClientes.innerHTML = "";

    clientes.forEach((cliente) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h4>${cliente.nome}</h4>
        <p>CPF: ${cliente.cpf}</p>
        <p>Telefone: ${cliente.telefone}</p>
        <p>Endereço: ${cliente.endereco}</p>
        <button class="editar-btn" data-id="${cliente.id}">Editar</button>
        <button class="excluir-btn" data-id="${cliente.id}">Excluir</button>
      `;

      containerListaClientes.appendChild(card);
    });

    // Adiciona listeners aos botões de editar e excluir
    document.querySelectorAll(".editar-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        preencherFormParaEdicao(id);
      });
    });

    document.querySelectorAll(".excluir-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Tem certeza que deseja excluir este cliente?")) {
          try {
            await excluirCliente(id);
            carregarLista(); // atualiza a lista após exclusão
          } catch (err) {
            alert("Erro ao excluir cliente: " + err.message);
          }
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// ---------------------------
// 2. CADASTRAR/EDITAR CLIENTE
// ---------------------------
if (formCliente) {
  // Se o form existir, quer dizer que estamos em clientes.html
  // Adiciona listener para envio
  formCliente.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroCliente.textContent = "";
    erroCliente.classList.remove("visivel");

    // Campos do formulário
    const idEdicao = formCliente.dataset.id; // se tiver data-id, é edição
    const nome = formCliente.nome.value.trim();
    const cpf = formCliente.cpf.value.trim();
    const telefone = formCliente.telefone.value.trim();
    const endereco = formCliente.endereco.value.trim();

    if (!nome || !cpf) {
      erroCliente.textContent = "Nome e CPF são obrigatórios.";
      erroCliente.classList.add("visivel");
      return;
    }

    const dados = { nome, cpf, telefone, endereco };

    try {
      if (idEdicao) {
        // Estamos editando um cliente existente
        await atualizarCliente(idEdicao, dados);
        // Limpa o data-id para voltar ao modo “cadastrar”
        formCliente.removeAttribute("data-id");
        formCliente.querySelector("button[type=submit]").textContent =
          "Cadastrar Cliente";
      } else {
        // Criar novo cliente
        await criarCliente(dados);
      }
      // limpa formulário
      formCliente.reset();
      // atualiza lista
      carregarLista();
    } catch (err) {
      erroCliente.textContent = err.message;
      erroCliente.classList.add("visivel");
    }
  });
}

// ---------------------------
// 3. PREENCHER FORM PARA EDIÇÃO
// ---------------------------
async function preencherFormParaEdicao(id) {
  try {
    const cliente = await getClientes().then((lista) =>
      lista.find((c) => c.id == id)
    );
    if (!cliente) throw new Error("Cliente não encontrado");

    // Preenche campos
    formCliente.nome.value = cliente.nome;
    formCliente.cpf.value = cliente.cpf;
    formCliente.telefone.value = cliente.telefone;
    formCliente.endereco.value = cliente.endereco;

    // Marca o form com data-id do cliente (para saber que é edição)
    formCliente.dataset.id = cliente.id;
    formCliente.querySelector("button[type=submit]").textContent =
      "Atualizar Cliente";
  } catch (err) {
    alert("Erro ao buscar dados do cliente: " + err.message);
  }
}

// ---------------------------
// 4. INICIALIZAÇÃO
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  carregarLista();
});
