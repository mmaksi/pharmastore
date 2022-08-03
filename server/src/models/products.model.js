const productsModel = require("./products.mongo");

const getAllProducts = async () => {
  const products = await productsModel.find({}, { __v: 0 });
  return products;
};

const getCategoryProducts = async (categoryName) => {
  const categoryProducts = await productsModel.find({ category: categoryName }, { __v: 0 });
  return categoryProducts;
};

const addProduct = async (product) => {
  await productsModel.findOneAndUpdate(
    { productName: product.productName },
    product,
    { upsert: true }
  );
};

const deleteProduct = async (productName) => {
  try {
    const docs = await productsModel.findOneAndRemove({
      productName: productName,
    });
    return docs
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllProducts, getCategoryProducts, addProduct, deleteProduct };
