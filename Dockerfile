# ------------------------------
# 1. BUILDER STAGE (Створення збірки)
# ------------------------------
FROM node:20-alpine AS builder

WORKDIR /app
# ВИДАЛЕНО: ENV NODE_ENV=production (щоб гарантувати інсталяцію devDependencies)

# Вмикаємо Standalone режим
ENV NEXT_OUTPUT_STANDALONE=true
ENV NEXT_TELEMETRY_DISABLED 1

# 1. Копіюємо файли залежностей (package.json, package-lock.json)
COPY package*.json ./

# 2. Встановлюємо ВСІ залежності (включаючи typescript, необхідний для next.config.ts)
# Використовуємо --force, якщо попередні версії npm мали проблеми
RUN npm install 
# Або використовуйте npm ci, якщо у вас є package-lock.json
# RUN npm ci

# 3. Копіюємо решту файлів проекту (включаючи next.config.ts)
COPY . .

# 4. Виконуємо збірку Next.js
RUN npm run build 


# ------------------------------
# 2. RUNNER STAGE (Production)
# ------------------------------
FROM node:20-alpine AS runner

ENV PORT=3000
# ТУТ ВСТАНОВЛЮЄМО NODE_ENV=production для фінального образу
ENV NODE_ENV=production

WORKDIR /app

# 1. Копіюємо Standalone Output, статичні файли
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static 

# 2. Встановлюємо лише production залежності для запуску
COPY package.json ./
RUN npm install --only=production

EXPOSE 3000

# 3. Запускаємо Next.js Standalone сервер
CMD ["npm", "run", "start"]
