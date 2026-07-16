'use client';

import { useEffect, useState } from 'react';

type WorkItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  featured_image: string;
  client: string;
  year: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string[];
  gallery_images: string[];
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  published: boolean;
  
  // Additional fields for rich case study content
  timeline?: string;
  h1_text?: string;
  lede?: string;
  visual_bg?: string;
  visual_word?: string;
  frame1_label?: string;
  frame1_word?: string;
  frame1_bg?: string;
  frame2_label?: string;
  frame2_word?: string;
  frame2_bg?: string;
  brief_heading?: string;
  brief_paras?: string;
  what_heading?: string;
  what_paras?: string;
  outcome_heading?: string;
  outcome_paras?: string;
};

type MediaItem = {
  id: number;
  path: string;
  original_name: string;
  alt_text: string | null;
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
  addBtn: {
    padding: '12px 24px',
    background: '#2bb6ea',
    color: '#0d1240',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px'
  },
  card: {
    background: '#161b2e',
    border: '1px solid rgba(246,245,240,0.07)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cardImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover' as const,
    background: 'rgba(246,245,240,0.03)'
  },
  cardContent: {
    padding: '16px'
  },
  cardTitle: {
    color: '#f6f5f0',
    fontSize: '15px',
    fontWeight: 600,
    marginBottom: '6px'
  },
  cardMeta: {
    color: 'rgba(246,245,240,0.5)',
    fontSize: '12px',
    marginBottom: '8px'
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    background: 'rgba(43,182,234,0.15)',
    color: '#2bb6ea',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600
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
  modalTitle: {
    color: '#f6f5f0',
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '24px'
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
    minHeight: '100px'
  },
  btnPrimary: {
    padding: '12px 24px',
    background: '#2bb6ea',
    color: '#0d1240',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer'
  },
  btnSecondary: {
    padding: '12px 24px',
    background: 'rgba(246,245,240,0.08)',
    color: 'rgba(246,245,240,0.7)',
    border: '1px solid rgba(246,245,240,0.1)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer'
  },
  btnDanger: {
    padding: '12px 24px',
    background: 'rgba(255,68,68,0.15)',
    color: '#ff4444',
    border: '1px solid rgba(255,68,68,0.3)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid rgba(246,245,240,0.1)',
    paddingBottom: '0'
  },
  tab: {
    padding: '12px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'rgba(246,245,240,0.5)',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tabActive: {
    color: '#2bb6ea',
    borderBottomColor: '#2bb6ea'
  }
};

export default function WorkPanel() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<WorkItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [selectingImageFor, setSelectingImageFor] = useState<'featured' | 'gallery'>('featured');
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'design'>('basic');

  useEffect(() => {
    loadWorkItems();
  }, []);

  const loadWorkItems = async () => {
    try {
      const response = await fetch('/api/admin/work');
      const data = await response.json();
      setWorkItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load work items:', error);
      setWorkItems([]);
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

  const createNewItem = () => {
    const newItem: WorkItem = {
      id: Date.now().toString(),
      slug: '',
      title: '',
      category: '',
      excerpt: '',
      featured_image: '',
      client: '',
      year: new Date().getFullYear().toString(),
      services: [],
      challenge: '',
      solution: '',
      results: [],
      gallery_images: [],
      published: false,
      // Rich content defaults
      timeline: '8 weeks',
      h1_text: '',
      lede: '',
      visual_bg: 'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)',
      visual_word: '',
      frame1_label: 'VISUAL — BRAND',
      frame1_word: '',
      frame1_bg: 'linear-gradient(135deg, #0a4d3a 0%, #1a8a65 100%)',
      frame2_label: 'PLATFORM — EXPERIENCE',
      frame2_word: 'Results',
      frame2_bg: 'linear-gradient(135deg, #f4d03f 0%, #e8a93f 100%)',
      brief_heading: 'The Challenge',
      brief_paras: '',
      what_heading: 'Our Solution',
      what_paras: '',
      outcome_heading: 'Impact & Results',
      outcome_paras: ''
    };
    setEditingItem(newItem);
    setShowModal(true);
  };

  const editItem = (item: WorkItem) => {
    setEditingItem({ ...item });
    setShowModal(true);
  };

  const saveItem = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/admin/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        await loadWorkItems();
        setShowModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to save work item:', error);
      alert('Failed to save work item');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this work item?')) return;

    try {
      const response = await fetch(`/api/admin/work?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadWorkItems();
      }
    } catch (error) {
      console.error('Failed to delete work item:', error);
      alert('Failed to delete work item');
    }
  };

  const openMediaSelector = (type: 'featured' | 'gallery') => {
    setSelectingImageFor(type);
    setShowMediaModal(true);
    loadMediaLibrary();
  };

  const selectImage = (media: MediaItem) => {
    if (!editingItem) return;

    if (selectingImageFor === 'featured') {
      setEditingItem({ ...editingItem, featured_image: media.path });
    } else {
      setEditingItem({
        ...editingItem,
        gallery_images: [...editingItem.gallery_images, media.path]
      });
    }
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

  const updateField = (field: keyof WorkItem, value: any) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, [field]: value });
  };

  if (loading) {
    return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={{ color: '#f6f5f0', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
            Portfolio / Work Items
          </div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '13px' }}>
            {workItems.length} {workItems.length === 1 ? 'project' : 'projects'} · Manage your portfolio
          </div>
        </div>
        <button onClick={createNewItem} style={styles.addBtn}>
          + Add Work Item
        </button>
      </div>

      {workItems.length === 0 ? (
        <div style={{
          background: '#161b2e',
          border: '1px solid rgba(246,245,240,0.07)',
          borderRadius: '16px',
          padding: '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }}>💼</div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '16px', marginBottom: '24px' }}>
            No work items yet
          </div>
          <button onClick={createNewItem} style={styles.addBtn}>
            Create Your First Project
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {workItems.map((item) => (
            <div
              key={item.id}
              style={styles.card}
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
              {item.featured_image ? (
                <img src={item.featured_image} alt={item.title} style={styles.cardImage} />
              ) : (
                <div style={{ ...styles.cardImage, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(246,245,240,0.3)' }}>
                  No Image
                </div>
              )}
              <div style={styles.cardContent}>
                <div style={styles.cardTitle}>{item.title || 'Untitled Project'}</div>
                <div style={styles.cardMeta}>{item.category} · {item.year}</div>
                <span style={styles.badge}>{item.published ? 'Published' : 'Draft'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitle}>
              {editingItem.title || 'New Work Item'}
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Basic Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={styles.label}>Project Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Ummah Travel"
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Slug (URL)</label>
                  <input
                    type="text"
                    value={editingItem.slug}
                    onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="e.g., ummah-travel"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={styles.label}>Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    placeholder="e.g., Travel · Brand · Web"
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Client</label>
                  <input
                    type="text"
                    value={editingItem.client}
                    onChange={(e) => updateField('client', e.target.value)}
                    placeholder="Client name"
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Year</label>
                  <input
                    type="text"
                    value={editingItem.year}
                    onChange={(e) => updateField('year', e.target.value)}
                    placeholder="2024"
                    style={styles.input}
                  />
                </div>
              </div>

              <div>
                <label style={styles.label}>Short Excerpt</label>
                <textarea
                  value={editingItem.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  placeholder="Brief description for the card..."
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              {/* Featured Image */}
              <div>
                <label style={styles.label}>Featured Image</label>
                {editingItem.featured_image ? (
                  <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <img src={editingItem.featured_image} alt="Featured" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
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
                <button onClick={() => openMediaSelector('featured')} style={{ ...styles.btnSecondary, width: '100%' }}>
                  {editingItem.featured_image ? 'Change Image' : 'Select Featured Image'}
                </button>
              </div>

              {/* Services */}
              <div>
                <label style={styles.label}>Services (comma separated)</label>
                <input
                  type="text"
                  value={editingItem.services.join(', ')}
                  onChange={(e) => updateField('services', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="e.g., Brand Identity, Web Design, Development"
                  style={styles.input}
                />
              </div>

              {/* Detail Page Content */}
              <div style={{ borderTop: '1px solid rgba(246,245,240,0.07)', paddingTop: '20px' }}>
                <div style={{ color: '#f6f5f0', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                  Detail Page Content
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div>
                    <label style={styles.label}>Challenge</label>
                    <textarea
                      value={editingItem.challenge}
                      onChange={(e) => updateField('challenge', e.target.value)}
                      placeholder="What problem did the client face?"
                      style={styles.textarea}
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Solution</label>
                    <textarea
                      value={editingItem.solution}
                      onChange={(e) => updateField('solution', e.target.value)}
                      placeholder="How did you solve it?"
                      style={styles.textarea}
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Results (one per line)</label>
                    <textarea
                      value={editingItem.results.join('\n')}
                      onChange={(e) => updateField('results', e.target.value.split('\n').filter(r => r.trim()))}
                      placeholder="+212% bookings&#10;4.2× organic traffic&#10;38% lower CAC"
                      style={styles.textarea}
                      rows={4}
                    />
                  </div>

                  {/* Testimonial */}
                  <div style={{ background: 'rgba(246,245,240,0.03)', padding: '16px', borderRadius: '8px' }}>
                    <label style={{ ...styles.label, marginBottom: '12px' }}>Client Testimonial (Optional)</label>
                    <textarea
                      value={editingItem.testimonial_quote || ''}
                      onChange={(e) => updateField('testimonial_quote', e.target.value)}
                      placeholder="Client quote..."
                      style={{ ...styles.textarea, marginBottom: '12px' }}
                      rows={3}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <input
                        type="text"
                        value={editingItem.testimonial_author || ''}
                        onChange={(e) => updateField('testimonial_author', e.target.value)}
                        placeholder="Author name"
                        style={styles.input}
                      />
                      <input
                        type="text"
                        value={editingItem.testimonial_role || ''}
                        onChange={(e) => updateField('testimonial_role', e.target.value)}
                        placeholder="Role/Position"
                        style={styles.input}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <label style={styles.label}>Gallery Images</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px', marginBottom: '8px' }}>
                  {editingItem.gallery_images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }} />
                      <button
                        onClick={() => updateField('gallery_images', editingItem.gallery_images.filter((_, i) => i !== idx))}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(255,68,68,0.9)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          width: '20px',
                          height: '20px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => openMediaSelector('gallery')} style={{ ...styles.btnSecondary, width: '100%' }}>
                  + Add Gallery Image
                </button>
              </div>

              {/* Published Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={editingItem.published}
                  onChange={(e) => updateField('published', e.target.checked)}
                  id="published"
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <label htmlFor="published" style={{ color: '#f6f5f0', fontSize: '14px', cursor: 'pointer' }}>
                  Publish this work item (visible on website)
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button onClick={saveItem} style={{ ...styles.btnPrimary, flex: 1 }}>
                  Save Work Item
                </button>
                <button onClick={() => setShowModal(false)} style={styles.btnSecondary}>
                  Cancel
                </button>
                {workItems.find(w => w.id === editingItem.id) && (
                  <button
                    onClick={() => {
                      deleteItem(editingItem.id);
                      setShowModal(false);
                    }}
                    style={styles.btnDanger}
                  >
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
            <div style={styles.modalTitle}>Select Image from Media Library</div>
            
            {/* Upload Button */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadInModal}
                style={{ display: 'none' }}
                id="modal-upload-input"
              />
              <label
                htmlFor="modal-upload-input"
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
              <button onClick={() => setShowMediaModal(false)} style={styles.btnSecondary}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
