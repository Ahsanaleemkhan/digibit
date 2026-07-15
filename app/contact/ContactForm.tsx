'use client';
import { useState } from 'react';

const iStyle: React.CSSProperties = {
  width: '100%', padding: '16px 18px', background: 'var(--paper)', border: '1px solid var(--line)',
  borderRadius: 'var(--r-md)', fontFamily: 'inherit', fontSize: '16px', color: 'var(--ink)',
  transition: 'all 0.2s', boxSizing: 'border-box',
};
const lStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)',
  letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px',
};

interface ContactFormProps {
  email?: string;
  phone?: string;
  offices?: { label: string; address: string }[];
  services?: string[];
}

export default function ContactForm({ email: emailAddr = '', phone: phoneNum = '', offices: officeList = [], services: svcList = [] }: ContactFormProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('< $25k');
  const [timeline, setTimeline] = useState('ASAP');
  const [message, setMessage] = useState('');

  const toggle = (s: string) =>
    setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, services: selected, budget, timeline, message }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px' }}>
        <div>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', fontSize: '36px', marginBottom: '24px' }}>✓</div>
          <h2 style={{ fontSize: '36px', marginBottom: '12px' }}>Got it. Thanks.</h2>
          <p style={{ color: 'rgba(13,18,64,0.7)', maxWidth: '40ch', margin: '0 auto' }}>We&apos;ll read it this afternoon and reply within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '80px', padding: '40px 0 120px', alignItems: 'start' }}>
      <aside style={{ position: 'sticky', top: '120px' }}>
        {[
          { label: 'Email', val: <a href={`mailto:${emailAddr}`}>{emailAddr}</a> },
          { label: 'Phone', val: <a href={`tel:${phoneNum.replace(/[^+\d]/g,'')}`}>{phoneNum}</a> },
          ...officeList.map(o => ({ label: o.label, val: <>{o.address.split('\n').map((line, li) => <span key={li}>{li > 0 && <br />}{line}</span>)}</> })),
        ].map((item, i, arr) => (
          <div key={i} style={{ padding: '24px 0', borderTop: '1px solid var(--line)', ...(i === arr.length - 1 ? { borderBottom: '1px solid var(--line)' } : {}) }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.14em', marginBottom: '8px', textTransform: 'uppercase' as const }}>{item.label}</div>
            <div style={{ fontSize: '18px', color: 'var(--ink)', fontWeight: 500 }}>{item.val}</div>
          </div>
        ))}
      </aside>

      <form onSubmit={handleSubmit} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 'var(--r-xl)', padding: '48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(43,182,234,0.25), transparent 60%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

        <div style={{ marginBottom: '28px' }}>
          <label style={lStyle}>Your name</label>
          <input type="text" required placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} style={iStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          <div>
            <label style={lStyle}>Email</label>
            <input type="email" required placeholder="jane@company.com" value={email} onChange={e => setEmail(e.target.value)} style={iStyle} />
          </div>
          <div>
            <label style={lStyle}>Company</label>
            <input type="text" placeholder="Company Inc." value={company} onChange={e => setCompany(e.target.value)} style={iStyle} />
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={lStyle}>What do you need help with?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px' }}>
            {svcList.map(s => (
              <div key={s} onClick={() => toggle(s)} style={{ padding: '10px 14px', border: '1px solid', borderColor: selected.includes(s) ? 'var(--ink)' : 'var(--line)', borderRadius: 'var(--r-pill)', fontSize: '13px', cursor: 'pointer', userSelect: 'none' as const, background: selected.includes(s) ? 'var(--ink)' : 'transparent', color: selected.includes(s) ? 'var(--paper)' : 'var(--ink)', transition: 'all 0.2s' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          <div>
            <label style={lStyle}>Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={iStyle}>
              <option>{'< $25k'}</option><option>$25k – $75k</option><option>$75k – $250k</option><option>$250k+</option><option>Ongoing retainer</option>
            </select>
          </div>
          <div>
            <label style={lStyle}>Timeline</label>
            <select value={timeline} onChange={e => setTimeline(e.target.value)} style={iStyle}>
              <option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={lStyle}>Tell us a little more</label>
          <textarea placeholder="The shape of the problem, who you're for, what success looks like..." value={message} onChange={e => setMessage(e.target.value)} style={{ ...iStyle, resize: 'vertical' as const, minHeight: '120px' }} />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Sending…' : <><span>Send it over</span> <span className="circle">→</span></>}
        </button>
      </form>
    </div>
  );
}
