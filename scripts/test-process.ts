/**
 * Test Process Steps
 * Verifies process steps are in homepage database
 */
import { db } from '../lib/db';

function testProcess() {
  console.log('🧪 Testing process steps...\n');
  
  const stmt = db.prepare('SELECT content FROM cms_content WHERE page_key = ?');
  const row = stmt.get('homepage') as any;
  
  if (!row) {
    console.log('❌ Homepage data not found');
    return;
  }
  
  const content = JSON.parse(row.content);
  
  console.log('📋 Process Section:');
  console.log(`   Eyebrow: "${content.process_eyebrow || 'Not set'}"`);
  console.log(`   Heading: "${content.process_heading || 'Not set'}"`);
  console.log(`   Steps: ${content.process_steps?.length || 0}\n`);
  
  if (content.process_steps && content.process_steps.length > 0) {
    content.process_steps.forEach((step: any, i: number) => {
      console.log(`${i + 1}. ${step.num}`);
      console.log(`   Title: ${step.title}`);
      console.log(`   Desc: ${step.desc.slice(0, 60)}...`);
      console.log('');
    });
    console.log('✅ Process steps are ready!');
  } else {
    console.log('⚠️  No process steps found. Run: npx tsx scripts/seed-process-steps.ts');
  }
}

// Run
testProcess();
