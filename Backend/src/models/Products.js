const mongo = require("mongoose");
const productSchema = new mongo.Schema(
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
        inCart: { 
            type: Boolean, 
            default: false 
        },
        price: { 
            type: Number, 
            required: true 
        },
    },
    {
        timestamps: true, versionKey: false
    }
);
const Product = new mongo.model("Product", productSchema);
module.exports = Product;