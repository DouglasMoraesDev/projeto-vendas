import { api } from '../api.js';

export function lojaPage() {
  return {
    template() {
      return `<h2>Loja Pública</h2><div id="loja"></div>`;
    },
    async init() {
      const div = document.getElementById('loja');
      const res = await api.getMercadorias();

      div.innerHTML = res.data.map(m => `
        <div class="card">
          <h4>${m.nome}</h4>
          <p>R$${m.valorUnitario.toFixed(2)}</p>
          ${m.fotos.map(f => `<img src="${f.caminho}" width="80">`).join('')}
          <button data-id="${m.id}">Conversar</button>
        </div>
      `).join('');

      div.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
          const m = res.data.find(x => x.id == btn.dataset.id);
          const texto = encodeURIComponent(
            `Olá, tenho interesse em: ${m.nome} (R$${m.valorUnitario.toFixed(2)})`
          );
          window.open(`https://wa.me/SEU_TELEFONE?text=${texto}`, '_blank');
        };
      });
    }
  };
}
