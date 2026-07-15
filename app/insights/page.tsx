import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import NewsletterForm from './NewsletterForm';
import { getPageData } from '@/lib/graphql';

export const metadata: Metadata = { title: 'Insights — Digibit', description: 'What we\'re reading, shipping and arguing about this week.' };

export default async function Insights() {
  const d = await getPageData('insights') as Record<string, any>;
  const posts = d.posts || [];
  const cats = d.categories || [];

  return (
    <>
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        <div className="eyebrow"><span className="dot" />{d.hero_eyebrow}</div>
        <h1>{d.hero_heading}</h1>
        <p>{d.hero_desc}</p>
      </section>

      <section className="container" style={{ paddingBottom: '120px' }}>
        <ScrollReveal style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {cats.map((cat: string, i: number) => (
            <button key={i} style={{ padding: '8px 16px', borderRadius: 'var(--r-pill)', fontFamily: 'inherit', fontSize: '13px', color: i === 0 ? 'var(--paper)' : 'var(--ink)', border: '1px solid', borderColor: i === 0 ? 'var(--ink)' : 'var(--line)', background: i === 0 ? 'var(--ink)' : 'transparent', cursor: 'pointer' }}>{cat}</button>
          ))}
        </ScrollReveal>

        <ScrollReveal style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '100px', alignItems: 'center' }}>
          <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', background: d.featured_grad, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent 50%)' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '14px' }}>{d.featured_tag}</div>
            <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', marginBottom: '20px', maxWidth: '20ch' }}>{d.featured_title}</h2>
            <p style={{ color: 'rgba(13,18,64,0.72)', fontSize: '17px', lineHeight: 1.55, marginBottom: '24px', maxWidth: '56ch' }}>{d.featured_desc}</p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.06em' }}>{d.featured_author}</div>
          </div>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px' }}>
          {posts.map((p: any, i: number) => (
            <ScrollReveal key={i} style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', marginBottom: '20px', overflow: 'hidden', background: p.grad }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '10px' }}>{p.tag}</div>
              <h3 style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1.2, marginBottom: '10px' }}>{p.title}</h3>
              <p style={{ color: 'rgba(13,18,64,0.6)', fontSize: '14px', lineHeight: 1.5 }}>{p.desc}</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', marginTop: '12px' }}>{p.by}</div>
            </ScrollReveal>
          ))}
        </div>

        <div style={{ marginTop: '120px', padding: '80px', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 'var(--r-xl)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--cyan), transparent 60%)', opacity: 0.3, filter: 'blur(30px)' }} />
          <div>
            <div className="eyebrow" style={{ color: 'rgba(246,245,240,0.5)', marginBottom: '14px' }}><span className="dot" />{d.newsletter_eyebrow}</div>
            <h2 style={{ color: 'var(--paper)', fontSize: 'clamp(32px,4vw,48px)', maxWidth: '16ch' }}>{d.newsletter_heading}</h2>
            <p style={{ color: 'rgba(246,245,240,0.7)', marginTop: '16px', maxWidth: '40ch' }}>{d.newsletter_desc}</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
