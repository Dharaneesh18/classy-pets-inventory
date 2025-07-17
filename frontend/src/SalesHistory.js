// frontend/src/SalesHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function SalesHistory() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN") + " " + d.toLocaleTimeString("en-IN");
  };

  const handleExport = () => {
    const headers = [
      "Product Name",
      "Quantity",
      "Payment Method",
      "Profit",
      "Selling Price",
      "Note",
      "Date",
    ];

    const rows = sales.map((s) => [
      s.productId?.name || "N/A",
      s.quantity,
      s.paymentMethod,
      s.profit,
      s.sellingPrice,
      s.note || "-",
      formatDate(s.createdAt),
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_history.csv";
    a.click();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📜 Sales History</h2>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export CSV
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Profit</th>
            <th className="border p-2">Sell ₹</th>
            <th className="border p-2">Note</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s._id} className="text-center">
              <td className="border p-2">{s.productId?.name || "N/A"}</td>
              <td className="border p-2">{s.quantity}</td>
              <td className="border p-2">{s.paymentMethod}</td>
              <td className="border p-2">₹{s.profit}</td>
              <td className="border p-2">₹{s.sellingPrice}</td>
              <td className="border p-2">{s.note || "-"}</td>
              <td className="border p-2">{formatDate(s.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesHistory;
