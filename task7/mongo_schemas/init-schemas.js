db = db.getSiblingDB("somedb");
sh.enableSharding(db.getName());

load('/tmp/orders.js');
load('/tmp/products.js');
load('/tmp/carts.js');