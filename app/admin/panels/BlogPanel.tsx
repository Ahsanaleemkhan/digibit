'use client';

import { useEffect, useState } from 'react';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  gradient_bg: string;
  category: string;
  tag: string;
  author_name: string;
  author_role: string;
  read_time: string;
  published_date: string;
  content: string;
  sections: Array<{ heading: string; content: string }>;
  meta_description: string;
  featured: boolean;
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
    minHeight: '100px'
  }
};

export default function BlogPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'seo'>('basic');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const createNewItem = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      slug: '',
      title: '',
      excerpt: '',
      featured_image: '',
      gradient_bg: 'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)',
      category: 'Brand',
      tag: '',
      author_name: '',
      author_role: '',
      read_time: '5 min',
      published_date: new Date().toISOString().split('T')[0],
      content: '',
      sections: [],
      meta_description: '',
      featured: false,
      published: false
    };
    setEditingItem(newPost);
    setShowModal(true);
    setActiveTab('basic');
  };

  const editItem = (item: BlogPost) => {
    setEditingItem({ ...item });
    setShowModal(true);
    setActiveTab('basic');
  };

  const saveItem = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem)
      });

      if (response.ok) {
        await loadPosts();
        setShowModal(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    }
  };

  const updateField = (field: keyof BlogPost, value: any) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, [field]: value });
  };

  const addSection = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      sections: [...editingItem.sections, { heading: '', content: '' }]
    });
  };

  const updateSection = (index: number, field: 'heading' | 'content', value: string) => {
    if (!editingItem) return;
    const sections = [...editingItem.sections];
    sections[index] = { ...sections[index], [field]: value };
    setEditingItem({ ...editingItem, sections });
  };

  const removeSection = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      sections: editingItem.sections.filter((_, i) => i !== index)
    });
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
            Blog Posts
          </div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '13px' }}>
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} · Manage your insights & articles
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
          + Add Post
        </button>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div style={{
          background: '#161b2e',
          border: '1px solid rgba(246,245,240,0.07)',
          borderRadius: '16px',
          padding: '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.3 }}>📝</div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '16px', marginBottom: '24px' }}>
            No blog posts yet
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
            Create Your First Post
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                background: '#161b2e',
                border: '1px solid rgba(246,245,240,0.07)',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => editItem(post)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(43,182,234,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(246,245,240,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ aspectRatio: '16/9', background: post.gradient_bg || '#1a1f5c' }}>
                {post.featured_image && (
                  <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#2bb6ea', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {post.category}
                </div>
                <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>
                  {post.title || 'Untitled Post'}
                </div>
                <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', marginBottom: '12px' }}>
                  /insights/{post.slug || 'slug'}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {post.featured && (
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      background: 'rgba(255,215,0,0.15)',
                      color: '#ffd700',
                      borderRadius: '6px',
                      fontSize: '10px',
                      fontWeight: 600
                    }}>
                      ★ Featured
                    </span>
                  )}
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: post.published ? 'rgba(34,197,94,0.15)' : 'rgba(246,245,240,0.1)',
                    color: post.published ? '#22c55e' : 'rgba(246,245,240,0.5)',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ color: '#f6f5f0', fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
              {editingItem.title || 'New Blog Post'}
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
                  borderBottom: activeTab === 'content' ? '2px solid #2bb6ea' : '2px solid transparent'
                }}
              >
                ✍️ Content
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: activeTab === 'seo' ? '#2bb6ea' : 'rgba(246,245,240,0.5)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderBottom: activeTab === 'seo' ? '2px solid #2bb6ea' : '2px solid transparent'
                }}
              >
                🔍 SEO
              </button>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              {/* BASIC TAB */}
              {activeTab === 'basic' && (<>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={styles.label}>Post Title</label>
                    <input type="text" value={editingItem.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g., Why your CAC stopped going down" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Slug (URL)</label>
                    <input type="text" value={editingItem.slug} onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="cac-stopped-going-down" style={styles.input} />
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Excerpt (Short Description)</label>
                  <textarea value={editingItem.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} placeholder="A brief summary of the post..." style={styles.textarea} rows={3} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={styles.label}>Category</label>
                    <select value={editingItem.category} onChange={(e) => updateField('category', e.target.value)} style={styles.input}>
                      <option value="Brand">Brand</option>
                      <option value="Growth">Growth</option>
                      <option value="Design">Design</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Field notes">Field notes</option>
                    </select>
                  </div>
                  <div>
                    <label style={styles.label}>Tag (optional)</label>
                    <input type="text" value={editingItem.tag} onChange={(e) => updateField('tag', e.target.value)} placeholder="◇ GROWTH" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Read Time</label>
                    <input type="text" value={editingItem.read_time} onChange={(e) => updateField('read_time', e.target.value)} placeholder="5 min" style={styles.input} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={styles.label}>Author Name</label>
                    <input type="text" value={editingItem.author_name} onChange={(e) => updateField('author_name', e.target.value)} placeholder="Zara Iqbal" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Author Role</label>
                    <input type="text" value={editingItem.author_role} onChange={(e) => updateField('author_role', e.target.value)} placeholder="Growth Lead" style={styles.input} />
                  </div>
                  <div>
                    <label style={styles.label}>Published Date</label>
                    <input type="date" value={editingItem.published_date} onChange={(e) => updateField('published_date', e.target.value)} style={styles.input} />
                  </div>
                </div>

                <div>
                  <label style={styles.label}>Gradient Background (CSS)</label>
                  <input type="text" value={editingItem.gradient_bg} onChange={(e) => updateField('gradient_bg', e.target.value)} placeholder="linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)" style={styles.input} />
                </div>

                <div>
                  <label style={styles.label}>Featured Image URL (optional)</label>
                  <input type="text" value={editingItem.featured_image} onChange={(e) => updateField('featured_image', e.target.value)} placeholder="/uploads/post-image.jpg" style={styles.input} />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#f6f5f0', fontSize: '14px', padding: '12px 16px', background: 'rgba(43,182,234,0.08)', borderRadius: '8px', border: '1px solid rgba(43,182,234,0.2)' }}>
                    <input type="checkbox" checked={editingItem.featured} onChange={(e) => updateField('featured', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    ★ Featured Post
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#f6f5f0', fontSize: '14px', padding: '12px 16px', background: 'rgba(34,197,94,0.08)', borderRadius: '8px', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <input type="checkbox" checked={editingItem.published} onChange={(e) => updateField('published', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    Published (visible on site)
                  </label>
                </div>
              </>)}

              {/* CONTENT TAB */}
              {activeTab === 'content' && (<>
                <div>
                  <label style={styles.label}>Main Content</label>
                  <textarea value={editingItem.content} onChange={(e) => updateField('content', e.target.value)} placeholder="Write your post content here..." style={{ ...styles.textarea, minHeight: '200px' }} />
                  <div style={{ color: 'rgba(246,245,240,0.4)', fontSize: '11px', marginTop: '6px' }}>
                    💡 You can use simple HTML or plain text. Line breaks will be preserved.
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(246,245,240,0.1)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ color: '#f6f5f0', fontSize: '15px', fontWeight: 600 }}>
                      Content Sections ({editingItem.sections.length})
                    </div>
                    <button onClick={addSection} style={{ padding: '8px 16px', background: 'rgba(43,182,234,0.15)', color: '#2bb6ea', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                      + Add Section
                    </button>
                  </div>

                  {editingItem.sections.map((section, i) => (
                    <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(246,245,240,0.03)', borderRadius: '8px', border: '1px solid rgba(246,245,240,0.07)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>Section #{i + 1}</span>
                        <button onClick={() => removeSection(i)} style={{ padding: '4px 12px', background: 'rgba(255,68,68,0.15)', color: '#ff4444', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <label style={styles.label}>Heading</label>
                        <input type="text" value={section.heading} onChange={(e) => updateSection(i, 'heading', e.target.value)} placeholder="Section heading..." style={styles.input} />
                      </div>
                      <div>
                        <label style={styles.label}>Content</label>
                        <textarea value={section.content} onChange={(e) => updateSection(i, 'content', e.target.value)} placeholder="Section content..." style={{ ...styles.textarea, minHeight: '120px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>)}

              {/* SEO TAB */}
              {activeTab === 'seo' && (<>
                <div>
                  <label style={styles.label}>Meta Description</label>
                  <textarea value={editingItem.meta_description} onChange={(e) => updateField('meta_description', e.target.value)} placeholder="SEO-friendly description (155 characters max)" style={styles.textarea} rows={3} maxLength={155} />
                  <div style={{ color: 'rgba(246,245,240,0.4)', fontSize: '11px', marginTop: '6px' }}>
                    {editingItem.meta_description.length}/155 characters
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'rgba(43,182,234,0.05)', borderRadius: '8px', border: '1px solid rgba(43,182,234,0.1)' }}>
                  <div style={{ color: '#2bb6ea', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>📄 Page URL</div>
                  <div style={{ color: 'rgba(246,245,240,0.7)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                    /insights/{editingItem.slug || 'your-slug-here'}
                  </div>
                </div>
              </>)}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '12px 24px', background: 'rgba(246,245,240,0.1)', color: 'rgba(246,245,240,0.7)', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={saveItem} style={{ padding: '12px 24px', background: '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                Save Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
