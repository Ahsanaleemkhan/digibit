'use client';
import { useState } from 'react';
import styles from './FaqSection.module.css';

const faqs = [
  { q: 'How quickly can you start?', a: 'Usually 2–3 weeks from signed SOW. Discovery calls happen in the first 48 hours.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes — we have a "Lite" brand sprint tailored for pre-Series A companies that still need a serious foundation.' },
  { q: 'Where are you based?', a: 'Three offices: Lahore HQ, Dubai, and Toronto. We work with clients in 12 countries remote-first.' },
  { q: 'Do you do one-off projects or only retainers?', a: 'Both. Project sprints start at $18k. Retainers start at $24k/mo. More on our pricing page.' },
  { q: 'What industries do you specialize in?', a: 'Travel, healthcare, e-commerce, SaaS and industrial B2B — but our 360° model works anywhere brand meets performance.' },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.faqSec}>
      <div className="container">
        <div className={styles.faqGrid}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />Questions</div>
            <h2>Things founders ask us first.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((f, i) => (
              <div key={i} className={`${styles.faqQ}${open === i ? ' ' + styles.open : ''}`} onClick={() => setOpen(open === i ? null : i)}>
                <div>
                  <h4>{f.q}</h4>
                  <div className={styles.a}>{f.a}</div>
                </div>
                <div className={styles.ico}>{open === i ? '×' : '+'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
