const express = require("express");
const { httpAddOrder, httpGetOrders, httpGetOrderById } = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.post("/", httpAddOrder);
ordersRouter.get("/", httpGetOrders);
ordersRouter.get("/:orderId", httpGetOrderById);

module.exports = ordersRouter;
