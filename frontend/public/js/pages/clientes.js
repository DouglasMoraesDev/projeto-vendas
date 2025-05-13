// clientes.js
import { api } from '../api.js';

export function clientesPage() {
  return {
    template() {
      return `
        <h2>Clientes</h2>
        <button id="btn-novo">Novo Cliente</button>
        <form id="form-cliente" style="display:none">
          <label>Nome:     <input name="nome" required></label>
          <label>CPF:      <input name="cpf" required></label>
          <label>Telefone: <input name="telefone" required></label>
          <label>Endereço: <input name="endereco"></label>
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
        <ul id="lista-clientes"></ul>
      `;
    },
    init() {
      const btnNovo = document.getElementById('btn-novo');
      const form    = document.getElementById('form-cliente');
      const btnCan  = document.getElementById('btn-cancel');

      btnNovo.onclick = () => form.style.display = 'block';
      btnCan .onclick = () => form.style.display = 'none';

      form.onsubmit = async e => {
        e.preventDefault();
        const data = {
          nome:     form.nome.value,
          cpf:      form.cpf.value,
          telefone: form.telefone.value,
          endereco: form.endereco.value
        };
        await api.createCliente(data);
        form.reset();
        form.style.display = 'none';
        this.load();
      };

      this.load();
    },
    async load() {
      const ul = document.getElementById('lista-clientes');
      const res = await api.getClientes();
      ul.innerHTML = res.data
        .map(c => `<li>${c.nome} — CPF: ${c.cpf} — Tel: ${c.telefone}</li>`)
        .join('');
    }
  };
}
