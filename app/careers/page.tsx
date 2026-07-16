import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import { cmsContent } from '@/lib/db';

export const metadata: Metadata = { title: 'Careers — Digibit', description: 'Come make good work with good people.' };

// Default fallback data
const defaultData = {
  hero_eyebrow: "Careers · We're hiring",
  hero_desc: "We're a small studio with big ambitions. If you like shipping, care about craft, and want to work on things that make it into the real world — read on.",
  why_eyebrow: 'Why Digibit',
  why_heading: 'A studio that treats itself like a product.',
  perks: [],
  roles_eyebrow: 'Open roles · 6',
  roles_heading: "Roles we're actively hiring for.",
  roles: [],
  roles_fallback: 'team@digibit.co',
  life_eyebrow: 'Life at Digibit',
  life_heading: 'How the work actually feels.',
  life_cards: [],
  cta_heading: 'See yourself here?',
  cta_button: 'Send us a note'
};

export default async function Careers() {
  const content = cmsContent.getByKey('careers');
  const d = content?.content || defaultData;
  
  const roles = d.roles || [];
  const perks = d.perks || [];
  const lifeCards = d.life_cards || [];
  const email = d.roles_fallback || 'team@digibit.co';

  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1>Come make <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>good work</em> with good people.</h1>
        <p>{d.hero_desc}</p>
      </section>

      <section className="container">
        <div style={{ padding: '60px 0 120px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px' }}>
          <ScrollReveal>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{d.why_eyebrow}</div>
            <h2 style={{ maxWidth: '14ch', fontSize: 'clamp(32px,4vw,52px)' }}>{d.why_heading}</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {perks.map((p: any, i: number) => (
              <ScrollReveal key={i} style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan-deep)', letterSpacing: '0.14em', marginBottom: '24px' }}>{p.n}</div>
                <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 500 }}>{p.title}</h4>
                <p style={{ color: 'rgba(13,18,64,0.68)', fontSize: '14px', lineHeight: 1.5 }}>{p.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '60px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{d.roles_eyebrow}</div>
            <h2>{d.roles_heading}</h2>
          </ScrollReveal>
          <div>
            {roles.map((r: any, i: number) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 40px', gap: '40px', padding: '28px 0', borderTop: '1px solid var(--line)', alignItems: 'center', cursor: 'pointer', ...(i === roles.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
                <h4 style={{ fontSize: '22px', fontWeight: 500 }}>{r.title}</h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>{r.dept}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>{r.loc}</div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</div>
              </div>
            ))}
          </div>
          {email && <div style={{ marginTop: '40px', fontSize: '14px', color: 'var(--muted)' }}>Don&apos;t see your role? Write to <a href={`mailto:${email}`} style={{ color: 'var(--cyan-deep)' }}>{email}</a>.</div>}
        </div>
      </section>

      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '60px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{d.life_eyebrow}</div>
            <h2 style={{ maxWidth: '16ch' }}>{d.life_heading}</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
            {lifeCards.map((c: any, i: number) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 'var(--r-lg)', padding: '24px', display: 'flex', alignItems: 'flex-end', fontFamily: 'var(--font-display)', fontSize: '20px', lineHeight: 1.1, fontWeight: 500, color: 'var(--paper)', position: 'relative', overflow: 'hidden', background: c.bg }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4))' }} />
                <span style={{ position: 'relative', zIndex: 1 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" style={{ padding: '120px 40px' }}>
        <div className="blob cyan big" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, position: 'absolute' }} />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>{d.cta_heading}</h2>
          <a href={`mailto:${email}`} className="btn btn-primary">{d.cta_button} <span className="circle">→</span></a>
        </div>
      </section>
    </>
  );
}
