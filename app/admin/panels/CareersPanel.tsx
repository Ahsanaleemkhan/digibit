'use client';
import { useState, useEffect } from 'react';

const S = {
  shell: { background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '32px', maxWidth: '900px' } as React.CSSProperties,
  head: { marginBottom: '32px' } as React.CSSProperties,
  title: { fontSize: '24px', fontWeight: 600, color: '#f6f5f0', marginBottom: '8px', fontFamily: 'Bricolage Grotesque, sans-serif' } as React.CSSProperties,
  desc: { fontSize: '14px', color: 'rgba(246,245,240,0.5)', lineHeight: 1.6 } as React.CSSProperties,
  group: { marginBottom: '28px' } as React.CSSProperties,
  label: { display: 'block', fontSize: '13px', fontWeight: 500, color: 'rgba(246,245,240,0.7)', marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em' } as React.CSSProperties,
  input: { width: '100%', padding: '12px 16px', background: '#0d1240', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '10px', color: '#f6f5f0', fontSize: '14px', fontFamily: 'inherit' } as React.CSSProperties,
  textarea: { width: '100%', minHeight: '120px', padding: '12px 16px', background: '#0d1240', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '10px', color: '#f6f5f0', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' as const } as React.CSSProperties,
  btnPrimary: { padding: '12px 24px', background: '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' } as React.CSSProperties,
  btnSecondary: { padding: '10px 20px', background: 'rgba(246,245,240,0.05)', color: 'rgba(246,245,240,0.7)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '10px', fontWeight: 500, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' } as React.CSSProperties,
  btnDanger: { padding: '8px 16px', background: 'rgba(196,30,58,0.15)', color: '#ff6b9d', border: '1px solid rgba(196,30,58,0.3)', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' } as React.CSSProperties,
  card: { background: '#0d1240', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '12px' } as React.CSSProperties,
  divider: { height: '1px', background: 'rgba(246,245,240,0.07)', margin: '32px 0' } as React.CSSProperties,
  success: { padding: '12px 16px', background: 'rgba(43,182,234,0.15)', border: '1px solid rgba(43,182,234,0.3)', borderRadius: '10px', color: '#2bb6ea', fontSize: '14px', marginBottom: '20px' } as React.CSSProperties,
  flex: { display: 'flex', gap: '12px', alignItems: 'center' } as React.CSSProperties,
  sectionHeader: { fontSize: '18px', fontWeight: 600, color: '#2bb6ea', marginBottom: '20px', fontFamily: 'Bricolage Grotesque, sans-serif' } as React.CSSProperties,
};

interface Perk {
  n: string;
  title: string;
  desc: string;
}

interface Role {
  title: string;
  dept: string;
  loc: string;
}

interface LifeCard {
  bg: string;
  label: string;
}

export default function CareersPanel() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState({
    hero_eyebrow: '',
    hero_desc: '',
    why_eyebrow: '',
    why_heading: '',
    perks: [] as Perk[],
    roles_eyebrow: '',
    roles_heading: '',
    roles: [] as Role[],
    roles_fallback: '',
    life_eyebrow: '',
    life_heading: '',
    life_cards: [] as LifeCard[],
    cta_heading: '',
    cta_button: ''
  });

  useEffect(() => {
    fetch('/api/admin/data?key=careers')
      .then(r => r.json())
      .then(d => {
        if (d.content) {
          setData({
            hero_eyebrow: d.content.hero_eyebrow || '',
            hero_desc: d.content.hero_desc || '',
            why_eyebrow: d.content.why_eyebrow || '',
            why_heading: d.content.why_heading || '',
            perks: d.content.perks || [],
            roles_eyebrow: d.content.roles_eyebrow || '',
            roles_heading: d.content.roles_heading || '',
            roles: d.content.roles || [],
            roles_fallback: d.content.roles_fallback || '',
            life_eyebrow: d.content.life_eyebrow || '',
            life_heading: d.content.life_heading || '',
            life_cards: d.content.life_cards || [],
            cta_heading: d.content.cta_heading || '',
            cta_button: d.content.cta_button || ''
          });
        }
      })
      .catch(err => console.error('Failed to load careers data:', err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'careers', content: data })
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addPerk = () => {
    setData(prev => ({
      ...prev,
      perks: [...prev.perks, { n: `0${prev.perks.length + 1} · PERK`, title: '', desc: '' }]
    }));
  };

  const updatePerk = (index: number, field: keyof Perk, value: string) => {
    setData(prev => ({
      ...prev,
      perks: prev.perks.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  const removePerk = (index: number) => {
    setData(prev => ({
      ...prev,
      perks: prev.perks.filter((_, i) => i !== index)
    }));
  };

  const addRole = () => {
    setData(prev => ({
      ...prev,
      roles: [...prev.roles, { title: '', dept: '', loc: '' }]
    }));
  };

  const updateRole = (index: number, field: keyof Role, value: string) => {
    setData(prev => ({
      ...prev,
      roles: prev.roles.map((r, i) => i === index ? { ...r, [field]: value } : r)
    }));
  };

  const removeRole = (index: number) => {
    setData(prev => ({
      ...prev,
      roles: prev.roles.filter((_, i) => i !== index)
    }));
  };

  const addLifeCard = () => {
    setData(prev => ({
      ...prev,
      life_cards: [...prev.life_cards, { bg: 'linear-gradient(135deg,#1a1f5c,#2bb6ea)', label: '' }]
    }));
  };

  const updateLifeCard = (index: number, field: keyof LifeCard, value: string) => {
    setData(prev => ({
      ...prev,
      life_cards: prev.life_cards.map((c, i) => i === index ? { ...c, [field]: value } : c)
    }));
  };

  const removeLifeCard = (index: number) => {
    setData(prev => ({
      ...prev,
      life_cards: prev.life_cards.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={S.shell}>
      <div style={S.head}>
        <div style={S.title}>Careers Page Content</div>
        <div style={S.desc}>
          Manage all content for the careers page including hero, perks, roles, life cards, and CTA.
        </div>
      </div>

      {saved && <div style={S.success}>✓ Changes saved successfully</div>}

      {/* HERO SECTION */}
      <div style={S.sectionHeader}>01 · Hero Section</div>
      
      <div style={S.group}>
        <label style={S.label}>Eyebrow</label>
        <input
          type="text"
          style={S.input}
          value={data.hero_eyebrow}
          onChange={e => updateField('hero_eyebrow', e.target.value)}
          placeholder="Careers · We're hiring"
        />
      </div>

      <div style={S.group}>
        <label style={S.label}>Description</label>
        <textarea
          style={S.textarea}
          value={data.hero_desc}
          onChange={e => updateField('hero_desc', e.target.value)}
          placeholder="We're a small studio with big ambitions..."
        />
      </div>

      <div style={S.divider} />

      {/* WHY SECTION */}
      <div style={S.sectionHeader}>02 · Why Digibit Section</div>
      
      <div style={S.group}>
        <label style={S.label}>Eyebrow</label>
        <input
          type="text"
          style={S.input}
          value={data.why_eyebrow}
          onChange={e => updateField('why_eyebrow', e.target.value)}
          placeholder="Why Digibit"
        />
      </div>

      <div style={S.group}>
        <label style={S.label}>Heading</label>
        <input
          type="text"
          style={S.input}
          value={data.why_heading}
          onChange={e => updateField('why_heading', e.target.value)}
          placeholder="A studio that treats itself like a product."
        />
      </div>

      <div style={S.group}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={S.label}>Perks / Benefits</label>
          <button onClick={addPerk} style={S.btnSecondary}>+ Add Perk</button>
        </div>
        
        {data.perks.map((perk, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', color: '#2bb6ea', fontFamily: 'JetBrains Mono, monospace' }}>Perk {i + 1}</div>
              <button onClick={() => removePerk(i)} style={S.btnDanger}>Remove</button>
            </div>
            
            <div style={S.group}>
              <label style={S.label}>Number Label (e.g., "01 · AUTONOMY")</label>
              <input
                type="text"
                style={S.input}
                value={perk.n}
                onChange={e => updatePerk(i, 'n', e.target.value)}
                placeholder="01 · AUTONOMY"
              />
            </div>

            <div style={S.group}>
              <label style={S.label}>Title</label>
              <input
                type="text"
                style={S.input}
                value={perk.title}
                onChange={e => updatePerk(i, 'title', e.target.value)}
                placeholder="Own the work, end to end."
              />
            </div>

            <div style={S.group}>
              <label style={S.label}>Description</label>
              <textarea
                style={{ ...S.textarea, minHeight: '80px' }}
                value={perk.desc}
                onChange={e => updatePerk(i, 'desc', e.target.value)}
                placeholder="No account layers between you and the client."
              />
            </div>
          </div>
        ))}
      </div>

      <div style={S.divider} />

      {/* ROLES SECTION */}
      <div style={S.sectionHeader}>03 · Open Roles Section</div>
      
      <div style={S.group}>
        <label style={S.label}>Eyebrow</label>
        <input
          type="text"
          style={S.input}
          value={data.roles_eyebrow}
          onChange={e => updateField('roles_eyebrow', e.target.value)}
          placeholder="Open roles · 6"
        />
      </div>

      <div style={S.group}>
        <label style={S.label}>Heading</label>
        <input
          type="text"
          style={S.input}
          value={data.roles_heading}
          onChange={e => updateField('roles_heading', e.target.value)}
          placeholder="Roles we're actively hiring for."
        />
      </div>

      <div style={S.group}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={S.label}>Job Listings</label>
          <button onClick={addRole} style={S.btnSecondary}>+ Add Role</button>
        </div>
        
        {data.roles.map((role, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', color: '#2bb6ea', fontFamily: 'JetBrains Mono, monospace' }}>Role {i + 1}</div>
              <button onClick={() => removeRole(i)} style={S.btnDanger}>Remove</button>
            </div>
            
            <div style={S.group}>
              <label style={S.label}>Job Title</label>
              <input
                type="text"
                style={S.input}
                value={role.title}
                onChange={e => updateRole(i, 'title', e.target.value)}
                placeholder="Senior Brand Designer"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={S.group}>
                <label style={S.label}>Department</label>
                <input
                  type="text"
                  style={S.input}
                  value={role.dept}
                  onChange={e => updateRole(i, 'dept', e.target.value)}
                  placeholder="DESIGN"
                />
              </div>

              <div style={S.group}>
                <label style={S.label}>Location</label>
                <input
                  type="text"
                  style={S.input}
                  value={role.loc}
                  onChange={e => updateRole(i, 'loc', e.target.value)}
                  placeholder="LAHORE · HYBRID"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.group}>
        <label style={S.label}>Fallback Email (shown if no matching role)</label>
        <input
          type="email"
          style={S.input}
          value={data.roles_fallback}
          onChange={e => updateField('roles_fallback', e.target.value)}
          placeholder="team@digibit.co"
        />
      </div>

      <div style={S.divider} />

      {/* LIFE AT DIGIBIT SECTION */}
      <div style={S.sectionHeader}>04 · Life at Digibit Section</div>
      
      <div style={S.group}>
        <label style={S.label}>Eyebrow</label>
        <input
          type="text"
          style={S.input}
          value={data.life_eyebrow}
          onChange={e => updateField('life_eyebrow', e.target.value)}
          placeholder="Life at Digibit"
        />
      </div>

      <div style={S.group}>
        <label style={S.label}>Heading</label>
        <input
          type="text"
          style={S.input}
          value={data.life_heading}
          onChange={e => updateField('life_heading', e.target.value)}
          placeholder="How the work actually feels."
        />
      </div>

      <div style={S.group}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={S.label}>Photo Cards</label>
          <button onClick={addLifeCard} style={S.btnSecondary}>+ Add Card</button>
        </div>
        
        <div style={{ fontSize: '12px', color: 'rgba(246,245,240,0.4)', marginBottom: '16px', lineHeight: 1.5 }}>
          Each card shows a photo with a gradient overlay. The background should be a CSS gradient like: 
          <code style={{ background: '#0d1240', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>
            linear-gradient(135deg,#1a1f5c,#2bb6ea)
          </code>
        </div>
        
        {data.life_cards.map((card, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', color: '#2bb6ea', fontFamily: 'JetBrains Mono, monospace' }}>Card {i + 1}</div>
              <button onClick={() => removeLifeCard(i)} style={S.btnDanger}>Remove</button>
            </div>
            
            <div style={S.group}>
              <label style={S.label}>Label / Caption</label>
              <input
                type="text"
                style={S.input}
                value={card.label}
                onChange={e => updateLifeCard(i, 'label', e.target.value)}
                placeholder="Team offsite — Istanbul, 2025"
              />
            </div>

            <div style={S.group}>
              <label style={S.label}>Background Gradient</label>
              <input
                type="text"
                style={S.input}
                value={card.bg}
                onChange={e => updateLifeCard(i, 'bg', e.target.value)}
                placeholder="linear-gradient(135deg,#1a1f5c,#2bb6ea)"
              />
            </div>

            {/* Preview */}
            <div style={{ 
              marginTop: '12px', 
              height: '100px', 
              borderRadius: '8px', 
              background: card.bg || 'linear-gradient(135deg,#1a1f5c,#2bb6ea)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4))' }} />
              <span style={{ position: 'relative', zIndex: 1, color: '#f6f5f0', fontSize: '14px', fontWeight: 500 }}>
                {card.label || 'Preview'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={S.divider} />

      {/* FINAL CTA SECTION */}
      <div style={S.sectionHeader}>05 · Final CTA Section</div>
      
      <div style={S.group}>
        <label style={S.label}>CTA Heading</label>
        <input
          type="text"
          style={S.input}
          value={data.cta_heading}
          onChange={e => updateField('cta_heading', e.target.value)}
          placeholder="See yourself here?"
        />
      </div>

      <div style={S.group}>
        <label style={S.label}>Button Text</label>
        <input
          type="text"
          style={S.input}
          value={data.cta_button}
          onChange={e => updateField('cta_button', e.target.value)}
          placeholder="Send us a note"
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button onClick={handleSave} disabled={saving} style={S.btnPrimary}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <a href="/careers" target="_blank" style={{ ...S.btnSecondary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          Preview Page ↗
        </a>
      </div>
    </div>
  );
}
