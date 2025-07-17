const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    paymentMethod: String,
    profit: Number,
    sellingPrice: Number,
    note: String, // ✅ Added
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
