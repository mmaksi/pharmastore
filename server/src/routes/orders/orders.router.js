const express = require("express");
const { httpAddOrder, httpGetOrders, httpGetDeliveredOrders, httpGetOrderById, httpGetOrderItems, httpDeleteOrder } = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.post("/", httpAddOrder);
ordersRouter.get("/", httpGetOrders);
ordersRouter.get("/delivered", httpGetDeliveredOrders);
ordersRouter.get("/items", httpGetOrderItems);
ordersRouter.get("/:orderId", httpGetOrderById);
ordersRouter.delete("/:id", httpDeleteOrder);

module.exports = ordersRouter;

