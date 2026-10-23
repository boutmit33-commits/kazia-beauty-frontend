'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Toners', 'Eye Creams', 'Face Oils', 'Masks', 'Sunscreen', 'Exfoliators', 'Lip Care', 'Tools'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    fetch(`http://127.0.0.1:8000/api/products?${params}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [category, search]);

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay muted loop playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          src="/hero.mp4"
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.15)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', padding: '0 20px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '5px', fontSize: '11px', marginBottom: '24px', opacity: 0.85 }}>SKINCARE THAT LOVES YOU BACK</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '120px', fontWeight: '300', lineHeight: 1, marginBottom: '24px', letterSpacing: '12px' }}>KAZIA</h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: '300', fontStyle: 'italic', marginBottom: '48px', opacity: 0.9 }}>Glow from the inside out</p>
          <Link href="#products" style={{ padding: '14px 48px', backgroundColor: 'white', color: '#1a1a1a', letterSpacing: '3px', fontSize: '11px', fontFamily: 'Inter, sans-serif', display: 'inline-block' }}>SHOP NOW</Link>
        </div>
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '1px', height: '60px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '3px' }}>SCROLL</p>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ padding: '100px 60px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: '300', fontStyle: 'italic', lineHeight: 1.6, color: '#1a1a1a' }}>
          "Thoughtfully crafted skincare for every skin type. Clean ingredients, real results."
        </p>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: '40px 60px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p style={{ letterSpacing: '4px', fontSize: '11px', color: '#888', marginBottom: '16px' }}>THE COLLECTION</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '48px', fontWeight: '300', marginBottom: '40px' }}>Our Products</h2>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 20px',
              border: '1px solid #e0e0e0',
              backgroundColor: 'white',
              fontSize: '13px',
              letterSpacing: '1px',
              outline: 'none',
              marginBottom: '30px',
              fontFamily: 'Inter, sans-serif',
            }}
          />

          {/* CATEGORIES */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '50px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 20px',
                  backgroundColor: category === cat ? '#1a1a1a' : 'transparent',
                  color: category === cat ? 'white' : '#1a1a1a',
                  border: '1px solid #1a1a1a',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s ease',
                }}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {products.length === 0 ? (
            <p style={{ color: '#888', letterSpacing: '1px', fontSize: '13px' }}>No products found.</p>
          ) : (
            products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} style={{ color: 'inherit' }}>
                <div
                  style={{ backgroundColor: 'white', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ height: '320px', overflow: 'hidden', backgroundColor: '#f5f2ee' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#888', marginBottom: '6px' }}>{product.category?.toUpperCase()}</p>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: '400', marginBottom: '6px' }}>{product.name}</h3>
                    <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px', lineHeight: '1.7' }}>{product.description.substring(0, 70)}...</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', letterSpacing: '1px' }}>${product.price}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '60px', textAlign: 'center', backgroundColor: '#FAF8F5' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: '300', letterSpacing: '8px', marginBottom: '16px' }}>KAZIA</p>
        <p style={{ fontSize: '11px', color: '#888', letterSpacing: '2px' }}>© 2026 KAZIA BEAUTY. ALL RIGHTS RESERVED.</p>
      </footer>
    </>
  );
}
