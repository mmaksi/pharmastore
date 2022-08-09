const mongoose = require("mongoose");

const idsSchema = new mongoose.Schema({
  pharmacistId: String,
});

// Connects productsSchema with the "products" collection
module.exports = mongoose.model("Id", idsSchema);
