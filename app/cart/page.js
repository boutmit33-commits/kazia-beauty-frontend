'use client';

import { useCart } from '../CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice } = useCart();
  const shipping = parseFloat(getTotalPrice()) >= 50 ? 0 : 5.99;
  const finalTotal = (parseFloat(getTotalPrice()) + shipping).toFixed(2);

  if (cart.length === 0) {
    return (
      <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: '300', color: '#1a1a1a' }}>Your bag is empty</p>
        <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#888' }}>LOOKS LIKE YOU HAVEN'T ADDED ANYTHING YET</p>
        <Link href="/shop" style={{ marginTop: '20px', padding: '14px 40px', backgroundColor: '#1a1a1a', color: 'white', fontSize: '11px', letterSpacing: '3px', fontFamily: 'Inter, sans-serif' }}>
          SHOP NOW
        </Link>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', padding: '40px 60px 100px' }}>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '300', marginBottom: '60px', textAlign: 'center' }}>Your Bag</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* ITEMS */}
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '30px', paddingBottom: '30px', marginBottom: '30px', borderBottom: '1px solid #e0e0e0' }}>
              <div style={{ backgroundColor: '#f5f2ee', aspectRatio: '1', overflow: 'hidden' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#888', marginBottom: '6px' }}>{item.category?.toUpperCase()}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: '400', marginBottom: '8px' }}>{item.name}</p>
                  <p style={{ fontSize: '14px', color: '#555' }}>${item.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', backgroundColor: 'white' }}>
                    <button onClick={() => decreaseQuantity(item.id)} style={{ padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>−</button>
                    <span style={{ padding: '8px 14px', fontSize: '13px', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0' }}>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} style={{ padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px', color: '#888', textDecoration: 'underline', fontFamily: 'Inter, sans-serif' }}>REMOVE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div style={{ backgroundColor: 'white', padding: '40px', height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: '300', marginBottom: '30px' }}>Order Summary</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px', color: '#555' }}>
            <span>Subtotal</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px', color: '#555' }}>
  <span>Shipping</span>
  <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
</div>
{shipping > 0 && (
  <p style={{ fontSize: '11px', color: '#888', marginBottom: '16px', letterSpacing: '1px' }}>Add ${(50 - parseFloat(getTotalPrice())).toFixed(2)} more for free shipping</p>
)}
<div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '15px', fontWeight: '500' }}>
  <span>Total</span>
  <span>${finalTotal}</span>
</div>
          <Link href="/checkout" style={{ display: 'block', padding: '16px', backgroundColor: '#1a1a1a', color: 'white', textAlign: 'center', fontSize: '11px', letterSpacing: '3px', fontFamily: 'Inter, sans-serif' }}>
            CHECKOUT
          </Link>
          <Link href="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontSize: '11px', letterSpacing: '2px', color: '#888', textDecoration: 'underline' }}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </main>
  );
}