/**
 * Quick script to check work items in database
 */
import { workItems } from '../lib/db';

console.log('📋 Checking work items in database...\n');

const allItems = workItems.getAll();
console.log(`Total items: ${allItems.length}\n`);

allItems.forEach((item, index) => {
  console.log(`${index + 1}. ${item.title}`);
  console.log(`   Slug: ${item.slug}`);
  console.log(`   Published: ${item.published ? 'Yes' : 'No'}`);
  console.log(`   Featured Image: ${item.featured_image || '(none)'}`);
  console.log(`   Client: ${item.client}`);
  console.log(`   URL: http://localhost:3000/work/${item.slug}`);
  console.log('');
});

// Test getBySlug
console.log('🔍 Testing getBySlug("ummah-travel")...');
const ummah = workItems.getBySlug('ummah-travel');
if (ummah) {
  console.log('✓ Found:', ummah.title);
  console.log('  Published:', ummah.published);
  console.log('  Featured Image:', ummah.featured_image);
  console.log('  Frame 1 Label:', ummah.frame1_label || '(not set)');
  console.log('  Frame 1 Word:', ummah.frame1_word || '(not set)');
} else {
  console.log('✗ Not found');
}
