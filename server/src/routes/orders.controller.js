const {
  getOrderById,
  getOrders,
  addOrder,
} = require("../models/orders.model");

const httpAddOrder = async (req, res) => {
  const orderToAdd = req.body
  await addOrder(orderToAdd);
  return res.status(200).json(orderToAdd);
};

const httpGetOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  const orderById = await getOrderById(orderId);
  if (orderById) return res.status(200).json(orderById);
  res.status(404).json({ error: "order not found " });
};

const httpGetOrders = async (req, res) => {
  const orders = await getOrders();
  if (orders) return res.status(200).json(orders);
};

module.exports = { httpAddOrder, httpGetOrders, httpGetOrderById };
