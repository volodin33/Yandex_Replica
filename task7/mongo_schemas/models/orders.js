db.createCollection("orders", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["order_id", "customer_id", "created_at", "items", "status", "total_amount", "geo_zone"],
        properties: {
          _id: { bsonType: "objectId" },
          
		  order_id: { bsonType: "string", minLength: 1 },
          customer_id: { bsonType: "string", minLength: 1 },
          created_at: { bsonType: "date" },
          status: { bsonType: "string", minLength: 1 },
          total_amount: { bsonType: ["int", "long", "double", "decimal"], minimum: 0 },
          geo_zone: { bsonType: "string", minLength: 1 },
          
		  items: {
            bsonType: "array",
            minItems: 1,
            items: {
              bsonType: "object",
              required: ["product_id", "price", "quantity"],
              properties: {
                product_id: { bsonType: "string", minLength: 1 },
                price: { bsonType: ["int", "long", "double", "decimal"], minimum: 0 },
                quantity: { bsonType: ["int", "long"], minimum: 1 }
              }
            }
          }
        }
      }
    },
	
    validationLevel: "strict",
    validationAction: "error"
  });

db.orders.createIndex({ "customer_id": 1, "created_at": 1 });
db.orders.createIndex({ order_id: 1 });

sh.shardCollection(db.getName() + ".orders", { customer_id: "hashed" });