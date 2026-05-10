#!/bin/sh
echo "Waiting for postgres-user..."

until nc -z postgres-user 5432; do
  sleep 1
done

echo "Postgres started"

npx prisma migrate deploy

npm start
