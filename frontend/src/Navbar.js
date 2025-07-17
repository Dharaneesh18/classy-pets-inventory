// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🐠 Classy Pets & Aquarium</h2>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/products">Product List</Link></li>
        <li><Link to="/sell">Sell Product</Link></li>
        <li><Link to="/history">Sales History</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
