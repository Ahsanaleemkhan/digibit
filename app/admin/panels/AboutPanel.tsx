'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type AboutData = {
  hero_eyebrow: string;
  hero_heading: string;
  reason_eyebrow: string;
  reason_paragraphs: Array<string>;
  beliefs_eyebrow: string;
  beliefs_heading: string;
  beliefs_cards: Array<{ tag: string; title: string; desc: string }>;
  timeline_eyebrow: string;
  timeline_heading: string;
  timeline_entries: Array<{ year: string; title: string; desc: string }>;
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

export default function AboutPanel() {
  const [content, setContent] = useState<AboutData | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/data?type=cms&key=about')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          // Initialize with defaults
          setContent({
            hero_eyebrow: 'About Digibit',
            hero_heading: "We're a studio of strategists, designers and engineers building the full 360° for modern brands.",
            reason_eyebrow: 'Our reason',
            reason_paragraphs: [
              "Most agencies hand you off. Brand studio does brand, a separate team builds the site, another runs your ads, and nobody talks to each other. You end up being the integration layer.",
              "Digibit was built to be the integration layer for you. One team, one system, one plan — across strategy, design, engineering and media.",
              "We're 24 people across Lahore, Dubai and Toronto. We take on fewer projects than we're asked to, and we stick around long after launch."
            ],
            beliefs_eyebrow: 'How we show up',
            beliefs_heading: 'Four beliefs we bring to every project.',
            beliefs_cards: [
              { tag: '01 · CRAFT', title: 'Taste is a feature.', desc: 'Every pixel, sentence and ad unit is a chance to be better or worse than average. We choose better.' },
              { tag: '02 · CLARITY', title: 'Say the real thing.', desc: 'Jargon is a tax. We write and design for the human on the other end.' },
              { tag: '03 · SHIP', title: 'Momentum beats polish.', desc: 'A live v1 outperforms a beautiful v3 that never launches.' }
            ],
            timeline_eyebrow: 'A short history',
            timeline_heading: 'Eight years of building, in public.',
            timeline_entries: [
              { year: '2018', title: 'Three desks, one idea', desc: 'Digibit starts in a co-working space in Lahore.' },
              { year: '2020', title: 'We meet the pandemic', desc: 'We go remote-first, double the team.' },
              { year: '2022', title: 'Dubai office opens', desc: 'Expansion to MENA.' },
              { year: '2024', title: 'The Toronto pod', desc: 'North American clients come onboard.' },
              { year: '2026', title: 'Today', desc: '24 people, 3 cities, 180+ projects shipped.' }
            ],
            cta_heading: "Want to see if we're the right team for your next thing?",
            cta_button: 'Say hello'
          });
        } else {
          setError('Failed to load about page data');
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
          pageKey: 'about',
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
        <div style={styles.subtitle}>Main headline at the top of the about page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Eyebrow Text</label>
            <input
              type="text"
              value={content.hero_eyebrow}
              onChange={e => setContent({ ...content, hero_eyebrow: e.target.value })}
              placeholder="About Digibit"
              style={styles.input}
            />
            <div style={styles.helper}>Small text above the main heading.</div>
          </div>

          <div>
            <label style={styles.label}>Main Heading</label>
            <textarea
              rows={3}
              value={content.hero_heading}
              onChange={e => setContent({ ...content, hero_heading: e.target.value })}
              placeholder="We're a studio of..."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Main H1 heading. Will be styled with emphasis on key words.</div>
          </div>
        </div>
      </main>

      {/* REASON SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Our Reason Section</div>
        <div style={styles.subtitle}>The "why we exist" section with paragraphs.</div>

        <div style={{ marginBottom: '16px' }}>
          <label style={styles.label}>Section Eyebrow</label>
          <input
            type="text"
            value={content.reason_eyebrow}
            onChange={e => setContent({ ...content, reason_eyebrow: e.target.value })}
            placeholder="Our reason"
            style={styles.input}
          />
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Paragraphs ({content.reason_paragraphs?.length || 0})
          </div>
          <button
            onClick={() => {
              setContent({
                ...content,
                reason_paragraphs: [...(content.reason_paragraphs || []), 'New paragraph...']
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
            + Add Paragraph
          </button>
        </div>

        {(content.reason_paragraphs || []).map((para, index) => (
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
                Paragraph #{index + 1}
              </span>
              <button
                onClick={() => {
                  const paras = [...content.reason_paragraphs];
                  paras.splice(index, 1);
                  setContent({ ...content, reason_paragraphs: paras });
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
            <textarea
              rows={4}
              value={para}
              onChange={e => {
                const paras = [...content.reason_paragraphs];
                paras[index] = e.target.value;
                setContent({ ...content, reason_paragraphs: paras });
              }}
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>
        ))}
      </main>

      {/* BELIEFS SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Beliefs Section</div>
        <div style={styles.subtitle}>The dark section with belief cards (3 columns).</div>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={styles.label}>Section Eyebrow</label>
            <input
              type="text"
              value={content.beliefs_eyebrow}
              onChange={e => setContent({ ...content, beliefs_eyebrow: e.target.value })}
              placeholder="How we show up"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Section Heading</label>
            <textarea
              rows={2}
              value={content.beliefs_heading}
              onChange={e => setContent({ ...content, beliefs_heading: e.target.value })}
              placeholder="Four beliefs we bring to every project."
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Belief Cards ({content.beliefs_cards?.length || 0})
          </div>
          <button
            onClick={() => {
              const cards = content.beliefs_cards || [];
              setContent({
                ...content,
                beliefs_cards: [...cards, { tag: `0${cards.length + 1} · NEW`, title: 'New belief', desc: 'Description here...' }]
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
            + Add Card
          </button>
        </div>

        {(content.beliefs_cards || []).map((card, index) => (
          <div
            key={index}
            style={{
              marginBottom: '16px',
              padding: '16px',
              background: 'rgba(246,245,240,0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(246,245,240,0.07)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
                Card #{index + 1}
              </span>
              <button
                onClick={() => {
                  const cards = [...content.beliefs_cards];
                  cards.splice(index, 1);
                  setContent({ ...content, beliefs_cards: cards });
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

            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={styles.label}>Tag (e.g., "01 · CRAFT")</label>
                <input
                  type="text"
                  value={card.tag}
                  onChange={e => {
                    const cards = [...content.beliefs_cards];
                    cards[index] = { ...cards[index], tag: e.target.value };
                    setContent({ ...content, beliefs_cards: cards });
                  }}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={e => {
                    const cards = [...content.beliefs_cards];
                    cards[index] = { ...cards[index], title: e.target.value };
                    setContent({ ...content, beliefs_cards: cards });
                  }}
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Description</label>
                <textarea
                  rows={2}
                  value={card.desc}
                  onChange={e => {
                    const cards = [...content.beliefs_cards];
                    cards[index] = { ...cards[index], desc: e.target.value };
                    setContent({ ...content, beliefs_cards: cards });
                  }}
                  style={{ ...styles.input, resize: 'vertical' }}
                />
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* TIMELINE SECTION */}
      <main style={styles.panel}>
        <div style={styles.title}>Timeline Section</div>
        <div style={styles.subtitle}>Company history timeline with year, title, and description.</div>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={styles.label}>Section Eyebrow</label>
            <input
              type="text"
              value={content.timeline_eyebrow}
              onChange={e => setContent({ ...content, timeline_eyebrow: e.target.value })}
              placeholder="A short history"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Section Heading</label>
            <input
              type="text"
              value={content.timeline_heading}
              onChange={e => setContent({ ...content, timeline_heading: e.target.value })}
              placeholder="Eight years of building, in public."
              style={styles.input}
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Timeline Entries ({content.timeline_entries?.length || 0})
          </div>
          <button
            onClick={() => {
              const entries = content.timeline_entries || [];
              setContent({
                ...content,
                timeline_entries: [...entries, { year: '2027', title: 'New milestone', desc: 'What happened...' }]
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
            + Add Entry
          </button>
        </div>

        {(content.timeline_entries || []).map((entry, index) => (
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
                Entry #{index + 1}
              </span>
              <button
                onClick={() => {
                  const entries = [...content.timeline_entries];
                  entries.splice(index, 1);
                  setContent({ ...content, timeline_entries: entries });
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

            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px' }}>
              <div>
                <label style={styles.label}>Year</label>
                <input
                  type="text"
                  value={entry.year}
                  onChange={e => {
                    const entries = [...content.timeline_entries];
                    entries[index] = { ...entries[index], year: e.target.value };
                    setContent({ ...content, timeline_entries: entries });
                  }}
                  placeholder="2026"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={entry.title}
                  onChange={e => {
                    const entries = [...content.timeline_entries];
                    entries[index] = { ...entries[index], title: e.target.value };
                    setContent({ ...content, timeline_entries: entries });
                  }}
                  placeholder="Today"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={styles.label}>Description</label>
              <textarea
                rows={2}
                value={entry.desc}
                onChange={e => {
                  const entries = [...content.timeline_entries];
                  entries[index] = { ...entries[index], desc: e.target.value };
                  setContent({ ...content, timeline_entries: entries });
                }}
                placeholder="What happened this year..."
                style={{ ...styles.input, resize: 'vertical' }}
              />
            </div>
          </div>
        ))}
      </main>

      {/* FINAL CTA */}
      <main style={styles.panel}>
        <div style={styles.title}>Final CTA Section</div>
        <div style={styles.subtitle}>Bottom call-to-action section.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>CTA Heading</label>
            <textarea
              rows={2}
              value={content.cta_heading}
              onChange={e => setContent({ ...content, cta_heading: e.target.value })}
              placeholder="Want to see if we're the right team for your next thing?"
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={styles.label}>Button Text</label>
            <input
              type="text"
              value={content.cta_button}
              onChange={e => setContent({ ...content, cta_button: e.target.value })}
              placeholder="Say hello"
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
          All changes save to the About page.
        </div>
      </div>
    </div>
  );
}
