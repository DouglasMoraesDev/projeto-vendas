// public/js/pages/vendas.js
import { api } from '../api.js';

export function vendasPage() {
  return {
    template() {
      return `
        <h1>Registrar Venda</h1>
        <form id="form-venda">
          <label>Cliente:
            <select name="clienteId" required></select>
          </label>
          <label>Mercadoria:
            <select name="mercadoriaId" required></select>
          </label>
          <label>Quantidade:
            <input name="quantidade" type="number" min="1" value="1" required>
          </label>
          <label>Pagamento:
            <select name="tipoPagamento">
              <option value="avista">À vista</option>
              <option value="parcelado">Parcelado</option>
            </select>
          </label>
          <div id="parcelamento" style="display:none">
            <label>Entrada:
              <input name="entrada" type="number" step="0.01">
            </label>
            <label>Nº Parcelas:
              <input name="numParcelas" type="number" min="1">
            </label>
          </div>
          <button>Enviar</button>
        </form>

        <h3>Vendas Recentes</h3>
        <ul id="lista-vendas"></ul>
      `;
    },
    init() {
      setupForm();
      loadVendas();
    }
  };
}

function setupForm() {
  const form   = document.getElementById('form-venda');
  const selCli = form.clienteId;
  const selMer = form.mercadoriaId;

  // Popula select de clientes
  api.getClientes().then(r =>
    r.data.forEach(c => selCli.add(new Option(c.nome, c.id)))
  );
  // Popula select de mercadorias
  api.getMercadorias().then(r =>
    r.data.forEach(m =>
      selMer.add(new Option(`${m.nome} (R$${m.valorUnitario.toFixed(2)})`, m.id))
    )
  );

  form.tipoPagamento.onchange = e => {
    document.getElementById('parcelamento').style.display =
      e.target.value === 'parcelado' ? 'block' : 'none';
  };

  form.onsubmit = async e => {
    e.preventDefault();
    const data = {
      clienteId:    Number(form.clienteId.value),
      itens:        [{ mercadoriaId: Number(form.mercadoriaId.value), quantidade: Number(form.quantidade.value) }],
      tipoPagamento: form.tipoPagamento.value,
      entrada:       form.entrada.value || undefined,
      numParcelas:   form.numParcelas.value || undefined
    };
    await api.createVenda(data);
    form.reset();
    document.getElementById('parcelamento').style.display = 'none';
    loadVendas();
  };
}

async function loadVendas() {
  const ul = document.getElementById('lista-vendas');
  const vendas = (await api.getVendas()).data;
  ul.innerHTML = vendas.map(v => `
    <li>
      #${v.id} • ${new Date(v.criadoEm).toLocaleString()} • ${v.cliente.nome} •
      R$${v.valorTotal.toFixed(2)} • ${v.tipoPagamento}
    </li>
  `).join('');
}
