const productService = require("../services/productService");

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};