import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SalesForm() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSell = async (e) => {
    e.preventDefault();

    if (!selectedId || !quantity || !paymentMethod) {
      setMessage('❌ Please fill all fields');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/products/sell/${selectedId}`, {
        quantity: parseInt(quantity),
        paymentMethod: paymentMethod
      });

      setMessage('✅ Sale successful');
      setSelectedId('');
      setQuantity('');
      setPaymentMethod('Cash');
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error(err);
      setMessage('❌ Sale failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Sell Product 🛒</h2>
      <form onSubmit={handleSell}>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select Fish/Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.quantity} in stock)
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity to Sell"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Cash">Cash</option>
          <option value="GPay">GPay</option>
        </select>

        <button type="submit">💸 Sell</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SalesForm;
