const Order = require("../models/Order");
const Product = require("../models/Product");
const emailService = require("./emailService");
const validateObjectId = require("../utils/validateObjectId");

const createOrder = async (orderData) => {
  const { customer, items } = orderData;

  // 1. Prepare order items and validate all products
  const orderItems = [];
  const productsToUpdate = [];

  // 2. Check every product and reserve stock
  for (const item of items) {
    const product = await Product.findById(item.product);

    // Product doesn't exist
    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }

    // Not enough stock
    if (product.stock < item.quantity) {
      throw new Error(
        `Not enough stock for ${product.name}. Available stock: ${product.stock}`
      );
    }

    // Validate quantity
    if (item.quantity <= 0) {
      throw new Error(`Invalid quantity for product ${product.name}: ${item.quantity}`);
    }

    // Create order item using database information
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    // Store product and quantity for stock update
    productsToUpdate.push({
      productId: product._id,
      quantity: item.quantity,
      currentStock: product.stock
    });
  }

  // 3. Calculate total
  let total = 0;
  for (const item of orderItems) {
    total += item.price * item.quantity;
  }

  // 4. Create the order
  const order = await Order.create({
    customer,
    items: orderItems,
    total,
  });

  // 5. Decrease stock for all products
  for (const update of productsToUpdate) {
    await Product.findByIdAndUpdate(
      update.productId,
      { $inc: { stock: -update.quantity } },
      { runValidators: true }
    );
  }

  // 6. Send new order notification email (non-blocking)
  try {
    emailService.sendNewOrderEmail(order, customer);
  } catch (emailError) {
    console.error("Failed to send order notification:", emailError.message);
    // Continue even if email fails
  }

  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

const getOrderById = async (id) => {
  validateObjectId(id);
  
  const order = await Order.findById(id);
  
  if (!order) {
    throw new Error(`Order not found with id: ${id}`);
  }
  
  return order;
};

const updateOrder = async (id, orderData) => {
  validateObjectId(id);
  
  const order = await Order.findByIdAndUpdate(
    id,
    orderData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    throw new Error(`Order not found with id: ${id}`);
  }

  return order;
};

const deleteOrder = async (id) => {
  validateObjectId(id);
  
  const order = await Order.findByIdAndDelete(id);
  
  if (!order) {
    throw new Error(`Order not found with id: ${id}`);
  }
  
  return order;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};