'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type Office = {
  label: string;
  address: string;
};

type ContactPageData = {
  hero_eyebrow: string;
  hero_heading: string;
  hero_subheading: string;
  email: string;
  phone: string;
  offices: Office[];
  form_services: string[];
  success_heading: string;
  success_message: string;
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

export default function ContactPagePanel() {
  const [content, setContent] = useState<ContactPageData | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/data?type=cms&key=contact')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          setContent({
            hero_eyebrow: 'Let\'s start something',
            hero_heading: 'Tell us about your brand.',
            hero_subheading: 'We\'ll reply within 24 hours.',
            email: 'hello@digibit.co',
            phone: '+1 (415) 555-0142',
            offices: [
              { label: 'Lahore HQ', address: '27 Gulberg Ave\nLahore, Pakistan' },
              { label: 'Dubai', address: 'Al Quoz Creative Zone\nDubai, UAE' },
              { label: 'Toronto', address: '312 Adelaide W\nToronto, Canada' }
            ],
            form_services: ['Brand', 'Website', 'Mobile App', 'Paid Media', 'Social', 'SEO', 'Content', 'Not sure yet'],
            success_heading: 'Got it. Thanks.',
            success_message: 'We\'ll read it this afternoon and reply within 24 hours.'
          });
        } else {
          setError('Failed to load contact page data');
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
          pageKey: 'contact',
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
        <div style={styles.subtitle}>Main content at the top of the contact page.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Eyebrow Text</label>
            <input
              type="text"
              value={content.hero_eyebrow}
              onChange={e => setContent({ ...content, hero_eyebrow: e.target.value })}
              placeholder="Let's start something"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Main Heading</label>
            <input
              type="text"
              value={content.hero_heading}
              onChange={e => setContent({ ...content, hero_heading: e.target.value })}
              placeholder="Tell us about your brand."
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Subheading (Italic)</label>
            <input
              type="text"
              value={content.hero_subheading}
              onChange={e => setContent({ ...content, hero_subheading: e.target.value })}
              placeholder="We'll reply within 24 hours."
              style={styles.input}
            />
            <div style={styles.helper}>This appears in italic, cyan color below the main heading.</div>
          </div>
        </div>
      </main>

      {/* CONTACT INFO */}
      <main style={styles.panel}>
        <div style={styles.title}>Contact Information</div>
        <div style={styles.subtitle}>Email and phone shown in the sidebar.</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={content.email}
              onChange={e => setContent({ ...content, email: e.target.value })}
              placeholder="hello@digibit.co"
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              value={content.phone}
              onChange={e => setContent({ ...content, phone: e.target.value })}
              placeholder="+1 (415) 555-0142"
              style={styles.input}
            />
          </div>
        </div>
      </main>

      {/* OFFICES */}
      <main style={styles.panel}>
        <div style={styles.title}>Office Locations</div>
        <div style={styles.subtitle}>Office addresses shown in the sidebar.</div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Offices ({content.offices.length})
          </div>
          <button
            onClick={() => {
              setContent({
                ...content,
                offices: [...content.offices, { label: 'New Office', address: 'Address line 1\nCity, Country' }]
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
            + Add Office
          </button>
        </div>

        {content.offices.map((office, index) => (
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
                Office #{index + 1}
              </span>
              <button
                onClick={() => {
                  const offices = [...content.offices];
                  offices.splice(index, 1);
                  setContent({ ...content, offices });
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

            <div style={{ marginBottom: '12px' }}>
              <label style={styles.label}>Office Label</label>
              <input
                type="text"
                value={office.label}
                onChange={e => {
                  const offices = [...content.offices];
                  offices[index] = { ...offices[index], label: e.target.value };
                  setContent({ ...content, offices });
                }}
                placeholder="Lahore HQ"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Address (use \n for line breaks)</label>
              <textarea
                rows={2}
                value={office.address}
                onChange={e => {
                  const offices = [...content.offices];
                  offices[index] = { ...offices[index], address: e.target.value };
                  setContent({ ...content, offices });
                }}
                placeholder="27 Gulberg Ave\nLahore, Pakistan"
                style={{ ...styles.input, resize: 'vertical' }}
              />
              <div style={styles.helper}>Use \n to create line breaks in the address.</div>
            </div>
          </div>
        ))}
      </main>

      {/* FORM SERVICES */}
      <main style={styles.panel}>
        <div style={styles.title}>Form Services Options</div>
        <div style={styles.subtitle}>Service buttons shown in the contact form.</div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Services ({content.form_services.length})
          </div>
          <button
            onClick={() => {
              setContent({
                ...content,
                form_services: [...content.form_services, 'New Service']
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
            + Add Service
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {content.form_services.map((service, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: 'rgba(246,245,240,0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(246,245,240,0.07)'
              }}
            >
              <input
                type="text"
                value={service}
                onChange={e => {
                  const services = [...content.form_services];
                  services[index] = e.target.value;
                  setContent({ ...content, form_services: services });
                }}
                style={{ ...styles.input, padding: '8px 12px', margin: 0 }}
              />
              <button
                onClick={() => {
                  const services = [...content.form_services];
                  services.splice(index, 1);
                  setContent({ ...content, form_services: services });
                }}
                style={{
                  padding: '6px 10px',
                  background: 'rgba(255,68,68,0.15)',
                  color: '#ff4444',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* SUCCESS MESSAGE */}
      <main style={styles.panel}>
        <div style={styles.title}>Success Message</div>
        <div style={styles.subtitle}>Shown after form submission.</div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={styles.label}>Success Heading</label>
            <input
              type="text"
              value={content.success_heading}
              onChange={e => setContent({ ...content, success_heading: e.target.value })}
              placeholder="Got it. Thanks."
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Success Message</label>
            <textarea
              rows={2}
              value={content.success_message}
              onChange={e => setContent({ ...content, success_message: e.target.value })}
              placeholder="We'll read it this afternoon and reply within 24 hours."
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
          All changes save to the Contact page.
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
          ℹ️ Note: Form Submissions
        </div>
        <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px', lineHeight: 1.5 }}>
          To view and manage form submissions, go to the <strong style={{ color: '#2bb6ea' }}>Submissions</strong> panel in the sidebar.
        </div>
      </div>
    </div>
  );
}
