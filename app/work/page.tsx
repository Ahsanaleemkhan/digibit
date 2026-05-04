import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work — Digibit',
  description: 'Eight years. One hundred and eighty shipped projects.',
};

const works = [
  { href: '/work/ummah',    img: 'linear-gradient(135deg,#0a4d3a 0%,#1a8a65 50%,#f4d03f 100%)', cat: 'TRAVEL · BRAND + WEB + GROWTH', title: 'Ummah Travel — pilgrimage, reimagined.', stat: '+212% bookings · 4.2× organic · 38% lower CAC', year: '2025', big: true },
  { href: '/work/daewoo',   img: 'linear-gradient(135deg,#7a1020 0%,#c41e3a 60%,#f4b942 100%)', cat: 'INDUSTRIAL · WEB + MEDIA', title: 'Daewoo Battery', stat: '+68% qualified leads', year: '2025' },
  { href: '/work/imc',      img: 'linear-gradient(135deg,#0a3f7a 0%,#1e7bc4 60%,#e8f0fa 100%)', cat: 'HEALTHCARE · WEB + APP', title: 'IMC Hospital', stat: '2.1× appointment volume', year: '2024' },
  { href: '/work/skynet',   img: 'linear-gradient(135deg,#1a1f5c 0%,#2bb6ea 100%)', cat: 'TELECOM · PAID MEDIA', title: 'Skynet — going national', stat: '−42% CPA at 3× spend', year: '2024' },
  { href: '/work/northwind',img: 'linear-gradient(135deg,#2d1810 0%,#8b4513 60%,#d4a373 100%)', cat: 'RETAIL · BRAND + E-COMM', title: 'Northwind Provisions', stat: '+156% DTC revenue', year: '2024' },
  { href: '/work/parable',  img: 'linear-gradient(135deg,#3d5a3a 0%,#8fb08a 60%,#f0e8d5 100%)', cat: 'FOOD · BRAND + PACKAGING', title: 'Parable Foods', stat: 'Launched into 14 countries', year: '2023' },
  { href: '/work/kinetic',  img: 'linear-gradient(135deg,#1a1a2e 0%,#5a4fff 60%,#ff6b9d 100%)', cat: 'SAAS · WEB + CONTENT', title: 'Kinetic Labs', stat: '+318% organic signups', year: '2023' },
  { href: '/work/clara',    img: 'linear-gradient(135deg,#faf4e7 0%,#e8c4a0 60%,#b07856 100%)', cat: 'BEAUTY · DTC LAUNCH', title: 'Clara & Co', stat: '$1.2M first-year revenue', year: '2022' },
];

export default function Work() {
  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />Selected work · 2018—2026</div>
        <h1>Eight years. One hundred and eighty <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>shipped</em> projects.</h1>
        <p>Below is a curated slice. If you want the full tour — including the weird, ambitious and still-under-NDA ones — ask and we&apos;ll walk you through it.</p>
      </section>

      <section className="container" style={{ paddingBottom: '140px' }}>
        <ScrollReveal style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {['All', 'Brand', 'Web', 'App', 'Paid Media', 'Healthcare', 'E-commerce', 'Travel'].map((f, i) => (
            <button key={i} style={{ padding: '10px 18px', borderRadius: 'var(--r-pill)', fontFamily: 'inherit', fontSize: '13px', color: 'var(--ink)', border: '1px solid var(--line)', background: i === 0 ? 'var(--ink)' : 'transparent', cursor: 'pointer', ...(i === 0 ? { color: 'var(--paper)', borderColor: 'var(--ink)' } : {}) }}>{f}</button>
          ))}
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {works.map((w, i) => (
            <ScrollReveal key={i} style={{ gridColumn: w.big ? 'span 2' : undefined }}>
              <Link href={w.href} style={{
                borderRadius: 'var(--r-lg)', overflow: 'hidden', position: 'relative',
                aspectRatio: w.big ? '21/9' : '5/4', cursor: 'pointer', transition: 'all 0.4s',
                background: 'var(--ink-2)', display: 'block'
              }}>
                <div style={{ position: 'absolute', inset: 0, background: w.img, transition: 'transform 0.6s' }} />
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
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>Could your brand be <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>next?</em></h2>
          <Link href="/contact" className="btn btn-primary">Start a project <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
