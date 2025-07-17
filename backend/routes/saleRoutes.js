const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const { productId, quantity, paymentMethod, note } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const profit = (product.sellingPrice - product.costPrice) * quantity;

    const sale = new Sale({
      productId,
      quantity,
      paymentMethod,
      profit,
      sellingPrice: product.sellingPrice,
      note, // ✅ Added
    });

    await sale.save();

    // Update stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (err) {
    console.error("Sale Error:", err);
    res.status(500).json({ message: "Failed to record sale" });
  }
});

router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().populate("productId").sort({ createdAt: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: "Failed to get sales" });
  }
});

module.exports = router;
