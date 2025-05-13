// main.js — usa Fetch API, sem import/export

(async function initApp() {
  const root = document.getElementById('app');

  try {
    // Chama a rota de health-check
    const response = await fetch('/api/health');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();

    // Exibe o resultado
    root.innerHTML = `
      <h1>Status da API</h1>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (err) {
    // Em caso de erro, mostra mensagem
    root.innerHTML = `
      <h1>Erro ao conectar à API</h1>
      <p>${err.message}</p>
    `;
    console.error(err);
  }
})();
