// /frontend/public/src/main.js

export function initApp(axios) {
  const root = document.getElementById('app');

  // Exemplo de uso do axios para health-check
  axios.get('/api/health')
    .then(res => {
      root.innerHTML = `
        <h1>Status da API</h1>
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      `;
    })
    .catch(err => {
      root.innerHTML = `
        <h1>Erro ao conectar à API</h1>
        <pre>${err}</pre>
      `;
    });

  // Aqui você pode continuar construindo a UI do seu SPA...
}
