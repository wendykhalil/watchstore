const adminService = require("../services/adminService");

const getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get dashboard statistics",
      error: error.message,
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const products = await adminService.getLowStockProducts();
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