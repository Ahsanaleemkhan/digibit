/**
 * Seed Work Page CMS Content
 * Creates default content for the work listing page
 */
import { cmsContent } from '../lib/db';

const workPageContent = {
  hero_eyebrow: 'Our work',
  hero_desc: 'From startups to scale-ups, we\'ve helped brands find their voice and build digital products people love.',
  cta_heading: 'Ready to start your project?',
  cta_button: 'Get in touch'
};

function seedWorkPage() {
  console.log('🌱 Seeding work page content...');
  
  // Check if content already exists
  const existing = cmsContent.getByKey('work');
  
  if (existing) {
    console.log('✅ Work page content already exists');
    return;
  }
  
  // Create work page content
  cmsContent.upsert('work', workPageContent, 'system');
  
  console.log('✅ Work page content created successfully');
}

// Run if called directly
if (require.main === module) {
  seedWorkPage();
  console.log('\n✨ Work page seeding complete!\n');
  process.exit(0);
}

export default seedWorkPage;
