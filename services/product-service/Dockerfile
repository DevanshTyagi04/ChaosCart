# ==========================
# Build Stage
# ==========================
FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npx prisma generate

# ==========================
# Production Stage
# ==========================
FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    openssl \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/wait-for-db.sh ./wait-for-db.sh

# Prisma generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN chmod +x wait-for-db.sh

USER node

EXPOSE 4002

CMD ["./wait-for-db.sh"]