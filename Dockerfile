# --- Base Image --------------------------------------------------
FROM node:18 AS base
WORKDIR /app

# --- Frontend Build Stage ---------------------------------------
FROM base AS frontend-build
WORKDIR /app/frontend

# Instala dependências do frontend (cache em package.json)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --silent

# Copia todo o código-fonte e faz o build
COPY frontend/ ./
RUN npm run build

# --- Backend Build Stage ----------------------------------------
FROM base AS backend-build
WORKDIR /app/backend

# Instala dependências do backend com menor consumo de memória
COPY backend/package.json backend/package-lock.json ./
RUN npm config set jobs 1 \
  && npm ci --silent

# Copia todo o código-fonte e gera o client Prisma + aplica migrações
COPY backend/ ./
RUN npx prisma generate && npx prisma migrate deploy

# --- Final Runtime Image ----------------------------------------
FROM node:18 AS runner
WORKDIR /app

# Copia build do frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copia backend completo (código + node_modules + Prisma client)
COPY --from=backend-build /app/backend ./backend

WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "server.js"]
