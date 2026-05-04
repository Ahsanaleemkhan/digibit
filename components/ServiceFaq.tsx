'use client';
import { useState } from 'react';
import type { FaqItem } from './ServicePage';

export default function ServiceFaq({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {faqs.map((f, i) => (
        <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ borderTop: '1px solid var(--line)', padding: '28px 0', cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr 40px', gap: '40px', ...(i === faqs.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
          <div>
            <h4 style={{ fontSize: '22px', fontWeight: 500 }}>{f.q}</h4>
            <div style={{ color: 'rgba(13,18,64,0.7)', fontSize: '15px', lineHeight: 1.55, maxWidth: '70ch', maxHeight: open === i ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.4s, margin-top 0.4s', marginTop: open === i ? '16px' : 0 }}>{f.a}</div>
          </div>
          <div style={{ width: '32px', height: '32px', border: '1px solid var(--line)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', transform: open === i ? 'rotate(45deg)' : 'none', background: open === i ? 'var(--ink)' : 'transparent', color: open === i ? 'var(--paper)' : 'var(--ink)', borderColor: open === i ? 'var(--ink)' : 'var(--line)' }}>+</div>
        </div>
      ))}
    </div>
  );
}
