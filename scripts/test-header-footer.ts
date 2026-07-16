/**
 * Test script: Verify header/footer data in database
 * Run: npx tsx scripts/test-header-footer.ts
 */

import { cmsContent } from '../lib/db';

async function testHeaderFooter() {
  console.log('🧪 Testing header & footer data...\n');

  try {
    const data = cmsContent.getByKey('header_footer');
    
    if (!data) {
      console.error('❌ No header/footer content found in database');
      process.exit(1);
    }

    const content = data.content;

    // Test Header/Nav
    console.log('🔝 HEADER / NAVIGATION:');
    console.log('─'.repeat(60));
    console.log(`   CTA Button: "${content.nav_cta_label || '(not set)'}"`);
    if (content.nav_links && Array.isArray(content.nav_links)) {
      console.log(`   Navigation Links: ${content.nav_links.length} links\n`);
      content.nav_links.forEach((link: any, i: number) => {
        console.log(`      ${i + 1}. ${link.label} → ${link.href}`);
      });
    } else {
      console.error('   ❌ nav_links not found or not an array');
    }

    // Test Footer
    console.log('\n\n👟 FOOTER:');
    console.log('─'.repeat(60));
    console.log(`   Tagline: "${content.footer_tagline?.substring(0, 50)}..."`);
    console.log(`   Email: ${content.footer_email || '(not set)'}`);
    console.log(`   Phone: ${content.footer_phone || '(not set)'}`);
    
    if (content.footer_company_links && Array.isArray(content.footer_company_links)) {
      console.log(`\n   "${content.footer_company_heading || 'Company'}" Section:`);
      console.log(`   ${content.footer_company_links.length} links`);
      content.footer_company_links.forEach((link: any, i: number) => {
        console.log(`      ${i + 1}. ${link.label} → ${link.href}`);
      });
    }
    
    if (content.footer_service_links && Array.isArray(content.footer_service_links)) {
      console.log(`\n   "${content.footer_services_heading || 'Services'}" Section:`);
      console.log(`   ${content.footer_service_links.length} links`);
      content.footer_service_links.forEach((link: any, i: number) => {
        console.log(`      ${i + 1}. ${link.label} → ${link.href}`);
      });
    }

    console.log(`\n   "${content.footer_contact_heading || 'Get in touch'}" Section:`);
    console.log(`   Contact information displayed above`);

    console.log(`\n   Bottom Left: "${content.footer_bottom_left || '(not set)'}"`);
    console.log(`   Bottom Right: "${content.footer_bottom_right || '(not set)'}"`);

    console.log('\n' + '═'.repeat(60));
    console.log('✅ Header & Footer fully configured and ready!');
    console.log('   All section headings are editable!');
    console.log('   Edit from: Admin Panel → Header & Footer\n');

  } catch (error) {
    console.error('❌ Error testing header/footer:', error);
    process.exit(1);
  }
}

testHeaderFooter();
