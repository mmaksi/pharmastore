const express = require("express");
const { httpGetAllProducts, httpGetCategoryProducts, httpAddProduct, httpDeleteProduct } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/:categoryName", httpGetCategoryProducts);
productsRouter.post("/", httpAddProduct);
productsRouter.delete("/", httpDeleteProduct)

module.exports = productsRouter;
