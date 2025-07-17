const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  stock: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true }
});

module.exports = mongoose.model("Product", productSchema);
