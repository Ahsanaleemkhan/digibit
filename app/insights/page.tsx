import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import type { Metadata } from 'next';
import NewsletterForm from './NewsletterForm';
import { blogPosts, cmsContent } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Insights — Digibit', description: 'What we\'re reading, shipping and arguing about this week.' };

export default async function Insights() {
  // Get CMS content for insights page
  const pageContent = cmsContent.getByKey('insights');
  const d = pageContent?.content || {
    hero_eyebrow: 'Insights & field notes',
    hero_heading: 'What we\'re reading, shipping and arguing about this week.',
    hero_desc: 'No growth hacks, no thought-leader sermons. Just the stuff we send each other in Slack.',
    newsletter_eyebrow: 'The monthly dispatch',
    newsletter_heading: 'The shorter, smarter agency newsletter.',
    newsletter_desc: 'One email a month. Three ideas we\'re thinking about, one thing worth reading, one thing worth watching.'
  };

  // Get all published blog posts
  const allPosts = blogPosts.getAll(true);
  const featuredPost = blogPosts.getFeatured();
  const regularPosts = allPosts.filter(p => !p.featured).slice(0, 6);

  // Extract unique categories for filters
  const allCategories = allPosts.map(p => p.category).filter(Boolean);
  const uniqueCategories = Array.from(new Set(allCategories));
  const categories = ['All', ...uniqueCategories];

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
          {categories.map((cat: string, i: number) => (
            <button key={i} style={{ padding: '8px 16px', borderRadius: 'var(--r-pill)', fontFamily: 'inherit', fontSize: '13px', color: i === 0 ? 'var(--paper)' : 'var(--ink)', border: '1px solid', borderColor: i === 0 ? 'var(--ink)' : 'var(--line)', background: i === 0 ? 'var(--ink)' : 'transparent', cursor: 'pointer' }}>{cat}</button>
          ))}
        </ScrollReveal>

        {featuredPost && (
          <ScrollReveal style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', marginBottom: '100px', alignItems: 'center' }}>
            <Link href={`/insights/${featuredPost.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', background: featuredPost.gradient_bg || 'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)', position: 'relative', overflow: 'hidden' }}>
                {featuredPost.featured_image ? (
                  <img src={featuredPost.featured_image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2), transparent 50%)' }} />
                )}
              </div>
            </Link>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '14px' }}>{featuredPost.tag || `◆ FEATURED · ${featuredPost.category?.toUpperCase()}`}</div>
              <Link href={`/insights/${featuredPost.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{ fontSize: 'clamp(32px,4.5vw,56px)', marginBottom: '20px', maxWidth: '20ch' }}>{featuredPost.title}</h2>
              </Link>
              <p style={{ color: 'rgba(13,18,64,0.72)', fontSize: '17px', lineHeight: 1.55, marginBottom: '24px', maxWidth: '56ch' }}>{featuredPost.excerpt}</p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {featuredPost.author_name?.toUpperCase()} · {featuredPost.read_time}
              </div>
            </div>
          </ScrollReveal>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px' }}>
          {regularPosts.map((post: any, i: number) => (
            <ScrollReveal key={i} style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
              <Link href={`/insights/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', marginBottom: '20px', overflow: 'hidden', background: post.gradient_bg || 'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)' }}>
                  {post.featured_image && (
                    <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '10px' }}>{post.tag || `◇ ${post.category?.toUpperCase()}`}</div>
                <h3 style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1.2, marginBottom: '10px' }}>{post.title}</h3>
                <p style={{ color: 'rgba(13,18,64,0.6)', fontSize: '14px', lineHeight: 1.5 }}>{post.excerpt}</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.06em', marginTop: '12px' }}>
                  {post.author_name?.toUpperCase()} · {post.read_time}
                </div>
              </Link>
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
