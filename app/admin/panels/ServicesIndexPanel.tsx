'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type WaysItem = {
  idx: string;
  title: string;
  desc: string;
};

type ServicesIndexData = {
  hero_eyebrow: string;
  hero_heading: string;
  hero_desc: string;
  ways_eyebrow: string;
  ways_heading: string;
  ways_items: WaysItem[];
  cta_eyebrow: string;
  cta_heading: string;
  cta_button: string;
};

const styles = {
  panel: { background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '24px', marginBottom: '20px' },
  title: { color: '#f6f5f0', fontSize: '18px', fontWeight: 600, marginBottom: '6px' },
  subtitle: { color: 'rgba(246,245,240,0.5)', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px' },
  label: { fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '8px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' as const, lineHeight: 1.5 },
  helper: { marginTop: '6px', color: 'rgba(246,245,240,0.45)', fontSize: '12px', lineHeight: 1.5 },
  saveBtn: { padding: '13px 28px', background: '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' },
};

export default function ServicesIndexPanel() {
  const [content, setContent] = useState<ServicesIndexData | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/data?type=cms&key=services_index')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          // Initialize with defaults
          setContent({
            hero_eyebrow: '360° Services',
            hero_heading: 'Eight disciplines, one team, one plan.',
            hero_desc: 'Pick the services you need, or let us build the whole engine.',
            ways_eyebrow: 'Three ways to work',
            ways_heading: 'However deep you want to go.',
            ways_items: [
              { idx: '01', title: 'Project sprint', desc: 'A defined piece of work with a clear start and end.' },
              { idx: '02', title: '360° retainer', desc: 'An ongoing partnership where we own the full marketing engine.' },
              { idx: '03', title: 'Embedded pod', desc: 'A Digibit team that sits inside yours. Daily standups, shared tools.' }
            ],
            cta_eyebrow: 'Still not sure which fits?',
            cta_heading: 'Tell us what you\'re trying to grow.',
            cta_button: 'Book a call'
          });
        } else {
          setError('Failed to load services index page data');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to connect to database');
      });
  }, []);

  const save = async () => {
    if (!content || saving) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/data?type=cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'services_index',
          content: content
        }),
      });
      
      const result = await response.json();
      
      if (result.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 1800);
      } else {
        setError(result.error || 'Failed to save');
      }
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <div style={{ 
        background: '#161b2e', 
        border: '1px solid rgba(246,245,240,0.07)', 
        borderRadius: '16px', 
        padding: '40px',
        textAlign: 'center' 
      }}>
        <div style={{ color: '#ff4444', fontSize: '16px', marginBottom: '12px' }}>⚠ {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          style={{ 
            padding: '10px 20px', 
            background: '#2bb6ea', 
            color: '#0d1240', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!content) {
    return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* HERO SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Hero Section</div>
        <div style={styles.subtitle}>Main content at the top of the services page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Eyebrow Text</label>
            <input
              type="text"
              value={content.hero_eyebrow}
              onChange={e => setContent({ ...content, hero_eyebrow: e.target.value })}
              placeholder="360° Services"
              style={styles.input}
            />
            <div style={styles.helper}>Small text above the main heading.</div>
          </div>

          <div>
            <label style={styles.label}>Main Heading (H1)</label>
            <textarea
              rows={2}
              value={content.hero_heading}
              onChange={e => setContent({ ...content, hero_heading: e.target.value })}
              placeholder="Eight disciplines, one team, one plan."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Main H1 heading. Keep it concise and impactful.</div>
          </div>

          <div>
            <label style={styles.label}>Description Paragraph</label>
            <textarea
              rows={3}
              value={content.hero_desc}
              onChange={e => setContent({ ...content, hero_desc: e.target.value })}
              placeholder="Pick the services you need, or let us build the whole engine."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Supporting text that appears in the right column.</div>
          </div>
        </div>
      </main>

      {/* HOW WE WORK SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>How We Work Section</div>
        <div style={styles.subtitle}>The section explaining your engagement models.</div>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={styles.label}>Section Eyebrow</label>
            <input
              type="text"
              value={content.ways_eyebrow}
              onChange={e => setContent({ ...content, ways_eyebrow: e.target.value })}
              placeholder="Three ways to work"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Section Heading</label>
            <input
              type="text"
              value={content.ways_heading}
              onChange={e => setContent({ ...content, ways_heading: e.target.value })}
              placeholder="However deep you want to go."
              style={styles.input}
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Work Items ({content.ways_items?.length || 0})
          </div>
          <button
            onClick={() => {
              const items = content.ways_items || [];
              setContent({
                ...content,
                ways_items: [...items, { idx: `0${items.length + 1}`, title: 'New approach', desc: 'Description here...' }]
              });
            }}
            style={{
              padding: '8px 16px',
              background: 'rgba(43,182,234,0.15)',
              color: '#2bb6ea',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Add Item
          </button>
        </div>

        {(content.ways_items || []).map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: '12px',
              padding: '16px',
              background: 'rgba(246,245,240,0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(246,245,240,0.07)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                Item #{index + 1}
              </span>
              <button
                onClick={() => {
                  const items = [...content.ways_items];
                  items.splice(index, 1);
                  setContent({ ...content, ways_items: items });
                }}
                style={{
                  padding: '4px 12px',
                  background: 'rgba(255,68,68,0.15)',
                  color: '#ff4444',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px' }}>
              <div>
                <label style={styles.label}>Index</label>
                <input
                  type="text"
                  value={item.idx}
                  onChange={e => {
                    const items = [...content.ways_items];
                    items[index] = { ...items[index], idx: e.target.value };
                    setContent({ ...content, ways_items: items });
                  }}
                  placeholder="01"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={e => {
                    const items = [...content.ways_items];
                    items[index] = { ...items[index], title: e.target.value };
                    setContent({ ...content, ways_items: items });
                  }}
                  placeholder="Project sprint"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={styles.label}>Description</label>
              <textarea
                rows={2}
                value={item.desc}
                onChange={e => {
                  const items = [...content.ways_items];
                  items[index] = { ...items[index], desc: e.target.value };
                  setContent({ ...content, ways_items: items });
                }}
                placeholder="A defined piece of work with a clear start and end."
                style={{ ...styles.input, resize: 'vertical' }}
              />
            </div>
          </div>
        ))}

        {(content.ways_items || []).length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(246,245,240,0.3)', fontSize: '14px' }}>
            No items yet. Click "+ Add Item" to create one.
          </div>
        )}
      </main>

      {/* CTA SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Bottom CTA Section</div>
        <div style={styles.subtitle}>Final call-to-action at the bottom of the page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Eyebrow Text</label>
            <input
              type="text"
              value={content.cta_eyebrow}
              onChange={e => setContent({ ...content, cta_eyebrow: e.target.value })}
              placeholder="Still not sure which fits?"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>CTA Heading</label>
            <textarea
              rows={2}
              value={content.cta_heading}
              onChange={e => setContent({ ...content, cta_heading: e.target.value })}
              placeholder="Tell us what you're trying to grow."
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={styles.label}>Button Text</label>
            <input
              type="text"
              value={content.cta_button}
              onChange={e => setContent({ ...content, cta_button: e.target.value })}
              placeholder="Book a call"
              style={styles.input}
            />
          </div>
        </div>
      </main>

      {/* Save Button */}
      <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button 
          onClick={save} 
          disabled={saving}
          style={{
            ...styles.saveBtn,
            opacity: saving ? 0.6 : 1,
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
        >
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
        <div style={{ color: 'rgba(246,245,240,0.45)', fontSize: '13px' }}>
          All changes save to the Services page.
        </div>
      </div>

      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        background: 'rgba(43,182,234,0.08)', 
        border: '1px solid rgba(43,182,234,0.2)', 
        borderRadius: '12px' 
      }}>
        <div style={{ color: '#2bb6ea', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
          ℹ️ Note: Individual Service Cards
        </div>
        <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px', lineHeight: 1.5 }}>
          To manage individual service cards (Brand & Strategy, Websites, etc.), go to the <strong style={{ color: '#2bb6ea' }}>Services</strong> panel in the sidebar.
        </div>
      </div>
    </div>
  );
}
