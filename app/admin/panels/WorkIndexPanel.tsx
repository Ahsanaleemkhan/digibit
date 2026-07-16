'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type WorkIndexData = {
  hero_eyebrow: string;
  hero_heading: string;
  hero_desc: string;
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

export default function WorkIndexPanel() {
  const [content, setContent] = useState<WorkIndexData | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/data?type=cms&key=work')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          // Initialize with defaults
          setContent({
            hero_eyebrow: 'Selected work · 2018—2026',
            hero_heading: 'Eight years. One hundred and eighty shipped projects.',
            hero_desc: 'Below is a curated slice. If you want the full tour — ask and we\'ll walk you through it.',
            cta_heading: 'Could your brand be next?',
            cta_button: 'Start a project'
          });
        } else {
          setError('Failed to load work page data');
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
          pageKey: 'work',
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
        <div style={styles.subtitle}>Main content at the top of the work/portfolio page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Eyebrow Text</label>
            <input
              type="text"
              value={content.hero_eyebrow}
              onChange={e => setContent({ ...content, hero_eyebrow: e.target.value })}
              placeholder="Selected work · 2018—2026"
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
              placeholder="Eight years. One hundred and eighty shipped projects."
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
              placeholder="Below is a curated slice. If you want the full tour — ask and we'll walk you through it."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Supporting description text below the heading.</div>
          </div>
        </div>
      </main>

      {/* CTA SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Bottom CTA Section</div>
        <div style={styles.subtitle}>Final call-to-action at the bottom of the page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>CTA Heading</label>
            <textarea
              rows={2}
              value={content.cta_heading}
              onChange={e => setContent({ ...content, cta_heading: e.target.value })}
              placeholder="Could your brand be next?"
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={styles.label}>Button Text</label>
            <input
              type="text"
              value={content.cta_button}
              onChange={e => setContent({ ...content, cta_button: e.target.value })}
              placeholder="Start a project"
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
          All changes save to the Work page.
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
          ℹ️ Note: Individual Case Studies
        </div>
        <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px', lineHeight: 1.5 }}>
          To manage individual work items and case studies (Ummah Travel, Daewoo Battery, etc.), go to the <strong style={{ color: '#2bb6ea' }}>Portfolio/Work</strong> panel in the sidebar.
        </div>
      </div>

      <div style={{ 
        marginTop: '16px', 
        padding: '16px', 
        background: 'rgba(246,245,240,0.05)', 
        border: '1px solid rgba(246,245,240,0.1)', 
        borderRadius: '12px' 
      }}>
        <div style={{ color: 'rgba(246,245,240,0.7)', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
          📊 Category Filters
        </div>
        <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
          The category filter buttons (Brand, Web, App, etc.) are automatically generated from the categories assigned to your work items. Update categories in the Portfolio/Work panel.
        </div>
      </div>
    </div>
  );
}
