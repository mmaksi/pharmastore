const {
  getOrderById,
  getOrders,
  getDeliveredOrders,
  addOrder,
  getItems,
  setDeliveredOrder,
  findOrder,
} = require("../../models/orders.model");
const { v4: uuidv4 } = require("uuid");

const httpAddOrder = async (req, res) => {
  const orderToAdd = req.body;
  const orderId = uuidv4();
  const addedOrder = await addOrder({
    ...orderToAdd,
    orderId,
    isDelivered: false,
  });
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

const httpGetDeliveredOrders = async (req, res) => {
  const deliveredOrders = await getDeliveredOrders();
  if (deliveredOrders) return res.status(200).json(deliveredOrders);
}

const httpGetOrderItems = async (_, res) => {
  const items = await getItems();
  if (items) return res.status(200).json(items);
};

const httpDeleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const foundOrder = await findOrder(orderId);
  const deliveredOrder = Object.assign(foundOrder, { isDelivered: true });
  try {
    await setDeliveredOrder (deliveredOrder)
    return res.status(200).json(deliveredOrder)
  } catch (error) {
    return res.status(500).json({ error: "cannot delete the requested order" })
  }
  
  console.log("doc", doc)
};

module.exports = {
  httpAddOrder,
  httpGetOrders,
  httpGetDeliveredOrders,
  httpGetOrderById,
  httpGetOrderItems,
  httpDeleteOrder,
};
