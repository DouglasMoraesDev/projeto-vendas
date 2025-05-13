// Gera um PDF de comprovante usando pdfkit e retorna um Buffer
const PDFDocument = require('pdfkit');

async function gerarPdfRecibo({ clienteNome, parcelaNum, valor, dataPagamento, recebidoPor }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    // Cabeçalho
    doc.fontSize(18).text('Recibo de Pagamento', { align: 'center' });
    doc.moveDown();

    // Conteúdo
    doc.fontSize(12)
      .text(`Cliente: ${clienteNome}`)
      .text(`Parcela: ${parcelaNum}`)
      .text(`Valor pago: R$ ${valor.toFixed(2)}`)
      .text(`Data de pagamento: ${new Date(dataPagamento).toLocaleDateString()}`)
      .text(`Recebido por: ${recebidoPor}`)
      .moveDown(2);

    doc.text('Obrigado pela preferência!', { align: 'center' });

    doc.end();
  });
}

module.exports = gerarPdfRecibo;
