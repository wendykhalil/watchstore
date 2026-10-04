const authService = require("../services/authService");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { user, token } = await authService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    if (error.message === "User with this email already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }
    
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    if (
      error.message === "Invalid email or password" ||
      error.message === "User not found"
    ) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    
    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(req.user.userId);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user profile",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};