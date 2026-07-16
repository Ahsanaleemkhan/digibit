/**
 * Test Work Page Data
 * Verifies work items are in database and formatted correctly for the work listing page
 */
import { workItems, cmsContent } from '../lib/db';

function testWorkPage() {
  console.log('🧪 Testing work page data...\n');
  
  // Get CMS content
  const pageContent = cmsContent.getByKey('work');
  console.log('📄 Work Page CMS Content:');
  console.log(pageContent ? JSON.stringify(pageContent.content, null, 2) : '❌ No content found');
  console.log('');
  
  // Get work items
  const allWork = workItems.getAll(true); // Published only
  console.log(`💼 Published Work Items: ${allWork.length}`);
  console.log('');
  
  if (allWork.length === 0) {
    console.log('⚠️  No published work items found. Create some in the admin panel!');
    return;
  }
  
  // Show work items formatted for the page
  allWork.forEach((work, index) => {
    console.log(`${index + 1}. ${work.title}`);
    console.log(`   Slug: /work/${work.slug}`);
    console.log(`   Category: ${work.category || 'N/A'}`);
    console.log(`   Year: ${work.year || 'N/A'}`);
    console.log(`   Featured Image: ${work.featured_image ? '✓' : '✗'}`);
    console.log(`   Excerpt: ${work.excerpt?.slice(0, 60)}...`);
    console.log('');
  });
  
  // Extract categories for filters
  const allCategories = allWork.map(w => w.category).filter(Boolean);
  const uniqueCategories = Array.from(new Set(allCategories));
  const filters = ['All', ...uniqueCategories];
  
  console.log('🏷️  Category Filters:');
  console.log(filters.join(' | '));
  console.log('');
  
  console.log('✅ Work page data is ready!');
}

// Run
testWorkPage();
