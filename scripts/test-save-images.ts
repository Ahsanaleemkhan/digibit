/**
 * Test script to verify image fields are saved
 */
import { workItems } from '../lib/db';

console.log('🧪 Testing image field save...\n');

// Get first work item
const allItems = workItems.getAll();
if (allItems.length === 0) {
  console.log('❌ No work items found');
  process.exit(1);
}

const testItem = allItems[0];
console.log(`Testing with: ${testItem.title}`);
console.log(`ID: ${testItem.id}\n`);

// Update with test image values
const testData = {
  ...testItem,
  visual_image: '/test/visual.jpg',
  frame1_image: '/test/frame1.jpg',
  frame2_image: '/test/frame2.jpg',
  visual_word: 'TEST VISUAL',
  frame1_label: 'TEST FRAME 1',
  frame2_label: 'TEST FRAME 2'
};

console.log('💾 Saving test data...');
workItems.update(testItem.id, testData);

console.log('📖 Reading back from database...');
const updated = workItems.getById(testItem.id);

console.log('\n✅ Verification:');
console.log(`  visual_image: ${updated?.visual_image || '(not set)'}`);
console.log(`  frame1_image: ${updated?.frame1_image || '(not set)'}`);
console.log(`  frame2_image: ${updated?.frame2_image || '(not set)'}`);
console.log(`  visual_word: ${updated?.visual_word || '(not set)'}`);
console.log(`  frame1_label: ${updated?.frame1_label || '(not set)'}`);
console.log(`  frame2_label: ${updated?.frame2_label || '(not set)'}`);

if (updated?.visual_image === '/test/visual.jpg' &&
    updated?.frame1_image === '/test/frame1.jpg' &&
    updated?.frame2_image === '/test/frame2.jpg') {
  console.log('\n✅ SUCCESS: Images are being saved correctly!\n');
} else {
  console.log('\n❌ FAILED: Images not saved correctly\n');
}
