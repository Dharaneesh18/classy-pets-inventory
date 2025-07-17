import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/products", {
        name,
        category,
        stock: parseInt(stock),
        costPrice: parseFloat(costPrice),
        sellingPrice: parseFloat(sellingPrice),
      });

      alert("✅ Product added successfully!");
      setName("");
      setCategory("");
      setStock("");
      setCostPrice("");
      setSellingPrice("");
    } catch (err) {
      console.error("❌ Failed to add product", err.response?.data || err.message);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="add-product-container">
      <h2>➕ Add New Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} required onChange={(e) => setName(e.target.value)} />

        <label>Category</label>
        <select value={category} required onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select Category --</option>
          <option value="Fish">Fish</option>
          <option value="motor">accessories</option>
        </select>

        <label>Stock</label>
        <input type="number" value={stock} required onChange={(e) => setStock(e.target.value)} />

        <label>Cost Price</label>
        <input type="number" value={costPrice} required onChange={(e) => setCostPrice(e.target.value)} />

        <label>Selling Price</label>
        <input type="number" value={sellingPrice} required onChange={(e) => setSellingPrice(e.target.value)} />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
