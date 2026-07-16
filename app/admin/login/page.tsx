'use client';

import { signIn } from 'next-auth/react';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // Check if it's a database error
        if (res.error.includes('database') || res.error.includes('SQLITE')) {
          setError('Database not initialized. Please run setup first.');
        } else {
          setError('Invalid email or password');
        }
      } else if (res?.ok) {
        router.push('/admin');
      }
    } catch (err) {
      setError('System error. Database may not be initialized.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1240' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '36px', fontWeight: 500, color: '#f6f5f0', letterSpacing: '-0.03em', marginBottom: '8px' }}>digibit</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Admin Dashboard</div>
        </div>
        <form onSubmit={handleSubmit} style={{ background: 'rgba(246,245,240,0.05)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '20px', padding: '36px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="admin@digibit.co"
              required
              disabled={loading}
              style={{ width: '100%', padding: '14px 18px', background: 'rgba(246,245,240,0.08)', border: '1px solid rgba(246,245,240,0.15)', borderRadius: '12px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '16px', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', opacity: loading ? 0.6 : 1 }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              style={{ width: '100%', padding: '14px 18px', background: 'rgba(246,245,240,0.08)', border: error ? '1px solid #ff4444' : '1px solid rgba(246,245,240,0.15)', borderRadius: '12px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '16px', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s', opacity: loading ? 0.6 : 1 }}
            />
          </div>
          {error && (
            <div style={{ 
              marginBottom: '14px', 
              padding: '12px', 
              background: 'rgba(255,107,107,0.1)', 
              border: '1px solid rgba(255,107,107,0.3)', 
              borderRadius: '10px'
            }}>
              <div style={{ color: '#ff6b6b', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', marginBottom: '8px' }}>
                ✕ {error}
              </div>
              {error.includes('Database') && (
                <a 
                  href="/admin/setup/initialize" 
                  style={{ 
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: '#2bb6ea',
                    color: '#0d1240',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginTop: '8px'
                  }}
                >
                  → Initialize Database
                </a>
              )}
            </div>
          )}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#999' : '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '12px', fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '16px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
          <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.3)', letterSpacing: '0.08em' }}>Secure authentication powered by NextAuth.js</div>
        </form>
      </div>
    </div>
  );
}
