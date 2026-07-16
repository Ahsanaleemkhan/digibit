'use client';

import { useEffect, useState } from 'react';
import React from 'react';

type HeaderFooterData = {
  // Header/Nav
  nav_logo?: string;
  nav_links: Array<{ href: string; label: string }>;
  nav_cta_label: string;
  
  // Footer
  footer_logo?: string;
  footer_tagline: string;
  footer_email: string;
  footer_phone: string;
  footer_company_heading: string;
  footer_company_links: Array<{ label: string; href: string }>;
  footer_services_heading: string;
  footer_service_links: Array<{ label: string; href: string }>;
  footer_contact_heading: string;
  footer_bottom_left: string;
  footer_bottom_right: string;
};

type MediaItem = {
  id: number;
  filename: string;
  original_name: string;
  path: string;
  alt_text: string | null;
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

export default function HeaderFooterPanel() {
  const [content, setContent] = useState<HeaderFooterData | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectingFor, setSelectingFor] = useState<'nav' | 'footer'>('nav');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/data?type=cms&key=header_footer')
      .then(response => response.json())
      .then((data) => {
        if (data && data.content) {
          setContent(data.content);
        } else if (data && !data.content && !data.error) {
          // Initialize with defaults
          setContent({
            nav_links: [
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '/work', label: 'Work' },
              { href: '/insights', label: 'Insights' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/careers', label: 'Careers' }
            ],
            nav_cta_label: 'Start a project',
            footer_tagline: 'The full 360° agency. We build brands, websites, apps, and the marketing engines that feed them.',
            footer_email: 'hello@digibit.co',
            footer_phone: '+1 (415) 555-0142',
            footer_company_heading: 'Company',
            footer_company_links: [
              { label: 'About', href: '/about' },
              { label: 'Careers', href: '/careers' },
              { label: 'Our work', href: '/work' },
              { label: 'Insights', href: '/insights' }
            ],
            footer_services_heading: 'Services',
            footer_service_links: [
              { label: 'Brand & Strategy', href: '/services/brand-strategy' },
              { label: 'Websites & Apps', href: '/services/websites' },
              { label: 'Paid Media', href: '/services/paid-media' },
              { label: 'Social & Content', href: '/services/social-content' }
            ],
            footer_contact_heading: 'Get in touch',
            footer_bottom_left: '© 2026 Digibit Studio. All rights reserved.',
            footer_bottom_right: 'Made with care. Powered by curiosity.'
          });
        } else {
          setError('Failed to load header/footer data');
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

  const openMediaModal = (target: 'nav' | 'footer') => {
    setSelectingFor(target);
    setShowMediaModal(true);
    loadMediaLibrary();
  };

  const selectLogo = (media: MediaItem) => {
    if (!content) return;
    
    if (selectingFor === 'nav') {
      setContent({ ...content, nav_logo: media.path });
    } else {
      setContent({ ...content, footer_logo: media.path });
    }
    
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
        setMediaLibrary([result.media, ...mediaLibrary]);
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

  const save = async () => {
    if (!content || saving) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/data?type=cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'header_footer',
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
      {/* HEADER/NAVIGATION */}
      <main style={styles.panel}>
        <div style={styles.title}>Header / Navigation</div>
        <div style={styles.subtitle}>Main navigation links and CTA button.</div>

        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Header Logo (Optional)</label>
          {content.nav_logo ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '12px',
              background: 'rgba(246,245,240,0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(246,245,240,0.1)'
            }}>
              <img 
                src={content.nav_logo} 
                alt="Header logo" 
                style={{ 
                  maxWidth: '120px', 
                  maxHeight: '60px', 
                  objectFit: 'contain',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '8px',
                  borderRadius: '6px'
                }} 
              />
              <button
                onClick={() => setContent({ ...content, nav_logo: undefined })}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,68,68,0.15)',
                  color: '#ff4444',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Remove Logo
              </button>
            </div>
          ) : (
            <button
              onClick={() => openMediaModal('nav')}
              style={{
                width: '100%',
                padding: '20px',
                border: '2px dashed rgba(43,182,234,0.3)',
                background: 'rgba(43,182,234,0.05)',
                color: '#2bb6ea',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '24px' }}>🖼️</span>
              Select Header Logo
            </button>
          )}
          <div style={styles.helper}>Upload a custom logo for the header. If not set, default SVG logo will be used.</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={styles.label}>CTA Button Text</label>
          <input
            type="text"
            value={content.nav_cta_label}
            onChange={e => setContent({ ...content, nav_cta_label: e.target.value })}
            placeholder="Start a project"
            style={styles.input}
          />
          <div style={styles.helper}>Text for the primary CTA button in the header.</div>
        </div>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
            Navigation Links ({content.nav_links?.length || 0})
          </div>
          <button
            onClick={() => {
              setContent({
                ...content,
                nav_links: [...(content.nav_links || []), { href: '/new-page', label: 'New Link' }]
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
            + Add Link
          </button>
        </div>

        {(content.nav_links || []).map((link, index) => (
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
                Link #{index + 1}
              </span>
              <button
                onClick={() => {
                  const newLinks = content.nav_links.filter((_, i) => i !== index);
                  setContent({ ...content, nav_links: newLinks });
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
              <div>
                <label style={styles.label}>Label</label>
                <input
                  type="text"
                  value={link.label}
                  onChange={e => {
                    const newLinks = [...content.nav_links];
                    newLinks[index] = { ...newLinks[index], label: e.target.value };
                    setContent({ ...content, nav_links: newLinks });
                  }}
                  placeholder="About"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>URL/Path</label>
                <input
                  type="text"
                  value={link.href}
                  onChange={e => {
                    const newLinks = [...content.nav_links];
                    newLinks[index] = { ...newLinks[index], href: e.target.value };
                    setContent({ ...content, nav_links: newLinks });
                  }}
                  placeholder="/about"
                  style={styles.input}
                />
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <main style={styles.panel}>
        <div style={styles.title}>Footer</div>
        <div style={styles.subtitle}>Footer content, links, and contact information.</div>

        <div style={{ marginBottom: '24px' }}>
          <label style={styles.label}>Footer Logo (Optional)</label>
          {content.footer_logo ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '12px',
              background: 'rgba(246,245,240,0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(246,245,240,0.1)'
            }}>
              <img 
                src={content.footer_logo} 
                alt="Footer logo" 
                style={{ 
                  maxWidth: '120px', 
                  maxHeight: '60px', 
                  objectFit: 'contain',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '8px',
                  borderRadius: '6px'
                }} 
              />
              <button
                onClick={() => setContent({ ...content, footer_logo: undefined })}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255,68,68,0.15)',
                  color: '#ff4444',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Remove Logo
              </button>
            </div>
          ) : (
            <button
              onClick={() => openMediaModal('footer')}
              style={{
                width: '100%',
                padding: '20px',
                border: '2px dashed rgba(43,182,234,0.3)',
                background: 'rgba(43,182,234,0.05)',
                color: '#2bb6ea',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '24px' }}>🖼️</span>
              Select Footer Logo
            </button>
          )}
          <div style={styles.helper}>Upload a custom logo for the footer. If not set, default SVG logo will be used.</div>
        </div>

        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={styles.label}>Footer Tagline</label>
            <textarea
              rows={3}
              value={content.footer_tagline}
              onChange={e => setContent({ ...content, footer_tagline: e.target.value })}
              placeholder="The full 360° agency..."
              style={{ ...styles.input, resize: 'vertical' }}
            />
            <div style={styles.helper}>Main tagline displayed in the footer.</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={styles.label}>Contact Email</label>
              <input
                type="email"
                value={content.footer_email}
                onChange={e => setContent({ ...content, footer_email: e.target.value })}
                placeholder="hello@digibit.co"
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>Contact Phone</label>
              <input
                type="text"
                value={content.footer_phone}
                onChange={e => setContent({ ...content, footer_phone: e.target.value })}
                placeholder="+1 (415) 555-0142"
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <label style={styles.label}>Company Section Heading</label>
            <input
              type="text"
              value={content.footer_company_heading || ''}
              onChange={e => setContent({ ...content, footer_company_heading: e.target.value })}
              placeholder="Company"
              style={{ ...styles.input, maxWidth: '300px', marginBottom: '12px' }}
            />
          </div>
          <button
            onClick={() => {
              setContent({
                ...content,
                footer_company_links: [...(content.footer_company_links || []), { label: 'New Link', href: '/page' }]
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
            + Add Link
          </button>
        </div>

        {(content.footer_company_links || []).map((link, index) => (
          <div
            key={index}
            style={{
              marginBottom: '12px',
              padding: '12px 16px',
              background: 'rgba(246,245,240,0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(246,245,240,0.07)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={link.label}
              onChange={e => {
                const newLinks = [...content.footer_company_links];
                newLinks[index] = { ...newLinks[index], label: e.target.value };
                setContent({ ...content, footer_company_links: newLinks });
              }}
              placeholder="About"
              style={{ ...styles.input, flex: 1 }}
            />
            <input
              type="text"
              value={link.href}
              onChange={e => {
                const newLinks = [...content.footer_company_links];
                newLinks[index] = { ...newLinks[index], href: e.target.value };
                setContent({ ...content, footer_company_links: newLinks });
              }}
              placeholder="/about"
              style={{ ...styles.input, flex: 2 }}
            />
            <button
              onClick={() => {
                const newLinks = content.footer_company_links.filter((_, i) => i !== index);
                setContent({ ...content, footer_company_links: newLinks });
              }}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,68,68,0.15)',
                color: '#ff4444',
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Service Links */}
        <div style={{ marginTop: '24px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <label style={styles.label}>Services Section Heading</label>
            <input
              type="text"
              value={content.footer_services_heading || ''}
              onChange={e => setContent({ ...content, footer_services_heading: e.target.value })}
              placeholder="Services"
              style={{ ...styles.input, maxWidth: '300px', marginBottom: '12px' }}
            />
          </div>
          <button
            onClick={() => {
              setContent({
                ...content,
                footer_service_links: [...(content.footer_service_links || []), { label: 'New Service', href: '/services' }]
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
            + Add Link
          </button>
        </div>

        {(content.footer_service_links || []).map((link, index) => (
          <div
            key={index}
            style={{
              marginBottom: '12px',
              padding: '12px 16px',
              background: 'rgba(246,245,240,0.03)',
              borderRadius: '8px',
              border: '1px solid rgba(246,245,240,0.07)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={link.label}
              onChange={e => {
                const newLinks = [...content.footer_service_links];
                newLinks[index] = { ...newLinks[index], label: e.target.value };
                setContent({ ...content, footer_service_links: newLinks });
              }}
              placeholder="Brand & Strategy"
              style={{ ...styles.input, flex: 1 }}
            />
            <input
              type="text"
              value={link.href}
              onChange={e => {
                const newLinks = [...content.footer_service_links];
                newLinks[index] = { ...newLinks[index], href: e.target.value };
                setContent({ ...content, footer_service_links: newLinks });
              }}
              placeholder="/services/brand-strategy"
              style={{ ...styles.input, flex: 2 }}
            />
            <button
              onClick={() => {
                const newLinks = content.footer_service_links.filter((_, i) => i !== index);
                setContent({ ...content, footer_service_links: newLinks });
              }}
              style={{
                padding: '8px 12px',
                background: 'rgba(255,68,68,0.15)',
                color: '#ff4444',
                border: 'none',
                borderRadius: '6px',
                fontSize: '11px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Bottom Bar */}
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(246,245,240,0.07)' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={styles.label}>Contact Section Heading</label>
            <input
              type="text"
              value={content.footer_contact_heading || ''}
              onChange={e => setContent({ ...content, footer_contact_heading: e.target.value })}
              placeholder="Get in touch"
              style={{ ...styles.input, maxWidth: '300px' }}
            />
            <div style={styles.helper}>Heading above email and phone in footer.</div>
          </div>

          <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600, marginBottom: '12px', marginTop: '24px' }}>
            Footer Bottom Bar
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <label style={styles.label}>Left Text (Copyright)</label>
              <input
                type="text"
                value={content.footer_bottom_left}
                onChange={e => setContent({ ...content, footer_bottom_left: e.target.value })}
                placeholder="© 2026 Digibit Studio. All rights reserved."
                style={styles.input}
              />
            </div>
            <div>
              <label style={styles.label}>Right Text (Tagline)</label>
              <input
                type="text"
                value={content.footer_bottom_right}
                onChange={e => setContent({ ...content, footer_bottom_right: e.target.value })}
                placeholder="Made with care. Powered by curiosity."
                style={styles.input}
              />
            </div>
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
          Changes apply to all pages across the site.
        </div>
      </div>

      {/* Media Library Modal */}
      {showMediaModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '40px'
          }}
          onClick={() => setShowMediaModal(false)}
        >
          <div 
            style={{
              background: '#161b2e',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              padding: '32px',
              border: '1px solid rgba(246,245,240,0.1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ color: '#f6f5f0', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
              Select Logo from Media Library
            </div>
            <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '13px', marginBottom: '20px' }}>
              Click on an image to use it as your logo.
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
                {uploading ? 'Uploading...' : 'Upload New Logo'}
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
                  Upload your logo using the button above
                </div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '12px'
              }}>
                {mediaLibrary.map((media) => (
                  <div
                    key={media.id}
                    onClick={() => selectLogo(media)}
                    style={{
                      cursor: 'pointer',
                      border: '2px solid rgba(246,245,240,0.1)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(43,182,234,0.6)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(246,245,240,0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <img 
                      src={media.path} 
                      alt={media.original_name} 
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover'
                      }}
                    />
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
