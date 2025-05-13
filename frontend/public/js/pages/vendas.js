import { api } from './api.js';

async function loadVendas() {
  const ul = document.getElementById('lista-vendas');
  const vendas = (await api.getVendas()).data;
  ul.innerHTML = vendas.map(v => `
    <li>
      #${v.id} • ${new Date(v.criadoEm).toLocaleString()} • ${v.cliente.nome} • R$${v.valorTotal.toFixed(2)} • ${v.tipoPagamento}
    </li>
  `).join('');
}

function setupForm() {
  const form = document.getElementById('form-venda');
  const selCli = form.clienteId;
  const selMer = form.mercadoriaId;

  api.getClientes().then(r =>
    r.data.forEach(c => selCli.add(new Option(c.nome, c.id)))
  );
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
      clienteId: Number(form.clienteId.value),
      itens: [{ mercadoriaId: Number(form.mercadoriaId.value), quantidade: Number(form.quantidade.value) }],
      tipoPagamento: form.tipoPagamento.value,
      entrada: form.entrada.value,
      numParcelas: form.numParcelas.value
    };
    await api.createVenda(data);
    form.reset();
    loadVendas();
  };
}

window.addEventListener('DOMContentLoaded', () => {
  setupForm();
  loadVendas();
});
