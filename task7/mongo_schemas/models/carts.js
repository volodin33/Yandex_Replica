db.createCollection("carts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["items", "status", "created_at", "updated_at", "expires_at"],
      properties: {
        _id: { bsonType: "objectId" },

        user_id: { bsonType: "string", minLength: 1 },
        session_id: { bsonType: "string", minLength: 1 },

        items: {
          bsonType: "array",
          minItems: 0,
          items: {
            bsonType: "object",
            required: ["product_id", "quantity"],
            properties: {
              product_id: { bsonType: "string", minLength: 1 },
              quantity: { bsonType: ["int", "long"], minimum: 1 }
            }
          }
        },

        status: {
          bsonType: "string",
          enum: ["active", "ordered", "abandoned"]
        },

        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" },
        expires_at: { bsonType: "date" }
      },

      anyOf: [
        { required: ["user_id"] },
        { required: ["session_id"] }
      ]
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

db.carts.createIndex({ user_id: 1, status: 1 });
db.carts.createIndex({ session_id: 1, status: 1 });
db.carts.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 });
db.carts.createIndex({ updated_at: -1 });

sh.shardCollection(db.getName() + ".carts", { _id: "hashed" });