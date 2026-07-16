import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import StatNum from '@/components/StatNum';

type Frame = { label: string; word: string; bg: string; image?: string };
type Section = { eyebrow: string; heading: string; paras?: string[]; quote?: string; items?: string[] };
type Stat = { count: number; suffix: string; label: string };
type Nav = { prev?: { href: string; title: string }; next?: { href: string; title: string } };

interface CaseProps {
  meta: { client: string; industry: string; engagement: string; timeline: string; year: string };
  h1: React.ReactNode;
  lede: string;
  visualBg: string;
  visualWord: React.ReactNode;
  visualImage?: string;  // Optional hero image
  stats: Stat[];
  sections: [Section, Frame, Section, Frame, Section];
  nav: Nav;
  title: string;
  desc: string;
}

export default function CasePage({ meta, h1, lede, visualBg, visualWord, visualImage, stats, sections, nav, title, desc }: CaseProps) {
  const [brief, frame1, what, frame2, outcome] = sections;

  const FrameEl = ({ f }: { f: Frame }) => (
    <div style={{ 
      margin: '48px 0', 
      borderRadius: 'var(--r-lg)', 
      overflow: 'hidden', 
      minHeight: '100vh',
      background: f.image ? `url(${f.image})` : f.bg,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      {/* Dark overlay for better text readability when using images */}
      {f.image && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />}
      <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(246,245,240,0.9)', letterSpacing: '0.1em', padding: '4px 10px', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--r-pill)', zIndex: 1 }}>{f.label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,80px)', color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.03em', textAlign: 'center', padding: '0 40px', zIndex: 1, textShadow: f.image ? '0 2px 8px rgba(0,0,0,0.5)' : 'none' }}>{f.word}</div>
    </div>
  );

  const Sec = ({ s }: { s: Section }) => (
    <ScrollReveal style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', padding: '60px 0', borderTop: '1px solid var(--line)' } as React.CSSProperties}>
      <div>
        <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{s.eyebrow}</div>
        <h2 style={{ fontSize: 'clamp(32px,4vw,48px)', maxWidth: '14ch' }}>{s.heading}</h2>
      </div>
      <div>
        {s.paras?.map((p, i) => <p key={i} style={{ fontSize: '17px', lineHeight: 1.6, color: 'rgba(13,18,64,0.78)', marginBottom: '18px', maxWidth: '60ch' }}>{p}</p>)}
        {s.quote && (
          <blockquote style={{ margin: '32px 0', padding: '24px 32px', borderLeft: '3px solid var(--cyan)', fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1.35, fontStyle: 'italic', color: 'var(--ink)', background: 'rgba(43,182,234,0.06)', borderRadius: '0 var(--r-md) var(--r-md) 0' }}>
            &ldquo;{s.quote}&rdquo;
          </blockquote>
        )}
        {s.items && (
          <ul style={{ padding: 0, listStyle: 'none' }}>
            {s.items.map((item, i) => (
              <li key={i} style={{ padding: '14px 0', borderTop: '1px solid var(--line)', display: 'grid', gridTemplateColumns: '32px 1fr', gap: '16px', fontSize: '15px', color: 'rgba(13,18,64,0.8)' }}>
                <span style={{ color: 'var(--cyan-deep)', fontFamily: 'var(--font-mono)' }}>→</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </ScrollReveal>
  );

  return (
    <>
      {/* Hero */}
      <section className="container" style={{ paddingBottom: 0 }}>
        <div style={{ padding: '140px 0 60px', position: 'relative' }}>
          <div className="blob cyan med" style={{ top: '-10%', right: '-10%', opacity: 0.3, position: 'absolute' }} />
          <Link href="/work" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan-deep)', letterSpacing: '0.1em', display: 'block', marginBottom: '32px', textDecoration: 'none' }}>← All work</Link>
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' as const }}>
            {Object.entries(meta).map(([k, v]) => (
              <div key={k}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase' as const, marginBottom: '6px' }}>{k}</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>{v}</div>
              </div>
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(48px,7vw,96px)', maxWidth: '16ch' }}>{h1}</h1>
          <p style={{ marginTop: '32px', maxWidth: '60ch', fontSize: '20px', lineHeight: 1.5, color: 'rgba(13,18,64,0.78)' }}>{lede}</p>
        </div>
        <div style={{ 
          margin: '60px 0', 
          borderRadius: 'var(--r-xl)', 
          overflow: 'hidden', 
          minHeight: '100vh',
          background: visualImage ? `url(${visualImage})` : visualBg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {/* Dark overlay for images or gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: visualImage ? 'rgba(0,0,0,0.3)' : 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15), transparent 60%)' }} />
          <div style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(60px,12vw,180px)', 
            color: 'var(--paper)', 
            fontWeight: 500, 
            letterSpacing: '-0.04em', 
            zIndex: 1, 
            textAlign: 'center', 
            lineHeight: 0.9,
            textShadow: visualImage ? '0 4px 12px rgba(0,0,0,0.6)' : 'none',
            padding: '0 40px'
          }}>{visualWord}</div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px' }}>
            {stats.map((s, i) => (
              <ScrollReveal key={i}>
                <StatNum count={s.count} suffix={s.suffix} />
                <div className="stat-label">{s.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <Sec s={brief} />
          <FrameEl f={frame1} />
          <Sec s={what} />
          <FrameEl f={frame2} />
          <Sec s={outcome} />
        </div>
      </section>

      {/* Case nav */}
      <section className="container">
        <div style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {nav.prev ? (
            <Link href={nav.prev.href} style={{ padding: '32px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>← Previous</div>
              <h4 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--ink)' }}>{nav.prev.title}</h4>
            </Link>
          ) : <div />}
          {nav.next ? (
            <Link href={nav.next.href} style={{ padding: '32px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', textDecoration: 'none', display: 'block', textAlign: 'right' as const }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: '10px' }}>Next →</div>
              <h4 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--ink)' }}>{nav.next.title}</h4>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="blob cyan big" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, position: 'absolute' }} />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>Want a result like this?</h2>
          <Link href="/contact" className="btn btn-primary">Start a project <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
