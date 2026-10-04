const Product = require("../models/Product");

const createProduct = async (productData) => {
  const product = await Product.create(productData);

  return product;
};
const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};
const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};
const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    productData,
    {
      new: true,
      runValidators: true,
    }
  );

  return product;
};
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};