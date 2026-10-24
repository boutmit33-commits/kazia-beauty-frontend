'use client';

import { useCart } from '../CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', phone: '' });

  const shipping = parseFloat(getTotalPrice()) >= 50 ? 0 : 5.99;
  const finalTotal = (parseFloat(getTotalPrice()) + shipping).toFixed(2);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setForm((prev) => ({ ...prev, name: parsed.name, email: parsed.email }));
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.phone) {
      alert('Please fill in all fields!');
      return;
    }

    const order = {
      customer_name: form.name,
      customer_email: form.email,
      customer_address: form.address + ', ' + form.city,
      customer_phone: form.phone,
      items: cart,
      total: finalTotal,
    };

    const response = await fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      router.push('/order-confirmation');
    } else {
      const data = await response.json();
      alert(data.message || 'Something went wrong. Please try again.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 0',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: 'transparent',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    marginBottom: '30px',
    color: '#1a1a1a',
  };

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '60px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '300', marginBottom: '60px', textAlign: 'center' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* FORM */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#888', marginBottom: '30px' }}>DELIVERY INFORMATION</p>

          <input style={inputStyle} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input style={inputStyle} name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <input style={inputStyle} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input style={inputStyle} name="address" placeholder="Street Address" value={form.address} onChange={handleChange} />
          <input style={inputStyle} name="city" placeholder="City" value={form.city} onChange={handleChange} />

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '18px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              letterSpacing: '3px',
              fontFamily: 'Inter, sans-serif',
              marginTop: '10px',
            }}>
            PLACE ORDER
          </button>
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#888', marginBottom: '30px' }}>ORDER SUMMARY</p>

          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#f5f2ee', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}>{item.name}</p>
                  <p style={{ color: '#888', fontSize: '12px' }}>Qty: {item.quantity}</p>
                </div>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '12px' }}>
              <span>Subtotal</span><span>${getTotalPrice()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '12px' }}>
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '500', borderTop: '1px solid #e0e0e0', paddingTop: '16px', marginTop: '12px' }}>
              <span>Total</span><span>${finalTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}