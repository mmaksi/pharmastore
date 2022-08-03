const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  productId: String,
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Connects productsSchema with the "products" collection
module.exports = mongoose.model("Item", itemsSchema);
