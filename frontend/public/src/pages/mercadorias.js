// src/pages/mercadorias.js
import { api } from '../services/api.js';
import { MercadoriaCard } from '../components/MercadoriaCard.js';

export function mercadoriasPage() {
  return {
    template() {
      return `
        <h2>Mercadorias</h2>
        <button id="btn-nova">Nova</button>
        <div id="cards"></div>
        <form id="form" style="display:none">
          <input name="nome" placeholder="Nome" required/>
          <input name="valorUnitario" type="number" step="0.01" placeholder="Valor" required/>
          <input name="quantidadeEstoque" type="number" placeholder="Qtd." required/>
          <textarea name="descricao" placeholder="Descrição"></textarea>
          <input type="file" name="fotos" multiple accept="image/*"/>
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
      `;
    },
    init() {
      this.load();
      document.getElementById('btn-nova').onclick = () => {
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
          valorUnitario: f.valorUnitario.value,
          quantidadeEstoque: f.quantidadeEstoque.value,
          descricao: f.descricao.value,
        };
        const files = Array.from(f.fotos.files);
        try {
          await api.createMercadoria(data, files);
          f.reset(); f.style.display = 'none';
          this.load();
        } catch (err) {
          alert(err.response?.data?.error || err.message);
        }
      };
    },
    async load() {
      const container = document.getElementById('cards');
      container.innerHTML = 'Carregando…';
      try {
        const res = await api.getMercadorias();
        container.innerHTML = res.data.map(MercadoriaCard).join('');
      } catch {
        container.innerHTML = 'Erro ao carregar';
      }
    }
  };
}
