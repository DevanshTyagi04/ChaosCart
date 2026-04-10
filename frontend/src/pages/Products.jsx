import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { PackagePlus, Tag } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', { name, price });
      setName('');
      setPrice('');
      fetchProducts();
    } catch (err) {
      setError('Failed to create product.');
    }
  };

  if (loading) return <div className="loading">Loading Products...</div>;

  return (
    <div>
      <h1>Product Catalog</h1>
      {error && <div className="error">{error}</div>}

      <div className="card mb-6" style={{maxWidth: '600px'}}>
        <h2 className="card-title flex items-center gap-4"><PackagePlus size={20}/> Add New Product</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center">
          <div className="form-group" style={{marginBottom: 0, flex: 2}}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Product Name" />
          </div>
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required placeholder="Price ($)" />
          </div>
          <button type="submit" className="btn">Add</button>
        </form>
      </div>

      <div className="grid grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="card-title" style={{marginBottom: 0}}>{product.name}</h3>
              <Tag size={16} color="#9ca3af" />
            </div>
            <div className="card-price">${parseFloat(product.price).toFixed(2)}</div>
            <div style={{fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem'}}>ID: #{product.id}</div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p style={{textAlign: 'center', color: '#9ca3af'}}>No products available.</p>}
    </div>
  );
};

export default Products;
