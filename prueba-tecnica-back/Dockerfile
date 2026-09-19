FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Copiar el código fuente y compilar
COPY . .
RUN npx prisma generate
RUN npm run build

# Imagen de producción
FROM node:20-alpine

WORKDIR /app

# Copiar archivos compilados y dependencias
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Ejecutar migraciones, seed (opcional) y levantar la aplicación
CMD npx prisma migrate deploy && npx prisma db seed && npm run start:prod
