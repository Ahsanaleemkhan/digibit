'use client';

import { useEffect, useState, useRef } from 'react';

type MediaItem = {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  path: string;
  alt_text: string | null;
  caption: string | null;
  uploaded_by: string | null;
  created_at: string;
};

const styles = {
  container: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '24px' 
  },
  header: {
    background: '#161b2e',
    border: '1px solid rgba(246,245,240,0.07)',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  uploadBtn: {
    padding: '12px 24px',
    background: '#2bb6ea',
    color: '#0d1240',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 700,
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px'
  },
  card: {
    background: '#161b2e',
    border: '1px solid rgba(246,245,240,0.07)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative' as const
  },
  imageWrapper: {
    width: '100%',
    height: '200px',
    background: 'rgba(246,245,240,0.03)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  cardInfo: {
    padding: '12px'
  },
  cardTitle: {
    color: '#f6f5f0',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '4px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardMeta: {
    color: 'rgba(246,245,240,0.4)',
    fontSize: '11px'
  },
  empty: {
    background: '#161b2e',
    border: '1px solid rgba(246,245,240,0.07)',
    borderRadius: '16px',
    padding: '80px 40px',
    textAlign: 'center' as const
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
    opacity: 0.3
  },
  emptyText: {
    color: 'rgba(246,245,240,0.5)',
    fontSize: '16px',
    marginBottom: '24px'
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
    padding: '40px'
  },
  modalContent: {
    background: '#161b2e',
    borderRadius: '16px',
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    border: '1px solid rgba(246,245,240,0.1)'
  },
  modalLeft: {
    padding: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.2)',
    borderRight: '1px solid rgba(246,245,240,0.07)'
  },
  modalRight: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px'
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '500px',
    objectFit: 'contain' as const,
    borderRadius: '8px'
  },
  modalTitle: {
    color: '#f6f5f0',
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '16px'
  },
  detailRow: {
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(246,245,240,0.07)'
  },
  detailLabel: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '10px',
    color: 'rgba(246,245,240,0.4)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    marginBottom: '6px'
  },
  detailValue: {
    color: '#f6f5f0',
    fontSize: '13px',
    wordBreak: 'break-all' as const
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    background: 'rgba(246,245,240,0.06)',
    border: '1px solid rgba(246,245,240,0.1)',
    borderRadius: '8px',
    color: '#f6f5f0',
    fontFamily: 'inherit',
    fontSize: '13px',
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
    fontSize: '13px',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    minHeight: '80px'
  },
  btnGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: 'auto'
  },
  btn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer'
  },
  btnPrimary: {
    background: '#2bb6ea',
    color: '#0d1240'
  },
  btnDanger: {
    background: 'rgba(255,68,68,0.15)',
    color: '#ff4444',
    border: '1px solid rgba(255,68,68,0.3)'
  },
  btnSecondary: {
    background: 'rgba(246,245,240,0.08)',
    color: 'rgba(246,245,240,0.7)',
    border: '1px solid rgba(246,245,240,0.1)'
  },
  hiddenInput: {
    display: 'none'
  },
  copyBtn: {
    padding: '6px 12px',
    background: 'rgba(43,182,234,0.15)',
    border: '1px solid rgba(43,182,234,0.3)',
    color: '#2bb6ea',
    borderRadius: '6px',
    fontSize: '11px',
    cursor: 'pointer',
    marginLeft: '8px',
    fontFamily: 'JetBrains Mono, monospace'
  }
};

