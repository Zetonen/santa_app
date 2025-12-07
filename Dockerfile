# ------------------------------
# 1. BUILDER STAGE (Створення збірки)
# ------------------------------
FROM node:20-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production
# Вмикаємо Standalone режим
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
FROM node:20-alpine AS runner

# Використовуємо стандартний порт Next.js
ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app

# Копіюємо Standalone Output
COPY --from=builder /app/.next/standalone ./
# Копіюємо статичні активи та build assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static 

# Встановлюємо лише production залежності 
COPY package.json ./
RUN npm install --only=production

EXPOSE 3000

# Запускаємо Next.js Standalone сервер на порту 3000
CMD ["npm", "run", "start"]
