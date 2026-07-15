'use client';
import { useState } from 'react';
import styles from './FaqSection.module.css';

interface Props {
  eyebrow?: string;
  heading?: string;
  faqs?: { q: string; a: string }[];
}

export default function FaqSection({ eyebrow = '', heading = '', faqs = [] }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.faqSec}>
      <div className="container">
        <div className={styles.faqGrid}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{eyebrow}</div>
            <h2>{heading}</h2>
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
