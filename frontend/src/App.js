import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import SellProduct from "./SellProduct";
import SalesHistory from "./SalesHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/sell" element={<SellProduct />} />
        <Route path="/history" element={<SalesHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
