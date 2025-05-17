# --- Base Image --------------------------------------------------
FROM node:18 AS base
WORKDIR /app

# --- Frontend Build Stage ---------------------------------------
FROM base AS frontend-build
WORKDIR /app/frontend

# Cache de deps: usa npm ci com jobs limitados a 1 e modo silencioso
COPY frontend/package.json frontend/package-lock.json ./
RUN npm config set jobs 1 \
 && npm ci --silent

# Copia fonte e faz build
COPY frontend/ ./
RUN npm run build

# --- Backend Build Stage ----------------------------------------
FROM base AS backend-build
WORKDIR /app/backend

# Cache de deps: usa npm ci com jobs limitados a 1 e modo silencioso
COPY backend/package.json backend/package-lock.json ./
RUN npm config set jobs 1 \
 && npm ci --silent

# Copia fonte e gera Prisma + migrações
COPY backend/ ./
RUN npx prisma generate && npx prisma migrate deploy

# --- Final Runtime Image ----------------------------------------
FROM node:18 AS runner
WORKDIR /app

# Copia frontend buildado
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copia backend pronto (código + node_modules + Prisma client)
COPY --from=backend-build /app/backend ./backend

WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "server.js"]
