const express = require("express");
const { httpGetAllProducts, httpGetCategoryProducts, httpAddProduct } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/:categoryName", httpGetCategoryProducts);
productsRouter.post("/", httpAddProduct);

module.exports = productsRouter;
