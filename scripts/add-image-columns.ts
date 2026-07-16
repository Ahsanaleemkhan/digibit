/**
 * Migration: Add image columns to work_items table
 */
import db from '../lib/db';

console.log('🔧 Adding image columns to work_items table...\n');

const columns = [
  'timeline TEXT',
  'h1_text TEXT',
  'lede TEXT',
  'visual_bg TEXT',
  'visual_word TEXT',
  'visual_image TEXT',
  'frame1_label TEXT',
  'frame1_word TEXT',
  'frame1_bg TEXT',
  'frame1_image TEXT',
  'frame2_label TEXT',
  'frame2_word TEXT',
  'frame2_bg TEXT',
  'frame2_image TEXT',
  'brief_heading TEXT',
  'brief_paras TEXT',
  'what_heading TEXT',
  'what_paras TEXT',
  'outcome_heading TEXT',
  'outcome_paras TEXT'
];

let addedCount = 0;
let existsCount = 0;

for (const column of columns) {
  const columnName = column.split(' ')[0];
  
  try {
    db.exec(`ALTER TABLE work_items ADD COLUMN ${column}`);
    console.log(`✓ Added column: ${columnName}`);
    addedCount++;
  } catch (error: any) {
    if (error.message.includes('duplicate column name')) {
      console.log(`○ Column already exists: ${columnName}`);
      existsCount++;
    } else {
      console.error(`✗ Failed to add ${columnName}:`, error.message);
    }
  }
}

console.log(`\n✅ Migration complete!`);
console.log(`   • ${addedCount} columns added`);
console.log(`   • ${existsCount} columns already existed\n`);
