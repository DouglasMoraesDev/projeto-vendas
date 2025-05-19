// public/js/novoProduto.js

import { criarProduto } from "./api.js";

const formNovoProduto = document.getElementById("formNovoProduto");
const erroProduto = document.getElementById("erroProduto");

// Converte string do tipo “15.000,00” → float 15000.00
function parseMoedaBr(valorStr) {
  return parseFloat(valorStr.replace(/\./g, "").replace(",", ".")) || 0;
}

formNovoProduto.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroProduto.textContent = "";
  erroProduto.classList.remove("visivel");

  const nome = formNovoProduto.nome.value.trim();
  const descricao = formNovoProduto.descricao.value.trim();
  const valorUnitario = parseMoedaBr(formNovoProduto.valor.value);
  const quantidadeEstoque = parseInt(formNovoProduto.quantidade.value) || 0;
  const fotos = Array.from(formNovoProduto.fotos.files);

  if (!nome || valorUnitario <= 0 || quantidadeEstoque < 0) {
    erroProduto.textContent = "Preencha nome, valor e quantidade corretamente.";
    erroProduto.classList.add("visivel");
    return;
  }

  try {
    await criarProduto({ nome, descricao, valorUnitario, quantidadeEstoque, fotos });
    alert("Produto cadastrado com sucesso!");
    // Limpa formulário após cadastro
    formNovoProduto.reset();
  } catch (err) {
    erroProduto.textContent = err.message;
    erroProduto.classList.add("visivel");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Se não estiver logado, redireciona
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
});
