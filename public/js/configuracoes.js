// public/js/configuracoes.js

import { BASE_URL } from "./api.js";

const formTrocarSenha = document.getElementById("formTrocarSenha");
const erroSenha = document.getElementById("erroSenha");
const btnBackup = document.getElementById("btnBackup");
const mensagemBackup = document.getElementById("mensagemBackup");

// Função para trocar senha
formTrocarSenha.addEventListener("submit", async (e) => {
  e.preventDefault();
  erroSenha.textContent = "";
  erroSenha.classList.remove("visivel");

  const senhaAtual = document.getElementById("senhaAtual").value.trim();
  const novaSenha = document.getElementById("novaSenha").value.trim();
  const confirmaSenha = document.getElementById("confirmaSenha").value.trim();

  if (!senhaAtual || !novaSenha || !confirmaSenha) {
    erroSenha.textContent = "Todos os campos são obrigatórios.";
    erroSenha.classList.add("visivel");
    return;
  }
  if (novaSenha !== confirmaSenha) {
    erroSenha.textContent = "As novas senhas não conferem.";
    erroSenha.classList.add("visivel");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${BASE_URL}/api/config/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ senhaAtual, novaSenha }),
    });
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.error || "Erro ao trocar senha");
    alert("Senha atualizada com sucesso!");
    formTrocarSenha.reset();
  } catch (err) {
    erroSenha.textContent = err.message;
    erroSenha.classList.add("visivel");
  }
});

// Função para gerar e baixar o backup JSON
btnBackup.addEventListener("click", async () => {
  mensagemBackup.textContent = "";
  try {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${BASE_URL}/api/config/backup`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp.ok) {
      const erro = await resp.json();
      throw new Error(erro.error || "Erro ao gerar backup");
    }
    // O backend retorna JSON com todo o dump do banco
    const data = await resp.json();
    // Criar um Blob para download
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup_projeto_vendas_${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    mensagemBackup.textContent = "Backup gerado e baixado com sucesso.";
  } catch (err) {
    mensagemBackup.style.color = "red";
    mensagemBackup.textContent = err.message;
  }
});

// Verifica se o usuário está logado; se não, redireciona ao login
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
});
