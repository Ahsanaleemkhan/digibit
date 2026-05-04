import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import NewsletterForm from './NewsletterForm';

export const metadata: Metadata = {
  title: 'Insights — Digibit',
  description: 'What we\'re reading, shipping and arguing about this week.',
};

const posts = [
  { grad: 'linear-gradient(135deg,#ff8a5b,#1a1f5c)', tag: '◇ BRAND', title: 'The "say the real thing" test.', desc: 'A 2-minute exercise to pressure-test any piece of marketing copy before it ships.', by: 'SARA NADEEM · 6 MIN' },
  { grad: 'linear-gradient(135deg,#2bb6ea,#5a4fff)', tag: '◇ ENGINEERING', title: 'Headless is a strategy, not a stack.', desc: 'When going headless pays off, and the expensive mistake we keep seeing teams make.', by: 'BILAL AHMED · 9 MIN' },
  { grad: 'linear-gradient(135deg,#a8c5a0,#1a1f5c)', tag: '◇ DESIGN', title: 'Every pixel is a sentence.', desc: 'On treating interface density as a writing problem, not a layout one.', by: 'OMAR FAROOQ · 5 MIN' },
  { grad: 'linear-gradient(135deg,#1a1f5c,#2bb6ea)', tag: '◇ GROWTH', title: 'The 90-day retainer that outperforms year-long contracts.', desc: 'Why quarterly compounding beats annual lock-in — for the client and the agency.', by: 'ZARA IQBAL · 7 MIN' },
  { grad: 'linear-gradient(135deg,#f4b942,#c41e3a)', tag: '◇ FIELD NOTES', title: 'Three weeks in Mecca with a camera.', desc: 'Field notes from the Ummah Travel content shoot — and what we got wrong on day one.', by: 'MARIAM SHAH · 8 MIN' },
  { grad: 'linear-gradient(135deg,#5ccdf2,#2a3080)', tag: '◇ BRAND', title: 'How to name a thing without hating it later.', desc: 'The four-filter naming framework we use on every engagement.', by: 'HASSAN MALIK · 10 MIN' },
];

export default function Insights() {
  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />Insights &amp; field notes</div>
        <h1>What we&apos;re reading, shipping and<br/>arguing about this week.</h1>
        <p>No growth hacks, no thought-leader sermons. Just the stuff we send each other in Slack, written up so you can read it on the train.</p>
      </section>

      <section className="container" style={{ paddingBottom: '120px' }}>
        {/* Category filter */}
        <ScrollReveal style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {['All', 'Brand', 'Growth', 'Design', 'Engineering', 'Field notes'].map((cat, i) => (
            <button key={i} style={{ padding: '8px 16px', borderRadius: 'var(--r-pill)', fontFamily: 'inherit', fontSize: '13px', color: i === 0 ? 'var(--paper)' : 'var(--ink)', border: '1px solid', borderColor: i === 0 ? 'var(--ink)' : 'var(--line)', background: i === 0 ? 'var(--ink)' : 'transparent', cursor: 'pointer' }}>{cat}</button>
          ))}
        </ScrollReveal>

        {/* Featured */}
        <ScrollReveal style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '100px', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', background: 'linear-gradient(135deg,#1a1f5c 0%,#2bb6ea 100%)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent 50%)' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '14px' }}>◆ FEATURED · GROWTH</div>
            <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', marginBottom: '20px', maxWidth: '20ch' }}>Why your CAC stopped going down (and what to do about it).</h2>
            <p style={{ color: 'rgba(13,18,64,0.72)', fontSize: '17px', lineHeight: 1.55, marginBottom: '24px', maxWidth: '56ch' }}>The honest answer is rarely &ldquo;the algorithm changed.&rdquo; After 47 million in managed media, here&apos;s our working theory on what&apos;s actually breaking — and the three moves we&apos;ve seen work in 2026.</p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.06em' }}>ZARA IQBAL · 12 MIN READ · APR 18, 2026</div>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px' }}>
          {posts.map((p, i) => (
            <ScrollReveal key={i} style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', marginBottom: '20px', overflow: 'hidden', background: p.grad }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '10px' }}>{p.tag}</div>
              <h3 style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1.2, marginBottom: '10px' }}>{p.title}</h3>
              <p style={{ color: 'rgba(13,18,64,0.6)', fontSize: '14px', lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', marginTop: '12px' }}>{p.by}</div>
            </ScrollReveal>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ marginTop: '120px', padding: '80px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 'var(--r-xl)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--cyan), transparent 60%)', opacity: 0.3, filter: 'blur(30px)' }} />
          <div>
            <div className="eyebrow" style={{ color: 'rgba(246,245,240,0.5)', marginBottom: '14px' }}><span className="dot" />The monthly dispatch</div>
            <h2 style={{ color: 'var(--paper)', fontSize: 'clamp(32px,4vw,48px)', maxWidth: '16ch' }}>The shorter, smarter agency newsletter.</h2>
            <p style={{ color: 'rgba(246,245,240,0.7)', marginTop: '16px', maxWidth: '40ch' }}>One email a month. Three ideas we&apos;re thinking about, one thing worth reading, one thing worth watching.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
