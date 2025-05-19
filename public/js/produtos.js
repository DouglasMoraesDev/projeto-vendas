// public/js/produtos.js

import {
  getProdutos,
  atualizarProduto,
  excluirProduto
} from "./api.js";

const containerListaProdutos = document.getElementById("listaProdutos");
const buscaInput = document.getElementById("buscaProduto");

// Formata R$ 1.234,56
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Converte string do tipo “15.000,00” → float 15000.00
function parseMoedaBr(valorStr) {
  return parseFloat(valorStr.replace(/\./g, "").replace(",", ".")) || 0;
}

let listaProdutosCache = [];

// Carrega lista de produtos do backend e renderiza
async function carregarLista() {
  try {
    const produtos = await getProdutos();
    listaProdutosCache = produtos;
    filtrarERenderizar(produtos);
  } catch (err) {
    console.error(err);
  }
}

// Filtra por nome e renderiza
function filtrarERenderizar(produtos) {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo)
  );
  renderizarProdutos(filtrados);
}

// Renderiza os cards dos produtos
function renderizarProdutos(produtos) {
  if (!containerListaProdutos) return;
  containerListaProdutos.innerHTML = "";

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Renderiza todas as fotos (até 5)
    let fotosHtml = "";
    if (Array.isArray(p.fotos) && p.fotos.length > 0) {
      fotosHtml = p.fotos
        .map(foto => {
          return `<img src="${foto.caminho.startsWith('http') ? foto.caminho : foto.caminho}" alt="${p.nome}" />`;
        })
        .join("");
    }

    card.innerHTML = `
      <div class="fotos-container">${fotosHtml}</div>
      <h4>${p.nome}</h4>
      <p>Descrição: ${p.descricao || ""}</p>
      <p>Valor: ${formatarMoedaBr(p.valorUnitario)}</p>
      <p>Em estoque: ${p.quantidadeEstoque}</p>
      <button class="editar-btn" data-id="${p.id}">Editar</button>
      <button class="excluir-btn" data-id="${p.id}">Excluir</button>
    `;
    containerListaProdutos.appendChild(card);
  });

  // Associar evento de excluir
  document.querySelectorAll(".excluir-btn").forEach(btn => {
    btn.addEventListener("click", async e => {
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

  // Associar evento de editar (abre prompt simples para demo)
  document.querySelectorAll(".editar-btn").forEach(btn => {
    btn.addEventListener("click", async e => {
      const id = e.target.dataset.id;
      const produto = listaProdutosCache.find(p => p.id == id);
      if (!produto) return alert("Produto não encontrado");

      // Prompt simplificado para editar apenas nome e valor
      const novoNome = prompt("Novo nome:", produto.nome);
      if (novoNome === null) return; // cancelou

      const novoValorStr = prompt("Novo valor (Ex: 15.000,00):", produto.valorUnitario.toFixed(2).replace(".", ","));
      if (novoValorStr === null) return; // cancelou
      const novoValor = parseMoedaBr(novoValorStr);

      if (!novoNome.trim() || isNaN(novoValor) || novoValor <= 0) {
        return alert("Dados inválidos.");
      }

      try {
        await atualizarProduto(id, {
          nome: novoNome.trim(),
          descricao: produto.descricao,
          valorUnitario: novoValor,
          quantidadeEstoque: produto.quantidadeEstoque
        });
        carregarLista();
      } catch (err) {
        alert("Erro ao atualizar: " + err.message);
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
    filtrarERenderizar(listaProdutosCache);
  });
});
