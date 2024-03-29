const { v4: uuidv4 } = require("uuid");
const {
  getAllProducts,
  getCategoryProducts,
  addProduct,
  deleteProduct,
} = require("../../models/products.model");

const httpGetAllProducts = async (req, res) => {
  const products = await getAllProducts();
  return res.status(200).json(products);
};

const httpGetCategoryProducts = async (req, res) => {
  const categoryName = req.params.categoryName;
  const categoryProducts = await getCategoryProducts(categoryName);
  if (categoryProducts) return res.status(200).json(categoryProducts);
  res.status(404).json({ error: "category not found" });
};

const httpAddProduct = async (req, res) => {
  let product = req.body;
  if (
    !product.productName ||
    !product.category ||
    !product.imageUrl ||
    !product.price
  ) {
    res.status(400).json({ error: "missing required properties" });
  } else {
    const productId = uuidv4();
    product = { ...product, productId };
    await addProduct(product);
    res.status(201).json(product);
  }
};

const httpDeleteProduct = async (req, res) => {
  const productName = req.params.productName;
  const deletedProduct = await deleteProduct(productName);
  if (deletedProduct) return res.status(200).json(deletedProduct);
  return res.status(404).json({ error: "product not found" });
};

module.exports = {
  httpGetAllProducts,
  httpGetCategoryProducts,
  httpAddProduct,
  httpDeleteProduct,
};
