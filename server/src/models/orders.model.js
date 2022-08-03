const ordersModel = require("./orders.mongo");
const itemsModel = require("./items.mongo");

const getOrders = async () => {
  const orders = await ordersModel.find({}, { __v: 0 }).populate([
    {
      path: "user",
      select: "username",
    },
    {
      path: "orderItems"
    },
  ]);
  return orders;
};

const getItems = async () => {
  const items = await itemsModel.find({}, { __v: 0 });
  return items;
};

const getOrderById = async (orderId) => {
  const orderById = await ordersModel.findById(orderId);
  return orderById;
};

const addOrder = async (orderToAdd) => {
  return await saveOrder(orderToAdd);
};

const saveOrder = async (order) => {
  await ordersModel.findOneAndUpdate(
    { orderId: order.orderId },
    order,
    { upsert: true }
  );
};

const deleteOrder = async (orderId) => {
  try {
    const docs = await ordersModel.findOneAndRemove({
      orderId: orderId,
    });
    return docs
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrderById,
  getOrders,
  addOrder,
  getItems,
  deleteOrder
};
