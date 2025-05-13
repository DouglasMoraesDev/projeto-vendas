import { api } from './api.js';
const BACKEND = 'http://localhost:4000';

async function loadHistorico() {
  const ul = document.getElementById('hist-list');
  const vendas = (await api.getVendas()).data;
  ul.innerHTML = vendas.map(v => {
    const fotos = v.itens.map(item =>
      item.mercadoria.fotos
        .map(f => `<img src="${BACKEND}${f.caminho}" width="50">`)
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

window.addEventListener('DOMContentLoaded', loadHistorico);
