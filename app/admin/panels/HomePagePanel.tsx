'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type HomepageData = {
  hero_eyebrow: string;
  hero_tagline: string;
  hero_cta1: string;
  hero_cta2: string;
  hero_subleft: string;
  clients_label: string;
  clients_logos: Array<{ id: number; name: string; image: string }>;
  process_eyebrow: string;
  process_heading: string;
  process_steps: Array<{ num: string; title: string; desc: string }>;
  ticker_label: string;
  ticker_items: Array<{ stat: string; label: string }>;
  [key: string]: any;
};

type MediaItem = {
  id: number;
  filename: string;
  original_name: string;
  path: string;
  alt_text: string | null;
};

type FieldConfig = {
  key: keyof HomepageData;
  label: string;
  type: 'text' | 'textarea';
  hint?: string;
};

const heroFields: FieldConfig[] = [
  { key: 'hero_eyebrow', label: 'Eyebrow', type: 'text', hint: 'Short intro line above the headline.' },
  { key: 'hero_tagline', label: 'Tagline', type: 'textarea', hint: 'This is the main supporting statement in the hero.' },
  { key: 'hero_cta1', label: 'Primary CTA', type: 'text', hint: 'The main action button.' },
  { key: 'hero_cta2', label: 'Secondary CTA', type: 'text', hint: 'The secondary action button.' },
  { key: 'hero_subleft', label: 'Lower-left label', type: 'text', hint: 'The small label under the hero.' },
  { key: 'hero_scroll_text', label: 'Scroll indicator text', type: 'text', hint: 'Text shown in bottom right (e.g., "Scroll ↓")' },
];

