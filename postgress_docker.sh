#!/bin/bash

# PostgreSQL configuration
POSTGRESQL_PORT=5432
POSTGRESQL_DB=my_db
POSTGRESQL_USER=postgres
POSTGRES_PASSWORD=test1234
POSTGRES_HOST=192.168.65.128  # used for binding if your Docker network supports it

# Optional: Name for the container
CONTAINER_NAME=custom-postgres

# Run the PostgreSQL container
docker run -d \
  --network host \
  --name $CONTAINER_NAME \
  -e POSTGRES_DB=$POSTGRESQL_DB \
  -e POSTGRES_USER=$POSTGRESQL_USER \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -p $POSTGRESQL_PORT:5432 \
  postgres

