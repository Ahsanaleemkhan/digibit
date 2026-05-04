'use client';
import { useState } from 'react';

const KEY = 'digibit-admin-2026';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === KEY) {
      localStorage.setItem('db-admin', KEY);
      onLogin();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1240' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '36px', fontWeight: 500, color: '#f6f5f0', letterSpacing: '-0.03em', marginBottom: '8px' }}>digibit</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Admin Dashboard</div>
        </div>
        <form onSubmit={submit} style={{ background: 'rgba(246,245,240,0.05)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '20px', padding: '36px' }}>
          <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Password</label>
          <input
            type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            style={{ width: '100%', padding: '14px 18px', background: 'rgba(246,245,240,0.08)', border: `1px solid ${err ? '#ff4444' : 'rgba(246,245,240,0.15)'}`, borderRadius: '12px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '16px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s' }}
            autoFocus
          />
          {err && <div style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '14px', fontFamily: 'JetBrains Mono, monospace' }}>Incorrect password</div>}
          <button type="submit" style={{ width: '100%', padding: '14px', background: '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '12px', fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
            Sign in →
          </button>
          <div style={{ marginTop: '20px', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.3)', letterSpacing: '0.08em' }}>Default: digibit-admin-2026</div>
        </form>
      </div>
    </div>
  );
}
