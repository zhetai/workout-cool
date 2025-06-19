#!/bin/sh

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Generating Prisma client..."
npx prisma generate


if [ "$NODE_ENV" != "production" ]; then
  echo "Non-production environment detected, importing sample data..."
    # Import exercises if CSV exists
    if [ -f "./data/sample-exercises.csv" ]; then
        npx tsx scripts/import-exercises-with-attributes.ts ./sample-data/exercises.csv
    else
        echo "No exercises sample data found, skipping import."
    fi
else
  echo "Production environment, skipping sample data import."
fi

echo "Starting the app..."
exec "$@"  # runs the CMD from the Dockerfile
