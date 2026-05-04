import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Digibit',
  description: 'Three ways to work with us. No surprises.',
};

const plans = [
  { tag: '◇ 01 · SPRINT', title: 'Project Sprint', sub: 'A defined piece of work, fixed scope, fixed price.', price: 'From $18k', note: 'ONE-TIME · 2–8 WEEKS', items: ['Single discipline — brand, site, campaign or app','Dedicated producer + 2-person pod','Two rounds of feedback, one refinement','Full handover + training','30 days post-launch support'], cta: 'Scope a sprint →', featured: false },
  { tag: '◆ 02 · FLAGSHIP', title: '360° Retainer', sub: 'The full engine — brand, build, media, content.', price: 'From $24k', priceNote: '/mo', note: '3-MONTH MIN · MOST POPULAR', items: ['Everything in Sprint, plus:','Dedicated cross-functional pod (5–7 people)','Weekly strategy + creative sessions','Paid media management (up to $200k/mo spend)','Content production — 8 pieces/month','Quarterly business reviews with founders'], cta: 'Start a retainer →', featured: true },
  { tag: '◇ 03 · EMBEDDED', title: 'Embedded Pod', sub: 'Our team, working inside yours.', price: 'From $48k', priceNote: '/mo', note: '6-MONTH MIN · FOR SCALE-UPS', items: ['Everything in 360°, plus:','Daily standups inside your workspace','Shared Slack, Notion, Linear access','Unlimited scope within pod capacity','Shared KPI accountability','Named executive sponsor'], cta: 'Book embed call →', featured: false },
];

const addons = [
  { title: 'Photo & video day', price: '$6k / DAY', desc: 'Studio or on-location. One shooter, one producer, full post.' },
  { title: 'Motion & animation', price: '$2.5k / PIECE', desc: 'Logo animations, ad cuts, loop sequences for social.' },
  { title: 'CRO sprint', price: '$12k / 6 WEEKS', desc: 'Research, hypotheses, 3 tests, results readout.' },
  { title: 'Analytics setup', price: '$4k', desc: 'GA4, server-side tags, dashboard, and a working session.' },
  { title: 'Landing page sprint', price: '$8k / 2 WEEKS', desc: 'Single high-intent page, designed and shipped.' },
  { title: 'Brand audit', price: '$3.5k', desc: 'Independent read on your positioning, identity and voice.' },
];

export default function Pricing() {
  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />Pricing &amp; engagements</div>
        <h1>Three ways to work with us. <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>No surprises.</em></h1>
        <p>Most agencies hide their pricing. We don&apos;t. Here&apos;s roughly what each engagement costs — actual scope is confirmed after a 30-minute call.</p>
      </section>

      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', padding: '40px 0 100px' }}>
          {plans.map((p, i) => (
            <ScrollReveal key={i} style={{
              padding: '40px 32px', borderRadius: 'var(--r-lg)', display: 'flex', flexDirection: 'column',
              background: p.featured ? 'var(--ink)' : 'var(--white)',
              border: p.featured ? 'none' : '1px solid var(--line)',
              position: 'relative', overflow: 'hidden',
            }}>
              {p.featured && <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--cyan), transparent 60%)', opacity: 0.35, filter: 'blur(30px)' }} />}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: p.featured ? 'var(--cyan)' : 'var(--cyan-deep)', marginBottom: '20px', position: 'relative', zIndex: 1 }}>{p.tag}</div>
              <h3 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 500, color: p.featured ? 'var(--paper)' : 'var(--ink)', position: 'relative', zIndex: 1 }}>{p.title}</h3>
              <div style={{ fontSize: '14px', color: p.featured ? 'rgba(246,245,240,0.6)' : 'var(--muted)', marginBottom: '32px' }}>{p.sub}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '4px', color: p.featured ? 'var(--paper)' : 'var(--ink)', position: 'relative', zIndex: 1 }}>
                {p.price}{p.priceNote && <span style={{ fontSize: '22px', opacity: 0.5 }}>{p.priceNote}</span>}
              </div>
              <div style={{ fontSize: '13px', color: p.featured ? 'rgba(246,245,240,0.6)' : 'var(--muted)', marginBottom: '32px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{p.note}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1, position: 'relative', zIndex: 1 }}>
                {p.items.map((item, j) => (
                  <li key={j} style={{ padding: '12px 0', borderTop: '1px solid', borderColor: p.featured ? 'rgba(246,245,240,0.12)' : 'var(--line)', fontSize: '14px', display: 'grid', gridTemplateColumns: '24px 1fr', gap: '10px', color: p.featured ? 'rgba(246,245,240,0.85)' : 'inherit' }}>
                    <span style={{ color: p.featured ? 'var(--cyan)' : 'var(--cyan-deep)', fontWeight: 600 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`btn ${p.featured ? 'btn-cyan' : 'btn-ghost'}`} style={{ width: '100%', justifyContent: 'center', position: 'relative', zIndex: 1 }}>{p.cta}</Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '100px 0', borderTop: '1px solid var(--line)' }}>
        <ScrollReveal style={{ marginBottom: '60px' }}>
          <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Add-ons &amp; specialities</div>
          <h2 style={{ maxWidth: '16ch' }}>Plug-in services we bolt onto any engagement.</h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {addons.map((a, i) => (
            <ScrollReveal key={i} style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', transition: 'all 0.3s' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '4px' }}>{a.title}</h4>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--cyan-deep)', marginBottom: '8px' }}>{a.price}</div>
              <p style={{ fontSize: '13px', color: 'rgba(13,18,64,0.65)', lineHeight: 1.5 }}>{a.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="final-cta" style={{ padding: '120px 40px' }}>
        <div className="blob cyan big" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, position: 'absolute' }} />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>Not sure which fits? <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>Let&apos;s just talk.</em></h2>
          <Link href="/contact" className="btn btn-primary">Book 30 min <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
