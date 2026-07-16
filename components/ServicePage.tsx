import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import StatNum from '@/components/StatNum';
import ServiceFaq from '@/components/ServiceFaq';

export interface Deliverable { num: string; title: string; desc: string; }
export interface ProcessStep { num: string; title: string; desc: string; dur: string; }
export interface CaseStat { count: number; suffix: string; label: string; }
export interface FaqItem { q: string; a: string; }

export interface ServicePageProps {
  crumb: string;
  eyebrow: string;
  h1: React.ReactNode;
  lede: string;
  ctaLabel: string;
  visualWord: React.ReactNode;
  heroImage?: string;  // Optional hero image
  delTitle: string;
  deliverables: Deliverable[];
  procTitle: string;
  process: ProcessStep[];
  caseTitle: string;
  caseDesc: string;
  caseStats: CaseStat[];
  faqs: FaqItem[];
  ctaBottom: string;
  ctaBottomBtn: string;
}

export default function ServicePage(p: ServicePageProps) {
  return (
    <>
      {/* Hero */}
      <section className="container">
        <div style={{ padding: '140px 0 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', position: 'relative' }}>
          <div className="blob cyan big" style={{ top: '-10%', left: '-20%', opacity: 0.3, position: 'absolute' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '28px' }}>
              <Link href="/services" style={{ color: 'var(--cyan-deep)' }}>Services</Link> / {p.crumb}
            </div>
            <div className="eyebrow"><span className="dot" />{p.eyebrow}</div>
            <h1 style={{ fontSize: 'clamp(48px,7vw,96px)', maxWidth: '14ch', marginTop: '18px' }}>{p.h1}</h1>
            <p style={{ marginTop: '32px', maxWidth: '52ch', color: 'rgba(13,18,64,0.72)', fontSize: '18px', lineHeight: 1.55 }}>{p.lede}</p>
            <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
              <Link href="/contact" className="btn btn-primary">{p.ctaLabel} <span className="circle">→</span></Link>
              <a href="#process" className="btn btn-ghost">See the process</a>
            </div>
          </div>
          <div style={{ 
            background: p.heroImage ? `url(${p.heroImage})` : 'var(--ink)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 'var(--r-xl)', 
            aspectRatio: '4/5', 
            position: 'relative', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {!p.heroImage && <div style={{ position: 'absolute', top: '-30%', left: '-20%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--cyan), transparent 60%)', opacity: 0.5, filter: 'blur(10px)' }} />}
            {p.heroImage && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />}
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(60px,10vw,140px)', 
              color: 'var(--paper)', 
              fontWeight: 500, 
              letterSpacing: '-0.04em', 
              lineHeight: 0.9, 
              textAlign: 'center', 
              position: 'relative', 
              zIndex: 1,
              textShadow: p.heroImage ? '0 4px 12px rgba(0,0,0,0.6)' : 'none'
            }}>{p.visualWord}</div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="container" style={{ padding: '120px 0' }}>
        <ScrollReveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />What you get</div>
            <h2 style={{ maxWidth: '16ch' }}>{p.delTitle}</h2>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {p.deliverables.map((d, i) => (
            <ScrollReveal key={i} style={{ padding: '28px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', transition: 'all 0.3s' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan-deep)', letterSpacing: '0.14em', marginBottom: '32px' }}>{d.num}</div>
              <h4 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>{d.title}</h4>
              <p style={{ color: 'rgba(13,18,64,0.68)', fontSize: '14px', lineHeight: 1.5 }}>{d.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" style={{ padding: '100px 0', background: 'var(--paper-2)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '60px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Timeline</div>
            <h2 style={{ maxWidth: '16ch' }}>{p.procTitle}</h2>
          </ScrollReveal>
          <div>
            {p.process.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 2fr 160px', gap: '40px', padding: '32px 0', borderTop: '1px solid var(--line)', alignItems: 'baseline', ...(i === p.process.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--cyan-deep)' }}>{s.num}</div>
                <h4 style={{ fontSize: '24px', fontWeight: 500 }}>{s.title}</h4>
                <p style={{ color: 'rgba(13,18,64,0.7)', fontSize: '15px', lineHeight: 1.5 }}>{s.desc}</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textAlign: 'right', letterSpacing: '0.08em' }}>{s.dur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Preview */}
      <section className="container" style={{ padding: '120px 0' }}>
        <ScrollReveal style={{ background: 'var(--ink)', borderRadius: 'var(--r-xl)', padding: '60px', color: 'var(--paper)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--cyan), transparent 65%)', opacity: 0.3, filter: 'blur(30px)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="eyebrow" style={{ color: 'rgba(246,245,240,0.6)' }}><span className="dot" />Case in point</div>
            <h3 style={{ color: 'var(--paper)', fontSize: '44px', margin: '18px 0 24px', maxWidth: '16ch' }}>{p.caseTitle}</h3>
            <p style={{ color: 'rgba(246,245,240,0.7)', fontSize: '16px', lineHeight: 1.55, maxWidth: '48ch' }}>{p.caseDesc}</p>
            <Link href="/work/case" className="btn btn-cyan" style={{ marginTop: '28px' }}>Read the case <span className="circle" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>→</span></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignSelf: 'center', position: 'relative', zIndex: 1 }}>
            {p.caseStats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,5vw,72px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--paper)' }}>
                  <StatNum count={s.count} suffix={s.suffix} color="var(--paper)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(246,245,240,0.5)', marginTop: '8px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ */}
      <section className="container" style={{ padding: '0 0 120px' }}>
        <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />The usual questions</div>
        <h2 style={{ maxWidth: '16ch', marginBottom: '60px' }}>Things founders ask us first.</h2>
        <ServiceFaq faqs={p.faqs} />
      </section>

      {/* Final CTA */}
      <section className="final-cta" style={{ padding: '120px 40px' }}>
        <div className="blob cyan big" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, position: 'absolute' }} />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>{p.ctaBottom}</h2>
          <Link href="/contact" className="btn btn-primary">{p.ctaBottomBtn} <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
