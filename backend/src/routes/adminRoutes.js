const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
const adminController = require("../controllers/adminController");

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authMiddleware);
router.use(requireAdmin);

// Product management
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Order management
router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id", orderController.updateOrder);

// Dashboard and analytics
router.get("/dashboard", adminController.getDashboardStats);
router.get("/products/low-stock", adminController.getLowStockProducts);

module.exports = router;