import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import StatNum from '@/components/StatNum';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { getPageData } from '@/lib/graphql';

export const metadata: Metadata = {
  title: 'Digibit — 360° Marketing, Design & Development',
  description: 'A full-spectrum agency that designs, builds and grows brands across every surface your customer touches.',
};

export default async function Home() {
  const wp = await getPageData('homepage') as Record<string, any>;
  return (
    <>
      {/* SVG gooey filter */}
      <svg width="0" height="0" style={{position:'absolute'}}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -14" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className="blob cyan big" style={{top:'-10%',left:'-15%'}} />
          <div className="blob navy med" style={{bottom:'-10%',right:'-5%',opacity:0.35}} />
          <div className="blob cyan small" style={{top:'30%',right:'20%',opacity:0.3}} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroTop}>
            <div className="eyebrow"><span className="dot" />{wp.hero_eyebrow || '360° Creative & Marketing Studio · Est. 2018'}</div>
            <p className={styles.heroTagline}>{wp.hero_tagline || "We're a full-spectrum agency that designs, builds and grows brands across every surface your customer touches."}</p>
          </div>
          <div className={styles.wordmarkWrap}>
            <div className={styles.wordmark}>
              digibit
              <span className={styles.wordmarkLiquid} aria-hidden="true">
                <span className={`${styles.drip} ${styles.a}`} />
                <span className={`${styles.drip} ${styles.b}`} />
                <span className={`${styles.drip} ${styles.c}`} />
                <span className={`${styles.drip} ${styles.d}`} />
              </span>
            </div>
          </div>
          <div className={styles.heroSub}>
            <div className={styles.heroSubLeft}>{wp.hero_subleft || '↳ Brand · Web · App · Growth'}</div>
            <div className={styles.heroCta}>
              <Link href="/contact" className="btn btn-primary">{wp.hero_cta1 || "Let's build something"} <span className="circle">→</span></Link>
              <Link href="/work" className="btn btn-ghost">{wp.hero_cta2 || 'See our work'}</Link>
            </div>
            <div className={styles.heroSubRight}>Scroll ↓</div>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className={styles.clients}>
        <div className="container">
          <div className="eyebrow clients-label" style={{justifyContent:'center',marginBottom:'20px'}}><span className="dot"/>{wp.clients_label || 'Trusted by teams building real things'}</div>
          <div className="marquee">
            <div className="marquee-track">
              {[...(wp.clients_names || ['Ummah Travel','Daewoo Battery','IMC Hospital','Skynet','Northwind Retail','Parable Foods']),
                ...(wp.clients_names || ['Ummah Travel','Daewoo Battery','IMC Hospital','Skynet','Northwind Retail','Parable Foods'])].map((name,i) => (
                <span key={i}>{i % 2 === 0 ? name : <><span className="sep" />{name}</>}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE WHEEL */}
      <section className={styles.wheelSection}>
        <div className="blob cyan med" style={{top:'10%',right:'-10%',opacity:0.35,position:'absolute'}} />
        <div className="container">
          <div className={styles.wheelHero}>
            <ScrollReveal className={styles.wheelText}>
              <div className="eyebrow" style={{marginBottom:'20px'}}><span className="dot"/>Everything your brand needs, under one roof</div>
              <h2>A 360° engine — not a collection of freelancers.</h2>
              <p>Strategy, design, engineering and media under one studio. We don&apos;t hand you off between agencies, and nothing gets lost in the gaps between them.</p>
              <Link href="/services" className="btn btn-primary">Explore all services <span className="circle">→</span></Link>
            </ScrollReveal>
            <ScrollReveal className={styles.wheel}>
              <svg viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(13,18,64,0.08)" strokeWidth="1"/>
                <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(13,18,64,0.08)" strokeWidth="1"/>
                <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(13,18,64,0.12)" strokeWidth="1" strokeDasharray="3 4"/>
                <g style={{transformOrigin:'200px 200px',animation:'spin 60s linear infinite'}}>
                  {[
                    {cx:200,cy:40,fill:'#2bb6ea',tx:200,ty:22,anchor:'middle',label:'STRATEGY'},
                    {cx:313,cy:87,fill:'#1a1f5c',tx:325,ty:75,anchor:'start',label:'BRAND'},
                    {cx:360,cy:200,fill:'#2bb6ea',tx:378,ty:204,anchor:'start',label:'WEB'},
                    {cx:313,cy:313,fill:'#1a1f5c',tx:325,ty:325,anchor:'start',label:'MOBILE'},
                    {cx:200,cy:360,fill:'#2bb6ea',tx:200,ty:382,anchor:'middle',label:'PAID MEDIA'},
                    {cx:87,cy:313,fill:'#1a1f5c',tx:75,ty:325,anchor:'end',label:'SOCIAL'},
                    {cx:40,cy:200,fill:'#2bb6ea',tx:22,ty:204,anchor:'end',label:'CONTENT'},
                    {cx:87,cy:87,fill:'#1a1f5c',tx:75,ty:75,anchor:'end',label:'SEO'},
                  ].map((s,i) => (
                    <g key={i}>
                      <circle cx={s.cx} cy={s.cy} r="8" fill={s.fill}/>
                      <text x={s.tx} y={s.ty} textAnchor={s.anchor as 'middle'|'start'|'end'} fontFamily="JetBrains Mono" fontSize="10" fill="#1a1f5c" letterSpacing="1">{s.label}</text>
                    </g>
                  ))}
                </g>
                <g stroke="rgba(13,18,64,0.1)" strokeWidth="1">
                  <line x1="200" y1="100" x2="200" y2="300"/>
                  <line x1="100" y1="200" x2="300" y2="200"/>
                  <line x1="130" y1="130" x2="270" y2="270"/>
                  <line x1="270" y1="130" x2="130" y2="270"/>
                </g>
              </svg>
              <div className={styles.wheelCenter}>360°<small>every surface</small></div>
            </ScrollReveal>
          </div>
        </div>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </section>

      {/* STATS */}
      <section className="section-pad-sm">
        <div className="container">
          <div className={styles.statsStrip}>
            {(wp.stats || []).map((s: any, i: number) => (
              <ScrollReveal key={i}><StatNum count={s.count} suffix={s.suffix} /><div className="stat-label">{s.label}</div></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className={styles.workSection}>
        <div className="container">
          <ScrollReveal className={styles.workHead}>
            <div>
              <div className="eyebrow" style={{marginBottom:'14px'}}><span className="dot"/>Selected work</div>
              <h2>Brands we&apos;ve helped move<br/>from good to unmissable.</h2>
            </div>
            <Link href="/work" className="btn btn-ghost">View all 48 projects →</Link>
          </ScrollReveal>
          <div className={styles.workGrid}>
            {[
              {href:'/work/ummah',   img:'img-ummah',  cat:'Travel · Brand · Web',     title:'Ummah Travel — pilgrimage, reimagined'},
              {href:'/work/daewoo',  img:'img-daewoo', cat:'Industrial · Growth',       title:'Daewoo Battery — charging ahead'},
              {href:'/work/imc',     img:'img-imc',    cat:'Healthcare · Web · App',    title:'IMC Hospital — care, on demand'},
              {href:'/work/skynet',  img:'img-skynet', cat:'Telecom · Paid Media',      title:'Skynet — going national'},
            ].map((c,i) => (
              <ScrollReveal key={i}>
                <Link href={c.href} className={styles.workCard}>
                  <div className={`${styles.img} ${styles[c.img as keyof typeof styles]}`}/>
                  <div className={styles.overlay}/>
                  <div className={styles.arrowTag}>↗</div>
                  <div className={styles.meta}>
                    <div className={styles.cat}>{c.cat}</div>
                    <h3>{c.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <ServicesAccordion eyebrow={wp.svc_acc_eyebrow} heading={wp.svc_acc_heading} services={wp.svc_acc_items} />

      {/* PROCESS */}
      <section className={styles.processSection}>
        <div className="container">
          <ScrollReveal className={styles.processHead}>
            <div className="eyebrow" style={{color:'rgba(246,245,240,0.6)',justifyContent:'center',marginBottom:'14px'}}><span className="dot"/>The way we work</div>
            <h2 style={{color:'var(--paper)'}}>From napkin sketch to<br/>measurable growth.</h2>
          </ScrollReveal>
          <div className={styles.processSteps}>
            {[
              {num:'01 · DISCOVER',title:'Listen and learn',desc:"We start with your audience, your metrics, and the truth about what's working — and what isn't."},
              {num:'02 · DESIGN',title:'Shape the story',desc:'Brand, positioning, experiences. We design the system that your whole marketing engine will run on.'},
              {num:'03 · BUILD',title:'Ship the work',desc:'Websites, apps, campaigns, content. Built fast, built right, built to be handed over cleanly.'},
              {num:'04 · GROW',title:'Turn it up',desc:'Paid media, SEO, content cadence and analytics — the engine that compounds over quarters, not weeks.'},
            ].map((s,i) => (
              <ScrollReveal key={i} className={styles.processStep}>
                <div className={styles.num}>{s.num}</div>
                <h4 style={{color:'var(--paper)'}}>{s.title}</h4>
                <p style={{color:'rgba(246,245,240,0.65)'}}>{s.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className={styles.tickerSection}>
        <div className={styles.tickerLabel}>◆ Results we&apos;ve helped ship · 2024—2026</div>
        <div className={styles.tickerTrack}>
          {['+212%·bookings · Ummah','−42%·CPA · Skynet','4.2×·organic · Ummah','+68%·leads · Daewoo','2.1×·appointments · IMC','+156%·DTC revenue · Northwind','+318%·signups · Kinetic','$1.2M·Y1 · Clara & Co',
            '+212%·bookings · Ummah','−42%·CPA · Skynet','4.2×·organic · Ummah','+68%·leads · Daewoo','2.1×·appointments · IMC','+156%·DTC revenue · Northwind','+318%·signups · Kinetic','$1.2M·Y1 · Clara & Co'].map((item,i) => {
            const [pct,lbl] = item.split('·');
            return <div key={i} className={styles.tickerItem}><span className={styles.pct}>{pct}</span><span className={styles.lbl}>{lbl}</span></div>;
          })}
        </div>
      </section>

      {/* COMPARE */}
      <CompareToggle eyebrow={wp.compare_eyebrow} heading={wp.compare_heading} data={wp.compare_data} />

      {/* FAQ */}
      <FaqSection eyebrow={wp.faq_eyebrow} heading={wp.faq_heading} faqs={wp.faq_items} />

      {/* TESTIMONIAL */}
      <section className={styles.testimonialSection}>
        <div className="blob cyan med" style={{top:'10%',left:'-10%',opacity:0.25,position:'absolute'}} />
        <div className="container">
          <ScrollReveal className={styles.testimonial}>
            <div className="eyebrow" style={{marginBottom:'32px',justifyContent:'center'}}><span className="dot"/>{wp.testimonial_eyebrow || 'Kind words'}</div>
            <p className={styles.testimonialQuote}>
              &ldquo;{wp.testimonial_quote || "Digibit didn't just hand us a website — they rebuilt how we think about our brand. Bookings are up 212% and we finally sound like ourselves online."}&rdquo;
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}/>
              <div style={{textAlign:'left'}}>
                <div className={styles.name}>{wp.testimonial_author || 'Amira Qadri'}</div>
                <div className={styles.role}>{wp.testimonial_role || 'MARKETING DIR · UMMAH TRAVEL'}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="blob cyan big" style={{top:'-30%',left:'50%',transform:'translateX(-50%)',opacity:0.4,position:'absolute'}} />
        <div className="container-tight" style={{position:'relative',zIndex:1}}>
          <div className="eyebrow" style={{justifyContent:'center',marginBottom:'32px'}}><span className="dot"/>{wp.cta_eyebrow || "Let's talk"}</div>
          <h2>{wp.cta_heading || <>Got a brand that deserves<br/>to be <em>unmissable?</em></>}</h2>
          <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
            <Link href="/contact" className="btn btn-primary">{wp.cta_btn1 || 'Start a project'} <span className="circle">→</span></Link>
            <Link href="/pricing" className="btn btn-ghost">{wp.cta_btn2 || 'See pricing'}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ---- Interactive pieces (client components) ----
import ServicesAccordion from './_components/ServicesAccordion';
import CompareToggle from './_components/CompareToggle';
import FaqSection from './_components/FaqSection';
