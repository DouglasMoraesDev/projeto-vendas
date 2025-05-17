# Base image
FROM node:18 AS base
WORKDIR /app

# === Frontend build stage ===
FROM base AS frontend-build
WORKDIR /app/frontend

# Instala dependências do frontend (cache em package.json)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copia todo o código-fonte e faz o build
COPY frontend/ ./
RUN npm run build

# === Backend build stage ===
FROM base AS backend-build
WORKDIR /app/backend

# Instala dependências do backend (cache em package.json)
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Copia todo o código-fonte e gera o client Prisma + migrações
COPY backend/ ./
RUN npx prisma generate && npx prisma migrate deploy

# === Imagem final de runtime ===
FROM node:18 AS runner
WORKDIR /app

# Copia assets estáticos do frontend já buildados
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copia o backend completo (código + node_modules + prisma)
COPY --from=backend-build /app/backend ./backend

# Define diretório de trabalho, expõe porta e startup
WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "server.js"]
