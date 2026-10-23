'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Toners', 'Eye Creams', 'Face Oils', 'Masks', 'Sunscreen', 'Exfoliators', 'Lip Care', 'Tools'];

function ShopContent() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    fetch(`http://127.0.0.1:8000/api/products?${params}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [category, search]);

  return (
    <main style={{ padding: '60px 60px 100px', backgroundColor: '#FAF8F5', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <p style={{ letterSpacing: '4px', fontSize: '11px', color: '#888', marginBottom: '16px' }}>KAZIA BEAUTY</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '56px', fontWeight: '300', marginBottom: '40px' }}>The Collection</h1>

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

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '12px', color: '#888', letterSpacing: '1px', maxWidth: '1200px', margin: '0 auto 30px' }}>
        {products.length} PRODUCTS
      </p>

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
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}