# 1) Use Node 18 como base
FROM node:18

# 2) Crie diretório de trabalho
WORKDIR /app

# 3) Copie e instale só as deps do backend
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm install

# 4) Copie e instale só as deps do frontend
COPY frontend/package.json frontend/package-lock.json* ./frontend/
RUN cd frontend && npm install

# 5) Copie todo o código do backend e do frontend (incluindo a pasta public)
COPY backend ./backend
COPY frontend ./frontend

# 6) Gere o Prisma Client e aplique migrations
RUN cd backend && npx prisma generate && npx prisma migrate deploy

# 7) Exponha a porta de execução (use a mesma que você configurou: 4000)
EXPOSE 4000

# 8) Inicia o seu app
CMD ["node", "backend/src/app.js"]
