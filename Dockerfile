FROM node:18 AS base
WORKDIR /app

# Frontend build stage
FROM base AS frontend-build
WORKDIR /app/frontend
# Install dependencies (cache on package.json only)
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
# Copy all frontend source and build
COPY frontend/ ./
RUN npm run build

# Backend build stage\ nFROM base AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./
# Generate Prisma client and apply migrations
RUN npx prisma generate && npx prisma migrate deploy

# Final runtime image
FROM node:18 AS runner
WORKDIR /app
# Copy built frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
# Copy backend with node_modules and prisma
COPY --from=backend-build /app/backend ./backend

WORKDIR /app/backend
EXPOSE 3000
CMD [ "node", "server.js" ]