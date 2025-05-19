// public/js/comprovantes.js

import { getClientes, getComprovantesByCliente, BASE_URL } from "./api.js";

const selectCliente = document.getElementById("selectClienteComprovantes");
const btnBuscar = document.getElementById("btnBuscarComprovantes");
const listaComprovantesContainer = document.getElementById("listaComprovantes");
const erroComprovantes = document.getElementById("erroComprovantes");

// Carrega clientes no select
async function carregarClientesNoSelect() {
  try {
    const clientes = await getClientes();
    clientes.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.nome;
      selectCliente.appendChild(opt);
    });
  } catch (err) {
    console.error(err);
  }
}

// Procura comprovantes do cliente selecionado
async function buscarComprovantes() {
  const clienteId = selectCliente.value;
  erroComprovantes.textContent = "";
  erroComprovantes.classList.remove("visivel");

  if (!clienteId) {
    erroComprovantes.textContent = "Selecione um cliente.";
    erroComprovantes.classList.add("visivel");
    return;
  }

  try {
    const comprovantes = await getComprovantesByCliente(clienteId);
    renderizarComprovantes(comprovantes);
  } catch (err) {
    erroComprovantes.textContent = err.message;
    erroComprovantes.classList.add("visivel");
  }
}

// Renderiza lista de comprovantes (link para abrir o arquivo enviado)
function renderizarComprovantes(comps) {
  if (!listaComprovantesContainer) return;
  listaComprovantesContainer.innerHTML = "";

  if (comps.length === 0) {
    listaComprovantesContainer.innerHTML = "<p>Nenhum comprovante encontrado.</p>";
    return;
  }

  comps.forEach((c) => {
    const item = document.createElement("div");
    item.classList.add("card");

    // Data formatada (criadoEm vem do backend)
    const dataFormatada = new Date(c.criadoEm).toLocaleDateString("pt-BR");

    // Aqui, usamos c.caminho para abrir o arquivo (imagem ou PDF) que foi enviado
    const arquivoUrl = `${BASE_URL}${c.caminho}`;

    item.innerHTML = `
      
      <a href="${arquivoUrl}" target="_blank">Ver Comprovante</a>
      <p>Recebido por: ${c.recebidoPor}</p>
      <p>Data Upload: ${dataFormatada}</p>
    `;
    listaComprovantesContainer.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregarClientesNoSelect();
  btnBuscar.addEventListener("click", buscarComprovantes);
});
