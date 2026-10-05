const Product = require("../models/Product");
const validateObjectId = require("../utils/validateObjectId");

const createProduct = async (productData) => {
  const product = await Product.create(productData);

  return product;
};
const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};
const getProductById = async (id) => {
  validateObjectId(id);
  
  const product = await Product.findById(id);

  if (!product) {
    throw new Error(`Product not found with id: ${id}`);
  }

  return product;
};
const updateProduct = async (id, productData) => {
  validateObjectId(id);
  
  const product = await Product.findByIdAndUpdate(
    id,
    productData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new Error(`Product not found with id: ${id}`);
  }

  return product;
};
const deleteProduct = async (id) => {
  validateObjectId(id);
  
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error(`Product not found with id: ${id}`);
  }

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};