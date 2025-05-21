import {
  getClientes,
  excluirCliente
} from "./api.js";

const containerListaClientes = document.getElementById("listaClientes");
const buscaInput = document.getElementById("buscaCliente");

let listaClientesCache = [];

/**
 * Carrega todos os clientes do backend e inicia renderização
 */
async function carregarLista() {
  try {
    const clientes = await getClientes();
    listaClientesCache = clientes;
    filtrarERenderizar(clientes);
  } catch (err) {
    console.error(err);
    // Exibe modal de erro caso falhe ao buscar os dados
    Swal.fire('Erro', 'Falha ao carregar clientes: ' + err.message, 'error');
  }
}

/**
 * Filtra a lista de clientes pelo termo de busca e chama renderização
 * @param {Array} clientes – lista de clientes a filtrar
 */
function filtrarERenderizar(clientes) {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(termo)
  );
  renderizarClientes(filtrados);
}

/**
 * Gera os cards HTML para cada cliente e configura botões de ação
 * @param {Array} clientes – lista de clientes a renderizar
 */
function renderizarClientes(clientes) {
  if (!containerListaClientes) return;

  // Limpa o container antes de renderizar
  containerListaClientes.innerHTML = "";

  clientes.forEach(c => {
    // Cria o card
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = c.id; // armazena ID no atributo data-id

    // Monta o conteúdo do card
    card.innerHTML = `
      <h4 class="cliente-nome">${c.nome}</h4>
      <p>CPF: ${c.cpf}</p>
      <p>Telefone: ${c.telefone || "-"}</p>
      <p>Endereço: ${c.endereco || "-"}</p>
      <button class="editar-btn" data-id="${c.id}">Editar</button>
      <button class="excluir-btn" data-id="${c.id}">Excluir</button>
    `;

    containerListaClientes.appendChild(card);
  });

  // Configura ação de edição: redireciona para a página de edição
  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      window.location.href = `novoCliente.html?edit=${id}`;
    });
  });

  // Configura ação de exclusão usando SweetAlert2
  document.querySelectorAll(".excluir-btn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const card = btn.closest('.card');
      const nome = card.querySelector('.cliente-nome').textContent.trim();
      const id = btn.dataset.id;

      // Modal de confirmação
      const result = await Swal.fire({
        title: 'Excluir Cliente',
        text: `Tem certeza que deseja remover "${nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      });

      if (result.isConfirmed) {
        try {
          await excluirCliente(id);
          // Recarrega a lista após exclusão bem-sucedida
          carregarLista();
          // Feedback visual de sucesso
          await Swal.fire('Excluído!', `"${nome}" foi removido.`, 'success');
        } catch (err) {
          // Exibe erro caso a exclusão falhe
          await Swal.fire('Erro', 'Não foi possível excluir: ' + err.message, 'error');
        }
      }
    });
  });
}

// Executa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Valida sessão: redireciona se não houver token
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }

  carregarLista(); // inicia carga de dados

  // Atualiza filtro à medida que o usuário digita
  buscaInput.addEventListener("input", () => {
    filtrarERenderizar(listaClientesCache);
  });
});
