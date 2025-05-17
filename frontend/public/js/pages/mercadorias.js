import { api, API_HOST } from '../api.js';

export function mercadoriasPage() {
  return {
    template() {
      return `
        <h1>Mercadorias</h1>
        <button id="btn-nova">Nova Mercadoria</button>
        <form id="form-mercadoria" style="display:none" enctype="multipart/form-data">
          <label>Nome:        <input name="nome" required></label>
          <label>Descrição:   <textarea name="descricao"></textarea></label>
          <label>Valor Unit.: <input name="valorUnitario" type="number" step="0.01" required></label>
          <label>Estoque:     <input name="quantidadeEstoque" type="number" min="0" required></label>
          <label>Fotos (até 5): <input name="fotos" type="file" accept="image/*" multiple></label>
          <button type="submit">Salvar</button>
          <button type="button" id="btn-cancel">Cancelar</button>
        </form>
        <div id="cards-mercadoria"></div>
      `;
    },
    init() {
      const div     = document.getElementById('cards-mercadoria');
      const btnNova = document.getElementById('btn-nova');
      const form    = document.getElementById('form-mercadoria');
      const btnCan  = document.getElementById('btn-cancel');

      btnNova.onclick = () => form.style.display = 'block';
      btnCan .onclick = () => form.style.display = 'none';

      form.onsubmit = async e => {
        e.preventDefault();
        const data = {
          nome:              form.nome.value,
          descricao:         form.descricao.value,
          valorUnitario:     Number(form.valorUnitario.value),
          quantidadeEstoque: Number(form.quantidadeEstoque.value)
        };
        const files = Array.from(form.fotos.files);
        await api.createMercadoria(data, files);
        form.reset();
        form.style.display = 'none';
        loadMercadorias();
      };

      loadMercadorias();

      async function loadMercadorias() {
        const res = await api.getMercadorias();
        div.innerHTML = res.data.map(m => `
          <div class="card">
            <h4>${m.nome}</h4>
            <p>R$ ${m.valorUnitario.toFixed(2)}</p>
            <p>Em estoque: ${m.quantidadeEstoque}</p>
            ${m.fotos.map(f => `
              <img 
                src="${API_HOST}${f.caminho}" 
                width="80"
                onerror="this.src='placeholder.jpg'"
              >
            `).join('')}
          </div>
        `).join('');
      }
    }
  };
}
