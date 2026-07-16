'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './ServicesAccordion.module.css';

interface Props {
  eyebrow?: string;
  heading?: string;
  services?: { id: string; slug: string; title: string; excerpt: string; homepage_order: number }[];
}

export default function ServicesAccordion({ eyebrow = '', heading = '', services = [] }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  
  // Sort by homepage_order
  const sortedServices = [...services].sort((a, b) => a.homepage_order - b.homepage_order);
  
  return (
    <section className={styles.svcAcc}>
      <div className="container">
        <div className={styles.svcAccHead}>
          <div>
            <div className="eyebrow" style={{ marginBottom: '14px' }}><span className="dot" />{eyebrow}</div>
            <h2>{heading}</h2>
          </div>
          <Link href="/services" className="btn btn-ghost">All services →</Link>
        </div>
        <div className={styles.svcList}>
          {sortedServices.map((s, i) => (
            <Link 
              key={s.id} 
              href={`/services/${s.slug}`}
              className={`${styles.svcItem}${open === i ? ' ' + styles.open : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setOpen(open === i ? null : i);
                // Navigate after a short delay to show animation
                if (open !== i) {
                  setTimeout(() => {
                    window.location.href = `/services/${s.slug}`;
                  }, 300);
                }
              }}
            >
              <div className={styles.idx}>{String(i + 1).padStart(2, '0')}</div>
              <h3>{s.title}</h3>
              <div className={styles.descCol}><div className={styles.desc}>{s.excerpt}</div></div>
              <div className={styles.plus}>{open === i ? '→' : '+'}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
