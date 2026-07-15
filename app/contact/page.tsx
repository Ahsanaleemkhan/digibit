import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { getPageData } from '@/lib/graphql';

export const metadata: Metadata = {
  title: 'Contact — Digibit',
  description: "Tell us about your brand. We'll reply within 24 hours.",
};

export default async function ContactPage() {
  const d = await getPageData('contact') as Record<string, any>;

  return (
    <>
      <section className="container" style={{ paddingTop: '140px', position: 'relative' }}>
        <div className="blob cyan big" style={{ top: '-20%', left: '-10%', opacity: 0.3, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1 style={{ marginTop: '18px' }}>
          Tell us about your brand.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>We&apos;ll reply within 24 hours.</em>
        </h1>
      </section>
      <section className="container">
        <ContactForm email={d.email} phone={d.phone} offices={d.offices} services={d.form_services} />
      </section>
    </>
  );
}
