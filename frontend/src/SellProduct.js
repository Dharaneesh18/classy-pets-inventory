// frontend/src/SellProduct.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function SellProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sellProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/sales", {
        productId: selectedProduct,
        quantity,
        paymentMethod,
        note,
      });

      setMessage("✅ Product sold successfully!");
      setSelectedProduct("");
      setQuantity(1);
      setPaymentMethod("Cash");
      setNote("");
    } catch (err) {
      console.error("Sale failed:", err);
      setMessage("❌ Failed to sell product.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🛒 Sell Product</h2>

      <select
        className="border p-2 rounded w-full mb-3"
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">-- Select Product --</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="text"
        placeholder="Customer name or notes"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <select
        className="border p-2 rounded w-full mb-3"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="Cash">Cash</option>
        <option value="GPay">GPay</option>
      </select>

      <button
        onClick={sellProduct}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Sell
      </button>

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}

export default SellProduct;
