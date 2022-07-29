const productsModel = require("./products.mongo");

const getAllProducts = async () => {
  const products = await productsModel.find({}, { __v: 0 });
  return products;
};

const getCategoryProducts = async (categoryName) => {
  const categoryProducts = await productsModel.find({ category: categoryName }, { __v: 0, _id: 0 });
  return categoryProducts;
};

const addProduct = async (product) => {
  await productsModel.findOneAndUpdate(
    { productName: product.productName },
    product,
    { upsert: true }
  );
};

const deleteProduct = async (product) => {
  const foundDeletedProduct = await productsModel.findOne({ name: product.productName });
  console.log(foundDeletedProduct)
  // if (foundDeletedProduct) await productsModel.deleteOne({ name: product.productName });
}

module.exports = { getAllProducts, getCategoryProducts, addProduct, deleteProduct };
