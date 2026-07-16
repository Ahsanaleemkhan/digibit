/**
 * Fix work items that have non-existent image paths
 */
import { workItems } from '../lib/db';

console.log('🔧 Fixing work item image paths...\n');

const allItems = workItems.getAll();

let fixedCount = 0;

allItems.forEach((item) => {
  // Check if featured_image starts with /images/work/ (which doesn't exist)
  if (item.featured_image && item.featured_image.startsWith('/images/work/')) {
    console.log(`Fixing: ${item.title}`);
    console.log(`  Old path: ${item.featured_image}`);
    
    // Remove the invalid image path
    workItems.update(item.id, {
      ...item,
      featured_image: ''
    });
    
    console.log(`  New path: (removed - admin can upload)\n`);
    fixedCount++;
  } else if (item.featured_image) {
    console.log(`✓ ${item.title} - Image OK: ${item.featured_image}`);
  } else {
    console.log(`○ ${item.title} - No image set`);
  }
});

console.log(`\n✅ Fixed ${fixedCount} image path(s)`);
