const ordersModel = require("./orders.mongo");

const getOrders = async () => {
  const orders = await ordersModel.find({}, { __v: 0, _id: 0 }).populate([
    "user",
    {
      path: "orderItems",
      populate: "product"
    },
  ]);
  return orders;
};

const getOrderById = async (orderId) => {
  const orderById = await ordersModel.findById(orderId);
  return orderById;
};

const addOrder = async (orderToAdd) => {
  console.log(orderToAdd);
  await ordersModel.findOneAndUpdate({ name: orderToAdd.name }, orderToAdd, {
    upsert: true,
  });
};

module.exports = {
  getOrderById,
  getOrders,
  addOrder,
};
