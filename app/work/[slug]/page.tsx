import { notFound } from 'next/navigation';
import { workItems } from '@/lib/db-mysql';
import type { Metadata } from 'next';
import CasePage from '@/components/CasePage';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = await workItems.getBySlug(slug);
  
  if (!work) {
    return {
      title: 'Work Not Found',
    };
  }

  return {
    title: `${work.title} — Digibit`,
    description: work.excerpt || work.challenge?.slice(0, 155),
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = await workItems.getBySlug(slug);

  if (!work || !work.published) {
    notFound();
  }

  // Get next and previous work items for navigation
  const allWork = await workItems.getAll(true);
  const currentIndex = allWork.findIndex((w: any) => w.slug === slug);
  const prevWork = currentIndex > 0 ? allWork[currentIndex - 1] : null;
  const nextWork = currentIndex < allWork.length - 1 ? allWork[currentIndex + 1] : null;

  // Parse results into stats format (extract numbers and format)
  const stats = work.results.slice(0, 4).map((result: string) => {
    // Try to extract number and suffix from result string like "+212% increase in bookings"
    const match = result.match(/^([+−-]?\d+\.?\d*)\s*([%xMK+×]|wks?|countries)?/i);
    if (match) {
      const count = parseFloat(match[1].replace(/[+−-]/g, ''));
      const suffix = match[2] || '';
      return {
        count,
        suffix,
        label: result.replace(/^[+−-]?\d+\.?\d*\s*[%xMK+×]?\s*/i, '')
      };
    }
    // Fallback if no number found
    return { count: 0, suffix: '', label: result };
  });

  // Build CasePage props from database work item
  return (
    <CasePage
      title={work.title}
      desc={work.excerpt}
      meta={{
        client: work.client || 'Client',
        industry: work.category || 'Industry',
        engagement: work.services.slice(0, 3).join(' · ') || 'Services',
        timeline: work.timeline || '8 weeks',
        year: work.year || '2024'
      }}
      h1={<>{work.h1_text || work.title}</>}
      lede={work.lede || work.excerpt}
      visualBg={work.visual_bg || "linear-gradient(135deg, #1a1f5c 0%, #2bb6ea 100%)"}
      visualWord={<>{work.visual_word || work.client}</>}
      visualImage={work.visual_image}
      stats={stats}
      sections={[
        // Brief section
        {
          eyebrow: 'The brief',
          heading: work.brief_heading || 'The Challenge',
          paras: work.challenge ? [work.challenge] : [],
          quote: work.testimonial_quote
        },
        // Frame 1
        {
          label: work.frame1_label || 'VISUAL — BRAND',
          word: work.frame1_word || work.title.split('—')[0].trim(),
          bg: work.frame1_bg || 'linear-gradient(135deg, #0a4d3a 0%, #1a8a65 100%)',
          image: work.frame1_image
        },
        // What we did section
        {
          eyebrow: 'What we did',
          heading: work.what_heading || 'Our Solution',
          paras: work.solution ? [work.solution] : [],
          items: work.services
        },
        // Frame 2
        {
          label: work.frame2_label || 'PLATFORM — EXPERIENCE',
          word: work.frame2_word || 'Results',
          bg: work.frame2_bg || 'linear-gradient(135deg, #f4d03f 0%, #e8a93f 100%)',
          image: work.frame2_image
        },
        // Outcome section
        {
          eyebrow: 'The outcome',
          heading: work.outcome_heading || 'Impact & Results',
          paras: work.results.length > 0 ? [`The results speak for themselves: ${work.results.join(', ')}.`] : [],
          quote: work.testimonial_author ? `— ${work.testimonial_author}${work.testimonial_role ? ', ' + work.testimonial_role : ''}` : undefined
        }
      ]}
      nav={{
        prev: prevWork ? { href: `/work/${prevWork.slug}`, title: prevWork.title } : undefined,
        next: nextWork ? { href: `/work/${nextWork.slug}`, title: nextWork.title } : undefined
      }}
    />
  );
}
