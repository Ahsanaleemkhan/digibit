'use client';
import { useState } from 'react';
import styles from './ServicesAccordion.module.css';

const services = [
  { idx: '01', title: 'Brand & Strategy', desc: 'Positioning, naming, visual identity, messaging — the foundation every other marketing dollar leans on.' },
  { idx: '02', title: 'Websites & Platforms', desc: 'Marketing sites, e-commerce, portals. Designed and coded by the same team — which is why they\'re fast.' },
  { idx: '03', title: 'Mobile Apps', desc: 'iOS, Android, cross-platform. We build the app, the backend, and the marketing it lives inside.' },
  { idx: '04', title: 'Paid Media & Performance', desc: 'Meta, Google, TikTok, programmatic. Creative rotation tied to personas and packages, not to whoever shouted loudest in the last meeting.' },
  { idx: '05', title: 'Social & Content', desc: 'Calendars that actually get filled. Photo, video, motion and copy — produced in-house so it doesn\'t bottleneck.' },
  { idx: '06', title: 'Analytics & CRO', desc: 'GA4, Mixpanel, server-side tagging, experimentation. The feedback loop that turns a site into a compounding asset.' },
];

export default function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.svcAcc}>
      <div className="container">
        <div className={styles.svcAccHead}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />What we do, in detail</div>
            <h2>Click any service to open it.</h2>
          </div>
          <a href="/services" className="btn btn-ghost">All services →</a>
        </div>
        <div className={styles.svcList}>
          {services.map((s, i) => (
            <div key={i} className={`${styles.svcItem}${open === i ? ' ' + styles.open : ''}`} onClick={() => setOpen(open === i ? null : i)}>
              <div className={styles.idx}>{s.idx}</div>
              <h3>{s.title}</h3>
              <div className={styles.descCol}><div className={styles.desc}>{s.desc}</div></div>
              <div className={styles.plus}>{open === i ? '×' : '+'}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
