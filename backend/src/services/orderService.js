const Order = require("../models/Order");

const createOrder = async (orderData) => {
  const order = await Order.create(orderData);

  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find();

  return orders;
};

const getOrderById = async (id) => {
  const order = await Order.findById(id);

  return order;
};

const updateOrder = async (id, orderData) => {
  const order = await Order.findByIdAndUpdate(id, orderData, {
    new: true,
    runValidators: true,
  });

  return order;
};

const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);

  return order;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};