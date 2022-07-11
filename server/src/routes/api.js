const express = require("express");

const usersRouter = require("./users/users.router");
const productsRouter = require("./products/products.router");
const ordersRouter = require("./orders.router");
const authRouter = require("./auth/auth.router");

const api = express.Router();

api.use("/users", usersRouter);
api.use("/products", productsRouter);
api.use("/orders", ordersRouter)
api.use("/auth", authRouter)

module.exports = api;