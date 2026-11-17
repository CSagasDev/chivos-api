# ---------- Etapa 1: la cocina (compilar) ----------
FROM node:26-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@12.21.0

# Primero solo la lista de dependencias, y se instalan.
# Si no cambió, Docker reusa este paso y no vuelve a descargar todo.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Después el código, y se compila a JavaScript (sale en dist/)
COPY . .
RUN pnpm build

# Quita las herramientas de desarrollo; quedan solo las de correr
RUN pnpm prune --prod

# ---------- Etapa 2: el plato (correr) ----------
FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production

# De la cocina solo se trae lo necesario
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Corre como un usuario sin privilegios, no como root
USER node
EXPOSE 3000

# Cada 30 segundos pregunta a /health si la app sigue viva
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/main.js"]
