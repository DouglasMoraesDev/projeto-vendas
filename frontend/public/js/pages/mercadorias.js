import { api } from './api.js';
const BACKEND = 'http://localhost:4000';

async function loadMercadorias() {
  const div = document.getElementById('cards-mercadoria');
  const res = await api.getMercadorias();
  div.innerHTML = res.data.map(m => `
    <div class="card">
      <h4>${m.nome}</h4>
      <p>R$ ${m.valorUnitario.toFixed(2)}</p>
      <p>Em estoque: ${m.quantidadeEstoque}</p>
      ${m.fotos.map(f => `
        <img 
          src="${BACKEND}${f.caminho}" 
          width="80"
          onerror="this.src='placeholder.jpg'"
        >
      `).join('')}
    </div>
  `).join('');
}

function setupForm() {
  const btnNova = document.getElementById('btn-nova');
  const form    = document.getElementById('form-mercadoria');
  const btnCan  = document.getElementById('btn-cancel');

  btnNova.onclick = () => form.style.display = 'block';
  btnCan .onclick = () => form.style.display = 'none';

  form.onsubmit = async e => {
    e.preventDefault();
    const data = {
      nome:             form.nome.value,
      descricao:        form.descricao.value,
      valorUnitario:    Number(form.valorUnitario.value),
      quantidadeEstoque:Number(form.quantidadeEstoque.value)
    };
    const files = Array.from(form.fotos.files);
    await api.createMercadoria(data, files);
    form.reset();
    form.style.display = 'none';
    loadMercadorias();
  };
}

window.addEventListener('DOMContentLoaded', () => {
  setupForm();
  loadMercadorias();
});
