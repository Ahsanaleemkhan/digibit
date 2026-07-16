'use client';

import { useEffect, useState } from 'react';

type Deliverable = { num: string; title: string; desc: string };
type ProcessStep = { num: string; title: string; desc: string; dur: string };
type CaseStat = { count: number; suffix: string; label: string };
type FAQ = { q: string; a: string };

type Service = {
  id: string;
  slug: string;
  title: string;
  short_title: string;
  icon: string;
  excerpt: string;
  featured_image: string;
  eyebrow: string;
  h1_text: string;
  lede: string;
  cta_label: string;
  visual_word: string;
  deliverables_title: string;
  deliverables: Deliverable[];
  process_title: string;
  process_steps: ProcessStep[];
  case_title: string;
  case_desc: string;
  case_stats: CaseStat[];
  case_link: string;
  faqs: FAQ[];
  cta_bottom: string;
  cta_bottom_btn: string;
  featured: boolean;
  homepage_order: number;
  published: boolean;
};

const styles = {
  container: { display: 'flex', flexDirection: 'column' as const, gap: '24px' },
  header: {
    background: '#161b2e',
    border: '1px solid rgba(246,245,240,0.07)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '40px',
    overflowY: 'auto' as const
  },
  modalContent: {
    background: '#161b2e',
    borderRadius: '16px',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '32px',
    border: '1px solid rgba(246,245,240,0.1)'
  },
  label: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '10px',
    color: 'rgba(246,245,240,0.4)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(246,245,240,0.06)',
    border: '1px solid rgba(246,245,240,0.1)',
    borderRadius: '8px',
    color: '#f6f5f0',
    fontFamily: 'inherit',
    fontSize: '14px',
    boxSizing: 'border-box' as const
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(246,245,240,0.06)',
    border: '1px solid rgba(246,245,240,0.1)',
    borderRadius: '8px',
    color: '#f6f5f0',
    fontFamily: 'inherit',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    minHeight: '80px'
  }
};

