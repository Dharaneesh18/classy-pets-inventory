const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ POST: Add new product
router.post("/", async (req, res) => {
  try {
    const { name, category, stock, costPrice, sellingPrice } = req.body;
    const product = new Product({ name, category, stock, costPrice, sellingPrice });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Add Product Error:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// ✅ GET: Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to get products" });
  }
});

// ✅ PUT: Update a product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// ✅ DELETE: Delete a product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;