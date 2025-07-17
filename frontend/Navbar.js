// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/logo.png" alt="Classy Pets" className="logo" />
        <span className="brand-text">Classy Pets & Aquarium</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/list">Product List</Link></li>
        <li><Link to="/sell">Sell Product</Link></li>
        <li><Link to="/history">Sales History</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