export default function ServicesPanel() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'process' | 'faq'>('basic');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<Array<{ id: number; path: string; original_name: string; alt_text: string | null }>>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMediaLibrary = async () => {
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      setMediaLibrary(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load media:', error);
    }
  };

  const openMediaSelector = () => {
    setShowMediaModal(true);
    loadMediaLibrary();
  };

  const selectImage = (media: { id: number; path: string; original_name: string; alt_text: string | null }) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, featured_image: media.path });
    setShowMediaModal(false);
  };

  const handleUploadInModal = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        // Reload media library to show new upload
        await loadMediaLibrary();
        // Auto-select the newly uploaded image
        if (result.media) {
          selectImage(result.media);
        }
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    }
  };

  const createNewItem = () => {
    const newItem: Service = {
      id: Date.now().toString(),
      slug: '',
      title: '',
      short_title: '',
      icon: '→',
      excerpt: '',
      featured_image: '',
      eyebrow: 'Service',
      h1_text: '',
      lede: '',
      cta_label: 'Get started',
      visual_word: '',
      deliverables_title: 'What you get',
      deliverables: [],
      process_title: 'Our process',
      process_steps: [],
      case_title: '',
      case_desc: '',
      case_stats: [],
      case_link: '',
      faqs: [],
      cta_bottom: 'Ready to get started?',
      cta_bottom_btn: 'Start a project',
      featured: false,
      homepage_order: services.length,
      published: false
    };
    setEditingItem(newItem);
    setShowModal(true);
    setActiveTab('basic');
  };

  const editItem = (item: Service) => {
    setEditingItem({ ...item });
    setShowModal(true);
    setActiveTab('basic');
  };

  const saveItem = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        await loadServices();
        setShowModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('Failed to save service');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadServices();
      }
    } catch (error) {
      console.error('Failed to delete service:', error);
      alert('Failed to delete service');
    }
  };

  const updateField = (field: keyof Service, value: any) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, [field]: value });
  };

  const addDeliverable = () => {
    if (!editingItem) return;
    const newDel: Deliverable = { num: `${String(editingItem.deliverables.length + 1).padStart(2, '0')}`, title: '', desc: '' };
    setEditingItem({ ...editingItem, deliverables: [...editingItem.deliverables, newDel] });
  };

  const updateDeliverable = (index: number, field: keyof Deliverable, value: string) => {
    if (!editingItem) return;
    const updated = [...editingItem.deliverables];
    updated[index] = { ...updated[index], [field]: value };
    setEditingItem({ ...editingItem, deliverables: updated });
  };

  const removeDeliverable = (index: number) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, deliverables: editingItem.deliverables.filter((_, i) => i !== index) });
  };

  const addProcessStep = () => {
    if (!editingItem) return;
    const newStep: ProcessStep = { num: `${String(editingItem.process_steps.length + 1).padStart(2, '0')}`, title: '', desc: '', dur: 'WEEK 1' };
    setEditingItem({ ...editingItem, process_steps: [...editingItem.process_steps, newStep] });
  };

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    if (!editingItem) return;
    const updated = [...editingItem.process_steps];
    updated[index] = { ...updated[index], [field]: value };
    setEditingItem({ ...editingItem, process_steps: updated });
  };

  const removeProcessStep = (index: number) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, process_steps: editingItem.process_steps.filter((_, i) => i !== index) });
  };

  const addFAQ = () => {
    if (!editingItem) return;
    const newFaq: FAQ = { q: '', a: '' };
    setEditingItem({ ...editingItem, faqs: [...editingItem.faqs, newFaq] });
  };

  const updateFAQ = (index: number, field: keyof FAQ, value: string) => {
    if (!editingItem) return;
    const updated = [...editingItem.faqs];
    updated[index] = { ...updated[index], [field]: value };
    setEditingItem({ ...editingItem, faqs: updated });
  };

  const removeFAQ = (index: number) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, faqs: editingItem.faqs.filter((_, i) => i !== index) });
  };

  const addCaseStat = () => {
    if (!editingItem) return;
    const newStat: CaseStat = { count: 0, suffix: '%', label: '' };
    setEditingItem({ ...editingItem, case_stats: [...editingItem.case_stats, newStat] });
  };

  const updateCaseStat = (index: number, field: keyof CaseStat, value: string | number) => {
    if (!editingItem) return;
    const updated = [...editingItem.case_stats];
    updated[index] = { ...updated[index], [field]: value };
    setEditingItem({ ...editingItem, case_stats: updated });
  };

  const removeCaseStat = (index: number) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, case_stats: editingItem.case_stats.filter((_, i) => i !== index) });
  };

  if (loading) {
    return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ color: '#f6f5f0', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
            Services
          </div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '13px' }}>
            {services.length} {services.length === 1 ? 'service' : 'services'} · Manage your service offerings
          </div>
        </div>
        <button onClick={createNewItem} style={{
          padding: '12px 24px',
          background: '#2bb6ea',
          color: '#0d1240',
          border: 'none',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '14px',
          cursor: 'pointer'
        }}>
          + Add Service
        </button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div style={{
          background: '#161b2e',
          border: '1px solid rgba(246,245,240,0.07)',
          borderRadius: '16px',
          padding: '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }}>⚙️</div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '16px', marginBottom: '24px' }}>
            No services yet
          </div>
          <button onClick={createNewItem} style={{
            padding: '12px 24px',
            background: '#2bb6ea',
            color: '#0d1240',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            Create Your First Service
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {services.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#161b2e',
                border: '1px solid rgba(246,245,240,0.07)',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => editItem(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(43,182,234,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(246,245,240,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>
                {item.title || 'Untitled Service'}
              </div>
              <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', marginBottom: '8px' }}>
                /services/{item.slug || 'slug'}
              </div>
              <span style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: item.published ? 'rgba(34,197,94,0.15)' : 'rgba(246,245,240,0.1)',
                color: item.published ? '#22c55e' : 'rgba(246,245,240,0.5)',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600
              }}>
                {item.published ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ color: '#f6f5f0', fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
              {editingItem.title || 'New Service'}
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid rgba(246,245,240,0.1)', paddingBottom: '0' }}>
              <button
                onClick={() => setActiveTab('basic')}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'basic' ? '#2bb6ea' : 'rgba(246,245,240,0.5)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderBottom: activeTab === 'basic' ? '2px solid #2bb6ea' : '2px solid transparent'
                }}
              >
                📋 Basic Info
              </button>
              <button
                onClick={() => setActiveTab('content')}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'content' ? '#2bb6ea' : 'rgba(246,245,240,0.5)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderBottom: activeTab === 'content' ? '2px solid #2bb6ea' : '2px solid transparent'
                }}
              >
                📦 Deliverables
              </button>
              <button
                onClick={() => setActiveTab('process')}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'process' ? '#2bb6ea' : 'rgba(246,245,240,0.5)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderBottom: activeTab === 'process' ? '2px solid #2bb6ea' : '2px solid transparent'
                }}
              >
                ⚙️ Process & Case
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'faq' ? '#2bb6ea' : 'rgba(246,245,240,0.5)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderBottom: activeTab === 'faq' ? '2px solid #2bb6ea' : '2px solid transparent'
                }}
              >
                ❓ FAQs
              </button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>

              {/* BASIC TAB */}
              {activeTab === 'basic' && (<>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={styles.label}>Service Title</label>
                    <input type="text" value={editingItem.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g., Brand & Strategy" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Slug (URL)</label>
                    <input type="text" value={editingItem.slug} onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="brand-strategy" style={styles.input} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={styles.label}>Icon/Emoji</label>
                    <input type="text" value={editingItem.icon} onChange={(e) => updateField('icon', e.target.value)} placeholder="◆" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Homepage Order</label>
                    <input type="number" value={editingItem.homepage_order} onChange={(e) => updateField('homepage_order', parseInt(e.target.value))} style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Eyebrow Label</label>
                    <input type="text" value={editingItem.eyebrow} onChange={(e) => updateField('eyebrow', e.target.value)} placeholder="Core service" style={styles.input} />
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Short Description (for cards)</label>
                  <textarea value={editingItem.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} placeholder="Brief description..." style={styles.textarea} rows={3} />
                </div>

                <div style={{ border: '1px solid rgba(246,245,240,0.1)', borderRadius: '12px', padding: '20px', background: 'rgba(246,245,240,0.02)' }}>
                  <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Hero Section</div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={styles.label}>H1 Text (main heading)</label>
                    <input type="text" value={editingItem.h1_text} onChange={(e) => updateField('h1_text', e.target.value)} placeholder="Brand & Strategy" style={styles.input} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={styles.label}>Lede (subheading paragraph)</label>
                    <textarea value={editingItem.lede} onChange={(e) => updateField('lede', e.target.value)} placeholder="Positioning, naming, visual identity..." style={styles.textarea} rows={3} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={styles.label}>CTA Button Text</label>
                      <input type="text" value={editingItem.cta_label} onChange={(e) => updateField('cta_label', e.target.value)} placeholder="Get started" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>Visual Word (big text)</label>
                      <input type="text" value={editingItem.visual_word} onChange={(e) => updateField('visual_word', e.target.value)} placeholder="Say the real thing" style={styles.input} />
                    </div>
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <label style={styles.label}>Hero Image (right side visual)</label>
                    {editingItem.featured_image ? (
                      <div style={{ position: 'relative', marginBottom: '8px' }}>
                        <img src={editingItem.featured_image} alt="Hero" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                        <button
                          onClick={() => updateField('featured_image', '')}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(255,68,68,0.9)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : null}
                    <button 
                      onClick={openMediaSelector} 
                      style={{ 
                        width: '100%',
                        padding: '12px 20px',
                        background: 'rgba(43,182,234,0.15)',
                        color: '#2bb6ea',
                        border: '1px solid rgba(43,182,234,0.3)',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(43,182,234,0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(43,182,234,0.15)';
                      }}
                    >
                      {editingItem.featured_image ? '🖼️ Change Hero Image' : '+ Select Hero Image'}
                    </button>
                    <div style={{ color: 'rgba(246,245,240,0.4)', fontSize: '11px', marginTop: '6px' }}>
                      💡 Click to select from media library or upload new image
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'rgba(43,182,234,0.05)', borderRadius: '8px', border: '1px solid rgba(43,182,234,0.1)' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#f6f5f0', fontSize: '14px' }}>
                    <input type="checkbox" checked={editingItem.published} onChange={(e) => updateField('published', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    Published (visible on site)
                  </label>
                </div>
              </>)}

              {/* DELIVERABLES TAB */}
              {activeTab === 'content' && (<>
                <div>
                  <label style={styles.label}>Section Title</label>
                  <input type="text" value={editingItem.deliverables_title} onChange={(e) => updateField('deliverables_title', e.target.value)} placeholder="What you get" style={styles.input} />
                </div>

                <div style={{ border: '1px solid rgba(246,245,240,0.1)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>Deliverables ({editingItem.deliverables.length})</div>
                    <button onClick={addDeliverable} style={{ padding: '8px 16px', background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                      + Add Deliverable
                    </button>
                  </div>

                  {editingItem.deliverables.map((del, i) => (
                    <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(246,245,240,0.03)', borderRadius: '8px', border: '1px solid rgba(246,245,240,0.07)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>#{i + 1}</span>
                        <button onClick={() => removeDeliverable(i)} style={{ padding: '4px 12px', background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={styles.label}>Number Label (e.g., "01")</label>
                        <input type="text" value={del.num} onChange={(e) => updateDeliverable(i, 'num', e.target.value)} placeholder="01" style={styles.input} />
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={styles.label}>Title</label>
                        <input type="text" value={del.title} onChange={(e) => updateDeliverable(i, 'title', e.target.value)} placeholder="Brand audit" style={styles.input} />
                      </div>
                      <div>
                        <label style={styles.label}>Description</label>
                        <textarea value={del.desc} onChange={(e) => updateDeliverable(i, 'desc', e.target.value)} placeholder="Description..." style={{ ...styles.textarea, minHeight: '60px' }} rows={2} />
                      </div>
                    </div>
                  ))}

                  {editingItem.deliverables.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(246,245,240,0.3)', fontSize: '14px' }}>
                      No deliverables yet. Click "+ Add Deliverable" to create one.
                    </div>
                  )}
                </div>
              </>)}

              {/* PROCESS & CASE TAB */}
              {activeTab === 'process' && (<>
                {/* Process Section */}
                <div>
                  <label style={styles.label}>Process Section Title</label>
                  <input type="text" value={editingItem.process_title} onChange={(e) => updateField('process_title', e.target.value)} placeholder="Our process" style={styles.input} />
                </div>

                <div style={{ border: '1px solid rgba(246,245,240,0.1)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>Process Steps ({editingItem.process_steps.length})</div>
                    <button onClick={addProcessStep} style={{ padding: '8px 16px', background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                      + Add Step
                    </button>
                  </div>

                  {editingItem.process_steps.map((step, i) => (
                    <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(246,245,240,0.03)', borderRadius: '8px', border: '1px solid rgba(246,245,240,0.07)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>Step #{i + 1}</span>
                        <button onClick={() => removeProcessStep(i)} style={{ padding: '4px 12px', background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label style={styles.label}>Number (e.g., "01")</label>
                          <input type="text" value={step.num} onChange={(e) => updateProcessStep(i, 'num', e.target.value)} placeholder="01" style={styles.input} />
                        </div>
                        <div>
                          <label style={styles.label}>Duration (e.g., "WEEK 1")</label>
                          <input type="text" value={step.dur} onChange={(e) => updateProcessStep(i, 'dur', e.target.value)} placeholder="WEEK 1" style={styles.input} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={styles.label}>Title</label>
                        <input type="text" value={step.title} onChange={(e) => updateProcessStep(i, 'title', e.target.value)} placeholder="Discover" style={styles.input} />
                      </div>
                      <div>
                        <label style={styles.label}>Description</label>
                        <textarea value={step.desc} onChange={(e) => updateProcessStep(i, 'desc', e.target.value)} placeholder="Description..." style={{ ...styles.textarea, minHeight: '60px' }} rows={2} />
                      </div>
                    </div>
                  ))}

                  {editingItem.process_steps.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(246,245,240,0.3)', fontSize: '14px' }}>
                      No process steps yet. Click "+ Add Step" to create one.
                    </div>
                  )}
                </div>

                {/* Case Study Section */}
                <div style={{ border: '1px solid rgba(43,182,234,0.1)', borderRadius: '12px', padding: '20px', background: 'rgba(43,182,234,0.02)', marginTop: '24px' }}>
                  <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Case Study Preview</div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={styles.label}>Case Title</label>
                    <input type="text" value={editingItem.case_title} onChange={(e) => updateField('case_title', e.target.value)} placeholder="Ummah Travel — pilgrimage, reimagined" style={styles.input} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={styles.label}>Case Description</label>
                    <textarea value={editingItem.case_desc} onChange={(e) => updateField('case_desc', e.target.value)} placeholder="Brief case study description..." style={styles.textarea} rows={3} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <label style={styles.label}>Case Stats ({editingItem.case_stats.length})</label>
                      <button onClick={addCaseStat} style={{ padding: '6px 12px', background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        + Add Stat
                      </button>
                    </div>

                    {editingItem.case_stats.map((stat, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 60px 1fr 32px', gap: '8px', marginBottom: '8px', alignItems: 'end' }}>
                        <div>
                          <label style={{ ...styles.label, fontSize: '9px' }}>Count</label>
                          <input type="number" value={stat.count} onChange={(e) => updateCaseStat(i, 'count', parseFloat(e.target.value))} style={{ ...styles.input, padding: '8px' }} />
                        </div>
                        <div>
                          <label style={{ ...styles.label, fontSize: '9px' }}>Suffix</label>
                          <input type="text" value={stat.suffix} onChange={(e) => updateCaseStat(i, 'suffix', e.target.value)} placeholder="%" style={{ ...styles.input, padding: '8px' }} />
                        </div>
                        <div>
                          <label style={{ ...styles.label, fontSize: '9px' }}>Label</label>
                          <input type="text" value={stat.label} onChange={(e) => updateCaseStat(i, 'label', e.target.value)} placeholder="Booking lift" style={{ ...styles.input, padding: '8px' }} />
                        </div>
                        <button onClick={() => removeCaseStat(i)} style={{ padding: '8px', background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer', height: '34px' }}>×</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div style={{ border: '1px solid rgba(246,245,240,0.1)', borderRadius: '12px', padding: '20px', marginTop: '16px' }}>
                  <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Bottom CTA</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={styles.label}>CTA Heading</label>
                      <input type="text" value={editingItem.cta_bottom} onChange={(e) => updateField('cta_bottom', e.target.value)} placeholder="Ready to get started?" style={styles.input} />
                    </div>
                    <div>
                      <label style={styles.label}>Button Text</label>
                      <input type="text" value={editingItem.cta_bottom_btn} onChange={(e) => updateField('cta_bottom_btn', e.target.value)} placeholder="Start a project" style={styles.input} />
                    </div>
                  </div>
                </div>
              </>)}

              {/* FAQ TAB */}
              {activeTab === 'faq' && (<>
                <div style={{ border: '1px solid rgba(246,245,240,0.1)', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>FAQs ({editingItem.faqs.length})</div>
                    <button onClick={addFAQ} style={{ padding: '8px 16px', background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                      + Add FAQ
                    </button>
                  </div>

                  {editingItem.faqs.map((faq, i) => (
                    <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(246,245,240,0.03)', borderRadius: '8px', border: '1px solid rgba(246,245,240,0.07)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>FAQ #{i + 1}</span>
                        <button onClick={() => removeFAQ(i)} style={{ padding: '4px 12px', background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={styles.label}>Question</label>
                        <input type="text" value={faq.q} onChange={(e) => updateFAQ(i, 'q', e.target.value)} placeholder="How much does it cost?" style={styles.input} />
                      </div>
                      <div>
                        <label style={styles.label}>Answer</label>
                        <textarea value={faq.a} onChange={(e) => updateFAQ(i, 'a', e.target.value)} placeholder="Answer..." style={{ ...styles.textarea, minHeight: '80px' }} rows={3} />
                      </div>
                    </div>
                  ))}

                  {editingItem.faqs.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(246,245,240,0.3)', fontSize: '14px' }}>
                      No FAQs yet. Click "+ Add FAQ" to create one.
                    </div>
                  )}
                </div>
              </>)}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button onClick={saveItem} style={{ flex: 1, padding: '12px 24px', background: '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                  Save Service
                </button>
                <button onClick={() => setShowModal(false)} style={{ padding: '12px 24px', background: 'rgba(246,245,240,0.08)', color: 'rgba(246,245,240,0.7)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                  Cancel
                </button>
                {services.find(w => w.id === editingItem.id) && (
                  <button onClick={() => { deleteItem(editingItem.id); setShowModal(false); }} style={{ padding: '12px 24px', background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: '1px solid rgba(255,68,68,0.3)', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Selector Modal */}
      {showMediaModal && (
        <div style={styles.modal} onClick={() => setShowMediaModal(false)}>
          <div style={{ ...styles.modalContent, maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ color: '#f6f5f0', fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
              Select Image from Media Library
            </div>
            
            {/* Upload Button */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadInModal}
                style={{ display: 'none' }}
                id="service-modal-upload-input"
              />
              <label
                htmlFor="service-modal-upload-input"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: 'rgba(43,182,234,0.15)',
                  color: '#2bb6ea',
                  border: '1px solid rgba(43,182,234,0.3)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(43,182,234,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(43,182,234,0.15)';
                }}
              >
                + Upload New Image
              </label>
            </div>

            {mediaLibrary.length === 0 ? (
              <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: 'rgba(246,245,240,0.4)',
                border: '2px dashed rgba(246,245,240,0.1)',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>📷</div>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>No images in library yet</div>
                <div style={{ fontSize: '12px' }}>Upload your first image using the button above</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
                {mediaLibrary.map((media) => (
                  <div
                    key={media.id}
                    onClick={() => selectImage(media)}
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
                    <img src={media.path} alt={media.original_name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowMediaModal(false)} style={{
                padding: '12px 24px',
                background: 'rgba(246,245,240,0.08)',
                color: 'rgba(246,245,240,0.7)',
                border: '1px solid rgba(246,245,240,0.1)',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
