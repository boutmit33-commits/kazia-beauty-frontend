'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));

    const handleStorage = () => {
      const updated = localStorage.getItem('user');
      if (updated) setUser(JSON.parse(updated));
      else setUser(null);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/shop?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav style={{
        padding: '20px 40px',
        backgroundColor: 'rgba(250,248,245,0.95)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', gap: '28px', fontSize: '11px', letterSpacing: '2px', flex: 1 }}>
          <Link href="/shop" style={{ color: '#1a1a1a' }}>SHOP</Link>
          {user?.is_admin && <Link href="/admin" style={{ color: '#1a1a1a' }}>ADMIN</Link>}
        </div>

        <Link href="/" style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '30px',
          fontWeight: '300',
          letterSpacing: '8px',
          color: '#1a1a1a',
          flex: 1,
          textAlign: 'center',
        }}>KAZIA</Link>

        <div style={{ display: 'flex', gap: '28px', alignItems: 'center', fontSize: '11px', letterSpacing: '2px', flex: 1, justifyContent: 'flex-end' }}>
          <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>SEARCH</button>
          {user ? (
            <>
              <span style={{ color: '#888', fontStyle: 'italic', fontSize: '12px', fontFamily: 'Cormorant Garamond, serif' }}>{user.name}</span>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', letterSpacing: '2px', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>LOGOUT</button>
            </>
          ) : (
            <Link href="/login" style={{ color: '#1a1a1a' }}>ACCOUNT</Link>
          )}
          <Link href="/cart" style={{ color: '#1a1a1a' }}>
            BAG ({totalItems})
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: '65px',
          left: 0,
          right: 0,
          backgroundColor: '#FAF8F5',
          padding: '30px 40px',
          zIndex: 99,
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          <input
            autoFocus
            type="text"
            placeholder="Search for a product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: '100%',
              border: 'none',
              borderBottom: '1px solid #1a1a1a',
              backgroundColor: 'transparent',
              fontSize: '20px',
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: '300',
              padding: '10px 0',
              outline: 'none',
              color: '#1a1a1a',
            }}
          />
          <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#888' }}>✕</button>
        </div>
      )}
    </>
  );
}
