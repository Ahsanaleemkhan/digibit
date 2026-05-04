'use client';

export default function NewsletterForm() {
  return (
    <form
      style={{ display: 'flex', gap: '8px', position: 'relative', zIndex: 1 }}
      onSubmit={(e) => { e.preventDefault(); alert('Thanks! You\'re subscribed.'); }}
    >
      <input
        type="email"
        placeholder="you@company.com"
        required
        style={{
          flex: 1, padding: '16px 20px',
          background: 'rgba(246,245,240,0.08)',
          border: '1px solid rgba(246,245,240,0.15)',
          borderRadius: 'var(--r-pill)',
          color: 'var(--paper)', fontFamily: 'inherit', fontSize: '15px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '16px 24px', background: 'var(--cyan)', color: 'var(--ink)',
          borderRadius: 'var(--r-pill)', fontWeight: 500, fontFamily: 'inherit',
          border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
