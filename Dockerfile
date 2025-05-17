# Imagem base para runtime
FROM node:18

WORKDIR /app

# 1) Copia o frontend já buildado
COPY frontend/dist ./frontend/dist

# 2) Instala só as deps de produção do backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --production --silent

# 3) Copia o restante do backend
COPY backend/ ./

# 4) Gera o Prisma Client
RUN npx prisma generate

# 5) Exponha a porta e defina o comando de start
EXPOSE 3000
CMD ["node", "server.js"]
