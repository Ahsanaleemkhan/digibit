'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type InsightsIndexData = {
  hero_eyebrow: string;
  hero_heading: string;
  hero_desc: string;
  newsletter_eyebrow: string;
  newsletter_heading: string;
  newsletter_desc: string;
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

export default function InsightsIndexPanel() {
  const [content, setContent] = useState<InsightsIndexData | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/data?type=cms&key=insights')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          // Initialize with defaults
          setContent({
            hero_eyebrow: 'Insights & field notes',
            hero_heading: 'What we\'re reading, shipping and arguing about this week.',
            hero_desc: 'No growth hacks, no thought-leader sermons. Just the stuff we send each other in Slack.',
            newsletter_eyebrow: 'The monthly dispatch',
            newsletter_heading: 'The shorter, smarter agency newsletter.',
            newsletter_desc: 'One email a month. Three ideas we\'re thinking about, one thing worth reading, one thing worth watching.'
          });
        } else {
          setError('Failed to load insights page data');
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
          pageKey: 'insights',
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
        <div style={styles.subtitle}>Main content at the top of the insights page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Eyebrow Text</label>
            <input
              type="text"
              value={content.hero_eyebrow}
              onChange={e => setContent({ ...content, hero_eyebrow: e.target.value })}
              placeholder="Insights & field notes"
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
              placeholder="What we're reading, shipping and arguing about this week."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Main H1 heading for the insights page.</div>
          </div>

          <div>
            <label style={styles.label}>Description Paragraph</label>
            <textarea
              rows={2}
              value={content.hero_desc}
              onChange={e => setContent({ ...content, hero_desc: e.target.value })}
              placeholder="No growth hacks, no thought-leader sermons..."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Supporting description text below the heading.</div>
          </div>
        </div>
      </main>

      {/* NEWSLETTER SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Newsletter Section</div>
        <div style={styles.subtitle}>The newsletter signup section at the bottom.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Section Eyebrow</label>
            <input
              type="text"
              value={content.newsletter_eyebrow}
              onChange={e => setContent({ ...content, newsletter_eyebrow: e.target.value })}
              placeholder="The monthly dispatch"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Section Heading</label>
            <textarea
              rows={2}
              value={content.newsletter_heading}
              onChange={e => setContent({ ...content, newsletter_heading: e.target.value })}
              placeholder="The shorter, smarter agency newsletter."
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={styles.label}>Description</label>
            <textarea
              rows={2}
              value={content.newsletter_desc}
              onChange={e => setContent({ ...content, newsletter_desc: e.target.value })}
              placeholder="One email a month. Three ideas we're thinking about..."
              style={{ ...styles.input, resize: 'vertical' }}
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
          All changes save to the Insights page.
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
          ℹ️ Note: Individual Blog Posts
        </div>
        <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px', lineHeight: 1.5 }}>
          To manage individual blog posts and articles, go to the <strong style={{ color: '#2bb6ea' }}>Blog Posts</strong> panel in the sidebar.
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
          📊 Category Filters & Posts
        </div>
        <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
          Category filter buttons and blog posts are automatically generated from the Blog Posts panel. The featured post (if marked) will appear large at the top, followed by regular posts in a 3-column grid.
        </div>
      </div>
    </div>
  );
}
