import { api, API_HOST } from '../api.js';

export function historicoPage() {
  return {
    template() {
      return `
        <h1>Histórico de Vendas</h1>
        <ul id="hist-list"></ul>
      `;
    },
    init() {
      loadHistorico();
    }
  };
}

async function loadHistorico() {
  const ul = document.getElementById('hist-list');
  const vendas = (await api.getVendas()).data;
  ul.innerHTML = vendas.map(v => {
    const fotos = v.itens.map(item =>
      item.mercadoria.fotos
        .map(f => `<img src="${API_HOST}${f.caminho}" width="50" onerror="this.src='placeholder.jpg'">`)
        .join('')
    ).join('');

    const parcelas = v.parcelas
      .map(p => `#${p.numParcela} (${p.pago ? 'Pago' : 'Aberto'})`)
      .join('; ');

    return `
      <li>
        <strong>#${v.id}</strong> • ${new Date(v.criadoEm).toLocaleString()} • ${v.cliente.nome}<br>
        Itens: ${v.itens.map(i => `${i.quantidade}×${i.mercadoria.nome}`).join(', ')}<br>
        ${fotos}<br>
        Total: R$${v.valorTotal.toFixed(2)} • ${v.tipoPagamento}<br>
        Parcelas: ${parcelas}
      </li>
    `;
  }).join('');
}
