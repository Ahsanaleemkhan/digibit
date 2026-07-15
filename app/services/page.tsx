import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import { getPageData } from '@/lib/graphql';

export const metadata: Metadata = { title: 'Services — Digibit', description: 'Eight disciplines, one team, one plan.' };

export default async function Services() {
  const d = await getPageData('services_index') as Record<string, any>;
  const bentoItems = d.bento_items || [];
  const ways = d.ways_items || [];

  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', paddingBottom: '80px' }}>
          <h1>Eight disciplines, <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>one team</em>, one plan.</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(13,18,64,0.72)', maxWidth: '52ch', alignSelf: 'end' }}>{d.hero_desc}</p>
        </div>
      </section>

      <section style={{ padding: '40px 0 140px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridAutoRows: '220px', gap: '20px' }}>
            {bentoItems.map((item: any, i: number) => (
              <ScrollReveal key={i} style={{ gridColumn: item.tall ? 'span 3' : item.span3 ? 'span 3' : 'span 2', gridRow: item.tall ? 'span 2' : undefined, borderRadius: 'var(--r-lg)', padding: '32px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.4s', border: item.feature ? 'none' : item.cyan ? 'none' : '1px solid var(--line-2)', background: item.feature ? 'var(--ink)' : item.cyan ? 'var(--cyan)' : 'var(--white)' }}>
                <Link href={item.href} style={{ display: 'contents' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: item.feature ? 'var(--cyan)' : 'var(--cyan-deep)', letterSpacing: '0.14em', marginBottom: '12px' }}>{item.icon}</div>
                    <h3 style={{ fontSize: item.tall ? '42px' : '28px', lineHeight: 1.05, marginBottom: '10px', color: item.feature ? 'var(--paper)' : 'var(--ink)' }}>{item.title}</h3>
                    <p style={{ color: item.feature ? 'rgba(246,245,240,0.7)' : 'rgba(13,18,64,0.65)', fontSize: '14px', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                  {item.tags && <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>{item.tags.map((t: string, j: number) => <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', background: item.feature ? 'rgba(246,245,240,0.1)' : 'rgba(13,18,64,0.05)', borderRadius: 'var(--r-pill)', color: item.feature ? 'var(--paper)' : 'var(--ink)', letterSpacing: '0.06em' }}>{t}</span>)}</div>}
                  <div style={{ position: 'absolute', top: '24px', right: '24px', width: '36px', height: '36px', borderRadius: '50%', border: item.feature ? '1px solid rgba(246,245,240,0.25)' : '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.feature ? 'var(--paper)' : 'var(--ink)' }}>→</div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px' }}>
            <ScrollReveal>
              <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{d.ways_eyebrow}</div>
              <h2>{d.ways_heading}</h2>
            </ScrollReveal>
            <div>
              {ways.map((r: any, i: number) => (
                <ScrollReveal key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '40px', padding: '28px 0', borderTop: '1px solid var(--line)', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--cyan-deep)' }}>{r.idx}</div>
                  <h4 style={{ fontSize: '22px', fontWeight: 500 }}>{r.title}</h4>
                  <p style={{ color: 'rgba(13,18,64,0.68)', fontSize: '15px', lineHeight: 1.5 }}>{r.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta" style={{ padding: '120px 40px' }}>
        <div className="blob cyan big" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, position: 'absolute' }} />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}><span className="dot" />{d.cta_eyebrow}</div>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>{d.cta_heading}</h2>
          <Link href="/contact" className="btn btn-primary">{d.cta_button} <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
