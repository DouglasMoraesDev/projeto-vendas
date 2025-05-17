# --- Base Image --------------------------------------------------
FROM node:18 AS base
WORKDIR /app

# --- Frontend Build ------------------------------------------------
FROM base AS frontend-build
WORKDIR /app/frontend

# Cache de deps
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy source e build
COPY frontend/ ./
RUN npm run build

# --- Backend Build -------------------------------------------------
FROM base AS backend-build
WORKDIR /app/backend

# Cache de deps
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Copy source e rodar Prisma
COPY backend/ ./
RUN npx prisma generate && npx prisma migrate deploy

# --- Final Runtime Image ------------------------------------------
FROM node:18 AS runner
WORKDIR /app

# Copia build do frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copia backend (app + node_modules + Prisma client)
COPY --from=backend-build /app/backend ./backend

WORKDIR /app/backend
EXPOSE 3000
CMD ["node", "server.js"]
