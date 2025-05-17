# 1. Base image
FROM node:18

# 2. Diretório de trabalho
WORKDIR /app

# 3. Copia só os package.json e instala deps do backend
COPY backend/package.json backend/package-lock.json* ./backend/
RUN cd backend && npm install

# 4. Copia só os package.json e instala deps do frontend
COPY frontend/package.json frontend/package-lock.json* ./frontend/
RUN cd frontend && npm install

# 5. Build do frontend (gera /app/frontend/dist)
RUN cd frontend && npm run build

# 6. Copia o restante do código (incluindo src/, uploads, prisma schema etc.)
COPY backend ./backend
COPY frontend ./frontend

# 7. Gera client Prisma e aplica migrations
RUN cd backend && npx prisma generate && npx prisma migrate deploy

# 8. Expõe a porta configurada (4000)
EXPOSE 4000

# 9. Inicia o servidor Express
CMD ["node", "backend/src/app.js"]
