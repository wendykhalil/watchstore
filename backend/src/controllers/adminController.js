const productService = require("../services/productService");
const orderService = require("../services/orderService");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalUsers,
      pendingOrders,
      completedOrders,
      lowStockProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments({ status: { $ne: "cancelled" } }),
      User.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "delivered" }),
      Product.countDocuments({ stock: { $lte: parseInt(process.env.LOW_STOCK_THRESHOLD) || 3 } }),
    ]);

    // Calculate total revenue from delivered orders
    const revenueResult = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalUsers,
      pendingOrders,
      completedOrders,
      totalRevenue,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get dashboard statistics",
      error: error.message,
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const threshold = parseInt(process.env.LOW_STOCK_THRESHOLD) || 3;
    const products = await Product.find({
      stock: { $lte: threshold },
    }).sort({ stock: 1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get low stock products",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getLowStockProducts,
};