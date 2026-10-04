const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create new user (role defaults to "customer")
  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id, user.role);

  return {
    user,
    token,
  };
};

const loginUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id, user.role);

  return {
    user,
    token,
  };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};