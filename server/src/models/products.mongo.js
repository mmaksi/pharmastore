const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
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
    default: 0
  },
});

// Connects productsSchema with the "products" collection
module.exports = mongoose.model('Product', productsSchema);



