// src/app.js
require('dotenv').config();               // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const cors    = require('cors');
const path    = require('path');

// Importa as rotas (controllers + routes) já existentes em src/routes e src/controllers
const authRoutes        = require('./routes/authRoutes');
const clienteRoutes     = require('./routes/clienteRoutes');
const mercadoriaRoutes  = require('./routes/mercadoriaRoutes');
const vendaRoutes       = require('./routes/vendaRoutes');
const parcelaRoutes     = require('./routes/parcelaRoutes');
const comprovanteRoutes = require('./routes/comprovanteRoutes');

// Middleware que valida JWT (verifica se existe token e se é válido)
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// --- Middlewares Globais ---
// Habilita CORS para que o frontend (mesmo em domínio diferente) possa chamar as APIs
app.use(cors());

// Permite que o Express interprete JSON no corpo das requisições
app.use(express.json());

// --------------------------------------------------------------------------------
// Serve arquivos estáticos da pasta `uploads/` para que o frontend consiga buscar imagens ou PDFs.
// No navegador, qualquer requisição a /uploads/... será mapeada para a pasta local 'uploads/' na raiz.
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));
// --------------------------------------------------------------------------------

// Health‐check para verificar se a API está no ar (GET http://<host>/api/health)
app.get('/api/health', (req, res) =>
  res.json({ status: 'OK', timestamp: new Date() })
);

// Rotas Públicas de Autenticação
// - POST /api/auth/register  → registra novo usuário
// - POST /api/auth/login     → autentica (retorna token JWT)
app.use('/api/auth', authRoutes);

// Rotas Protegidas (precisam de JWT válido)
// Todas as requisições a /api/clientes, /api/mercadorias, /api/vendas, /api/parcelas e /api/comprovantes
// passarão antes pelo authMiddleware, que verifica se o cabeçalho Authorization: Bearer <token> é válido.
app.use('/api/clientes',     authMiddleware, clienteRoutes);
app.use('/api/mercadorias',  authMiddleware, mercadoriaRoutes);
app.use('/api/vendas',       authMiddleware, vendaRoutes);
app.use('/api/parcelas',     authMiddleware, parcelaRoutes);
app.use('/api/comprovantes', authMiddleware, comprovanteRoutes);

// --------------------------------------------------------------------------------
// Serve a aplicação frontend estática a partir da pasta `public/`
//    - Se o cliente fizer GET em “/” ou qualquer rota que NÃO comece com /api/
//      o servidor devolve o arquivo index.html de public.
//    - Assim funcionam SPAs: o cliente carrega index.html e o JavaScript gerencia as rotas no front.
//
// NOTE: aqui apontamos para a pasta 'public' na raiz (não 'frontend/dist', já que você não usa bundler).
const frontendDir = path.resolve(__dirname, '..', 'public');
app.use(express.static(frontendDir));

// Intercepta qualquer rota que não comece com /api/ e manda sempre index.html
// Isso permite que, por exemplo, “/clientes.html” carregue diretamente o arquivo estático “public/clientes.html”.
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// --------------------------------------------------------------------------------
// Tratamento de erro genérico (se algum controller lançar erro ou chamar next(err))
app.use((err, req, res, next) => {
  console.error(err);                        // Imprime o erro no console do servidor
  res.status(500).json({ error: err.message });
});

// --------------------------------------------------------------------------------
// Inicia o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
