// src/pages/mercadorias.js
import { api } from '../services/api.js';
import { MercadoriaCard } from '../components/MercadoriaCard.js';

export function mercadoriasPage() {
  return {
    template() {
      return `
        <h1>Mercadorias</h1>
        <button id="btn-new">Nova Mercadoria</button>
        <div id="list"></div>
        <form id="form-mercadoria" style="display:none">
          <input name="nome" placeholder="Nome" required/>
          <input name="valorUnitario" type="number" step="0.01" placeholder="Valor unitário" required/>
          <input name="quantidadeEstoque" type="number" placeholder="Qtd. estoque" required/>
          <textarea name="descricao" placeholder="Descrição"></textarea>
          <input type="file" name="fotos" multiple accept="image/*" />
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
      `;
    },
    init() {
      this.loadList();
      document.getElementById('btn-new').onclick = () => {
        document.getElementById('form-mercadoria').style.display = 'block';
      };
      document.getElementById('btn-cancel').onclick = () => {
        document.getElementById('form-mercadoria').style.display = 'none';
      };
      document.getElementById('form-mercadoria').onsubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const data = {
          nome: form.nome.value,
          valorUnitario: form.valorUnitario.value,
          quantidadeEstoque: form.quantidadeEstoque.value,
          descricao: form.descricao.value,
        };
        const files = Array.from(form.fotos.files).slice(0,5);
        try {
          const created = await api.createMercadoria(data, files);
          form.reset();
          document.getElementById('form-mercadoria').style.display = 'none';
          this.loadList(); 
        } catch (err) {
          alert('Erro: ' + err.message);
        }
      };
    },
    async loadList() {
      const listEl = document.getElementById('list');
      listEl.innerHTML = 'Carregando...';
      try {
        const items = await api.getMercadorias();
        listEl.innerHTML = items.map(MercadoriaCard).join('');
      } catch (err) {
        listEl.innerHTML = 'Erro ao carregar';
      }
    },
  };
}
