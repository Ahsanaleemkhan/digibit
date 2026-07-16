import { notFound } from 'next/navigation';
import { services } from '@/lib/db-mysql';
import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await services.getBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} — Digibit`,
    description: service.excerpt || service.lede?.slice(0, 155),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await services.getBySlug(slug);

  if (!service || !service.published) {
    notFound();
  }

  // Build ServicePage props from database service
  return (
    <ServicePage
      crumb={service.title}
      eyebrow={service.eyebrow || 'Service'}
      h1={<>{service.h1_text || service.title}</>}
      lede={service.lede || service.excerpt || ''}
      ctaLabel={service.cta_label || 'Get started'}
      visualWord={<>{service.visual_word || service.title}</>}
      heroImage={service.featured_image || undefined}
      delTitle={service.deliverables_title || 'What you get'}
      deliverables={service.deliverables || []}
      procTitle={service.process_title || 'Our process'}
      process={service.process_steps || []}
      caseTitle={service.case_title || ''}
      caseDesc={service.case_desc || ''}
      caseStats={service.case_stats || []}
      faqs={service.faqs || []}
      ctaBottom={service.cta_bottom || 'Ready to get started?'}
      ctaBottomBtn={service.cta_bottom_btn || 'Start a project'}
    />
  );
}
