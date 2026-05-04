import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Digibit',
};

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', position: 'relative' }}>
      <div className="blob cyan big" style={{ top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.3, position: 'absolute' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '24px' }}>404 · Page not found</div>
        <h1 style={{ fontSize: 'clamp(80px,15vw,200px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: '32px' }}>Oops.</h1>
        <p style={{ color: 'rgba(13,18,64,0.7)', fontSize: '18px', maxWidth: '40ch', margin: '0 auto 32px' }}>The page you&apos;re looking for doesn&apos;t exist — or maybe it&apos;s still in the brief.</p>
        <Link href="/" className="btn btn-primary">Back to home <span className="circle">→</span></Link>
      </div>
    </div>
  );
}
