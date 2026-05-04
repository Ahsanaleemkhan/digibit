'use client';
import { useState } from 'react';
import styles from './CompareToggle.module.css';

const data = {
  startup: {
    them: ['Brand story that doesn\'t match the ads','Endless handoffs, endless invoices','No one owns the outcome','You become the integration layer','Campaigns launch a quarter late'],
    us: ['One voice, one system, one team','One retainer, every surface','Shared KPI with the founder','We own the integration','Ship in weeks, not quarters'],
  },
  enterprise: {
    them: ['20 vendors, 20 invoices','Brand guidelines no one follows','Quarterly reviews, zero accountability','Creative bottlenecks by Q2','Paid media disconnected from brand'],
    us: ['One embedded pod, named sponsor','Living system your team actually uses','Daily standups, shared Linear','Unlimited creative within pod capacity','Brand + media running as one engine'],
  },
};

export default function CompareToggle() {
  const [view, setView] = useState<'startup' | 'enterprise'>('startup');
  return (
    <section className={styles.compareSec}>
      <div className="container">
        <div className={styles.compareHead}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '14px' }}><span className="dot" />Why 360°</div>
          <h2>One studio that does it all<br/>vs. <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>five that don&apos;t talk.</em></h2>
          <div className={styles.compareToggle}>
            <button className={view === 'startup' ? styles.active : ''} onClick={() => setView('startup')}>For startups</button>
            <button className={view === 'enterprise' ? styles.active : ''} onClick={() => setView('enterprise')}>For scale-ups</button>
          </div>
        </div>
        <div className={styles.compareVis}>
          <div className={styles.compareCardThem}>
            <h4>◇ 5 AGENCIES</h4>
            <ul>{data[view].them.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
          <div className={styles.compareCardUs}>
            <h4>◆ ONE DIGIBIT</h4>
            <ul>{data[view].us.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
