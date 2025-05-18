// public/js/api.js

// Base URL do backend hospedado no Railway
const BASE_URL = "https://projeto-vendas-production.up.railway.app";

// ======================================================================
// 8h: AUTENTICAÇÃO (Auth)
// ----------------------------------------------------------------------
// Faz o registro de usuário
export async function registerUser(dados) {
  const resp = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) throw new Error("Erro ao registrar usuário");
  return resp.json();
}

// Faz login e retorna { token }
export async function loginUser(email, senha) {
  const resp = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Credenciais inválidas");
  }
  return resp.json();
}

// ======================================================================
// 8h: CLIENTES
// ----------------------------------------------------------------------
// Lista todos os clientes cadastrados
export async function getClientes() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar clientes");
  return resp.json();
}

// Busca um cliente específico pelo ID
export async function getClienteById(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Cliente não encontrado");
  return resp.json();
}

// Cria novo cliente (POST)
export async function criarCliente(dados) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao criar cliente");
  }
  return resp.json();
}

// Atualiza cliente existente (PUT)
export async function atualizarCliente(id, dados) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao atualizar cliente");
  }
  return resp.json();
}

// Exclui cliente (DELETE)
export async function excluirCliente(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao excluir cliente");
  }
  return;
}

// ======================================================================
// 8h: MERCADORIAS (PRODUTOS)
// ----------------------------------------------------------------------
// Lista todas as mercadorias, já trazendo também as fotos (array de objetos)
export async function getProdutos() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/mercadorias`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar produtos");
  return resp.json();
}

// Busca mercadoria por ID (inclui fotos)
export async function getProdutoById(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/mercadorias/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Produto não encontrado");
  return resp.json();
}

// Cria nova mercadoria (POST com envio de fotos via FormData)
export async function criarProduto(dados) {
  const token = localStorage.getItem("token");
  // FormData para enviar fotos (até 5)
  const formData = new FormData();
  formData.append("nome", dados.nome);
  formData.append("descricao", dados.descricao);
  formData.append("valorUnitario", dados.valorUnitario);
  formData.append("quantidadeEstoque", dados.quantidadeEstoque);
  // Adiciona as fotos (array de File)
  dados.fotos.forEach(foto => formData.append("fotos", foto));

  const resp = await fetch(`${BASE_URL}/api/mercadorias`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao criar produto");
  }
  return resp.json();
}

// Atualiza mercadoria (PUT sem envio de novas fotos, apenas campos-texto)
export async function atualizarProduto(id, dados) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/mercadorias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao atualizar produto");
  }
  return resp.json();
}

// Exclui mercadoria (DELETE) – também remove as fotos em disco no servidor
export async function excluirProduto(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/mercadorias/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao excluir produto");
  }
  return;
}

// ======================================================================
// 8h: VENDAS
// ----------------------------------------------------------------------
// Cria nova venda (POST) e, junto, gera parcelas se for parcelado
export async function criarVenda(dados) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao criar venda");
  }
  return resp.json();
}

// Lista todas as vendas (incluindo cliente, itens, parcelas)
export async function getVendas() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar vendas");
  return resp.json();
}

// Busca venda por ID (detalhes)
export async function getVendaById(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Venda não encontrada");
  return resp.json();
}

// ======================================================================
// 8h: PARCELAS
// ----------------------------------------------------------------------
// Lista todas parcelas pendentes (para controle de pagamento)
export async function getParcelasPendentes() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/parcelas/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar parcelas pendentes");
  return resp.json();
}

// Lista parcelas de um cliente específico (queremos mostrar comprovantes etc.)
export async function getParcelasByCliente(clienteId) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/parcelas?clienteId=${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar parcelas do cliente");
  return resp.json();
}

// Paga uma parcela (POST com envio de comprovante via FormData)
export async function pagarParcela(idParcela, dadosPagamento) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("recebidoPor", dadosPagamento.recebidoPor);
  formData.append("comprovante", dadosPagamento.arquivo); // `arquivo` é um File

  const resp = await fetch(`${BASE_URL}/api/parcelas/${idParcela}/pay`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao pagar parcela");
  }
  return resp.json();
}

// ======================================================================
// 8h: COMPROVANTES
// ----------------------------------------------------------------------
// Lista todos comprovantes de um cliente, retornando apenas metadados (ID, caminho, dataUpload, etc.)
export async function getComprovantesByCliente(clienteId) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/comprovantes?clienteId=${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar comprovantes");
  return resp.json();
}

// Faz download do PDF de um comprovante (GET retorna o Buffer/PDF diretamente)
export function baixarPdfComprovante(parcelaId) {
  // Abre nova janela com o PDF para download
  window.open(`${BASE_URL}/api/comprovantes/${parcelaId}/pdf`, "_blank");
}

// ======================================================================
// 8h: LOJA (Público)
// ----------------------------------------------------------------------
// Lista produtos para exibir no catálogo público (não requer token)
export async function getProdutosLoja() {
  const resp = await fetch(`${BASE_URL}/api/mercadorias`, {
    // Se a rota pública exigisse sem token, bastaria não enviar Authorization.
    // Neste backend, /api/mercadorias exige token, mas imaginemos que tenhamos liberado rota sem auth:
    // fetch(`${BASE_URL}/public/mercadorias`)
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar produtos para loja");
  return resp.json();
}

// Retorna a BASE_URL para construir links (por ex. WhatsApp)
export { BASE_URL };
