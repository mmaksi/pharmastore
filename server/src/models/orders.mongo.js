const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
