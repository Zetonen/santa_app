# ------------------------------
# 1. BUILDER STAGE (Створення збірки)
# ------------------------------
# Використовуємо більш легкий образ для збірки, якщо можливо, але 20-alpine теж добре
FROM node:20-alpine AS builder 
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .


ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_OUTPUT_STANDALONE=true 
RUN npm run build

# ------------------------------
# 2. RUNNER STAGE (Production)
# ------------------------------
FROM node:20-alpine AS runner

# Аргумент порту, як у вашому воркфлоу
ARG APP_PORT=3000
ENV PORT=$APP_PORT
ENV NODE_ENV=production

WORKDIR /app


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY package.json ./
RUN npm install --only=production

EXPOSE $PORT


CMD ["npm", "run", "start"] 
