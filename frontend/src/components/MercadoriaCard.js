// src/components/MercadoriaCard.js
export function MercadoriaCard(m) {
  const img = m.fotos[0]?.path || '/assets/no-image.png';
  return `
    <div class="card">
      <img src="${img}" alt="${m.nome}" width="80"/>
      <div>
        <h4>${m.nome}</h4>
        <p>R$ ${m.valorUnitario.toFixed(2)}</p>
        <p>Estoque: ${m.quantidadeEstoque}</p>
      </div>
    </div>
  `;
}
