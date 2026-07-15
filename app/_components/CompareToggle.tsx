'use client';
import { useState } from 'react';
import styles from './CompareToggle.module.css';

interface CompareData {
  startup: { them: string[]; us: string[] };
  enterprise: { them: string[]; us: string[] };
}

interface Props {
  eyebrow?: string;
  heading?: string;
  data?: CompareData;
}

const empty: CompareData = { startup: { them: [], us: [] }, enterprise: { them: [], us: [] } };

export default function CompareToggle({ eyebrow = '', heading = '', data }: Props) {
  const [view, setView] = useState<'startup' | 'enterprise'>('startup');
  const d = data ?? empty;
  return (
    <section className={styles.compareSec}>
      <div className="container">
        <div className={styles.compareHead}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}><span className="dot" />{eyebrow}</div>
          <h2>{heading}</h2>
          <div className={styles.compareToggle}>
            <button className={view === 'startup' ? styles.active : ''} onClick={() => setView('startup')}>For startups</button>
            <button className={view === 'enterprise' ? styles.active : ''} onClick={() => setView('enterprise')}>For scale-ups</button>
          </div>
        </div>
        <div className={styles.compareVis}>
          <div className={styles.compareCardThem}>
            <h4>◇ 5 AGENCIES</h4>
            <ul>{d[view].them.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
          <div className={styles.compareCardUs}>
            <h4>◆ ONE DIGIBIT</h4>
            <ul>{d[view].us.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
