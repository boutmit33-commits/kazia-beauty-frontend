'use client';

import Link from 'next/link';
import { useCart } from '../CartContext';
import { useEffect } from 'react';

export default function OrderConfirmationPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', padding: '60px 40px' }}>
        <div style={{ width: '60px', height: '60px', border: '1px solid #1a1a1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', fontSize: '24px' }}>
          ✓
        </div>
        <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#888', marginBottom: '16px' }}>THANK YOU</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '300', marginBottom: '20px' }}>Order Confirmed</h1>
        <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.8', marginBottom: '50px' }}>
          Your order has been placed successfully. We will reach out to you shortly with your delivery details.
        </p>
        <Link href="/shop" style={{
          display: 'inline-block',
          padding: '16px 48px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          fontSize: '11px',
          letterSpacing: '3px',
          fontFamily: 'Inter, sans-serif',
        }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    </main>
  );
}