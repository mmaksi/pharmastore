const express = require("express");
const { httpGetAllProducts, httpGetCategoryProducts, httpAddProduct, httpDeleteProduct } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/:categoryName", httpGetCategoryProducts);
productsRouter.post("/", httpAddProduct);
productsRouter.delete("/:productName", httpDeleteProduct)

module.exports = productsRouter;

// GET "http://localhost:8000/v1/products/"
// GET "http://localhost:8000/v1/products/heartFailure"
// POST "http://localhost:8000/v1/products/"
// DELETE "http://localhost:8000/v1/products/lasix"