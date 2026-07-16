/**
 * Seed script for careers page content
 * Run with: npx tsx scripts/seed-careers.ts
 */
import { cmsContent } from '../lib/db';
import defaultsData from '../data/cms-defaults.json';

const careersDefaults = defaultsData.careers;

console.log('🌱 Seeding careers page content...');

try {
  cmsContent.upsert('careers', careersDefaults, 'seed-script');
  console.log('✅ Careers page content seeded successfully');
} catch (err) {
  console.error('❌ Failed to seed careers content:', err);
  process.exit(1);
}
