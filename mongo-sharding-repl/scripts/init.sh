#!/usr/bin/env bash
set -e

docker compose up -d

docker exec -i configSrv mongosh --port 27017 --eval 'rs.initiate({_id:"config_server",configsvr:true,members:[{_id:0,host:"configSrv:27017"}]})' || true
docker exec -i shard1    mongosh --port 27018 --eval 'rs.initiate({_id:"shard1",members:[{_id:0,host:"shard1:27018"}, {_id:1,host:"shard1_1:27018"}]})' || true
docker exec -i shard2    mongosh --port 27019 --eval 'rs.initiate({_id:"shard2",members:[{_id:0,host:"shard2:27019"}, {_id:1,host:"shard2_1:27019"}]})' || true

docker exec -i mongos_router mongosh --port 27030 < init-router.js

docker exec -it shard1 mongosh --port 27018 --eval "rs.status()"
docker exec -it shard2 mongosh --port 27019 --eval "rs.status()"