FROM node:18

WORKDIR /app

# Copia o frontend já buildado
COPY frontend/dist ./frontend/dist

# Copia arquivos do backend
COPY backend/package.json backend/package-lock.json ./

# Instala dependências de produção
RUN npm ci --production --silent

# Copia código do backend
COPY backend/ ./

# Gera client Prisma e aplica migrations
RUN npx prisma generate && npx prisma migrate deploy

EXPOSE 3000
CMD ["node", "index.js"]
