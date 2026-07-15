'use client';
import { useState } from 'react';
import styles from './ServicesAccordion.module.css';

interface Props {
  eyebrow?: string;
  heading?: string;
  services?: { idx: string; title: string; desc: string }[];
}

export default function ServicesAccordion({ eyebrow = '', heading = '', services = [] }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.svcAcc}>
      <div className="container">
        <div className={styles.svcAccHead}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{eyebrow}</div>
            <h2>{heading}</h2>
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
