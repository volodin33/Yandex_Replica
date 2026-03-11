sh.enableSharding(db.getName());

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["product_id", "name", "category", "price", "stocks_by_zone"],
	  
      properties: {
        _id: { bsonType: "objectId" },
      
		product_id: { bsonType: "string", minLength: 1 },
        name: { bsonType: "string", minLength: 1 },
        category: { bsonType: "string", minLength: 1 },
        price: { bsonType: ["int", "long", "double", "decimal"], minimum: 0 },
        
		stocks_by_zone: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["geo_zone", "stock"],
            properties: {
              geo_zone: { bsonType: "string", minLength: 1 },
              stock: { bsonType: ["int", "long"], minimum: 0 }
            }
          }
        },
        
		attributes: { bsonType: "object" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

db.products.createIndex({ product_id: 1 }, { unique: true });
db.products.createIndex({ category: 1, price: 1 });
db.products.createIndex({ name: 1 });

sh.shardCollection(db.getName() + ".products", { product_id: "hashed" });