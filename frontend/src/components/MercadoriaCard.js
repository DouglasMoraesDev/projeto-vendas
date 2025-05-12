// src/components/MercadoriaCard.js
export function MercadoriaCard(m) {
  const foto = m.fotos[0]?.path || '/assets/no-image.png';
  return `
    <div class="card">
      <img src="${foto}" alt="${m.nome}" width="100"/>
      <h3>${m.nome}</h3>
      <p>R$ ${m.valorUnitario.toFixed(2)}</p>
      <p>Em estoque: ${m.quantidadeEstoque}</p>
    </div>
  `;
}
