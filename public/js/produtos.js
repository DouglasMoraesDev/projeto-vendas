// public/js/produtos.js
import {
  getProdutos,
  criarProduto,
  atualizarProduto,
  excluirProduto,
} from "./api.js";

const containerListaProdutos = document.getElementById("listaProdutos");
const formProduto = document.getElementById("formProduto");
const erroProduto = document.getElementById("erroProduto");

// ---------------------------
// 1. CARREGA LISTA DE PRODUTOS COM FOTOS
// ---------------------------
async function carregarLista() {
  try {
    const produtos = await getProdutos();
    if (!containerListaProdutos) return;
    containerListaProdutos.innerHTML = "";

    produtos.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Renderiza a primeira foto (se houver) e restante da info
      const primeiraFoto = p.fotos.length
        ? `<img src="${p.fotos[0].caminho}" alt="${p.nome}" />`
        : "";

      card.innerHTML = `
        ${primeiraFoto}
        <h4>${p.nome}</h4>
        <p>Valor Unitário: R$ ${p.valorUnitario.toFixed(2)}</p>
        <p>Em estoque: ${p.quantidadeEstoque}</p>
        <button class="editar-btn" data-id="${p.id}">Editar</button>
        <button class="excluir-btn" data-id="${p.id}">Excluir</button>
      `;

      containerListaProdutos.appendChild(card);
    });

    // Eventos dos botões
    document.querySelectorAll(".editar-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        preencherFormParaEdicao(id);
      });
    });

    document.querySelectorAll(".excluir-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Deseja realmente excluir este produto?")) {
          try {
            await excluirProduto(id);
            carregarLista();
          } catch (err) {
            alert("Erro ao excluir produto: " + err.message);
          }
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

// ---------------------------
// 2. CADASTRAR/EDITAR PRODUTO
// ---------------------------
if (formProduto) {
  formProduto.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroProduto.textContent = "";
    erroProduto.classList.remove("visivel");

    // Prepara dados
    const idEdicao = formProduto.dataset.id; // se existir, é edição
    const nome = formProduto.nome.value.trim();
    const descricao = formProduto.descricao.value.trim();
    const valorUnitario = parseFloat(formProduto.valor.value);
    const quantidadeEstoque = parseInt(formProduto.quantidade.value);
    const fotos = Array.from(formProduto.fotos.files); // FileList → Array<File>

    if (!nome || isNaN(valorUnitario) || isNaN(quantidadeEstoque)) {
      erroProduto.textContent = "Nome, valor e quantidade são obrigatórios.";
      erroProduto.classList.add("visivel");
      return;
    }

    const dados = {
      nome,
      descricao,
      valorUnitario,
      quantidadeEstoque,
      fotos, // enviamos mesmo que seja edição; backend só grava se fossem novos arquivos quando criamos
    };

    try {
      if (idEdicao) {
        // Ao editar, não enviamos fotos novas (backend update não trata foto)
        await atualizarProduto(idEdicao, { nome, descricao, valorUnitario, quantidadeEstoque });
        formProduto.removeAttribute("data-id");
        formProduto.querySelector("button[type=submit]").textContent =
          "Cadastrar Produto";
      } else {
        await criarProduto(dados);
      }
      formProduto.reset();
      carregarLista();
    } catch (err) {
      erroProduto.textContent = err.message;
      erroProduto.classList.add("visivel");
    }
  });
}

// ---------------------------
// 3. PREENCHER FORM PARA EDIÇÃO
// ---------------------------
async function preencherFormParaEdicao(id) {
  try {
    const produto = await getProdutos().then((lista) =>
      lista.find((p) => p.id == id)
    );
    if (!produto) throw new Error("Produto não encontrado");

    formProduto.nome.value = produto.nome;
    formProduto.descricao.value = produto.descricao;
    formProduto.valor.value = produto.valorUnitario;
    formProduto.quantidade.value = produto.quantidadeEstoque;
    // Fotos existentes não são exibidas no input; para remover fotos antigas,
    // teria que criar lógica extra, mas aqui o foco é CRUD básico.

    formProduto.dataset.id = produto.id;
    formProduto.querySelector("button[type=submit]").textContent =
      "Atualizar Produto";
  } catch (err) {
    alert("Erro ao buscar produto: " + err.message);
  }
}

// ---------------------------
// 4. INICIALIZAÇÃO
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  carregarLista();
});
