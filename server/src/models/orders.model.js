const ordersModel = require("./orders.mongo");
const itemsModel = require("./items.mongo");

const getOrders = async () => {
  const orders = await ordersModel.find({ isDelivered: false }, { __v: 0 }).populate([
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

const getDeliveredOrders = async () => {
  const deliveredOrders = await ordersModel.find({ isDelivered: true }, { __v: 0 }).populate([
    {
      path: "user",
      select: "username",
    },
    {
      path: "orderItems"
    },
  ]);
  return deliveredOrders;
}

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

const setDeliveredOrder = async (order) => {
  try {
    await ordersModel.findOneAndUpdate({
      orderId: order.orderId,
    }, order);
    return order
  } catch (error) {
    console.log(error);
  }
};

const findOrder = async (orderId) => {
  const order = ordersModel.findOne({ orderId }, { _id: 0, __v: 0 })
  return order
}

module.exports = {
  getOrderById,
  getOrders,
  getDeliveredOrders,
  addOrder,
  getItems,
  setDeliveredOrder,
  findOrder
};
