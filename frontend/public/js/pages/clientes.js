import { api } from './api.js';

async function loadClientes() {
  const ul = document.getElementById('lista-clientes');
  const res = await api.getClientes();
  ul.innerHTML = res.data
    .map(c => `<li>${c.nome} — CPF: ${c.cpf} — Tel: ${c.telefone}</li>`)
    .join('');
}

function setupForm() {
  const btnNovo = document.getElementById('btn-novo');
  const form    = document.getElementById('form-cliente');
  const btnCan  = document.getElementById('btn-cancel');

  btnNovo.onclick = () => form.style.display = 'block';
  btnCan .onclick = () => form.style.display = 'none';

  form.onsubmit = async e => {
    e.preventDefault();
    await api.createCliente({
      nome:     form.nome.value,
      cpf:      form.cpf.value,
      telefone: form.telefone.value,
      endereco: form.endereco.value
    });
    form.reset();
    form.style.display = 'none';
    loadClientes();
  };
}

window.addEventListener('DOMContentLoaded', () => {
  setupForm();
  loadClientes();
});
