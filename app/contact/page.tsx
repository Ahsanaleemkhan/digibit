import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Digibit',
  description: "Tell us about your brand. We'll reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="container" style={{ paddingTop: '140px', position: 'relative' }}>
        <div className="blob cyan big" style={{ top: '-20%', left: '-10%', opacity: 0.3, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />Let&apos;s start something</div>
        <h1 style={{ marginTop: '18px' }}>
          Tell us about your brand.<br />
          We&apos;ll reply within <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>24 hours.</em>
        </h1>
      </section>

      <section className="container">
        <ContactForm />
      </section>
    </>
  );
}
