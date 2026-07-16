/**
 * Test Services Data
 * Verifies services are in database and accessible
 */
import { services } from '../lib/db';

function testServices() {
  console.log('🧪 Testing services data...\n');
  
  // Get all services
  const allServices = services.getAll();
  console.log(`📋 Total Services: ${allServices.length}`);
  
  const published = allServices.filter(s => s.published);
  console.log(`✅ Published: ${published.length}`);
  console.log(`📝 Drafts: ${allServices.length - published.length}`);
  console.log('');
  
  if (allServices.length === 0) {
    console.log('⚠️  No services found. Run: npx tsx scripts/seed-services.ts');
    return;
  }
  
  // Show published services
  console.log('📑 Published Services:');
  published.forEach((service, index) => {
    console.log(`\n${index + 1}. ${service.title}`);
    console.log(`   Slug: /services/${service.slug}`);
    console.log(`   Icon: ${service.icon}`);
    console.log(`   Order: ${service.homepage_order}`);
    console.log(`   Excerpt: ${service.excerpt?.slice(0, 60)}...`);
  });
  
  console.log('\n✅ Services are ready to use!');
  console.log('\n📍 URLs:');
  console.log('   Homepage services accordion: /');
  console.log('   Services index: /services');
  published.forEach(s => {
    console.log(`   ${s.title}: /services/${s.slug}`);
  });
}

// Run
testServices();
