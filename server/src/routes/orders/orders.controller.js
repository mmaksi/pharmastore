const {
  getOrderById,
  getOrders,
  addOrder,
  getItems,
  deleteOrder
} = require("../../models/orders.model");
const { v4: uuidv4 } = require("uuid");

const httpAddOrder = async (req, res) => {
  const orderToAdd = req.body
  const orderId = uuidv4();
  const addedOrder = await addOrder({...orderToAdd, orderId, isDelivered: false});
  return res.status(200).json(addedOrder);
};

const httpGetOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  const orderById = await getOrderById(orderId);
  if (orderById) return res.status(200).json(orderById);
  res.status(404).json({ error: "order not found" });
};

const httpGetOrders = async (_, res) => {
  const orders = await getOrders();
  if (orders) return res.status(200).json(orders);
};

const httpGetOrderItems = async (_, res) => {
  const items = await getItems();
  if (items) return res.status(200).json(items);
}

const httpDeleteOrder = async (req, res) => {
  const orderId = req.params.id
  const deletedOrder = await deleteOrder(orderId)
  if (deletedOrder) return res.status(200).json(deletedOrder)
  return res.status(404).json({ error: "order not found" })
}

module.exports = { httpAddOrder, httpGetOrders, httpGetOrderById, httpGetOrderItems, httpDeleteOrder };
