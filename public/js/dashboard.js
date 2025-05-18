// public/js/dashboard.js
import { BASE_URL } from "./api.js";

// Busca dados do dashboard
async function fetchDashboard() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) throw new Error("Erro ao buscar dados do dashboard");
  return resp.json();
}

// Formata “R$ 1.234,56”
function formatarMoedaBr(valor) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function renderizarResumo(resumo) {
  document.getElementById("totalClientes").textContent = resumo.totalClientes;
  document.getElementById("totalProdutos").textContent = resumo.totalProdutos;
  document.getElementById("totalVendas").textContent = resumo.totalVendas;
}

function renderizarNotificacoes(notificacoes) {
  const container = document.getElementById("notificacoes");
  container.innerHTML = "";
  if (notificacoes.length === 0) {
    container.innerHTML = "<p>Não há parcelas vencendo hoje.</p>";
    return;
  }
  notificacoes.forEach(n => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <p>Cliente: ${n.clienteNome}</p>
      <p>Venda ID: ${n.vendaId}</p>
      <p>Parcela n.º ${n.numParcela} — Valor: ${formatarMoedaBr(n.valorParcela)}</p>
    `;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const resumo = await fetchDashboard();
    renderizarResumo(resumo);
    renderizarNotificacoes(resumo.notificacoes);
  } catch (err) {
    console.error(err);
  }
});
