// Monta link para WhatsApp com número e texto
function gerarLinkWhatsApp(telefone, mensagem) {
  const texto = encodeURIComponent(mensagem);
  // sem “+” no número, use apenas dígitos e DDI se necessário
  return `https://wa.me/${telefone}?text=${texto}`;
}

module.exports = gerarLinkWhatsApp;
