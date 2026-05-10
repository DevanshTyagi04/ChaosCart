FROM node:20-slim

WORKDIR /app

# Install OpenSSL and netcat
RUN apt-get update && apt-get install -y openssl netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN chmod +x wait-for-db.sh

EXPOSE 4001

CMD ["./wait-for-db.sh"]