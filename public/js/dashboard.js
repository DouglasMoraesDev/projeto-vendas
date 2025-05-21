// public/js/dashboard.js

import { BASE_URL } from "./api.js";

// Busca dados agregados para exibir no dashboard
async function fetchDashboard() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    throw new Error("Erro ao buscar dados do dashboard");
  }
  return resp.json();
}

// Formata número como moeda em BRL
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}


async function fetchVisitas() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/visitas/count`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) throw new Error("Erro ao buscar visitas");
  const json = await resp.json();
  return json.total;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }

  try {
    const [resumo, totalVisitas] = await Promise.all([
      fetchDashboard(),
      fetchVisitas()
    ]);
    resumo.totalVisitas = totalVisitas;  // injeta o dado
    renderizarResumo(resumo);
    renderizarNotificacoes(resumo.notificacoes);
  } catch (err) {
    console.error(err);
  }
});
// Exibe totais de clientes, produtos, vendas e visitas
function renderizarResumo(resumo) {
  document.getElementById("totalClientes").textContent =
    resumo.totalClientes;
  document.getElementById("totalProdutos").textContent =
    resumo.totalProdutos;
  document.getElementById("totalVendas").textContent = resumo.totalVendas;
  document.getElementById("totalVisitas").textContent = resumo.totalVisitas;
}

// Exibe notificações de parcelas a vencer (recebido no mesmo JSON)
function renderizarNotificacoes(notificacoes) {
  const container = document.getElementById("notificacoes");
  container.innerHTML = "";
  if (!notificacoes || notificacoes.length === 0) {
    container.innerHTML = "<p>Não há parcelas vencendo hoje.</p>";
    return;
  }
  notificacoes.forEach((n) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <p>Cliente: ${n.clienteNome}</p>
      <p>Venda ID: ${n.vendaId}</p>
      <p>Parcela nº ${n.numParcela} — Valor: ${formatarMoedaBr(
      n.valorParcela
    )}</p>
    `;
    container.appendChild(div);
  });
}


