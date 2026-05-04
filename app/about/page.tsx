import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Digibit',
  description: 'We\'re a studio of strategists, designers and engineers building the full 360° for modern brands.',
};

const team = [
  { name: 'Hassan Malik', role: 'FOUNDER / STRATEGY', g: 'g1' },
  { name: 'Sara Nadeem', role: 'CREATIVE DIRECTOR', g: 'g2' },
  { name: 'Bilal Ahmed', role: 'HEAD OF ENGINEERING', g: 'g3' },
  { name: 'Zara Iqbal', role: 'GROWTH LEAD', g: 'g4' },
  { name: 'Omar Farooq', role: 'DESIGN LEAD', g: 'g5' },
  { name: 'Mariam Shah', role: 'CONTENT LEAD', g: 'g6' },
  { name: 'Faizan Khan', role: 'SR. DEVELOPER', g: 'g7' },
  { name: 'Ayesha Raza', role: 'ACCOUNT DIRECTOR', g: 'g8' },
];

const timeline = [
  { year: '2018', title: 'Three desks, one idea', desc: 'Digibit starts in a co-working space in Lahore, with three founders and a shared frustration: agencies that could design but not build, or build but not grow.' },
  { year: '2020', title: 'We meet the pandemic', desc: 'We go remote-first, double the team, and ship our first 7-figure e-commerce platform. Retention becomes our obsession.' },
  { year: '2022', title: 'Dubai office opens', desc: 'Expansion to MENA. Ummah Travel becomes a flagship client. We start managing paid media at scale for the first time.' },
  { year: '2024', title: 'The Toronto pod', desc: 'North American clients come onboard. We formalize our 360° model: one retainer, every surface.' },
  { year: '2026', title: 'Today', desc: '24 people, 3 cities, 180+ projects shipped, and a very clear idea of what we want to be when we grow up: the one partner a founder actually trusts.' },
];

const gradients: Record<string, string> = {
  g1: 'linear-gradient(135deg, #2bb6ea 0%, #1a1f5c 100%)',
  g2: 'linear-gradient(135deg, #ff8a5b 0%, #1a1f5c 100%)',
  g3: 'linear-gradient(135deg, #a8c5a0 0%, #2bb6ea 100%)',
  g4: 'linear-gradient(135deg, #1a1f5c 0%, #5ccdf2 100%)',
  g5: 'linear-gradient(135deg, #5a4fff 0%, #2bb6ea 100%)',
  g6: 'linear-gradient(135deg, #f4b942 0%, #1a1f5c 100%)',
  g7: 'linear-gradient(135deg, #2bb6ea 0%, #5a4fff 100%)',
  g8: 'linear-gradient(135deg, #1a1f5c 0%, #ff8a5b 100%)',
};

export default function About() {
  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />About Digibit</div>
        <h1>We&apos;re a studio of <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>strategists, designers and engineers</em> building the full 360° for modern brands.</h1>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '80px', paddingTop: '60px', borderTop: '1px solid var(--line)' }}>
            <div><div className="eyebrow"><span className="dot" />Our reason</div></div>
            <div>
              <p style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(13,18,64,0.8)', marginBottom: '20px' }}>Most agencies hand you off. Brand studio does brand, a separate team builds the site, another runs your ads, and nobody talks to each other. You end up being the integration layer.</p>
              <p style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(13,18,64,0.8)', marginBottom: '20px' }}>Digibit was built to be the integration layer for you. One team, one system, one plan — across strategy, design, engineering and media. So the thing we ship in Q1 still shows up in the ad you run in Q4.</p>
              <p style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(13,18,64,0.8)' }}>We&apos;re 24 people across Lahore, Dubai and Toronto. We take on fewer projects than we&apos;re asked to, and we stick around long after launch.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '120px 0', borderRadius: 'var(--r-xl)', margin: '0 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ content: '""', position: 'absolute', top: '-30%', right: '-20%', width: '700px', height: '700px', background: 'radial-gradient(circle, var(--cyan), transparent 65%)', opacity: 0.25, filter: 'blur(20px)' }} />
        <div className="container">
          <div className="eyebrow" style={{ color: 'rgba(246,245,240,0.5)', marginBottom: '18px' }}><span className="dot" />How we show up</div>
          <h2 style={{ color: 'var(--paper)', maxWidth: '14ch', marginBottom: '60px' }}>Four beliefs we bring to every project.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px', position: 'relative', zIndex: 1 }}>
            {[
              { tag: '01 · CRAFT', title: 'Taste is a feature.', desc: 'Every pixel, sentence and ad unit is a chance to be better or worse than average. We choose better, even when nobody\'s looking.' },
              { tag: '02 · CLARITY', title: 'Say the real thing.', desc: 'Jargon is a tax. We write and design for the human on the other end — the one with a phone, a deadline, and better things to do.' },
              { tag: '03 · SHIP', title: 'Momentum beats polish.', desc: 'A live v1 outperforms a beautiful v3 that never launches. We optimize for getting real, then getting better in public.' },
            ].map((v, i) => (
              <ScrollReveal key={i} style={{ padding: '32px', border: '1px solid rgba(246,245,240,0.12)', borderRadius: 'var(--r-lg)', background: 'rgba(246,245,240,0.03)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan)', marginBottom: '32px' }}>{v.tag}</div>
                <h4 style={{ color: 'var(--paper)', fontSize: '22px', marginBottom: '12px' }}>{v.title}</h4>
                <p style={{ color: 'rgba(246,245,240,0.65)', fontSize: '14px', lineHeight: 1.55 }}>{v.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '140px 0' }}>
        <div className="container">
          <ScrollReveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />The people</div>
              <h2>A team that actually<br/>does the work.</h2>
            </div>
            <Link href="/careers" className="btn btn-ghost">We&apos;re hiring →</Link>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
            {team.map((t, i) => (
              <ScrollReveal key={i} style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden', aspectRatio: '4/5', position: 'relative', background: 'var(--ink-2)' }}>
                <div style={{ position: 'absolute', inset: 0, background: gradients[t.g] }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)', padding: '14px 16px', borderRadius: 'var(--r-md)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>{t.name}</h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em', marginTop: '4px' }}>{t.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '80px', maxWidth: '620px' }}>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />A short history</div>
            <h2>Eight years of building, in public.</h2>
          </ScrollReveal>
          <div>
            {timeline.map((t, i) => (
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
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>Want to see if we&apos;re the right team for your next thing?</h2>
          <Link href="/contact" className="btn btn-primary">Say hello <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
