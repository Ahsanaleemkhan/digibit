/**
 * Seed script: Add remaining homepage sections data
 * Run: npx tsx scripts/seed-remaining-sections.ts
 */

import { cmsContent } from '../lib/db';

async function seedRemainingSections() {
  console.log('📊 Seeding remaining homepage sections...');

  try {
    // Get existing homepage content
    const existing = cmsContent.getByKey('homepage');
    const content = existing?.content || {};

    // Services Accordion Section
    if (!content.svc_acc_eyebrow) {
      content.svc_acc_eyebrow = 'What we do';
    }
    if (!content.svc_acc_heading) {
      content.svc_acc_heading = 'Full-stack services that work together.';
    }

    // Compare Section
    if (!content.compare_eyebrow) {
      content.compare_eyebrow = 'The difference';
    }
    if (!content.compare_heading) {
      content.compare_heading = 'What you get with Digibit vs. a traditional agency';
    }
    if (!content.compare_data) {
      content.compare_data = [
        { label: 'Response time', agency: '2-3 days', digibit: 'Same day' },
        { label: 'Team structure', agency: 'Siloed departments', digibit: 'Integrated squad' },
        { label: 'Reporting', agency: 'Monthly PDFs', digibit: 'Real-time dashboard' },
        { label: 'Pricing model', agency: 'Retainer + project fees', digibit: 'Transparent fixed pricing' }
      ];
    }

    // FAQ Section
    if (!content.faq_eyebrow) {
      content.faq_eyebrow = 'Common questions';
    }
    if (!content.faq_heading) {
      content.faq_heading = 'Got questions? We\'ve got answers.';
    }
    if (!content.faq_items) {
      content.faq_items = [
        { q: 'How long does a typical project take?', a: 'Most projects launch in 6-8 weeks. We work in focused sprints and keep you updated every step.' },
        { q: 'Do you work with startups or just established brands?', a: 'Both! We love working with ambitious teams at any stage — from seed-stage startups to enterprise brands.' },
        { q: 'What\'s included in your monthly retainers?', a: 'Strategy, design, dev, and growth — all under one roof. We tailor each retainer to your goals and adjust as you scale.' },
        { q: 'Can we start with one service and add more later?', a: 'Absolutely. Many clients start with web or brand work, then expand into paid media, SEO, or product development.' }
      ];
    }

    // Testimonial Section
    if (!content.testimonial_eyebrow) {
      content.testimonial_eyebrow = 'Kind words';
    }
    if (!content.testimonial_quote) {
      content.testimonial_quote = 'Digibit didn\'t just hand us a website — they rebuilt how we think about our brand. Bookings are up 212% and we finally sound like ourselves online.';
    }
    if (!content.testimonial_author) {
      content.testimonial_author = 'Amira Qadri';
    }
    if (!content.testimonial_role) {
      content.testimonial_role = 'MARKETING DIR · UMMAH TRAVEL';
    }

    // Final CTA Section
    if (!content.cta_eyebrow) {
      content.cta_eyebrow = 'Let\'s talk';
    }
    if (!content.cta_heading) {
      content.cta_heading = 'Got a brand that deserves to be unmissable?';
    }
    if (!content.cta_btn1) {
      content.cta_btn1 = 'Start a project';
    }
    if (!content.cta_btn2) {
      content.cta_btn2 = 'See pricing';
    }

    // Save back to database
    cmsContent.upsert('homepage', content, 'seed-script');

    console.log('✅ All remaining sections seeded successfully!\n');
    console.log('Sections added:');
    console.log('  1. Services Accordion');
    console.log('  2. Compare Section (4 comparison items)');
    console.log('  3. FAQ Section (4 FAQ items)');
    console.log('  4. Testimonial Section');
    console.log('  5. Final CTA Section\n');
  } catch (error) {
    console.error('❌ Error seeding sections:', error);
    process.exit(1);
  }
}

seedRemainingSections();