export default function MediaPanel() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editedAlt, setEditedAlt] = useState('');
  const [editedCaption, setEditedCaption] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();
      setMedia(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load media:', error);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
        setMedia([result.media, ...media]);
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

  const openModal = (item: MediaItem) => {
    setSelectedMedia(item);
    setEditedAlt(item.alt_text || '');
    setEditedCaption(item.caption || '');
  };

  const closeModal = () => {
    setSelectedMedia(null);
    setCopied(false);
  };

  const handleUpdate = async () => {
    if (!selectedMedia) return;

    try {
      const response = await fetch('/api/admin/media', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedMedia.id,
          alt_text: editedAlt,
          caption: editedCaption,
        }),
      });

      if (response.ok) {
        // Update local state
        setMedia(media.map(m => 
          m.id === selectedMedia.id 
            ? { ...m, alt_text: editedAlt, caption: editedCaption }
            : m
        ));
        closeModal();
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update media');
    }
  };

  const handleDelete = async () => {
    if (!selectedMedia) return;
    if (!confirm('Are you sure you want to delete this media file? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/admin/media?id=${selectedMedia.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMedia(media.filter(m => m.id !== selectedMedia.id));
        closeModal();
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete media');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>
        Loading media library…
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={{ color: '#f6f5f0', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
            Media Library
          </div>
          <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '13px' }}>
            {media.length} {media.length === 1 ? 'file' : 'files'} · Upload images up to 10MB
          </div>
        </div>
        <button 
          onClick={handleUploadClick} 
          disabled={uploading}
          style={{
            ...styles.uploadBtn,
            opacity: uploading ? 0.6 : 1,
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        >
          <span>{uploading ? '⏳' : '⬆'}</span>
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={styles.hiddenInput}
        />
      </div>

      {media.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🖼️</div>
          <div style={styles.emptyText}>No media files yet</div>
          <button onClick={handleUploadClick} style={styles.uploadBtn}>
            <span>⬆</span>
            Upload Your First Image
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {media.map((item) => (
            <div
              key={item.id}
              style={styles.card}
              onClick={() => openModal(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(43,182,234,0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(246,245,240,0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={styles.imageWrapper}>
                <img
                  src={item.path}
                  alt={item.alt_text || item.original_name}
                  style={styles.image}
                />
              </div>
              <div style={styles.cardInfo}>
                <div style={styles.cardTitle}>{item.original_name}</div>
                <div style={styles.cardMeta}>
                  {formatFileSize(item.size)} · {formatDate(item.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMedia && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalLeft}>
              <img
                src={selectedMedia.path}
                alt={selectedMedia.alt_text || selectedMedia.original_name}
                style={styles.modalImage}
              />
            </div>
            <div style={styles.modalRight}>
              <div>
                <div style={styles.modalTitle}>Media Details</div>
                <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px' }}>
                  Uploaded {formatDate(selectedMedia.created_at)}
                </div>
              </div>

              <div style={detailRow}>
                <div style={styles.detailLabel}>File Name</div>
                <div style={styles.detailValue}>{selectedMedia.original_name}</div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailLabel}>File Size</div>
                <div style={styles.detailValue}>{formatFileSize(selectedMedia.size)}</div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailLabel}>Type</div>
                <div style={styles.detailValue}>{selectedMedia.mime_type}</div>
              </div>

              <div style={styles.detailRow}>
                <div style={styles.detailLabel}>
                  URL
                  <button
                    onClick={() => copyToClipboard(window.location.origin + selectedMedia.path)}
                    style={styles.copyBtn}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div style={{ ...styles.detailValue, fontSize: '11px', marginTop: '6px' }}>
                  {window.location.origin}{selectedMedia.path}
                </div>
              </div>

              <div>
                <label style={styles.detailLabel}>Alt Text</label>
                <input
                  type="text"
                  value={editedAlt}
                  onChange={(e) => setEditedAlt(e.target.value)}
                  placeholder="Describe this image..."
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.detailLabel}>Caption</label>
                <textarea
                  value={editedCaption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                  placeholder="Add a caption..."
                  style={styles.textarea}
                />
              </div>

              {selectedMedia.uploaded_by && (
                <div style={{ fontSize: '11px', color: 'rgba(246,245,240,0.3)' }}>
                  Uploaded by {selectedMedia.uploaded_by}
                </div>
              )}

              <div style={styles.btnGroup}>
                <button
                  onClick={handleUpdate}
                  style={{ ...styles.btn, ...styles.btnPrimary }}
                >
                  Update
                </button>
                <button
                  onClick={closeModal}
                  style={{ ...styles.btn, ...styles.btnSecondary }}
                >
                  Close
                </button>
              </div>

              <button
                onClick={handleDelete}
                style={{ ...styles.btn, ...styles.btnDanger }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const detailRow = styles.detailRow;
