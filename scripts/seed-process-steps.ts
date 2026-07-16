/**
 * Seed Process Steps to Homepage
 * Adds default "The way we work" process steps to homepage data
 */
import { db } from '../lib/db';

const defaultProcessData = {
  process_eyebrow: 'The way we work',
  process_heading: 'From napkin sketch to measurable growth.',
  process_steps: [
    {
      num: '01 · DISCOVER',
      title: 'Listen and learn',
      desc: "We start with your audience, your metrics, and the truth about what's working — and what isn't."
    },
    {
      num: '02 · DESIGN',
      title: 'Shape the story',
      desc: 'Brand, positioning, experiences. We design the system that your whole marketing engine will run on.'
    },
    {
      num: '03 · BUILD',
      title: 'Ship the work',
      desc: 'Websites, apps, campaigns, content. Built fast, built right, built to be handed over cleanly.'
    },
    {
      num: '04 · GROW',
      title: 'Turn it up',
      desc: 'Paid media, SEO, content cadence and analytics — the engine that compounds over quarters, not weeks.'
    }
  ]
};

function seedProcessSteps() {
  console.log('🌱 Seeding process steps to homepage...\n');
  
  // Get existing homepage data
  const getStmt = db.prepare('SELECT content FROM cms_content WHERE page_key = ?');
  const row = getStmt.get('homepage') as any;
  
  if (!row) {
    console.log('❌ Homepage data not found. Creating new homepage entry...');
    const insertStmt = db.prepare(`
      INSERT INTO cms_content (page_key, content, updated_by, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `);
    insertStmt.run('homepage', JSON.stringify(defaultProcessData), 'system');
    console.log('✅ Created homepage with process steps');
  } else {
    // Update existing homepage data
    const existingContent = JSON.parse(row.content);
    const updatedContent = {
      ...existingContent,
      ...defaultProcessData
    };
    
    const updateStmt = db.prepare(`
      UPDATE cms_content 
      SET content = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE page_key = ?
    `);
    updateStmt.run(JSON.stringify(updatedContent), 'system', 'homepage');
    console.log('✅ Added process steps to existing homepage data');
  }
  
  console.log(`   - Eyebrow: "${defaultProcessData.process_eyebrow}"`);
  console.log(`   - Heading: "${defaultProcessData.process_heading}"`);
  console.log(`   - ${defaultProcessData.process_steps.length} process steps`);
  console.log('\n✨ Process steps seeding complete!\n');
}

// Run if called directly
if (require.main === module) {
  seedProcessSteps();
  process.exit(0);
}

export default seedProcessSteps;
