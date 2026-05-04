import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Digibit',
  description: 'Eight disciplines, one team, one plan. Strategy, design, engineering and media under one studio.',
};

const bentoItems = [
  { href: '/services/brand-strategy', icon: '◆ FLAGSHIP', title: 'Brand & Strategy', desc: 'Positioning, naming, visual identity, messaging — the foundation everything else is built on.', tags: ['POSITIONING', 'NAMING', 'VISUAL IDENTITY', 'MESSAGING'], feature: true, span3: true, tall: true },
  { href: '/services/websites', icon: '◇ WEB', title: 'Websites & Platforms', desc: 'Marketing sites, e-commerce, portals. Designed and coded by the same team, which is why they\'re fast.', tags: ['NEXT.JS', 'WEBFLOW', 'SHOPIFY', 'HEADLESS'], span3: true },
  { href: '/services/mobile', icon: '◇ MOBILE', title: 'Mobile Apps', desc: 'iOS, Android, cross-platform. We build the app, the backend, and the marketing it lives inside.', tags: ['REACT NATIVE', 'SWIFT', 'BACKEND'], cyan: true, span3: true },
  { href: '/services/paid-media', icon: '◇ MEDIA', title: 'Paid Media', desc: 'Meta, Google, TikTok, programmatic.' },
  { href: '/services/social-content', icon: '◇ SOCIAL', title: 'Social & Content', desc: 'Calendars that actually get filled.' },
  { href: '/services/seo', icon: '◇ SEARCH', title: 'SEO', desc: 'Technical + content + links.' },
  { href: '/services/production', icon: '◇ CREATIVE', title: 'Production & Content', desc: 'Photo, video, motion, copy. The fuel line for everything you publish.', tags: ['PHOTOGRAPHY', 'VIDEO', 'MOTION', 'COPYWRITING'], span3: true },
  { href: '/services/analytics', icon: '◇ DATA', title: 'Analytics & CRO', desc: 'GA4, Mixpanel, server-side tagging, experimentation. The feedback loop that turns a site into a compounding asset.', tags: ['GA4', 'MIXPANEL', 'A/B TESTING', 'DASHBOARDS'], span3: true },
];

export default function Services() {
  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />360° Services</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', paddingBottom: '80px' }}>
          <h1>Eight disciplines, <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>one team</em>, one plan.</h1>
          <p style={{ fontSize: '18px', lineHeight: 1.55, color: 'rgba(13,18,64,0.72)', maxWidth: '52ch', alignSelf: 'end' }}>Pick the services you need, or let us build the whole engine. Either way, you&apos;re working with one team that actually talks to itself.</p>
        </div>
      </section>

      <section style={{ padding: '40px 0 140px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridAutoRows: '220px', gap: '20px' }}>
            {bentoItems.map((item, i) => (
              <ScrollReveal key={i} style={{
                gridColumn: item.tall ? 'span 3' : item.span3 ? 'span 3' : 'span 2',
                gridRow: item.tall ? 'span 2' : undefined,
                borderRadius: 'var(--r-lg)',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.4s',
                border: item.feature ? 'none' : item.cyan ? 'none' : '1px solid var(--line-2)',
                background: item.feature ? 'var(--ink)' : item.cyan ? 'var(--cyan)' : 'var(--white)',
              }}>
                <Link href={item.href} style={{ display: 'contents' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: item.feature ? 'var(--cyan)' : 'var(--cyan-deep)', letterSpacing: '0.14em', marginBottom: '12px' }}>{item.icon}</div>
                    <h3 style={{ fontSize: item.tall ? '42px' : '28px', lineHeight: 1.05, marginBottom: '10px', color: item.feature ? 'var(--paper)' : 'var(--ink)', marginTop: item.tall ? '12px' : 0 }}>{item.title}</h3>
                    <p style={{ color: item.feature ? 'rgba(246,245,240,0.7)' : 'rgba(13,18,64,0.65)', fontSize: '14px', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                  {item.tags && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
                      {item.tags.map((t, j) => <span key={j} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '4px 10px', background: item.feature ? 'rgba(246,245,240,0.1)' : 'rgba(13,18,64,0.05)', borderRadius: 'var(--r-pill)', color: item.feature ? 'var(--paper)' : 'var(--ink)', letterSpacing: '0.06em' }}>{t}</span>)}
                    </div>
                  )}
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
              <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Three ways to work</div>
              <h2>However deep you want to go.</h2>
            </ScrollReveal>
            <div>
              {[
                { idx: '01', title: 'Project sprint', desc: 'A defined piece of work with a clear start and end — a rebrand, a website, a campaign launch. Fixed scope, fixed price.' },
                { idx: '02', title: '360° retainer', desc: 'An ongoing partnership where we own the full marketing engine — strategy, creative, media, content and measurement.' },
                { idx: '03', title: 'Embedded pod', desc: 'A Digibit team that sits inside yours. Daily standups, shared tools, shared accountability for the number.' },
              ].map((r, i) => (
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
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}><span className="dot" />Still not sure which fits?</div>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>Tell us what you&apos;re trying to grow.</h2>
          <Link href="/contact" className="btn btn-primary">Book a call <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
