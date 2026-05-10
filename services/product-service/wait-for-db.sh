#!/bin/sh
echo "Waiting for postgres-product..."

until nc -z postgres-product 5432; do
  sleep 1
done

echo "Postgres started"

npx prisma migrate deploy

npm start
