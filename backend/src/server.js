const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Verdant Time API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});