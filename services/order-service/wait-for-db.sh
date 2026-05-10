#!/bin/sh
echo "Waiting for postgres-order..."

until nc -z postgres-order 5432; do
  sleep 1
done

echo "Postgres started"

npx prisma migrate deploy

npm start
