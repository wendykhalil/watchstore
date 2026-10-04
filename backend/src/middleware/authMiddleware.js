const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Remove "Bearer " prefix if present
    const tokenValue = token.replace("Bearer ", "");

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    
    // Verify user still exists
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Token is no longer valid",
      });
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
      });
    }

    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;