const styles = {
  panel: { background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '24px' },
  title: { color: '#f6f5f0', fontSize: '18px', fontWeight: 600, marginBottom: '6px' },
  subtitle: { color: 'rgba(246,245,240,0.5)', fontSize: '13px', lineHeight: 1.6, marginBottom: '18px' },
  label: { fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 14px', background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '8px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' as const, lineHeight: 1.5 },
  helper: { marginTop: '6px', color: 'rgba(246,245,240,0.45)', fontSize: '12px', lineHeight: 1.5 },
  saveBtn: { padding: '13px 28px', background: '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' },
  logoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginTop: '16px' },
  logoCard: { background: 'rgba(246,245,240,0.03)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '10px', padding: '12px', textAlign: 'center' as const, position: 'relative' as const },
  logoImg: { width: '100%', height: '80px', objectFit: 'contain' as const, marginBottom: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px' },
  logoName: { color: 'rgba(246,245,240,0.7)', fontSize: '11px', marginBottom: '8px', whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' },
  removeBtn: { position: 'absolute' as const, top: '8px', right: '8px', background: 'rgba(255,68,68,0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  addLogoBtn: { border: '2px dashed rgba(43,182,234,0.3)', background: 'transparent', color: '#2bb6ea', borderRadius: '10px', padding: '32px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '8px' },
  modal: { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '40px' },
  modalContent: { background: '#161b2e', borderRadius: '16px', maxWidth: '800px', width: '100%', maxHeight: '80vh', overflow: 'auto', padding: '32px', border: '1px solid rgba(246,245,240,0.1)' },
  modalTitle: { color: '#f6f5f0', fontSize: '20px', fontWeight: 600, marginBottom: '20px' },
  mediaGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' },
  mediaCard: { cursor: 'pointer', border: '2px solid rgba(246,245,240,0.1)', borderRadius: '8px', overflow: 'hidden', transition: 'all 0.2s' },
  mediaCardSelected: { borderColor: '#2bb6ea' },
  mediaImg: { width: '100%', height: '100px', objectFit: 'cover' as const },
};

export default function HomePagePanel({ initialSection = 'hero' }: { initialSection?: string }) {
  const [content, setContent] = useState<HomepageData | null>(null);
  const [activeSection, setActiveSection] = useState(initialSection);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Update active section when initialSection prop changes
  React.useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    // Fetch homepage content from database
    fetch('/api/admin/data?type=cms&key=homepage')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          // Ensure clients_logos exists as array
          if (!data.content.clients_logos) {
            data.content.clients_logos = [];
          }
          // Ensure wheel_services exists with defaults
          if (!data.content.wheel_services) {
            data.content.wheel_services = ['STRATEGY', 'BRAND', 'WEB', 'MOBILE', 'PAID MEDIA', 'SOCIAL', 'CONTENT', 'SEO'];
          }
          // Ensure wheel center labels exist
          if (!data.content.wheel_center_label) {
            data.content.wheel_center_label = '360°';
          }
          if (!data.content.wheel_center_subtitle) {
            data.content.wheel_center_subtitle = 'every surface';
          }
          // Ensure stats exist with defaults
          if (!data.content.stats) {
            data.content.stats = [
              {count:180,suffix:"+",label:"Projects shipped"},
              {count:47,suffix:"M",label:"Paid media managed"},
              {count:94,suffix:"%",label:"Retention rate"},
              {count:12,suffix:" countries",label:"Clients worldwide"}
            ];
          }
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          // No data yet, initialize with empty structure
          setContent({
            hero_eyebrow: '360° Creative & Marketing Studio · Est. 2018',
            hero_tagline: "We're a full-spectrum agency that designs, builds and grows brands across every surface your customer touches.",
            hero_cta1: "Let's build something",
            hero_cta2: 'See our work',
            hero_subleft: '↳ Brand · Web · App · Growth',
            hero_scroll_text: 'Scroll ↓',
            clients_label: 'Trusted by teams building real things',
            clients_logos: [],
            wheel_eyebrow: 'Everything your brand needs, under one roof',
            wheel_heading: 'A 360° engine — not a collection of freelancers.',
            wheel_desc: "Strategy, design, engineering and media under one studio. We don't hand you off between agencies, and nothing gets lost in the gaps between them.",
            wheel_cta: 'Explore all services',
            wheel_services: ['STRATEGY', 'BRAND', 'WEB', 'MOBILE', 'PAID MEDIA', 'SOCIAL', 'CONTENT', 'SEO'],
            wheel_center_label: '360°',
            wheel_center_subtitle: 'every surface',
            stats: [
              {count:180,suffix:"+",label:"Projects shipped"},
              {count:47,suffix:"M",label:"Paid media managed"},
              {count:94,suffix:"%",label:"Retention rate"},
              {count:12,suffix:" countries",label:"Clients worldwide"}
            ],
            work_eyebrow: 'Selected work',
            work_heading: "Brands we've helped move from good to unmissable.",
            work_cta: 'View all 48 projects',
            process_eyebrow: 'The way we work',
            process_heading: 'From napkin sketch to measurable growth.',
            process_steps: [
              {num:'01 · DISCOVER',title:'Listen and learn',desc:"We start with your audience, your metrics, and the truth about what's working — and what isn't."},
              {num:'02 · DESIGN',title:'Shape the story',desc:'Brand, positioning, experiences. We design the system that your whole marketing engine will run on.'},
              {num:'03 · BUILD',title:'Ship the work',desc:'Websites, apps, campaigns, content. Built fast, built right, built to be handed over cleanly.'},
              {num:'04 · GROW',title:'Turn it up',desc:'Paid media, SEO, content cadence and analytics — the engine that compounds over quarters, not weeks.'}
            ],
            ticker_label: '◆ Results we\'ve helped ship · 2024—2026',
            ticker_items: [
              {stat:'+212%',label:'bookings · Ummah'},
              {stat:'−42%',label:'CPA · Skynet'},
              {stat:'4.2×',label:'organic · Ummah'},
              {stat:'+68%',label:'leads · Daewoo'},
              {stat:'2.1×',label:'appointments · IMC'},
              {stat:'+156%',label:'DTC revenue · Northwind'},
              {stat:'+318%',label:'signups · Kinetic'},
              {stat:'$1.2M',label:'Y1 · Clara & Co'}
            ],
            svc_acc_eyebrow: 'What we do',
            svc_acc_heading: 'Full-stack services that work together.',
            compare_eyebrow: 'The difference',
            compare_heading: 'What you get with Digibit vs. a traditional agency',
            compare_data: [
              {label:'Response time',agency:'2-3 days',digibit:'Same day'},
              {label:'Team structure',agency:'Siloed departments',digibit:'Integrated squad'},
              {label:'Reporting',agency:'Monthly PDFs',digibit:'Real-time dashboard'},
              {label:'Pricing model',agency:'Retainer + project fees',digibit:'Transparent fixed pricing'}
            ],
            faq_eyebrow: 'Common questions',
            faq_heading: 'Got questions? We\'ve got answers.',
            faq_items: [
              {q:'How long does a typical project take?',a:'Most projects launch in 6-8 weeks. We work in focused sprints and keep you updated every step.'},
              {q:'Do you work with startups or just established brands?',a:'Both! We love working with ambitious teams at any stage — from seed-stage startups to enterprise brands.'},
              {q:'What\'s included in your monthly retainers?',a:'Strategy, design, dev, and growth — all under one roof. We tailor each retainer to your goals and adjust as you scale.'},
              {q:'Can we start with one service and add more later?',a:'Absolutely. Many clients start with web or brand work, then expand into paid media, SEO, or product development.'}
            ],
            testimonial_eyebrow: 'Kind words',
            testimonial_quote: 'Digibit didn\'t just hand us a website — they rebuilt how we think about our brand. Bookings are up 212% and we finally sound like ourselves online.',
            testimonial_author: 'Amira Qadri',
            testimonial_role: 'MARKETING DIR · UMMAH TRAVEL',
            cta_eyebrow: 'Let\'s talk',
            cta_heading: 'Got a brand that deserves to be unmissable?',
            cta_btn1: 'Start a project',
            cta_btn2: 'See pricing'
          });
        } else {
          setError('Failed to load homepage data. Run migration: npm run migrate');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to connect to database');
      });
  }, []);

  const loadMediaLibrary = async () => {
    setLoadingMedia(true);
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      setMediaLibrary(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const openMediaModal = () => {
    setShowMediaModal(true);
    loadMediaLibrary();
  };

  const selectLogo = (media: MediaItem) => {
    if (!content) return;
    
    const newLogo = {
      id: media.id,
      name: media.alt_text || media.original_name,
      image: media.path
    };
    
    setContent({
      ...content,
      clients_logos: [...(content.clients_logos || []), newLogo]
    });
    
    setShowMediaModal(false);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.ok && result.media) {
        // Add to media library list
        setMediaLibrary([result.media, ...mediaLibrary]);
        // Auto-select the newly uploaded image
        selectLogo(result.media);
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeLogo = (index: number) => {
    if (!content) return;
    
    const newLogos = content.clients_logos.filter((_, i) => i !== index);
    setContent({ ...content, clients_logos: newLogos });
  };

  const save = async () => {
    if (!content || saving) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/data?type=cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'homepage',
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

  const updateField = (key: keyof HomepageData, value: string) => {
    setContent({ ...content, [key]: value });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <main style={styles.panel}>
        {activeSection === 'hero' && (
          <>
            <div style={styles.title}>Hero Section</div>
            <div style={styles.subtitle}>Main headline, taglines, and CTA buttons.</div>

            <div style={{ display: 'grid', gap: '14px' }}>
              {heroFields.map(field => {
                const value = content[field.key] || '';
                return (
                  <div key={field.key as string}>
                    <label style={styles.label}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        value={value}
                        onChange={event => updateField(field.key, event.target.value)}
                        style={{ ...styles.input, resize: 'vertical' }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={event => updateField(field.key, event.target.value)}
                        style={styles.input}
                      />
                    )}
                    <div style={styles.helper}>{field.hint}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeSection === 'clients' && (
          <>
            <div style={styles.title}>Client Logos Marquee</div>
            <div style={styles.subtitle}>Manage the scrolling client logo strip. Add logos from your media library.</div>

            <div>
              <label style={styles.label}>Section Label</label>
              <input
                type="text"
                value={content.clients_label || ''}
                onChange={event => updateField('clients_label', event.target.value)}
                placeholder="e.g., Trusted by teams building real things"
                style={styles.input}
              />
              <div style={styles.helper}>The text above the logo marquee.</div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <label style={styles.label}>Client Logos ({content.clients_logos?.length || 0})</label>
              <div style={styles.logoGrid}>
                {content.clients_logos?.map((logo, index) => (
                  <div key={index} style={styles.logoCard}>
                    <button
                      onClick={() => removeLogo(index)}
                      style={styles.removeBtn}
                      title="Remove logo"
                    >
                      ×
                    </button>
                    <img src={logo.image} alt={logo.name} style={styles.logoImg} />
                    <div style={styles.logoName}>{logo.name}</div>
                  </div>
                ))}
                <button onClick={openMediaModal} style={styles.addLogoBtn}>
                  <span style={{ fontSize: '32px' }}>+</span>
                  Add Logo
                </button>
              </div>
              <div style={styles.helper}>Click to select from media library or upload new images.</div>
            </div>
          </>
        )}

        {activeSection === 'wheel' && (
          <>
            <div style={styles.title}>360° Services Section</div>
            <div style={styles.subtitle}>The &quot;Everything your brand needs, under one roof&quot; section with service wheel.</div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.wheel_eyebrow || ''}
                  onChange={event => updateField('wheel_eyebrow', event.target.value)}
                  placeholder="e.g., Everything your brand needs, under one roof"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the main heading.</div>
              </div>

              <div>
                <label style={styles.label}>Main Heading</label>
                <input
                  type="text"
                  value={content.wheel_heading || ''}
                  onChange={event => updateField('wheel_heading', event.target.value)}
                  placeholder="e.g., A 360° engine — not a collection of freelancers."
                  style={styles.input}
                />
                <div style={styles.helper}>The large heading text.</div>
              </div>

              <div>
                <label style={styles.label}>Description</label>
                <textarea
                  rows={3}
                  value={content.wheel_desc || ''}
                  onChange={event => updateField('wheel_desc', event.target.value)}
                  placeholder="Add description text..."
                  style={{ ...styles.input, resize: 'vertical' }}
                />
                <div style={styles.helper}>Supporting paragraph below the heading.</div>
              </div>

              <div>
                <label style={styles.label}>Button Text</label>
                <input
                  type="text"
                  value={content.wheel_cta || ''}
                  onChange={event => updateField('wheel_cta', event.target.value)}
                  placeholder="e.g., Explore all services"
                  style={styles.input}
                />
                <div style={styles.helper}>Text for the call-to-action button.</div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(246,245,240,0.07)' }}>
                <label style={styles.label}>Service Wheel Labels (8 Services)</label>
                <div style={styles.helper}>Edit the 8 service names that appear on the rotating wheel.</div>
                <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
                  {(content.wheel_services || []).map((service: string, index: number) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => {
                          const newServices = [...(content.wheel_services || [])];
                          newServices[index] = e.target.value;
                          updateField('wheel_services', newServices as any);
                        }}
                        placeholder={`Service ${index + 1}`}
                        style={styles.input}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(246,245,240,0.07)' }}>
                <label style={styles.label}>Center Label</label>
                <input
                  type="text"
                  value={content.wheel_center_label || ''}
                  onChange={event => updateField('wheel_center_label', event.target.value)}
                  placeholder="e.g., 360°"
                  style={styles.input}
                />
                <div style={styles.helper}>Main text in the center of the wheel.</div>
                
                <label style={{ ...styles.label, marginTop: '12px' }}>Center Subtitle</label>
                <input
                  type="text"
                  value={content.wheel_center_subtitle || ''}
                  onChange={event => updateField('wheel_center_subtitle', event.target.value)}
                  placeholder="e.g., every surface"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text below center label.</div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'stats' && (
          <>
            <div style={styles.title}>Stats Section</div>
            <div style={styles.subtitle}>Four statistics shown in a horizontal strip.</div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {(content.stats || []).map((stat: any, index: number) => (
                <div 
                  key={index} 
                  style={{ 
                    padding: '16px', 
                    background: 'rgba(246,245,240,0.03)', 
                    border: '1px solid rgba(246,245,240,0.1)', 
                    borderRadius: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <label style={{ ...styles.label, marginBottom: 0 }}>Stat {index + 1}</label>
                    {(content.stats || []).length > 1 && (
                      <button
                        onClick={() => {
                          const newStats = content.stats.filter((_: any, i: number) => i !== index);
                          setContent({ ...content, stats: newStats });
                        }}
                        style={{
                          background: 'rgba(255,68,68,0.15)',
                          color: '#ff4444',
                          border: '1px solid rgba(255,68,68,0.3)',
                          borderRadius: '6px',
                          padding: '4px 12px',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '12px' }}>
                    <div>
                      <label style={styles.label}>Number</label>
                      <input
                        type="number"
                        value={stat.count}
                        onChange={(e) => {
                          const newStats = [...content.stats];
                          newStats[index] = { ...stat, count: parseInt(e.target.value) || 0 };
                          setContent({ ...content, stats: newStats });
                        }}
                        style={styles.input}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Suffix</label>
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={(e) => {
                          const newStats = [...content.stats];
                          newStats[index] = { ...stat, suffix: e.target.value };
                          setContent({ ...content, stats: newStats });
                        }}
                        placeholder="e.g., +, %, M"
                        style={styles.input}
                      />
                    </div>

                    <div>
                      <label style={styles.label}>Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...content.stats];
                          newStats[index] = { ...stat, label: e.target.value };
                          setContent({ ...content, stats: newStats });
                        }}
                        placeholder="e.g., Projects shipped"
                        style={styles.input}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const newStats = [...(content.stats || []), { count: 0, suffix: '', label: 'New stat' }];
                  setContent({ ...content, stats: newStats });
                }}
                style={{
                  padding: '14px',
                  border: '2px dashed rgba(43,182,234,0.3)',
                  background: 'transparent',
                  color: '#2bb6ea',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '20px' }}>+</span>
                Add Another Stat
              </button>

              <div style={styles.helper}>
                Each stat will be displayed with the number, suffix, and label below.
              </div>
            </div>
          </>
        )}

        {activeSection === 'work' && (
          <>
            <div style={styles.title}>Work Section</div>
            <div style={styles.subtitle}>Portfolio grid heading and text on homepage.</div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.work_eyebrow || ''}
                  onChange={event => updateField('work_eyebrow', event.target.value)}
                  placeholder="e.g., Selected work"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the heading.</div>
              </div>

              <div>
                <label style={styles.label}>Section Heading</label>
                <textarea
                  rows={2}
                  value={content.work_heading || ''}
                  onChange={event => updateField('work_heading', event.target.value)}
                  placeholder="e.g., Brands we've helped move from good to unmissable."
                  style={{ ...styles.input, resize: 'vertical' }}
                />
                <div style={styles.helper}>Main heading for the work section.</div>
              </div>

              <div>
                <label style={styles.label}>View All Button Text</label>
                <input
                  type="text"
                  value={content.work_cta || ''}
                  onChange={event => updateField('work_cta', event.target.value)}
                  placeholder="e.g., View all 48 projects"
                  style={styles.input}
                />
                <div style={styles.helper}>Button that links to /work page.</div>
              </div>

              <div style={{ 
                marginTop: '16px', 
                padding: '16px', 
                background: 'rgba(43,182,234,0.08)', 
                borderRadius: '10px',
                border: '1px solid rgba(43,182,234,0.2)'
              }}>
                <div style={{ color: '#2bb6ea', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  📝 Manage Individual Work Items
                </div>
                <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px', marginBottom: '12px' }}>
                  To add, edit, or remove portfolio projects, go to the Portfolio/Work section in the sidebar.
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'process' && (
          <>
            <div style={styles.title}>Process Section ("The way we work")</div>
            <div style={styles.subtitle}>The 4-step process section with dark background.</div>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.process_eyebrow || ''}
                  onChange={event => updateField('process_eyebrow', event.target.value)}
                  placeholder="e.g., The way we work"
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Section Heading</label>
                <textarea
                  rows={2}
                  value={content.process_heading || ''}
                  onChange={event => updateField('process_heading', event.target.value)}
                  placeholder="e.g., From napkin sketch to measurable growth."
                  style={{ ...styles.input, resize: 'vertical' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
                Process Steps ({content.process_steps?.length || 0})
              </div>
              <button
                onClick={() => {
                  const steps = content.process_steps || [];
                  setContent({
                    ...content,
                    process_steps: [...steps, { num: `0${steps.length + 1} · STEP`, title: '', desc: '' }]
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
                + Add Step
              </button>
            </div>

            {(content.process_steps || []).map((step: { num: string; title: string; desc: string }, index: number) => (
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
                    Step #{index + 1}
                  </span>
                  <button
                    onClick={() => {
                      const steps = [...(content.process_steps || [])];
                      steps.splice(index, 1);
                      setContent({ ...content, process_steps: steps });
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
                  <label style={styles.label}>Number/Label (e.g., "01 · DISCOVER")</label>
                  <input
                    type="text"
                    value={step.num}
                    onChange={event => {
                      const steps = [...(content.process_steps || [])];
                      steps[index] = { ...steps[index], num: event.target.value };
                      setContent({ ...content, process_steps: steps });
                    }}
                    placeholder="01 · DISCOVER"
                    style={styles.input}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={styles.label}>Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={event => {
                      const steps = [...(content.process_steps || [])];
                      steps[index] = { ...steps[index], title: event.target.value };
                      setContent({ ...content, process_steps: steps });
                    }}
                    placeholder="Listen and learn"
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>Description</label>
                  <textarea
                    rows={2}
                    value={step.desc}
                    onChange={event => {
                      const steps = [...(content.process_steps || [])];
                      steps[index] = { ...steps[index], desc: event.target.value };
                      setContent({ ...content, process_steps: steps });
                    }}
                    placeholder="We start with your audience..."
                    style={{ ...styles.input, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}

            {(!content.process_steps || content.process_steps.length === 0) && (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: 'rgba(246,245,240,0.3)',
                fontSize: '14px',
                border: '2px dashed rgba(246,245,240,0.1)',
                borderRadius: '10px'
              }}>
                No process steps yet. Click "+ Add Step" to create one.
              </div>
            )}
          </>
        )}

        {activeSection === 'ticker' && (
          <>
            <div style={styles.title}>Results Ticker</div>
            <div style={styles.subtitle}>Scrolling marquee of results/stats.</div>

            <div style={{ marginBottom: '16px' }}>
              <label style={styles.label}>Ticker Label</label>
              <input
                type="text"
                value={content.ticker_label || ''}
                onChange={event => updateField('ticker_label', event.target.value)}
                placeholder="e.g., ◆ Results we've helped ship · 2024—2026"
                style={styles.input}
              />
              <div style={styles.helper}>The label above the scrolling ticker.</div>
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
                Ticker Items ({content.ticker_items?.length || 0})
              </div>
              <button
                onClick={() => {
                  const items = content.ticker_items || [];
                  setContent({
                    ...content,
                    ticker_items: [...items, { stat: '+000%', label: 'New result' }]
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

            {(content.ticker_items || []).map((item: { stat: string; label: string }, index: number) => (
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
                      const items = [...(content.ticker_items || [])];
                      items.splice(index, 1);
                      setContent({ ...content, ticker_items: items });
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

                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px' }}>
                  <div>
                    <label style={styles.label}>Stat (e.g., "+212%")</label>
                    <input
                      type="text"
                      value={item.stat}
                      onChange={event => {
                        const items = [...(content.ticker_items || [])];
                        items[index] = { ...items[index], stat: event.target.value };
                        setContent({ ...content, ticker_items: items });
                      }}
                      placeholder="+212%"
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Label</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={event => {
                        const items = [...(content.ticker_items || [])];
                        items[index] = { ...items[index], label: event.target.value };
                        setContent({ ...content, ticker_items: items });
                      }}
                      placeholder="bookings · Ummah"
                      style={styles.input}
                    />
                  </div>
                </div>
              </div>
            ))}

            {(!content.ticker_items || content.ticker_items.length === 0) && (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: 'rgba(246,245,240,0.3)',
                fontSize: '14px',
                border: '2px dashed rgba(246,245,240,0.1)',
                borderRadius: '10px'
              }}>
                No ticker items yet. Click "+ Add Item" to create one.
              </div>
            )}

            <div style={{ 
              marginTop: '16px', 
              padding: '16px', 
              background: 'rgba(43,182,234,0.08)', 
              borderRadius: '10px',
              border: '1px solid rgba(43,182,234,0.2)'
            }}>
              <div style={{ color: '#2bb6ea', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                💡 Ticker Display
              </div>
              <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px' }}>
                The ticker automatically duplicates items for continuous scroll effect.
              </div>
            </div>
          </>
        )}

        {activeSection === 'services-accordion' && (
          <>
            <div style={styles.title}>Services Accordion</div>
            <div style={styles.subtitle}>The expandable services list section with clickable service links.</div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.svc_acc_eyebrow || ''}
                  onChange={event => updateField('svc_acc_eyebrow', event.target.value)}
                  placeholder="e.g., What we do"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the heading.</div>
              </div>

              <div>
                <label style={styles.label}>Section Heading</label>
                <textarea
                  rows={2}
                  value={content.svc_acc_heading || ''}
                  onChange={event => updateField('svc_acc_heading', event.target.value)}
                  placeholder="e.g., Full-stack services that work together."
                  style={{ ...styles.input, resize: 'vertical' }}
                />
                <div style={styles.helper}>Main heading for the services accordion section.</div>
              </div>

              <div style={{ 
                marginTop: '16px', 
                padding: '16px', 
                background: 'rgba(43,182,234,0.08)', 
                borderRadius: '10px',
                border: '1px solid rgba(43,182,234,0.2)'
              }}>
                <div style={{ color: '#2bb6ea', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                  📝 Manage Individual Services
                </div>
                <div style={{ color: 'rgba(246,245,240,0.6)', fontSize: '12px' }}>
                  To add, edit, or remove services, go to the Services section in the sidebar.
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'compare' && (
          <>
            <div style={styles.title}>Compare Section</div>
            <div style={styles.subtitle}>The Agency vs. Digibit comparison toggle section.</div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.compare_eyebrow || ''}
                  onChange={event => updateField('compare_eyebrow', event.target.value)}
                  placeholder="e.g., The difference"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the heading.</div>
              </div>

              <div>
                <label style={styles.label}>Section Heading</label>
                <textarea
                  rows={2}
                  value={content.compare_heading || ''}
                  onChange={event => updateField('compare_heading', event.target.value)}
                  placeholder="e.g., What you get with Digibit vs. a traditional agency"
                  style={{ ...styles.input, resize: 'vertical' }}
                />
                <div style={styles.helper}>Main heading for the comparison section.</div>
              </div>

              <div>
                <label style={styles.label}>Comparison Data (JSON)</label>
                <textarea
                  rows={10}
                  value={typeof content.compare_data === 'string' ? content.compare_data : JSON.stringify(content.compare_data || [], null, 2)}
                  onChange={event => {
                    try {
                      const parsed = JSON.parse(event.target.value);
                      updateField('compare_data', parsed);
                    } catch (e) {
                      // Allow invalid JSON while typing
                      updateField('compare_data', event.target.value);
                    }
                  }}
                  placeholder='[{"label":"Response time","agency":"2-3 days","digibit":"Same day"}]'
                  style={{ ...styles.input, resize: 'vertical', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                />
                <div style={styles.helper}>Array of comparison items. Each item: {`{label, agency, digibit}`}</div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'faq' && (
          <>
            <div style={styles.title}>FAQ Section</div>
            <div style={styles.subtitle}>Frequently Asked Questions expandable section.</div>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.faq_eyebrow || ''}
                  onChange={event => updateField('faq_eyebrow', event.target.value)}
                  placeholder="e.g., Common questions"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the heading.</div>
              </div>

              <div>
                <label style={styles.label}>Section Heading</label>
                <input
                  type="text"
                  value={content.faq_heading || ''}
                  onChange={event => updateField('faq_heading', event.target.value)}
                  placeholder="e.g., Got questions? We've got answers."
                  style={styles.input}
                />
                <div style={styles.helper}>Main heading for the FAQ section.</div>
              </div>
            </div>

            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
                FAQ Items ({(content.faq_items || []).length})
              </div>
              <button
                onClick={() => {
                  const items = content.faq_items || [];
                  setContent({
                    ...content,
                    faq_items: [...items, { q: 'New question?', a: 'Answer here.' }]
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
                + Add FAQ
              </button>
            </div>

            {(content.faq_items || []).map((faq: { q: string; a: string }, index: number) => (
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
                    FAQ #{index + 1}
                  </span>
                  <button
                    onClick={() => {
                      const items = [...(content.faq_items || [])];
                      items.splice(index, 1);
                      setContent({ ...content, faq_items: items });
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
                  <label style={styles.label}>Question</label>
                  <input
                    type="text"
                    value={faq.q}
                    onChange={event => {
                      const items = [...(content.faq_items || [])];
                      items[index] = { ...items[index], q: event.target.value };
                      setContent({ ...content, faq_items: items });
                    }}
                    placeholder="What's your question?"
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>Answer</label>
                  <textarea
                    rows={3}
                    value={faq.a}
                    onChange={event => {
                      const items = [...(content.faq_items || [])];
                      items[index] = { ...items[index], a: event.target.value };
                      setContent({ ...content, faq_items: items });
                    }}
                    placeholder="Your answer here..."
                    style={{ ...styles.input, resize: 'vertical' }}
                  />
                </div>
              </div>
            ))}

            {(!content.faq_items || content.faq_items.length === 0) && (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                color: 'rgba(246,245,240,0.3)',
                fontSize: '14px',
                border: '2px dashed rgba(246,245,240,0.1)',
                borderRadius: '10px'
              }}>
                No FAQ items yet. Click "+ Add FAQ" to create one.
              </div>
            )}
          </>
        )}

        {activeSection === 'testimonial' && (
          <>
            <div style={styles.title}>Testimonial Section</div>
            <div style={styles.subtitle}>Featured client testimonial with author details.</div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.testimonial_eyebrow || ''}
                  onChange={event => updateField('testimonial_eyebrow', event.target.value)}
                  placeholder="e.g., Kind words"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the quote.</div>
              </div>

              <div>
                <label style={styles.label}>Testimonial Quote</label>
                <textarea
                  rows={4}
                  value={content.testimonial_quote || ''}
                  onChange={event => updateField('testimonial_quote', event.target.value)}
                  placeholder="Enter the client testimonial quote..."
                  style={{ ...styles.input, resize: 'vertical' }}
                />
                <div style={styles.helper}>The main testimonial text (will be shown in quotes).</div>
              </div>

              <div>
                <label style={styles.label}>Author Name</label>
                <input
                  type="text"
                  value={content.testimonial_author || ''}
                  onChange={event => updateField('testimonial_author', event.target.value)}
                  placeholder="e.g., Amira Qadri"
                  style={styles.input}
                />
                <div style={styles.helper}>Name of the person giving the testimonial.</div>
              </div>

              <div>
                <label style={styles.label}>Author Role/Company</label>
                <input
                  type="text"
                  value={content.testimonial_role || ''}
                  onChange={event => updateField('testimonial_role', event.target.value)}
                  placeholder="e.g., MARKETING DIR · UMMAH TRAVEL"
                  style={styles.input}
                />
                <div style={styles.helper}>Role and company of the person.</div>
              </div>
            </div>
          </>
        )}

        {activeSection === 'final-cta' && (
          <>
            <div style={styles.title}>Final CTA Section</div>
            <div style={styles.subtitle}>The bottom call-to-action section encouraging visitors to get in touch.</div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={styles.label}>Eyebrow Text</label>
                <input
                  type="text"
                  value={content.cta_eyebrow || ''}
                  onChange={event => updateField('cta_eyebrow', event.target.value)}
                  placeholder="e.g., Let's talk"
                  style={styles.input}
                />
                <div style={styles.helper}>Small text above the heading.</div>
              </div>

              <div>
                <label style={styles.label}>Main Heading</label>
                <textarea
                  rows={2}
                  value={content.cta_heading || ''}
                  onChange={event => updateField('cta_heading', event.target.value)}
                  placeholder="e.g., Got a brand that deserves to be unmissable?"
                  style={{ ...styles.input, resize: 'vertical' }}
                />
                <div style={styles.helper}>The large heading text.</div>
              </div>

              <div>
                <label style={styles.label}>Primary Button Text</label>
                <input
                  type="text"
                  value={content.cta_btn1 || ''}
                  onChange={event => updateField('cta_btn1', event.target.value)}
                  placeholder="e.g., Start a project"
                  style={styles.input}
                />
                <div style={styles.helper}>Text for the main CTA button (links to /contact).</div>
              </div>

              <div>
                <label style={styles.label}>Secondary Button Text</label>
                <input
                  type="text"
                  value={content.cta_btn2 || ''}
                  onChange={event => updateField('cta_btn2', event.target.value)}
                  placeholder="e.g., See pricing"
                  style={styles.input}
                />
                <div style={styles.helper}>Text for the secondary button (links to /pricing).</div>
              </div>
            </div>
          </>
        )}

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
            No WordPress. No GraphQL. Just SQLite and API routes.
          </div>
        </div>
      </main>

      {/* Media Library Modal */}
      {showMediaModal && (
        <div style={styles.modal} onClick={() => setShowMediaModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitle}>Select Logo from Media Library</div>
            <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '13px', marginBottom: '20px' }}>
              Click on an image to add it as a client logo.
            </div>

            {/* Upload Button */}
            <div style={{ marginBottom: '20px' }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  padding: '12px 24px',
                  background: uploading ? 'rgba(43,182,234,0.5)' : '#2bb6ea',
                  color: '#0d1240',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{uploading ? '⏳' : '⬆'}</span>
                {uploading ? 'Uploading...' : 'Upload New Image'}
              </button>
            </div>
            
            {loadingMedia ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(246,245,240,0.4)' }}>
                Loading media...
              </div>
            ) : mediaLibrary.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                background: 'rgba(246,245,240,0.03)',
                borderRadius: '12px',
                border: '1px dashed rgba(246,245,240,0.1)'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🖼️</div>
                <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '14px', marginBottom: '8px' }}>
                  No images in library yet
                </div>
                <div style={{ color: 'rgba(246,245,240,0.3)', fontSize: '12px' }}>
                  Upload your first logo using the button above
                </div>
              </div>
            ) : (
              <div style={styles.mediaGrid}>
                {mediaLibrary.map((media) => (
                  <div
                    key={media.id}
                    onClick={() => selectLogo(media)}
                    style={styles.mediaCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(43,182,234,0.6)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(246,245,240,0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <img src={media.path} alt={media.original_name} style={styles.mediaImg} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowMediaModal(false)}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(246,245,240,0.08)',
                  border: '1px solid rgba(246,245,240,0.1)',
                  borderRadius: '8px',
                  color: 'rgba(246,245,240,0.7)',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
