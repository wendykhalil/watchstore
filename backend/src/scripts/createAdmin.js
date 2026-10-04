const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@verdanttime.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@verdanttime.com",
      password: "Admin123!", // This will be hashed by the pre-save hook
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully:");
    console.log("Email: admin@verdanttime.com");
    console.log("Password: Admin123!");
    console.log("Please change the password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
    process.exit(1);
  }
};

createAdminUser();