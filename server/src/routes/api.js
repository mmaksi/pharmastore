const express = require("express");
const productsRouter = require("./products/products.router");
// const { launchesRouter } = require("./launches/launches.router");

const api = express.Router();

api.use("/products", productsRouter);
// api.use("/users", usersRouter);

module.exports = api;