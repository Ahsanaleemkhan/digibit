import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { cmsContent } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact — Digibit',
  description: "Tell us about your brand. We'll reply within 24 hours.",
};

export default async function ContactPage() {
  const pageContent = cmsContent.getByKey('contact');
  const d = pageContent?.content || {
    hero_eyebrow: 'Let\'s start something',
    hero_heading: 'Tell us about your brand.',
    hero_subheading: 'We\'ll reply within 24 hours.',
    email: 'hello@digibit.co',
    phone: '+1 (415) 555-0142',
    offices: [
      { label: 'Lahore HQ', address: '27 Gulberg Ave\nLahore, Pakistan' },
      { label: 'Dubai', address: 'Al Quoz Creative Zone\nDubai, UAE' },
      { label: 'Toronto', address: '312 Adelaide W\nToronto, Canada' }
    ],
    form_services: ['Brand', 'Website', 'Mobile App', 'Paid Media', 'Social', 'SEO', 'Content', 'Not sure yet'],
    success_heading: 'Got it. Thanks.',
    success_message: 'We\'ll read it this afternoon and reply within 24 hours.'
  };

  return (
    <>
      <section className="container" style={{ paddingTop: '140px', position: 'relative' }}>
        <div className="blob cyan big" style={{ top: '-20%', left: '-10%', opacity: 0.3, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1 style={{ marginTop: '18px' }}>
          {d.hero_heading}
          {d.hero_subheading && (
            <>
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--cyan-deep)', fontWeight: 400 }}>{d.hero_subheading}</em>
            </>
          )}
        </h1>
      </section>
      <section className="container">
        <ContactForm 
          email={d.email} 
          phone={d.phone} 
          offices={d.offices} 
          services={d.form_services}
          successHeading={d.success_heading}
          successMessage={d.success_message}
        />
      </section>
    </>
  );
}
