// src/pages/clientes.js
import { api } from '../services/api.js';

export function clientesPage() {
  return {
    template() {
      return `
        <h2>Clientes</h2>
        <button id="btn-novo">Novo Cliente</button>
        <ul id="lista"></ul>
        <form id="form" style="display:none">
          <input name="nome" placeholder="Nome" required/>
          <input name="telefone" placeholder="Telefone" required/>
          <input name="cpf" placeholder="CPF" required/>
          <input name="endereco" placeholder="Endereço"/>
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
      `;
    },
    init() {
      this.load();
      document.getElementById('btn-novo').onclick = () => {
        document.getElementById('form').style.display = 'block';
      };
      document.getElementById('btn-cancel').onclick = () => {
        document.getElementById('form').style.display = 'none';
      };
      document.getElementById('form').onsubmit = async e => {
        e.preventDefault();
        const f = e.target;
        const data = {
          nome: f.nome.value,
          telefone: f.telefone.value,
          cpf: f.cpf.value,
          endereco: f.endereco.value,
        };
        try {
          await api.createCliente(data);
          f.reset(); f.style.display = 'none';
          this.load();
        } catch (err) {
          alert(err.response?.data?.error || err.message);
        }
      };
    },
    async load() {
      const ul = document.getElementById('lista');
      ul.innerHTML = '<li>Carregando…</li>';
      try {
        const res = await api.getClientes();
        ul.innerHTML = res.data.map(c => `<li>${c.nome} (${c.cpf})</li>`).join('');
      } catch {
        ul.innerHTML = '<li style="color:red;">Erro</li>';
      }
    }
  };
}
