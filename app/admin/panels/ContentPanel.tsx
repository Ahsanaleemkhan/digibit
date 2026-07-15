'use client';
import { useEffect, useState } from 'react';

// ─── shared helpers ────────────────────────────────────────────────────────────
const inputS: React.CSSProperties = { width: '100%', padding: '10px 14px', background: 'rgba(246,245,240,0.06)', border: '1px solid rgba(246,245,240,0.1)', borderRadius: '8px', color: '#f6f5f0', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box', lineHeight: 1.5 };
const labelS: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(246,245,240,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' };
const cardS: React.CSSProperties = { background: '#161b2e', border: '1px solid rgba(246,245,240,0.07)', borderRadius: '16px', padding: '24px', marginBottom: '20px' };

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={labelS}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ ...inputS, resize: 'vertical' as const }} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} style={inputS} />}
    </div>
  );
}

function SaveBtn({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <button onClick={onSave} style={{ padding: '13px 28px', background: saved ? '#22c55e' : '#2bb6ea', color: '#0d1240', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'background 0.3s' }}>
      {saved ? '✓ Saved!' : 'Save Changes'}
    </button>
  );
}

// ─── main panel ───────────────────────────────────────────────────────────────
export default function ContentPanel({ section }: { section: string }) {
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/data?file=content')
      .then(r => r.json()).then(setContent);
  }, []);

  const save = async () => {
    await fetch('/api/admin/data?file=content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  if (!content) return <div style={{ color: 'rgba(246,245,240,0.4)', padding: '40px', textAlign: 'center' }}>Loading…</div>;

  return (
    <div style={{ maxWidth: '760px' }}>
      {section === 'homepage' && <HomepageEditor content={content} setContent={setContent} />}
      {section === 'contact' && <ContactEditor content={content} setContent={setContent} />}
      {section === 'about' && <AboutEditor content={content} setContent={setContent} />}
      {section === 'nav' && <NavEditor content={content} setContent={setContent} />}
      <SaveBtn onSave={save} saved={saved} />
    </div>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
function HomepageEditor({ content, setContent }: { content: Record<string, unknown>; setContent: (c: Record<string, unknown>) => void }) {
  const hp = content.homepage as Record<string, unknown>;
  const set = (path: string[], val: unknown) => {
    const clone = JSON.parse(JSON.stringify(content));
    let obj: Record<string, unknown> = clone;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
    obj[path[path.length - 1]] = val;
    setContent(clone);
  };

  const hero = hp.hero as Record<string, string>;
  const process = hp.process as Record<string, unknown>;
  const testimonial = hp.testimonial as Record<string, string>;
  const finalCta = hp.finalCta as Record<string, string>;
  const steps = (process.steps as Array<Record<string, string>>);
  const stats = (hp.stats as Array<Record<string, unknown>>);

  return (
    <>
      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>⌂ Hero Section</div>
        <Field label="Eyebrow" value={hero.eyebrow} onChange={v => set(['homepage', 'hero', 'eyebrow'], v)} />
        <Field label="Tagline" value={hero.tagline} onChange={v => set(['homepage', 'hero', 'tagline'], v)} multiline />
        <Field label="CTA Button 1" value={hero.cta1} onChange={v => set(['homepage', 'hero', 'cta1'], v)} />
        <Field label="CTA Button 2" value={hero.cta2} onChange={v => set(['homepage', 'hero', 'cta2'], v)} />
        <Field label="Sub-left text" value={hero.subLeft} onChange={v => set(['homepage', 'hero', 'subLeft'], v)} />
      </div>

      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>📊 Stats</div>
        {stats.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 60px 1fr', gap: '10px', marginBottom: '12px', alignItems: 'end' }}>
            <div>
              <label style={labelS}>Count</label>
              <input type="number" value={s.count as number} onChange={e => set(['homepage', 'stats', String(i), 'count'], +e.target.value)} style={inputS} />
            </div>
            <div>
              <label style={labelS}>Suffix</label>
              <input type="text" value={s.suffix as string} onChange={e => set(['homepage', 'stats', String(i), 'suffix'], e.target.value)} style={inputS} />
            </div>
            <div>
              <label style={labelS}>Label</label>
              <input type="text" value={s.label as string} onChange={e => set(['homepage', 'stats', String(i), 'label'], e.target.value)} style={inputS} />
            </div>
          </div>
        ))}
      </div>

      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>⚙ Process — "The way we work"</div>
        <Field label="Eyebrow" value={process.eyebrow as string} onChange={v => set(['homepage', 'process', 'eyebrow'], v)} />
        <Field label="Heading" value={process.heading as string} onChange={v => set(['homepage', 'process', 'heading'], v)} />
        {steps.map((s, i) => (
          <div key={i} style={{ borderTop: '1px solid rgba(246,245,240,0.07)', paddingTop: '14px', marginTop: '14px' }}>
            <div style={{ color: 'rgba(246,245,240,0.5)', fontSize: '12px', marginBottom: '10px' }}>Step {i + 1}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px', marginBottom: '8px' }}>
              <div><label style={labelS}>Label</label><input type="text" value={s.num} onChange={e => set(['homepage', 'process', 'steps', String(i), 'num'], e.target.value)} style={inputS} /></div>
              <div><label style={labelS}>Title</label><input type="text" value={s.title} onChange={e => set(['homepage', 'process', 'steps', String(i), 'title'], e.target.value)} style={inputS} /></div>
            </div>
            <Field label="Description" value={s.desc} onChange={v => set(['homepage', 'process', 'steps', String(i), 'desc'], v)} multiline />
          </div>
        ))}
      </div>

      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>💬 Testimonial</div>
        <Field label="Quote" value={testimonial.quote} onChange={v => set(['homepage', 'testimonial', 'quote'], v)} multiline />
        <Field label="Author" value={testimonial.author} onChange={v => set(['homepage', 'testimonial', 'author'], v)} />
        <Field label="Role" value={testimonial.role} onChange={v => set(['homepage', 'testimonial', 'role'], v)} />
      </div>

      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>🚀 Final CTA</div>
        <Field label="Heading" value={finalCta.heading} onChange={v => set(['homepage', 'finalCta', 'heading'], v)} />
        <Field label="Button 1" value={finalCta.cta1} onChange={v => set(['homepage', 'finalCta', 'cta1'], v)} />
        <Field label="Button 2" value={finalCta.cta2} onChange={v => set(['homepage', 'finalCta', 'cta2'], v)} />
      </div>
    </>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactEditor({ content, setContent }: { content: Record<string, unknown>; setContent: (c: Record<string, unknown>) => void }) {
  const ct = content.contact as Record<string, unknown>;
  const offices = ct.offices as Array<Record<string, string>>;
  const set = (path: string[], val: unknown) => {
    const clone = JSON.parse(JSON.stringify(content));
    let obj: Record<string, unknown> = clone;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
    obj[path[path.length - 1]] = val;
    setContent(clone);
  };
  return (
    <div style={cardS}>
      <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>☎ Contact Information</div>
      <Field label="Email" value={ct.email as string} onChange={v => set(['contact', 'email'], v)} />
      <Field label="Phone" value={ct.phone as string} onChange={v => set(['contact', 'phone'], v)} />
      <Field label="Page eyebrow" value={ct.eyebrow as string} onChange={v => set(['contact', 'eyebrow'], v)} />
      <Field label="Page heading" value={ct.heading as string} onChange={v => set(['contact', 'heading'], v)} multiline />
      <div style={{ borderTop: '1px solid rgba(246,245,240,0.07)', paddingTop: '16px', marginTop: '16px' }}>
        <div style={{ color: '#f6f5f0', fontWeight: 500, marginBottom: '14px' }}>Offices</div>
        {offices.map((o, i) => (
          <div key={i} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Field label="City" value={o.city} onChange={v => set(['contact', 'offices', String(i), 'city'], v)} />
              <Field label="Address" value={o.address} onChange={v => set(['contact', 'offices', String(i), 'address'], v)} multiline />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutEditor({ content, setContent }: { content: Record<string, unknown>; setContent: (c: Record<string, unknown>) => void }) {
  const ab = content.about as Record<string, unknown>;
  const hero = ab.hero as Record<string, string>;
  const values = ab.values as Array<Record<string, string>>;
  const set = (path: string[], val: unknown) => {
    const clone = JSON.parse(JSON.stringify(content));
    let obj: Record<string, unknown> = clone;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
    obj[path[path.length - 1]] = val;
    setContent(clone);
  };
  return (
    <>
      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>◎ About Hero</div>
        <Field label="Eyebrow" value={hero.eyebrow} onChange={v => set(['about', 'hero', 'eyebrow'], v)} />
        <Field label="Heading" value={hero.heading} onChange={v => set(['about', 'hero', 'heading'], v)} />
        <Field label="Sub-text" value={hero.sub} onChange={v => set(['about', 'hero', 'sub'], v)} multiline />
        <Field label="Mission statement" value={ab.mission as string} onChange={v => set(['about', 'mission'], v)} multiline />
      </div>
      <div style={cardS}>
        <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>◆ Values</div>
        {values.map((v, i) => (
          <div key={i} style={{ borderTop: i ? '1px solid rgba(246,245,240,0.07)' : 'none', paddingTop: i ? '14px' : 0, marginTop: i ? '14px' : 0 }}>
            <Field label={`Value ${i + 1} title`} value={v.title} onChange={val => set(['about', 'values', String(i), 'title'], val)} />
            <Field label="Description" value={v.desc} onChange={val => set(['about', 'values', String(i), 'desc'], val)} multiline />
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function NavEditor({ content, setContent }: { content: Record<string, unknown>; setContent: (c: Record<string, unknown>) => void }) {
  const nav = content.nav as Record<string, unknown>;
  const links = nav.links as Array<Record<string, string>>;
  const set = (path: string[], val: unknown) => {
    const clone = JSON.parse(JSON.stringify(content));
    let obj: Record<string, unknown> = clone;
    for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
    obj[path[path.length - 1]] = val;
    setContent(clone);
  };
  return (
    <div style={cardS}>
      <div style={{ color: '#f6f5f0', fontWeight: 600, marginBottom: '20px' }}>≡ Navigation</div>
      <Field label="CTA button label" value={nav.cta as string} onChange={v => set(['nav', 'cta'], v)} />
      <div style={{ borderTop: '1px solid rgba(246,245,240,0.07)', paddingTop: '16px', marginTop: '8px' }}>
        <div style={{ color: '#f6f5f0', fontWeight: 500, marginBottom: '14px' }}>Nav Links</div>
        {links.map((l, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <Field label="Label" value={l.label} onChange={v => set(['nav', 'links', String(i), 'label'], v)} />
            <Field label="URL" value={l.href} onChange={v => set(['nav', 'links', String(i), 'href'], v)} />
          </div>
        ))}
      </div>
    </div>
  );
}
