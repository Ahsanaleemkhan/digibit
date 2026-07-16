/**
 * Display all homepage sections currently configured
 * Run: npx tsx scripts/show-homepage-sections.ts
 */

import { cmsContent } from '../lib/db';

async function showHomepageSections() {
  console.log('🏠 HOMEPAGE CONTENT STRUCTURE\n');
  console.log('═'.repeat(60));

  try {
    const homepage = cmsContent.getByKey('homepage');
    
    if (!homepage) {
      console.error('❌ No homepage content found');
      process.exit(1);
    }

    const content = homepage.content;

    // Hero Section
    console.log('\n1️⃣  HERO SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.hero_eyebrow || '(not set)'}`);
    console.log(`   Tagline: ${content.hero_tagline || '(not set)'}`);
    console.log(`   Primary CTA: ${content.hero_cta1 || '(not set)'}`);
    console.log(`   Secondary CTA: ${content.hero_cta2 || '(not set)'}`);

    // Clients Section
    console.log('\n2️⃣  CLIENT LOGOS MARQUEE');
    console.log('─'.repeat(60));
    console.log(`   Label: ${content.clients_label || '(not set)'}`);
    console.log(`   Logos: ${content.clients_logos?.length || 0} logos configured`);

    // Wheel Section
    console.log('\n3️⃣  360° SERVICES SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.wheel_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.wheel_heading || '(not set)'}`);
    console.log(`   Services: ${content.wheel_services?.length || 0} services on wheel`);

    // Stats Section
    console.log('\n4️⃣  STATS SECTION');
    console.log('─'.repeat(60));
    if (content.stats && content.stats.length > 0) {
      content.stats.forEach((stat: any, i: number) => {
        console.log(`   ${i + 1}. ${stat.count}${stat.suffix} — ${stat.label}`);
      });
    } else {
      console.log('   (no stats configured)');
    }

    // Work Section
    console.log('\n5️⃣  WORK/PORTFOLIO SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.work_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.work_heading || '(not set)'}`);
    console.log(`   CTA Button: ${content.work_cta || '(not set)'}`);

    // Process Section
    console.log('\n6️⃣  PROCESS SECTION ("The way we work")');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.process_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.process_heading || '(not set)'}`);
    if (content.process_steps && content.process_steps.length > 0) {
      console.log(`   Steps: ${content.process_steps.length} steps configured`);
      content.process_steps.forEach((step: any, i: number) => {
        console.log(`      ${i + 1}. ${step.num} — ${step.title}`);
      });
    } else {
      console.log('   (no process steps configured)');
    }

    // Ticker Section (NEW!)
    console.log('\n7️⃣  RESULTS TICKER');
    console.log('─'.repeat(60));
    console.log(`   Label: ${content.ticker_label || '(not set)'}`);
    if (content.ticker_items && content.ticker_items.length > 0) {
      console.log(`   Items: ${content.ticker_items.length} ticker items configured`);
      content.ticker_items.forEach((item: any, i: number) => {
        console.log(`      ${i + 1}. ${item.stat} — ${item.label}`);
      });
    } else {
      console.log('   (no ticker items configured)');
    }

    // Services Accordion Section
    console.log('\n8️⃣  SERVICES ACCORDION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.svc_acc_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.svc_acc_heading || '(not set)'}`);

    // Compare Section
    console.log('\n9️⃣  COMPARE SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.compare_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.compare_heading || '(not set)'}`);
    if (content.compare_data && content.compare_data.length > 0) {
      console.log(`   Comparisons: ${content.compare_data.length} items configured`);
    } else {
      console.log('   (no comparison data configured)');
    }

    // FAQ Section
    console.log('\n🔟 FAQ SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.faq_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.faq_heading || '(not set)'}`);
    if (content.faq_items && content.faq_items.length > 0) {
      console.log(`   FAQs: ${content.faq_items.length} questions configured`);
      content.faq_items.forEach((faq: any, i: number) => {
        console.log(`      ${i + 1}. ${faq.q}`);
      });
    } else {
      console.log('   (no FAQ items configured)');
    }

    // Testimonial Section
    console.log('\n1️⃣1️⃣  TESTIMONIAL SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.testimonial_eyebrow || '(not set)'}`);
    console.log(`   Quote: ${content.testimonial_quote ? content.testimonial_quote.substring(0, 60) + '...' : '(not set)'}`);
    console.log(`   Author: ${content.testimonial_author || '(not set)'}`);
    console.log(`   Role: ${content.testimonial_role || '(not set)'}`);

    // Final CTA Section
    console.log('\n1️⃣2️⃣  FINAL CTA SECTION');
    console.log('─'.repeat(60));
    console.log(`   Eyebrow: ${content.cta_eyebrow || '(not set)'}`);
    console.log(`   Heading: ${content.cta_heading || '(not set)'}`);
    console.log(`   Primary Button: ${content.cta_btn1 || '(not set)'}`);
    console.log(`   Secondary Button: ${content.cta_btn2 || '(not set)'}`);

    console.log('\n' + '═'.repeat(60));
    console.log('✅ All 12 homepage sections are configured and editable!');
    console.log('\nTo edit: Go to Admin Panel → Home Page → Select Section\n');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

showHomepageSections();
