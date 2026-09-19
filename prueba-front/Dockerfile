FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código y build
COPY . .
# Proveemos la variable de entorno para el build si es necesaria
ARG NEXT_PUBLIC_API_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# Imagen de producción
FROM node:20-alpine

WORKDIR /app

# Copiar build y dependencias
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Copiar variables de entorno o crear uno base
COPY --from=builder /app/.env ./

EXPOSE 3001
ENV PORT=3001

CMD ["npm", "run", "start"]
