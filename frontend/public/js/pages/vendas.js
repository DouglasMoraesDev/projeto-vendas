// src/pages/vendas.js
import { api } from '../api.js';

export function vendasPage() {
  return {
    template() {
      return `
        <h2>Vendas</h2>
        <form id="form-venda">
          <select name="clienteId" required></select>
          <select name="mercadoriaId" required></select>
          <label>
            Pagamento:
            <select name="tipoPagamento">
              <option value="avista">À vista</option>
              <option value="parcelado">Parcelado</option>
            </select>
          </label>
          <div id="parcelamento" style="display:none">
            <input name="entrada"     type="number" step="0.01" placeholder="Entrada"/>
            <input name="numParcelas" type="number"      placeholder="Nº parcelas"/>
          </div>
          <button type="submit">Registrar Venda</button>
        </form>
        <ul id="lista-vendas"></ul>
      `;
    },
    async init() {
      const form = document.getElementById('form-venda');
      const selCliente    = form.clienteId;
      const selMercadoria = form.mercadoriaId;
      // carrega opções
      (await api.getClientes()).data.forEach(c =>
        selCliente.add(new Option(c.nome, c.id))
      );
      (await api.getMercadorias()).data.forEach(m =>
        selMercadoria.add(new Option(m.nome, m.id))
      );
      // toggle de parcelamento
      form.tipoPagamento.onchange = e => {
        document.getElementById('parcelamento').style.display =
          e.target.value === 'parcelado' ? 'block' : 'none';
      };
      form.onsubmit = async e => {
        e.preventDefault();
        try {
          const data = {
            clienteId: form.clienteId.value,
            mercadoriaId: form.mercadoriaId.value,
            tipoPagamento: form.tipoPagamento.value,
            entrada: form.entrada.value,
            numParcelas: form.numParcelas.value
          };
          await api.createVenda(data);
          this.load();
        } catch (err) {
          alert(err.response?.data?.error || err.message);
        }
      };
      await this.load();
    },
    async load() {
      const ul = document.getElementById('lista-vendas');
      ul.innerHTML = 'Carregando…';
      const res = await api.getVendas();
      ul.innerHTML = res.data.map(v =>
        `<li>
           #${v.id} • ${v.cliente.nome} • ${v.tipoPagamento} • R$${v.valorTotal.toFixed(2)}
         </li>`
      ).join('');
    }
  };
}
