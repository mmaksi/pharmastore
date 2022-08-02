const ordersModel = require("./orders.mongo");
const { v4: uuidv4 } = require('uuid');

const getOrders = async () => {
  const orders = await ordersModel.find({}, { __v: 0, _id: 0 }).populate([
    {
      path: "user",
      select: "username"
    },
    {
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product"
      }
    },
  ]);

  return orders;
};

const getOrderById = async (orderId) => {
  const orderById = await ordersModel.findById(orderId);
  return orderById;
};

const addOrder = async (orderToAdd) => {
  const orderId = uuidv4()
  orderToAdd = { ...orderToAdd, orderId }
  console.log(orderToAdd);
  await ordersModel.findOneAndUpdate({ orderId: orderToAdd.orderId }, orderToAdd, {
    upsert: true,
  });
};

module.exports = {
  getOrderById,
  getOrders,
  addOrder,
};
