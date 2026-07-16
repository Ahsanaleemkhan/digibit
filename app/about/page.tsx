import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import { getPageData } from '@/lib/graphql';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About — Digibit',
  description: 'We\'re a studio of strategists, designers and engineers building the full 360° for modern brands.',
};

export default async function About() {
  const d = await getPageData('about') as Record<string, any>;

  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1>{d.hero_heading}</h1>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '80px', paddingTop: '60px', borderTop: '1px solid var(--line)' }}>
            <div><div className="eyebrow"><span className="dot" />{d.reason_eyebrow}</div></div>
            <div>
              {(d.reason_paragraphs || []).map((p: string, i: number) => (
                <p key={i} style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(13,18,64,0.8)', marginBottom: i < d.reason_paragraphs.length - 1 ? '20px' : 0 }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '120px 0', borderRadius: 'var(--r-xl)', margin: '0 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '700px', height: '700px', background: 'radial-gradient(circle, var(--cyan), transparent 65%)', opacity: 0.25, filter: 'blur(20px)' }} />
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(246,245,240,0.5)', marginBottom: '18px' }}><span className="dot" />{d.beliefs_eyebrow}</div>
          <h2 style={{ color: 'var(--paper)', maxWidth: '14ch', marginBottom: '60px' }}>{d.beliefs_heading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', position: 'relative', zIndex: 1 }}>
            {(d.beliefs_cards || []).map((v: any, i: number) => (
              <ScrollReveal key={i} style={{ padding: '32px', border: '1px solid rgba(246,245,240,0.12)', borderRadius: 'var(--r-lg)', background: 'rgba(246,245,240,0.03)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: '32px' }}>{v.tag}</div>
                <h4 style={{ color: 'var(--paper)', fontSize: '22px', marginBottom: '12px' }}>{v.title}</h4>
                <p style={{ color: 'rgba(246,245,240,0.65)', fontSize: '14px', lineHeight: 1.55 }}>{v.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '80px', maxWidth: '620px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{d.timeline_eyebrow}</div>
            <h2>{d.timeline_heading}</h2>
          </ScrollReveal>
          <div>
            {(d.timeline_entries || []).map((t: any, i: number) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 2fr', gap: '40px', padding: '28px 0', borderTop: '1px solid var(--line)', alignItems: 'baseline' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--cyan-deep)' }}>{t.year}</div>
                <h4 style={{ fontSize: '24px', fontWeight: 500 }}>{t.title}</h4>
                <p style={{ color: 'rgba(13,18,64,0.7)', fontSize: '15px', lineHeight: 1.5, maxWidth: '54ch' }}>{t.desc}</p>
              </div>
            ))}
          </div>
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
