import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const BASE_URL = "http://localhost:5000";
 // change if needed

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data);
      console.log("Products fetched:", res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/products/${editingProduct._id}`,
        editingProduct
      );
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Category", "Stock", "Cost Price", "Selling Price"];
    const rows = products.map((p) => [
      p.name,
      p.category,
      p.stock,
      p.costPrice,
      p.sellingPrice,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
  };

  // ✅ FIXED FILTERING: show all if search is empty
  const filtered = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Product List</h2>

      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or category"
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Cost Price</th>
              <th className="border p-2">Selling Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="text-center">
                {editingProduct && editingProduct._id === p._id ? (
                  <>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="name"
                        value={editingProduct.name}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name="category"
                        value={editingProduct.category}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        name="stock"
                        value={editingProduct.stock}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        name="costPrice"
                        value={editingProduct.costPrice}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        name="sellingPrice"
                        value={editingProduct.sellingPrice}
                        onChange={handleEditChange}
                        className="border p-1 rounded"
                      />
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={handleEditSave}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{p.name}</td>
                    <td className="border p-2">{p.category}</td>
                    <td className="border p-2">{p.stock}</td>
                    <td className="border p-2">₹{p.costPrice}</td>
                    <td className="border p-2">₹{p.sellingPrice}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
