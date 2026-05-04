'use client';
import { useEffect, useState } from 'react';

const KEY = 'digibit-admin-2026';

type Sub = { id: number; date: string; name: string; email: string; company: string; services: string[]; budget: string; timeline: string; message: string; read: boolean };

export default function SubmissionsPanel() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [selected, setSelected] = useState<Sub | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/submissions', { headers: { 'x-admin-key': KEY } })
      .then(r => r.json()).then(setSubs).catch(() => setSubs([])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const markRead = async (id: number, read: boolean) => {
    await fetch('/api/submissions', { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY }, body: JSON.stringify({ id, read }) });
    load();
  };
  const del = async (id: number) => {
    await fetch('/api/submissions', { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'x-admin-key': KEY }, body: JSON.stringify({ id }) });
    setSelected(null); load();
  };

  const card: React.CSSProperties = { background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '14px', overflow: 'hidden' };
  const th: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '12px 20px', textAlign: 'left', borderBottom: '1px solid rgba(246,245,240,0.07)' };
  const td: React.CSSProperties = { padding: '14px 20px', color: 'rgba(246,245,240,0.8)', fontSize: '14px', borderBottom: '1px solid rgba(246,245,240,0.05)' };

  if (loading) return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '20px' }}>
      <div style={card}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(246,245,240,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontWeight: 500 }}>Submissions <span style={{ background: '#2bb6ea', color: '#0d1240', borderRadius: '100px', padding: '2px 8px', fontSize: '12px', marginLeft: '8px' }}>{subs.filter(s => !s.read).length} unread</span></div>
          <button onClick={load} style={{ background: 'rgba(246,245,240,0.08)', border: 'none', color: 'rgba(246,245,240,0.6)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>↻ Refresh</button>
        </div>
        {subs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(246,245,240,0.3)', fontSize: '15px' }}>No submissions yet.<br/>They'll appear here once someone contacts you.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={th}>NAME</th><th style={th}>EMAIL</th><th style={th}>BUDGET</th><th style={th}>DATE</th><th style={th}>STATUS</th></tr></thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.id} onClick={() => { setSelected(s); markRead(s.id, true); }} style={{ cursor: 'pointer', background: selected?.id === s.id ? 'rgba(43,182,234,0.08)' : 'transparent' }}>
                  <td style={{ ...td, fontWeight: s.read ? 400 : 700, color: s.read ? 'rgba(246,245,240,0.6)' : '#f6f5f0' }}>{s.name}</td>
                  <td style={{ ...td, color: 'rgba(246,245,240,0.5)', fontSize: '13px' }}>{s.email}</td>
                  <td style={td}>{s.budget}</td>
                  <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(246,245,240,0.4)' }}>{new Date(s.date).toLocaleDateString()}</td>
                  <td style={td}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.read ? '#444' : '#2bb6ea', display: 'inline-block' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div style={{ ...card, padding: '24px', position: 'sticky', top: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: '#f6f5f0', fontWeight: 600, fontSize: '16px' }}>{selected.name}</div>
            <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(246,245,240,0.4)', cursor: 'pointer', fontSize: '18px' }}>×</button>
          </div>
          {[['Email', selected.email], ['Company', selected.company || '—'], ['Budget', selected.budget], ['Timeline', selected.timeline], ['Date', new Date(selected.date).toLocaleString()]].map(([l, v]) => (
            <div key={l} style={{ marginBottom: '14px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{l}</div>
              <div style={{ color: 'rgba(246,245,240,0.8)', fontSize: '14px' }}>{v}</div>
            </div>
          ))}
          {selected.services?.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Services</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selected.services.map(s => <span key={s} style={{ background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', borderRadius: '100px', padding: '3px 10px', fontSize: '12px' }}>{s}</span>)}
              </div>
            </div>
          )}
          {selected.message && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Message</div>
              <div style={{ color: 'rgba(246,245,240,0.7)', fontSize: '14px', lineHeight: 1.6, background: 'rgba(246,245,240,0.04)', borderRadius: '10px', padding: '14px' }}>{selected.message}</div>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px', borderTop: '1px solid rgba(246,245,240,0.07)', paddingTop: '20px' }}>
            <a href={`mailto:${selected.email}`} style={{ display: 'block', padding: '10px', background: '#2bb6ea', color: '#0d1240', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Reply ↗</a>
            <button onClick={() => del(selected.id)} style={{ padding: '10px', background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff6b6b', borderRadius: '10px', cursor: 'pointer', fontSize: '14px' }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
