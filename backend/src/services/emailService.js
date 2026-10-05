const nodemailer = require("nodemailer");

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const sendNewOrderEmail = async (order, customer) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Order Received - #${order._id}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Customer:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Total:</strong> $${order.total}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <hr>
        <p>Please check the admin dashboard for order details.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`New order email sent for order #${order._id}`);
  } catch (error) {
    console.error("Failed to send new order email:", error.message);
    // Don't throw error - email failure shouldn't block order creation
  }
};

const sendOrderConfirmationEmail = async (order, customer) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: `Your Order #${order._id} Has Been Confirmed`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear ${customer.name},</p>
        <p>Your order #${order._id} has been confirmed and is being processed.</p>
        <p><strong>Order Total:</strong> $${order.total}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <hr>
        <p>Thank you for shopping with Verdant Time!</p>
        <p>We will notify you when your order ships.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${customer.email}`);
  } catch (error) {
    console.error("Failed to send order confirmation email:", error.message);
    // Don't throw error - email failure shouldn't block order processing
  }
};

module.exports = {
  sendNewOrderEmail,
  sendOrderConfirmationEmail,
};