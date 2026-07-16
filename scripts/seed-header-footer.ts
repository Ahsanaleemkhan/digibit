/**
 * Seed script: Add header and footer data
 * Run: npx tsx scripts/seed-header-footer.ts
 */

import { cmsContent } from '../lib/db';

async function seedHeaderFooter() {
  console.log('🎯 Seeding header & footer data...');

  try {
    const content = {
      // Header/Nav
      nav_links: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/work', label: 'Work' },
        { href: '/insights', label: 'Insights' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/careers', label: 'Careers' }
      ],
      nav_cta_label: 'Start a project',
      
      // Footer
      footer_tagline: 'The full 360° agency. We build brands, websites, apps, and the marketing engines that feed them.',
      footer_email: 'hello@digibit.co',
      footer_phone: '+1 (415) 555-0142',
      footer_company_heading: 'Company',
      footer_company_links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Our work', href: '/work' },
        { label: 'Insights', href: '/insights' }
      ],
      footer_services_heading: 'Services',
      footer_service_links: [
        { label: 'Brand & Strategy', href: '/services/brand-strategy' },
        { label: 'Websites & Apps', href: '/services/websites' },
        { label: 'Paid Media', href: '/services/paid-media' },
        { label: 'Social & Content', href: '/services/social-content' }
      ],
      footer_contact_heading: 'Get in touch',
      footer_bottom_left: '© 2026 Digibit Studio. All rights reserved.',
      footer_bottom_right: 'Made with care. Powered by curiosity.'
    };

    // Save to database
    cmsContent.upsert('header_footer', content, 'seed-script');

    console.log('✅ Header & Footer data seeded successfully!\n');
    console.log('Header:');
    console.log(`  - Nav Links: ${content.nav_links.length} links`);
    console.log(`  - CTA Button: "${content.nav_cta_label}"`);
    console.log('\nFooter:');
    console.log(`  - Tagline: "${content.footer_tagline.substring(0, 50)}..."`);
    console.log(`  - Email: ${content.footer_email}`);
    console.log(`  - Phone: ${content.footer_phone}`);
    console.log(`  - Company Links: ${content.footer_company_links.length} links`);
    console.log(`  - Service Links: ${content.footer_service_links.length} links\n`);
  } catch (error) {
    console.error('❌ Error seeding header/footer:', error);
    process.exit(1);
  }
}

seedHeaderFooter();
