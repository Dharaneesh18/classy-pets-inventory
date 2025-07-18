const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load .env first

const connectDB = require("./config/db"); // ✅ Correct path

const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
