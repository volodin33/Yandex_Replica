#!/usr/bin/env bash
set -e
docker cp ./models/orders.js mongos_router:/tmp/orders.js
docker cp ./models/products.js mongos_router:/tmp/products.js
docker cp ./models/carts.js mongos_router:/tmp/carts.js

docker exec -i mongos_router mongosh --port 27030 < init-schemas.js