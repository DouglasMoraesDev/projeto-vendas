// public/js/api.js

// Base URL do backend (Railway)
const BASE_URL = "https://projeto-vendas-production.up.railway.app";

// ================================
// AUTENTICAÇÃO
// ================================
export async function registerUser(dados) {
  const resp = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao registrar usuário");
  }
  return resp.json();
}

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
  return resp.json(); // retorna { token }
}

// ================================
// CLIENTES
// ================================
export async function getClientes() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar clientes");
  return resp.json();
}

export async function getClienteById(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/clientes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Cliente não encontrado");
  return resp.json();
}

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

// ================================
// MERCADORIAS (PRODUTOS)
// ================================
export async function getProdutos() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/mercadorias`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!resp.ok) throw new Error("Erro ao buscar produtos");
  return resp.json();
}

export async function getProdutoById(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/mercadorias/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Produto não encontrado");
  return resp.json();
}

export async function criarProduto(dados) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("nome", dados.nome);
  formData.append("descricao", dados.descricao);
  formData.append("valorUnitario", dados.valorUnitario);
  formData.append("quantidadeEstoque", dados.quantidadeEstoque);
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

// ================================
// VENDAS
// ================================
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

export async function getVendas() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar vendas");
  return resp.json();
}

export async function getVendaById(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Venda não encontrada");
  return resp.json();
}


// DELETE /api/vendas/:id
export async function excluirVenda(id) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao excluir venda");
  }
  return;
}

// PUT /api/vendas/:id   (edição simples)
export async function atualizarVenda(id, dados) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/vendas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) {
    const erroJson = await resp.json();
    throw new Error(erroJson.error || "Erro ao atualizar venda");
  }
  return resp.json();
}

// ================================
// PARCELAS
// ================================
export async function getParcelasPendentes() {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/parcelas/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar parcelas pendentes");
  return resp.json();
}

export async function getParcelasByCliente(clienteId) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/parcelas?clienteId=${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar parcelas do cliente");
  return resp.json();
}

export async function pagarParcela(idParcela, dadosPagamento) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("comprovante", dadosPagamento.arquivo);
  formData.append("recebidoPor", dadosPagamento.recebidoPor);

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

// ================================
// COMPROVANTES
// ================================
export async function getComprovantesByCliente(clienteId) {
  const token = localStorage.getItem("token");
  const resp = await fetch(`${BASE_URL}/api/comprovantes?clienteId=${clienteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) throw new Error("Erro ao buscar comprovantes");
  return resp.json();
}

// Abre diretamente o PDF (rota pública)
export function baixarPdfComprovante(parcelaId) {
  window.open(`${BASE_URL}/api/comprovantes/${parcelaId}/pdf`, "_blank");
}

// ================================
// LOJA (PÚBLICO)
// ================================
export async function getProdutosLoja() {
  const token = localStorage.getItem("token");    // <–– pega o token salvo
  const resp = await fetch(`${BASE_URL}/api/mercadorias`, {
    headers: { Authorization: `Bearer ${token}` }  // <–– envia o cabeçalho
  });
  if (!resp.ok) throw new Error("Erro ao buscar produtos para loja");
  return resp.json();
}

export { BASE_URL };
