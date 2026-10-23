'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', image: '', category: 'Serums' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = ['Serums', 'Moisturizers', 'Cleansers', 'Toners', 'Eye Creams', 'Face Oils', 'Masks', 'Sunscreen', 'Exfoliators', 'Lip Care', 'Tools'];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/login'); return; }
    const parsed = JSON.parse(user);
    if (!parsed.is_admin) { router.push('/'); return; }
    setLoading(false);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price || !form.stock) {
      alert('Please fill in all fields!');
      return;
    }
    const token = localStorage.getItem('token');
    const url = editingId ? `http://127.0.0.1:8000/api/products/${editingId}` : 'http://127.0.0.1:8000/api/products';
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
        if (!res.ok) {
      const text = await res.text();
      alert('Status: ' + res.status + '\n' + text.slice(0, 300));
      return;
    }
    setForm({ name: '', description: '', price: '', stock: '', image: '', category: 'Serums' });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, description: product.description, price: product.price, stock: product.stock, image: product.image || '', category: product.category || 'Serums' });
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      alert('Something went wrong. Try logging out and back in as admin.');
      return;
    }
    fetchProducts();
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 0',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: 'transparent',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    marginBottom: '24px',
    color: '#1a1a1a',
  };

  if (loading) return null;

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '60px' }}>
      <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#888', marginBottom: '16px', textAlign: 'center' }}>KAZIA BEAUTY</p>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '300', marginBottom: '60px', textAlign: 'center' }}>Admin Panel</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '80px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* FORM */}
        <div style={{ backgroundColor: 'white', padding: '40px', height: 'fit-content' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#888', marginBottom: '30px' }}>{editingId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</p>

          <input style={inputStyle} name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
          <input style={inputStyle} name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input style={inputStyle} name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} />
          <input style={inputStyle} name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
          <input style={inputStyle} name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: '30px' }}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <button
            onClick={handleSubmit}
            style={{ width: '100%', padding: '16px', backgroundColor: '#1a1a1a', color: 'white', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '3px', fontFamily: 'Inter, sans-serif', marginBottom: '12px' }}>
            {editingId ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
          </button>

          {editingId && (
            <button
              onClick={() => { setForm({ name: '', description: '', price: '', stock: '', image: '', category: 'Serums' }); setEditingId(null); }}
              style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#888', border: '1px solid #e0e0e0', cursor: 'pointer', fontSize: '11px', letterSpacing: '3px', fontFamily: 'Inter, sans-serif' }}>
              CANCEL
            </button>
          )}
        </div>

        {/* PRODUCTS TABLE */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#888', marginBottom: '30px' }}>{products.length} PRODUCTS</p>
          <div style={{ backgroundColor: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 120px', gap: '20px', padding: '16px 24px', borderBottom: '1px solid #f0f0f0', fontSize: '10px', letterSpacing: '2px', color: '#888' }}>
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>STOCK</span>
              <span>ACTIONS</span>
            </div>
            {products.map((product) => (
              <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 120px', gap: '20px', padding: '16px 24px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#f5f2ee', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', marginBottom: '2px' }}>{product.name}</p>
                    <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#888' }}>{product.category}</p>
                  </div>
                </div>
                <span style={{ fontSize: '14px' }}>${product.price}</span>
                <span style={{ fontSize: '14px' }}>{product.stock}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(product)} style={{ padding: '6px 14px', backgroundColor: 'transparent', color: '#1a1a1a', border: '1px solid #1a1a1a', cursor: 'pointer', fontSize: '10px', letterSpacing: '1px', fontFamily: 'Inter, sans-serif' }}>EDIT</button>
                  <button onClick={() => handleDelete(product.id)} style={{ padding: '6px 14px', backgroundColor: 'transparent', color: 'red', border: '1px solid red', cursor: 'pointer', fontSize: '10px', letterSpacing: '1px', fontFamily: 'Inter, sans-serif' }}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}