'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../CartContext';
import Link from 'next/link';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [toast, setToast] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  if (!product) return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#888' }}>
      Loading...
    </div>
  );

  return (
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh' }}>

      {/* TOAST */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '30px', right: '30px',
          backgroundColor: '#1a1a1a', color: 'white',
          padding: '16px 28px', fontSize: '12px',
          letterSpacing: '2px', zIndex: 1000,
          fontFamily: 'Inter, sans-serif',
        }}>
          ✓ ADDED TO BAG
        </div>
      )}

      {/* BREADCRUMB */}
      <div style={{ padding: '20px 60px', fontSize: '11px', letterSpacing: '2px', color: '#888' }}>
        <Link href="/" style={{ color: '#888' }}>HOME</Link>
        <span style={{ margin: '0 10px' }}>／</span>
        <Link href="/shop" style={{ color: '#888' }}>SHOP</Link>
        <span style={{ margin: '0 10px' }}>／</span>
        <span style={{ color: '#1a1a1a' }}>{product.name.toUpperCase()}</span>
      </div>

      {/* PRODUCT LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', padding: '20px 60px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* IMAGE */}
        <div style={{ backgroundColor: '#f5f2ee', aspectRatio: '1', overflow: 'hidden' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* DETAILS */}
        <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#888', marginBottom: '16px' }}>{product.category?.toUpperCase()}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '300', marginBottom: '20px', lineHeight: 1.1 }}>{product.name}</h1>
          <p style={{ fontSize: '22px', fontWeight: '300', letterSpacing: '1px', marginBottom: '30px' }}>${product.price}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#555', marginBottom: '40px', maxWidth: '420px' }}>{product.description}</p>

          {/* STOCK */}
          <p style={{ fontSize: '11px', letterSpacing: '2px', color: product.stock > 0 ? '#888' : 'red', marginBottom: '30px' }}>
            {product.stock > 0 ? `IN STOCK — ${product.stock} LEFT` : 'OUT OF STOCK'}
          </p>

          {/* QUANTITY */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#888' }}>QUANTITY</p>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', backgroundColor: 'white' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>−</button>
              <span style={{ padding: '12px 18px', fontSize: '14px', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>+</button>
            </div>
          </div>

          {/* ADD TO BAG */}
          <button
            onClick={handleAddToCart}
            style={{
              padding: '18px',
              backgroundColor: '#1a1a1a',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              letterSpacing: '3px',
              fontFamily: 'Inter, sans-serif',
              width: '100%',
              maxWidth: '420px',
              marginBottom: '16px',
            }}>
            ADD TO BAG
          </button>

          <Link href="/shop" style={{ fontSize: '12px', letterSpacing: '2px', color: '#888', textDecoration: 'underline' }}>
            CONTINUE SHOPPING
          </Link>

          {/* DIVIDER */}
          <div style={{ borderTop: '1px solid #e0e0e0', margin: '40px 0 30px' }} />

          {/* DETAILS */}
          <div style={{ fontSize: '12px', lineHeight: '2', color: '#888', letterSpacing: '1px' }}>
            <p>✓ Clean ingredients</p>
            <p>✓ Dermatologist tested</p>
            <p>✓ Free shipping over $50</p>
            <p>✓ 30-day return policy</p>
          </div>
        </div>
      </div>
    </main>
  );
}