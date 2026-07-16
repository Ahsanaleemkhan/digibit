'use client';
import { useEffect, useState } from 'react';

type Sub = { 
  id: number; 
  created_at: string; 
  name: string; 
  email: string; 
  company: string; 
  phone: string;
  services: string[]; 
  budget: string; 
  timeline: string; 
  message: string; 
  status: string;
  type: string;
};

export default function SubmissionsPanel() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [filteredSubs, setFilteredSubs] = useState<Sub[]>([]);
  const [selected, setSelected] = useState<Sub | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/submissions')
      .then(r => r.json())
      .then(data => {
        const formatted = (Array.isArray(data) ? data : []).map((s: any) => ({
          ...s,
          services: s.services ? (typeof s.services === 'string' ? JSON.parse(s.services) : s.services) : [],
          status: s.status || 'new'
        }));
        setSubs(formatted);
        setFilteredSubs(formatted);
      })
      .catch(() => {
        setSubs([]);
        setFilteredSubs([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  useEffect(() => {
    let filtered = subs;

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(s => s.status === filter);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        (s.company && s.company.toLowerCase().includes(term)) ||
        (s.message && s.message.toLowerCase().includes(term))
      );
    }

    setFilteredSubs(filtered);
  }, [filter, searchTerm, subs]);

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/submissions', { 
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ id, status }) 
    });
    load();
  };

  const del = async (id: number) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    await fetch('/api/submissions', { 
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ id }) 
    });
    setSelected(null); 
    load();
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Company', 'Phone', 'Services', 'Budget', 'Timeline', 'Message', 'Status'];
    const rows = filteredSubs.map(s => [
      new Date(s.created_at).toLocaleString(),
      s.name,
      s.email,
      s.company || '',
      s.phone || '',
      (s.services || []).join('; '),
      s.budget,
      s.timeline,
      (s.message || '').replace(/\n/g, ' '),
      s.status
    ]);
    
    const csv = [headers, ...rows].map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const card: React.CSSProperties = { 
    background: '#161b2e', 
    border: '1px solid rgba(246,245,240,0.07)', 
    borderRadius: '14px', 
    overflow: 'hidden' 
  };
  
  const th: React.CSSProperties = { 
    fontFamily: 'JetBrains Mono, monospace', 
    fontSize: '10px', 
    color: 'rgba(246,245,240,0.35)', 
    letterSpacing: '0.1em', 
    textTransform: 'uppercase', 
    padding: '12px 20px', 
    textAlign: 'left', 
    borderBottom: '1px solid rgba(246,245,240,0.07)' 
  };
  
  const td: React.CSSProperties = { 
    padding: '14px 20px', 
    color: 'rgba(246,245,240,0.8)', 
    fontSize: '14px', 
    borderBottom: '1px solid rgba(246,245,240,0.05)' 
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#2bb6ea';
      case 'read': return '#ffd700';
      case 'archived': return '#666';
      default: return '#2bb6ea';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'read': return 'Read';
      case 'archived': return 'Archived';
      default: return status;
    }
  };

  if (loading) return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;

  const newCount = subs.filter(s => s.status === 'new').length;
  const readCount = subs.filter(s => s.status === 'read').length;
  const archivedCount = subs.filter(s => s.status === 'archived').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '20px' }}>
      <div style={card}>
        {/* Header with filters and actions */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(246,245,240,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ color: '#f6f5f0', fontWeight: 600, fontSize: '18px' }}>
              Submissions <span style={{ background: '#2bb6ea', color: '#0d1240', borderRadius: '100px', padding: '2px 10px', fontSize: '13px', marginLeft: '8px', fontWeight: 700 }}>{newCount}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={exportToCSV} style={{ background: 'rgba(246,245,240,0.08)', border: 'none', color: 'rgba(246,245,240,0.6)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                ↓ Export CSV
              </button>
              <button onClick={load} style={{ background: 'rgba(246,245,240,0.08)', border: 'none', color: 'rgba(246,245,240,0.6)', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
                ↻ Refresh
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {[
              { key: 'all', label: 'All', count: subs.length },
              { key: 'new', label: 'New', count: newCount },
              { key: 'read', label: 'Read', count: readCount },
              { key: 'archived', label: 'Archived', count: archivedCount }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                style={{
                  padding: '8px 14px',
                  background: filter === tab.key ? 'rgba(43,182,234,0.15)' : 'transparent',
                  border: filter === tab.key ? '1px solid rgba(43,182,234,0.3)' : '1px solid rgba(246,245,240,0.1)',
                  color: filter === tab.key ? '#2bb6ea' : 'rgba(246,245,240,0.5)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: 'rgba(246,245,240,0.06)',
              border: '1px solid rgba(246,245,240,0.1)',
              borderRadius: '8px',
              color: '#f6f5f0',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Submissions list */}
        {filteredSubs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(246,245,240,0.3)', fontSize: '15px' }}>
            {searchTerm ? 'No submissions match your search.' : filter === 'all' ? 'No submissions yet.\nThey\'ll appear here once someone contacts you.' : `No ${filter} submissions.`}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>NAME</th>
                  <th style={th}>EMAIL</th>
                  <th style={th}>BUDGET</th>
                  <th style={th}>DATE</th>
                  <th style={th}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map(s => (
                  <tr 
                    key={s.id} 
                    onClick={() => { 
                      setSelected(s); 
                      if (s.status === 'new') updateStatus(s.id, 'read');
                    }} 
                    style={{ 
                      cursor: 'pointer', 
                      background: selected?.id === s.id ? 'rgba(43,182,234,0.08)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (selected?.id !== s.id) {
                        e.currentTarget.style.background = 'rgba(246,245,240,0.03)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selected?.id !== s.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <td style={{ ...td, fontWeight: s.status === 'new' ? 700 : 400, color: s.status === 'new' ? '#f6f5f0' : 'rgba(246,245,240,0.6)' }}>
                      {s.name}
                    </td>
                    <td style={{ ...td, color: 'rgba(246,245,240,0.5)', fontSize: '13px' }}>
                      {s.email}
                    </td>
                    <td style={td}>{s.budget}</td>
                    <td style={{ ...td, fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(246,245,240,0.4)' }}>
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                    <td style={td}>
                      <span style={{ 
                        display: 'inline-block',
                        padding: '4px 10px',
                        background: `${getStatusColor(s.status)}20`,
                        color: getStatusColor(s.status),
                        borderRadius: '100px',
                        fontSize: '11px',
                        fontWeight: 600
                      }}>
                        {getStatusLabel(s.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{ ...card, padding: '24px', position: 'sticky', top: '20px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ color: '#f6f5f0', fontWeight: 600, fontSize: '18px' }}>{selected.name}</div>
            <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: 'rgba(246,245,240,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>
              ×
            </button>
          </div>

          {[
            ['Email', selected.email, `mailto:${selected.email}`],
            ['Company', selected.company || '—'],
            ['Phone', selected.phone || '—', selected.phone ? `tel:${selected.phone.replace(/[^+\d]/g,'')}` : undefined],
            ['Budget', selected.budget],
            ['Timeline', selected.timeline],
            ['Date', new Date(selected.created_at).toLocaleString()]
          ].map(([label, value, link]) => (
            <div key={label} style={{ marginBottom: '14px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {label}
              </div>
              <div style={{ color: 'rgba(246,245,240,0.8)', fontSize: '14px' }}>
                {link ? <a href={link} style={{ color: '#2bb6ea', textDecoration: 'none' }}>{value}</a> : value}
              </div>
            </div>
          ))}

          {selected.services?.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Services Requested
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selected.services.map((s: string) => (
                  <span key={s} style={{ background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', borderRadius: '100px', padding: '4px 12px', fontSize: '12px', fontWeight: 600 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selected.message && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Message
              </div>
              <div style={{ color: 'rgba(246,245,240,0.7)', fontSize: '14px', lineHeight: 1.6, background: 'rgba(246,245,240,0.04)', borderRadius: '10px', padding: '14px', whiteSpace: 'pre-wrap' }}>
                {selected.message}
              </div>
            </div>
          )}

          {/* Status selector */}
          <div style={{ marginBottom: '20px', paddingTop: '16px', borderTop: '1px solid rgba(246,245,240,0.07)' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Change Status
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {['new', 'read', 'archived'].map(status => (
                <button
                  key={status}
                  onClick={() => updateStatus(selected.id, status)}
                  style={{
                    padding: '8px',
                    background: selected.status === status ? `${getStatusColor(status)}20` : 'rgba(246,245,240,0.05)',
                    border: selected.status === status ? `1px solid ${getStatusColor(status)}` : '1px solid rgba(246,245,240,0.1)',
                    color: selected.status === status ? getStatusColor(status) : 'rgba(246,245,240,0.5)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  {getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '16px', borderTop: '1px solid rgba(246,245,240,0.07)' }}>
            <a 
              href={`mailto:${selected.email}?subject=Re: Contact Form Submission`} 
              style={{ 
                display: 'block', 
                padding: '12px', 
                background: '#2bb6ea', 
                color: '#0d1240', 
                borderRadius: '10px', 
                textAlign: 'center', 
                textDecoration: 'none', 
                fontWeight: 700, 
                fontSize: '14px' 
              }}
            >
              Reply ↗
            </a>
            <button 
              onClick={() => del(selected.id)} 
              style={{ 
                padding: '12px', 
                background: 'rgba(255,80,80,0.1)', 
                border: '1px solid rgba(255,80,80,0.3)', 
                color: '#ff6b6b', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                fontSize: '14px', 
                fontWeight: 600 
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
