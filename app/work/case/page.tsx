import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import StatNum from '@/components/StatNum';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ummah Travel — Digibit Case Study',
  description: 'Pilgrimage, reimagined for the phone in your pocket. +212% bookings in the first quarter.',
};

export default function CaseStudy() {
  return (
    <>
      <section className="container">
        <div style={{ padding: '140px 0 60px', position: 'relative' }}>
          <div className="blob cyan med" style={{ top: '-10%', right: '-10%', opacity: 0.3, position: 'absolute' }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '32px' }}>
            <Link href="/work" style={{ color: 'var(--cyan-deep)' }}>← All work</Link>
          </div>
          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[['Client','Ummah Travel'],['Industry','Travel · Pilgrimage'],['Engagement','Brand · Web · Growth'],['Timeline','8 weeks'],['Year','2025']].map(([l,v],i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '6px' }}>{l}</div>
                <div style={{ fontSize: '15px', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
          <h1>Pilgrimage, <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>reimagined</em> for the phone in your pocket.</h1>
          <p style={{ marginTop: '32px', maxWidth: '60ch', fontSize: '20px', lineHeight: 1.5, color: 'rgba(13,18,64,0.78)' }}>Ummah Travel runs Hajj and Umrah trips for thousands of families a year. Their brand looked like a travel agent from 2009 — even though their service was anything but. We rebuilt it end-to-end in eight weeks.</p>
        </div>
        <div style={{ margin: '60px 0', borderRadius: 'var(--r-xl)', overflow: 'hidden', aspectRatio: '16/9', background: 'linear-gradient(135deg,#0a4d3a 0%,#1a8a65 50%,#f4d03f 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15), transparent 60%)' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(60px,12vw,180px)', color: 'var(--paper)', fontWeight: 500, letterSpacing: '-0.04em', zIndex: 1, textAlign: 'center', lineHeight: 0.9 }}>Ummah<br/><em style={{ fontStyle: 'italic', opacity: 0.8, fontWeight: 400 }}>Travel</em></div>
        </div>
      </section>

      <section style={{ padding: '60px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px' }}>
            {[{n:212,s:'%',l:'Bookings, first quarter'},{n:4.2,s:'x',l:'Organic traffic, 90 days'},{n:38,s:'%',l:'Lower cost per acquisition'},{n:8,s:' wks',l:'End-to-end delivery'}].map((s,i) => (
              <div key={i}><StatNum count={s.n} suffix={s.s} /><div className="stat-label">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          {[
            { label: 'The brief', title: 'A serious business hiding behind a dated storefront.', content: <><p style={{fontSize:'17px',lineHeight:1.6,color:'rgba(13,18,64,0.78)',marginBottom:'18px',maxWidth:'60ch'}}>Ummah had the operations, the guides and the packages. What they didn&apos;t have was a brand that matched. Their website was a WordPress template from a decade ago, their photography was stock, and every dollar of paid media was working against a first impression it couldn&apos;t overcome.</p><p style={{fontSize:'17px',lineHeight:1.6,color:'rgba(13,18,64,0.78)',marginBottom:'18px',maxWidth:'60ch'}}>The goal was ambitious: rebuild the identity, ship a new booking platform, and have a full performance-marketing engine running — all before Umrah season opened.</p><blockquote style={{margin:'32px 0',padding:'24px 32px',borderLeft:'3px solid var(--cyan)',fontFamily:'var(--font-display)',fontSize:'22px',lineHeight:1.35,fontStyle:'italic',background:'rgba(43,182,234,0.06)',borderRadius:'0 var(--r-md) var(--r-md) 0'}}>&ldquo;We knew we were better than how we looked. We just needed someone who could see it and ship it at the same time.&rdquo;</blockquote></> },
            { label: 'What we did', title: 'Brand, platform, and the engine to feed it.', content: <ul style={{listStyle:'none',padding:0,margin:0}}>{['Positioning workshop, stakeholder interviews and a customer-segmentation study across six personas.','Full visual identity: wordmark, type system, color palette rooted in desert light, photography direction.','Headless booking platform built on Next.js + Sanity, with calendar-aware package search and installment checkout.','A content system — 40 guide articles, an email welcome series, and a lifecycle retention flow.','Meta + Google paid media launch with creative rotation keyed to each persona and each package.'].map((item,j) => <li key={j} style={{padding:'14px 0',borderTop:'1px solid var(--line)',display:'grid',gridTemplateColumns:'32px 1fr',gap:'16px',fontSize:'15px',color:'rgba(13,18,64,0.8)'}}><span style={{color:'var(--cyan-deep)',fontFamily:'var(--font-mono)'}}>→</span>{item}</li>)}</ul> },
            { label: 'The outcome', title: 'A quarter that redefined the business.', content: <><p style={{fontSize:'17px',lineHeight:1.6,color:'rgba(13,18,64,0.78)',marginBottom:'18px',maxWidth:'60ch'}}>The site launched three days before the Umrah booking window opened. Within the first 90 days, organic traffic had quadrupled, bookings were up 212% year-on-year, and CAC had dropped 38%.</p><blockquote style={{margin:'32px 0',padding:'24px 32px',borderLeft:'3px solid var(--cyan)',fontFamily:'var(--font-display)',fontSize:'22px',lineHeight:1.35,fontStyle:'italic',background:'rgba(43,182,234,0.06)',borderRadius:'0 var(--r-md) var(--r-md) 0'}}>&ldquo;Digibit didn&apos;t just hand us a website — they rebuilt how we think about our brand.&rdquo;</blockquote></> },
          ].map((sec, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', padding: '60px 0', borderTop: i > 0 ? '1px solid var(--line)' : undefined }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{sec.label}</div>
                <h2 style={{ fontSize: 'clamp(32px,4vw,48px)', maxWidth: '14ch' }}>{sec.title}</h2>
              </div>
              <div>{sec.content}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div style={{ padding: '80px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Link href="/work/case" style={{ padding: '32px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', transition: 'all 0.3s', display: 'block' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px' }}>← Previous</div>
            <h4 style={{ fontSize: '24px', fontWeight: 500 }}>Daewoo Battery</h4>
          </Link>
          <Link href="/work/case" style={{ padding: '32px', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', transition: 'all 0.3s', display: 'block', textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Next →</div>
            <h4 style={{ fontSize: '24px', fontWeight: 500 }}>IMC Hospital</h4>
          </Link>
        </div>
      </section>

      <section className="final-cta" style={{ padding: '120px 40px' }}>
        <div className="blob cyan big" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4, position: 'absolute' }} />
        <div className="container-tight" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(40px,5vw,72px)', margin: '0 auto 24px', maxWidth: '16ch' }}>Want a quarter like this?</h2>
          <Link href="/contact" className="btn btn-primary">Start a project <span className="circle">→</span></Link>
        </div>
      </section>
    </>
  );
}
