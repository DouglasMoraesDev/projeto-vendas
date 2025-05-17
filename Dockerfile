# 1. Base image
FROM node:18

# 2. Defina o diretório de trabalho
WORKDIR /app

# 3. Copie apenas o package.json e package-lock.json e instale deps do backend
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm install

# 4. Instale deps do frontend e construa o build
COPY frontend/package.json frontend/package-lock.json* ./frontend/
RUN cd frontend && npm install && npm run build

# 5. Copie o restante do código
COPY backend ./backend
COPY frontend ./frontend

# 6. Gere o client do Prisma e aplique migrations
RUN cd backend && npx prisma generate && npx prisma migrate deploy

# 7. Exponha a porta (de acordo com o seu PORT)
EXPOSE 4000

# 8. Comando de start
CMD ["node", "backend/src/app.js"]
