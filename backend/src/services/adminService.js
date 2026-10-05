const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async () => {
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

    return {
      totalProducts,
      totalOrders,
      totalUsers,
      pendingOrders,
      completedOrders,
      totalRevenue,
      lowStockProducts,
    };
  } catch (error) {
    throw new Error(`Failed to fetch dashboard statistics: ${error.message}`);
  }
};

const getLowStockProducts = async () => {
  try {
    const threshold = parseInt(process.env.LOW_STOCK_THRESHOLD) || 3;
    const products = await Product.find({
      stock: { $lte: threshold },
    }).sort({ stock: 1 });

    return products;
  } catch (error) {
    throw new Error(`Failed to fetch low stock products: ${error.message}`);
  }
};

module.exports = {
  getDashboardStats,
  getLowStockProducts,
};
