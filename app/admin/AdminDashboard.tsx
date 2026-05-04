'use client';
import { useState, useEffect } from 'react';
import SubmissionsPanel from './panels/SubmissionsPanel';
import ThemePanel from './panels/ThemePanel';
import ContentPanel from './panels/ContentPanel';

const ADMIN_KEY = 'digibit-admin-2026';
const S = {
  shell: { display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#0f1117' } as React.CSSProperties,
  sidebar: { width: '240px', minHeight: '100vh', background: '#0d1240', display: 'flex', flexDirection: 'column' as const, flexShrink: 0, borderRight: '1px solid rgba(246,245,240,0.07)' },
  logo: { padding: '28px 24px 20px', borderBottom: '1px solid rgba(246,245,240,0.07)' },
  nav: { padding: '16px 12px', flex: 1 },
  main: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'auto' },
  topbar: { background: '#161b2e', borderBottom: '1px solid rgba(246,245,240,0.07)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  content: { flex: 1, padding: '32px', overflowY: 'auto' as const },
};

const navItems = [
  { id: 'overview', icon: '⊞', label: 'Overview' },
  { id: 'submissions', icon: '✉', label: 'Submissions' },
  { id: 'homepage', icon: '⌂', label: 'Homepage' },
  { id: 'contact', icon: '☎', label: 'Contact Info' },
  { id: 'about', icon: '◎', label: 'About' },
  { id: 'nav', icon: '≡', label: 'Navigation' },
  { id: 'theme', icon: '◈', label: 'Theme & Colors' },
];

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState('overview');
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    fetch('/api/submissions', { headers: { 'x-admin-key': ADMIN_KEY } })
      .then(r => r.json()).then(d => Array.isArray(d) && setSubCount(d.filter((s: { read: boolean }) => !s.read).length)).catch(() => {});
  }, [active]);

  return (
    <div style={S.shell}>
      <aside style={S.sidebar}>
        <div style={S.logo}>
          <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', fontWeight: 500, color: '#f6f5f0', letterSpacing: '-0.03em' }}>digibit</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', marginTop: '4px' }}>ADMIN PANEL</div>
        </div>
        <nav style={S.nav}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActive(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginBottom: '2px', background: active === item.id ? 'rgba(43,182,234,0.15)' : 'transparent', color: active === item.id ? '#2bb6ea' : 'rgba(246,245,240,0.6)', fontSize: '14px', textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '16px', opacity: 0.8 }}>{item.icon}</span>
              {item.label}
              {item.id === 'submissions' && subCount > 0 && (
                <span style={{ marginLeft: 'auto', background: '#2bb6ea', color: '#0d1240', borderRadius: '100px', padding: '1px 7px', fontSize: '11px', fontWeight: 700 }}>{subCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(246,245,240,0.07)' }}>
          <a href="/" target="_blank" style={{ display: 'block', padding: '10px 12px', color: 'rgba(246,245,240,0.4)', fontSize: '13px', textDecoration: 'none', borderRadius: '8px' }}>↗ View site</a>
          <button onClick={onLogout} style={{ width: '100%', padding: '10px 12px', background: 'transparent', border: 'none', color: 'rgba(246,245,240,0.4)', fontSize: '13px', textAlign: 'left', cursor: 'pointer', borderRadius: '8px' }}>⎋ Sign out</button>
        </div>
      </aside>

      <div style={S.main}>
        <div style={S.topbar}>
          <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '20px', fontWeight: 500, color: '#f6f5f0' }}>
            {navItems.find(n => n.id === active)?.label}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(246,245,240,0.3)' }}>localhost:3000</div>
        </div>

        <div style={S.content}>
          {active === 'overview' && <Overview onNav={setActive} subCount={subCount} />}
          {active === 'submissions' && <SubmissionsPanel />}
          {active === 'theme' && <ThemePanel />}
          {(active === 'homepage' || active === 'contact' || active === 'about' || active === 'nav') && <ContentPanel section={active} />}
        </div>
      </div>
    </div>
  );
}

function Overview({ onNav, subCount }: { onNav: (s: string) => void; subCount: number }) {
  const cards = [
    { label: 'Unread submissions', value: subCount, action: 'submissions', color: subCount > 0 ? '#2bb6ea' : '#666' },
    { label: 'Pages under management', value: 9, action: 'homepage', color: '#2bb6ea' },
    { label: 'Services configured', value: 8, action: 'homepage', color: '#2bb6ea' },
    { label: 'Theme variables', value: 7, action: 'theme', color: '#2bb6ea' },
  ];
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
        {cards.map((c, i) => (
          <div key={i} onClick={() => onNav(c.action)} style={{ background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: c.color, fontFamily: 'Bricolage Grotesque, sans-serif', marginBottom: '8px' }}>{c.value}</div>
            <div style={{ fontSize: '13px', color: 'rgba(246,245,240,0.5)' }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '28px' }}>
        <div style={{ color: '#f6f5f0', fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[{ label: 'Edit Homepage', icon: '⌂', nav: 'homepage' }, { label: 'View Submissions', icon: '✉', nav: 'submissions' }, { label: 'Change Colors', icon: '◈', nav: 'theme' }, { label: 'Edit Contact Info', icon: '☎', nav: 'contact' }, { label: 'Edit About Page', icon: '◎', nav: 'about' }, { label: 'Edit Navigation', icon: '≡', nav: 'nav' }].map((a, i) => (
            <button key={i} onClick={() => onNav(a.nav)} style={{ padding: '16px', background: 'rgba(43,182,234,0.08)', border: '1px solid rgba(43,182,234,0.2)', borderRadius: '12px', color: '#2bb6ea', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{a.icon}</span>{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
