import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers — Digibit',
  description: 'Come make good work with good people.',
};

const roles = [
  { title: 'Senior Brand Designer', dept: 'DESIGN', loc: 'LAHORE · HYBRID' },
  { title: 'Full-Stack Engineer (Next.js)', dept: 'ENGINEERING', loc: 'REMOTE · GMT±4' },
  { title: 'Paid Media Strategist', dept: 'GROWTH', loc: 'DUBAI · HYBRID' },
  { title: 'Motion Designer', dept: 'DESIGN', loc: 'REMOTE' },
  { title: 'Content Producer', dept: 'CREATIVE', loc: 'LAHORE' },
  { title: 'Account Director', dept: 'CLIENT', loc: 'TORONTO · HYBRID' },
];

const perks = [
  { n: '01 · AUTONOMY', title: 'Own the work, end to end.', desc: 'No account layers between you and the client. You make the call, you ship it.' },
  { n: '02 · CRAFT', title: 'Real time for real depth.', desc: 'We don\'t triple-book people. Two projects max, so the work is actually good.' },
  { n: '03 · FLEX', title: 'Remote-first, 3 hubs.', desc: 'Lahore, Dubai, Toronto. Work from any, travel between, or stay put.' },
  { n: '04 · LEARN', title: '$2k/yr learning budget.', desc: 'Conferences, courses, books. No approval, just receipts.' },
];

const lifeCards = [
  { bg: 'linear-gradient(135deg,#1a1f5c,#2bb6ea)', label: 'Team offsite — Istanbul, 2025' },
  { bg: 'linear-gradient(135deg,#ff8a5b,#c41e3a)', label: 'Friday show-and-tell' },
  { bg: 'linear-gradient(135deg,#2bb6ea,#5a4fff)', label: 'Shipping day — launch wall' },
  { bg: 'linear-gradient(135deg,#a8c5a0,#3d5a3a)', label: 'Content shoot, Skardu' },
  { bg: 'linear-gradient(135deg,#f4b942,#1a1f5c)', label: 'Open studio — Lahore' },
  { bg: 'linear-gradient(135deg,#1a1f5c,#ff8a5b)', label: 'Client workshop — Dubai' },
  { bg: 'linear-gradient(135deg,#5ccdf2,#2a3080)', label: 'Late-night pitch deck' },
  { bg: 'linear-gradient(135deg,#8fb08a,#2bb6ea)', label: 'Toronto summer BBQ' },
];

export default function Careers() {
  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />Careers · We&apos;re hiring</div>
        <h1>Come make <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>good work</em> with good people.</h1>
        <p>We&apos;re a small studio with big ambitions. If you like shipping, care about craft, and want to work on things that make it into the real world — read on.</p>
      </section>

      {/* Why Digibit */}
      <section className="container">
        <div style={{ padding: '60px 0 120px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px' }}>
          <ScrollReveal>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Why Digibit</div>
            <h2 style={{ maxWidth: '14ch', fontSize: 'clamp(32px,4vw,52px)' }}>A studio that treats itself like a product.</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {perks.map((p, i) => (
              <ScrollReveal key={i} style={{ padding: '24px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan-deep)', letterSpacing: '0.14em', marginBottom: '24px' }}>{p.n}</div>
                <h4 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 500 }}>{p.title}</h4>
                <p style={{ color: 'rgba(13,18,64,0.68)', fontSize: '14px', lineHeight: 1.5 }}>{p.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ padding: '100px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '60px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Open roles · 6</div>
            <h2>Roles we&apos;re actively hiring for.</h2>
          </ScrollReveal>
          <div>
            {roles.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 40px', gap: '40px', padding: '28px 0', borderTop: '1px solid var(--line)', alignItems: 'center', cursor: 'pointer', transition: 'padding 0.3s', ...(i === roles.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
                <h4 style={{ fontSize: '22px', fontWeight: 500 }}>{r.title}</h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>{r.dept}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>{r.loc}</div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>→</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '40px', fontSize: '14px', color: 'var(--muted)' }}>
            Don&apos;t see your role? We always read cold notes to <a href="mailto:team@digibit.co" style={{ color: 'var(--cyan-deep)' }}>team@digibit.co</a>.
          </div>
        </div>
      </section>

      {/* Life at Digibit */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '60px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Life at Digibit</div>
            <h2 style={{ maxWidth: '16ch' }}>How the work actually feels.</h2>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
            {lifeCards.map((c, i) => (
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
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>See yourself here?</h2>
          <a href="mailto:team@digibit.co" className="btn btn-primary">Send us a note <span className="circle">→</span></a>
        </div>
      </section>
    </>
  );
}
