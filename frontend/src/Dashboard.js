import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalStock: 0,
    outOfStock: 0,
    totalProfit: 0,
    gpayAmount: 0,
    cashAmount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products and sales
        const productRes = await axios.get("http://localhost:5000/api/products");
        const salesRes = await axios.get("http://localhost:5000/api/sales");

        const products = productRes.data;
        const sales = salesRes.data;

        // Total product and stock info
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, p) => sum + Number(p.stock || 0), 0);
        const outOfStock = products.filter((p) => p.stock <= 0).length;

        // Sales info
        let totalProfit = 0;
        let gpayAmount = 0;
        let cashAmount = 0;

        sales.forEach((s) => {
          totalProfit += s.profit || 0;
          const amount = s.sellingPrice * s.quantity;
          if (s.paymentMethod === "GPay") gpayAmount += amount;
          if (s.paymentMethod === "Cash") cashAmount += amount;
        });

        setSummary({
          totalProducts,
          totalStock,
          outOfStock,
          totalProfit,
          gpayAmount,
          cashAmount,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="🛒 Total Products" value={summary.totalProducts} />
        <Card title="📦 Total Stock" value={summary.totalStock} />
        <Card title="🚫 Out of Stock" value={summary.outOfStock} />
        <Card title="💰 Total Profit (Sales)" value={`₹${summary.totalProfit}`} />
        <Card title="💸 GPay Amount" value={`₹${summary.gpayAmount}`} />
        <Card title="💵 Cash Amount" value={`₹${summary.cashAmount}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

export default Dashboard;
