import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ShoppingBag } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');

  const fetchData = async () => {
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        api.get('/orders'),
        api.get('/users'),
        api.get('/products')
      ]);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !productId) return setError("Please select both a user and a product");
    try {
      await api.post('/orders', { userId, productId, quantity });
      setUserId('');
      setProductId('');
      setQuantity('1');
      setError(null);
      fetchData();
    } catch (err) {
      setError('Failed to create order.');
    }
  };

  const getUserName = (id) => users.find(u => u.id === id)?.name || `Unknown (ID: ${id})`;
  const getProductName = (id) => products.find(p => p.id === id)?.name || `Unknown (ID: ${id})`;

  if (loading) return <div className="loading">Loading Orders...</div>;

  return (
    <div>
      <h1>Order Dashboard</h1>
      {error && <div className="error">{error}</div>}

      <div className="grid grid-cols-2">
        <div className="card">
          <h2 className="card-title flex items-center gap-4"><ShoppingBag size={20}/> Create Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Customer</label>
              <select value={userId} onChange={e => setUserId(e.target.value)} required>
                <option value="" disabled>Select a User</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Product</label>
              <select value={productId} onChange={e => setProductId(e.target.value)} required>
                <option value="" disabled>Select a Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - ${parseFloat(p.price).toFixed(2)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} required />
            </div>
            <button type="submit" className="btn mb-4">Place Order</button>
          </form>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{getUserName(order.userId)}</td>
                  <td>{getProductName(order.productId)}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="4" style={{textAlign: 'center', color: '#9ca3af'}}>No orders placed yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
