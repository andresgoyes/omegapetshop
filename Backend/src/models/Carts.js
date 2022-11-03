const mongo = require("mongoose");
const cartSchema = new mongo.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true 
    },
    img: { 
      type: String, 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
  },
  {
  timestamps: true,
  versionKey: false
  }
);
const Cart = new mongo.model("Cart", cartSchema);
module.exports = Cart;