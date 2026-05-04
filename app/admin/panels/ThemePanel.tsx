'use client';
import { useEffect, useState } from 'react';

const KEY = 'digibit-admin-2026';
type Theme = { colors: Record<string, string>; borderRadius: Record<string, string>; typography: Record<string, string> };

const colorLabels: Record<string, string> = {
  ink: 'Primary (Ink)', cyan: 'Accent Cyan', cyanDeep: 'Cyan Deep', cyan2: 'Cyan Light',
  paper: 'Background Paper', paper2: 'Paper Tint', white: 'White'
};
const radiusLabels: Record<string, string> = { sm: 'Small', md: 'Medium', lg: 'Large', xl: 'X-Large', pill: 'Pill / Round' };

export default function ThemePanel() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/data?file=theme', { headers: { 'x-admin-key': KEY } })
      .then(r => r.json()).then(setTheme).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    await fetch('/api/admin/data?file=theme', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY }, body: JSON.stringify(theme) });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
    // Apply colors live to root CSS variables
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([k, v]) => root.style.setProperty(`--${k === 'cyanDeep' ? 'cyan-deep' : k === 'cyan2' ? 'cyan-2' : k === 'paper2' ? 'paper-2' : k}`, v));
    }
  };

  const card: React.CSSProperties = { background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '24px', marginBottom: '20px' };

  if (loading || !theme) return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;

  return (
    <div style={{ maxWidth: '720px' }}>
      <div style={card}>
        <div style={{ color: '#f6f5f0', fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>🎨 Brand Colors</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {Object.entries(theme.colors).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(246,245,240,0.04)', borderRadius: '10px' }}>
              <input type="color" value={val} onChange={e => setTheme({ ...theme, colors: { ...theme.colors, [key]: e.target.value } })}
                style={{ width: '44px', height: '44px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'none', padding: 0 }} />
              <div>
                <div style={{ color: '#f6f5f0', fontSize: '14px', fontWeight: 500 }}>{colorLabels[key] || key}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(246,245,240,0.4)' }}>{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ color: '#f6f5f0', fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>⌀ Border Radius</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {Object.entries(theme.borderRadius).map(([key, val]) => (
            <div key={key}>
              <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>{radiusLabels[key] || key}</label>
              <input type="text" value={val} onChange={e => setTheme({ ...theme, borderRadius: { ...theme.borderRadius, [key]: e.target.value } })}
                style={{ width: '100%', padding: '10px 12px', background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '8px', color: '#f6f5f0', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        <div style={{ color: '#f6f5f0', fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Aa Typography</div>
        {Object.entries(theme.typography).map(([key, val]) => (
          <div key={key} style={{ marginBottom: '14px' }}>
            <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }}>{key}</label>
            <input type="text" value={val} onChange={e => setTheme({ ...theme, typography: { ...theme.typography, [key]: e.target.value } })}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '8px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>

      <button onClick={save} style={{ padding: '14px 32px', background: saved ? '#22c55e' : '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'background 0.3s' }}>
        {saved ? '✓ Saved!' : 'Save Theme'}
      </button>
    </div>
  );
}
