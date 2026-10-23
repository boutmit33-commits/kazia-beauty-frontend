'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/';
    } else {
      setError(data.message);
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
    <main style={{ backgroundColor: '#FAF8F5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '60px 40px', backgroundColor: 'white' }}>
        <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#888', marginBottom: '16px', textAlign: 'center' }}>WELCOME BACK</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: '300', marginBottom: '40px', textAlign: 'center' }}>Sign In</h1>

        {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '20px', textAlign: 'center' }}>{error}</p>}

        <input suppressHydrationWarning style={inputStyle} name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
        <input suppressHydrationWarning style={inputStyle} name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            letterSpacing: '3px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
          }}>
          SIGN IN
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#888', letterSpacing: '1px' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>Create one</Link>
        </p>
      </div>
    </main>
  );
}