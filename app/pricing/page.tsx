import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import { getPageData } from '@/lib/graphql';

export const metadata: Metadata = { title: 'Pricing — Digibit', description: 'Three ways to work with us. No surprises.' };

export default async function Pricing() {
  const d = await getPageData('pricing') as Record<string, any>;

  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1>Three ways to work with us. <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>No surprises.</em></h1>
        <p>{d.hero_desc}</p>
      </section>

      <section className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px', padding: '40px 0 100px' }}>
          {(d.plans || []).map((p: any, i: number) => (
            <ScrollReveal key={i} style={{ padding: '40px 32px', borderRadius: 'var(--r-lg)', display: 'flex', flexDirection: 'column', background: p.featured ? 'var(--ink)' : 'var(--white)', border: p.featured ? 'none' : '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
              {p.featured && <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, var(--cyan), transparent 60%)', opacity: 0.35, filter: 'blur(30px)' }} />}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: p.featured ? 'var(--cyan)' : 'var(--cyan-deep)', marginBottom: '20px', position: 'relative', zIndex: 1 }}>{p.tag}</div>
              <h3 style={{ fontSize: '28px', marginBottom: '8px', fontWeight: 500, color: p.featured ? 'var(--paper)' : 'var(--ink)', position: 'relative', zIndex: 1 }}>{p.title}</h3>
              <div style={{ fontSize: '14px', color: p.featured ? 'rgba(246,245,240,0.6)' : 'var(--muted)', marginBottom: '32px' }}>{p.sub}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '4px', color: p.featured ? 'var(--paper)' : 'var(--ink)', position: 'relative', zIndex: 1 }}>
                {p.price}{p.priceNote && <span style={{ fontSize: '22px', opacity: 0.5 }}>{p.priceNote}</span>}
              </div>
              <div style={{ fontSize: '13px', color: p.featured ? 'rgba(246,245,240,0.6)' : 'var(--muted)', marginBottom: '32px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{p.note}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1, position: 'relative', zIndex: 1 }}>
                {(p.items || []).map((item: string, j: number) => (
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
          <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{d.addons_eyebrow}</div>
          <h2 style={{ maxWidth: '16ch' }}>{d.addons_heading}</h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {(d.addons || []).map((a: any, i: number) => (
            <ScrollReveal key={i} style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
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
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>{d.cta_heading}</h2>
          <Link href="/contact" className="btn btn-primary">{d.cta_button} <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
