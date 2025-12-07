# ------------------------------
# 1. BUILDER STAGE (Створення збірки)
# ------------------------------
FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production
# Вмикаємо Standalone режим для мінімізації фінального образу
ENV NEXT_OUTPUT_STANDALONE=true
ENV NEXT_TELEMETRY_DISABLED 1

# Копіюємо та встановлюємо залежності для збірки
COPY package*.json ./
RUN npm install
COPY . .

# Виконуємо збірку Next.js
RUN npm run build 


# ------------------------------
# 2. RUNNER STAGE (Production)
# ------------------------------
# Використовуємо lean-образ для запуску
FROM node:20-alpine AS runner

# Налаштування порту (за замовчуванням 3001)
ARG APP_PORT=3001
ENV PORT=$APP_PORT
ENV NODE_ENV=production

WORKDIR /app

# 1. Копіюємо Standalone Output, який містить лише необхідні файли для production
# Standalone mode створює 'server.js' у корені .next/standalone
COPY --from=builder /app/.next/standalone ./
# 2. Копіюємо статичні активи (public assets)
COPY --from=builder /app/public ./public
# 3. Копіюємо статичні build assets
COPY --from=builder /app/.next/static ./.next/static 

# Встановлюємо лише production залежності 
COPY package.json ./
RUN npm install --only=production

EXPOSE $PORT

# Запускаємо Next.js Standalone сервер
# Зверніть увагу: якщо 'npm run start' не визначений у вашому package.json,
# використовуйте CMD ["node", "server.js"]
CMD ["npm", "run", "start"]
