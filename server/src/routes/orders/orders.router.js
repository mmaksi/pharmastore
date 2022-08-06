const express = require("express");
const { httpAddOrder, httpGetOrders, httpGetOrderById, httpGetOrderItems, httpDeleteOrder } = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.post("/", httpAddOrder);
ordersRouter.get("/", httpGetOrders);
ordersRouter.get("/items", httpGetOrderItems);
ordersRouter.get("/:orderId", httpGetOrderById);
ordersRouter.delete("/:id", httpDeleteOrder);

module.exports = ordersRouter;

