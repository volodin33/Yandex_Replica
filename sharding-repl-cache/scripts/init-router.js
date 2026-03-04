sh.addShard("shard1/shard1:27018,shard1_1:27018");
sh.addShard("shard2/shard2:27019,shard2_1:27019");

sh.enableSharding("somedb");
sh.shardCollection("somedb.helloDoc", { name: "hashed" });

db = db.getSiblingDB("somedb");
for (let i = 0; i < 1000; i++) 
	db.helloDoc.insertOne({ age: i, name: "ly" + i });

print("\nmongos count =", db.helloDoc.countDocuments());
print("\nshard1 count =", new Mongo("mongodb://shard1:27018").getDB("somedb").helloDoc.countDocuments());
print("\nshard2 count =", new Mongo("mongodb://shard2:27019").getDB("somedb").helloDoc.countDocuments());
