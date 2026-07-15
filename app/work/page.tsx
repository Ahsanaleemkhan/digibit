import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import { getPageData } from '@/lib/graphql';

export const metadata: Metadata = { title: 'Work — Digibit', description: 'Eight years. One hundred and eighty shipped projects.' };

export default async function Work() {
  const d = await getPageData('work') as Record<string, any>;
  const works = d.works || [];
  const filters = d.filters || [];

  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1>Eight years. One hundred and eighty <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>shipped</em> projects.</h1>
        <p>{d.hero_desc}</p>
      </section>

      <section className="container" style={{ paddingBottom: '140px' }}>
        <ScrollReveal style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {filters.map((f: string, i: number) => (
            <button key={i} style={{ padding: '10px 18px', borderRadius: 'var(--r-pill)', fontFamily: 'inherit', fontSize: '13px', color: i === 0 ? 'var(--paper)' : 'var(--ink)', border: '1px solid', borderColor: i === 0 ? 'var(--ink)' : 'var(--line)', background: i === 0 ? 'var(--ink)' : 'transparent', cursor: 'pointer' }}>{f}</button>
          ))}
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {works.map((w: any, i: number) => (
            <ScrollReveal key={i} style={{ gridColumn: w.big ? 'span 2' : undefined }}>
              <Link href={w.href} style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative', aspectRatio: w.big ? '21/9' : '5/4', cursor: 'pointer', background: 'var(--ink-2)', display: 'block' }}>
                <div style={{ position: 'absolute', inset: 0, background: w.img }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 30%,rgba(13,18,64,0.85) 100%)' }} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.14em', background: 'rgba(13,18,64,0.5)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: 'var(--r-pill)' }}>{w.year}</div>
                <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '80px', color: 'var(--paper)', zIndex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', opacity: 0.8, marginBottom: '8px' }}>{w.cat}</div>
                  <h3 style={{ color: 'var(--paper)', fontSize: w.big ? '48px' : '30px', fontWeight: 500, maxWidth: '20ch' }}>{w.title}</h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan-2)', marginTop: '12px', letterSpacing: '0.06em' }}>{w.stat}</div>
                </div>
              </Link>
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
