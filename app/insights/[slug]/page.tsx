import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.getBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} — Digibit Insights`,
    description: post.meta_description || post.excerpt?.slice(0, 155) || '',
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.getBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Increment views
  blogPosts.incrementViews(slug);

  // Get related posts
  const allPosts = blogPosts.getAll(true);
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero container">
        <div className="blob cyan med" style={{ top: '-20%', right: '-10%', opacity: 0.35, position: 'absolute' }} />
        
        <Link href="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '13px', textDecoration: 'none', marginBottom: '32px', transition: 'color 0.2s' }}>
          ← Back to Insights
        </Link>

        <div className="eyebrow" style={{ marginBottom: '20px' }}>
          <span className="dot" />
          {post.tag || post.category?.toUpperCase()}
        </div>
        
        <h1 style={{ fontSize: 'clamp(40px,6vw,72px)', lineHeight: 1.05, maxWidth: '20ch', marginBottom: '32px' }}>
          {post.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--cyan), var(--cyan-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', fontWeight: 700, fontSize: '20px' }}>
              {post.author_name?.[0] || 'D'}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{post.author_name || 'Digibit Team'}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{post.author_role || 'Writer'}</div>
            </div>
          </div>
          <div style={{ height: '32px', width: '1px', background: 'var(--line)' }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)' }}>
            {post.published_date} · {post.read_time} read
          </div>
        </div>

        {post.featured_image && (
          <div style={{ aspectRatio: '21/9', borderRadius: 'var(--r-xl)', overflow: 'hidden', marginBottom: '80px', background: post.gradient_bg || 'var(--ink)' }}>
            <img src={post.featured_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </section>

      {/* Content Section */}
      <section style={{ padding: '0 0 120px' }}>
        <article className="container-tight" style={{ maxWidth: '740px' }}>
          {post.excerpt && (
            <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'rgba(13,18,64,0.8)', fontWeight: 500, marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid var(--line)' }}>
              {post.excerpt}
            </p>
          )}

          {post.content && (
            <div style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(13,18,64,0.85)' }} dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
          )}

          {post.sections && post.sections.length > 0 && post.sections.map((section: any, i: number) => (
            <div key={i} style={{ marginBottom: '48px' }}>
              {section.heading && (
                <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '20px', lineHeight: 1.2 }}>
                  {section.heading}
                </h2>
              )}
              {section.content && (
                <div style={{ fontSize: '17px', lineHeight: 1.7, color: 'rgba(13,18,64,0.85)' }} dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br/>') }} />
              )}
            </div>
          ))}
        </article>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{ padding: '80px 0 120px', background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
          <div className="container">
            <h2 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '48px' }}>Related Insights</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {relatedPosts.map((related: any) => (
                <ScrollReveal key={related.slug}>
                  <Link href={`/insights/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ aspectRatio: '4/3', borderRadius: 'var(--r-lg)', marginBottom: '20px', overflow: 'hidden', background: related.gradient_bg || 'linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)' }}>
                      {related.featured_image && (
                        <img src={related.featured_image} alt={related.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--cyan-deep)', marginBottom: '10px' }}>
                      {related.tag || `◇ ${related.category?.toUpperCase()}`}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 500, lineHeight: 1.2, marginBottom: '8px' }}>{related.title}</h3>
                    <p style={{ color: 'rgba(13,18,64,0.6)', fontSize: '14px', lineHeight: 1.5 }}>{related.excerpt}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
