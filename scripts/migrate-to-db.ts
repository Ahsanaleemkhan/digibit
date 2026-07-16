/**
 * Migration script to move data from JSON files to SQLite database
 * Run with: npx tsx scripts/migrate-to-db.ts
 */
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { db, cmsContent, admins, submissions, themeSettings } from '../lib/db';

const DATA_DIR = path.join(process.cwd(), 'data');

async function migrate() {
  console.log('🚀 Starting migration from JSON to SQLite...\n');

  // 1. Migrate CMS content
  console.log('📄 Migrating CMS content...');
  const cmsDefaultsPath = path.join(DATA_DIR, 'cms-defaults.json');
  if (fs.existsSync(cmsDefaultsPath)) {
    const cmsDefaults = JSON.parse(fs.readFileSync(cmsDefaultsPath, 'utf-8'));
    
    for (const [pageKey, content] of Object.entries(cmsDefaults)) {
      cmsContent.upsert(pageKey, content, 'migration');
      console.log(`  ✓ Migrated ${pageKey}`);
    }
  }

  // 2. Migrate admins
  console.log('\n👤 Migrating admins...');
  const adminsPath = path.join(DATA_DIR, 'admins.json');
  if (fs.existsSync(adminsPath)) {
    const adminsData = JSON.parse(fs.readFileSync(adminsPath, 'utf-8'));
    
    for (const admin of adminsData) {
      try {
        // Check if password is already hashed
        const passwordHash = admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$')
          ? admin.password
          : await bcrypt.hash(admin.password, 10);
        
        admins.create(admin.email, passwordHash, admin.name, admin.role || 'admin');
        console.log(`  ✓ Migrated admin: ${admin.email}`);
      } catch (error: any) {
        if (error.message.includes('UNIQUE constraint')) {
          console.log(`  ⊘ Admin already exists: ${admin.email}`);
        } else {
          console.error(`  ✗ Failed to migrate admin ${admin.email}:`, error.message);
        }
      }
    }
  }

  // 3. Migrate submissions
  console.log('\n📧 Migrating submissions...');
  const submissionsPath = path.join(DATA_DIR, 'submissions.json');
  if (fs.existsSync(submissionsPath)) {
    const submissionsData = JSON.parse(fs.readFileSync(submissionsPath, 'utf-8'));
    
    for (const submission of submissionsData) {
      try {
        submissions.create(submission);
        console.log(`  ✓ Migrated submission: ${submission.email || submission.name || 'Unknown'}`);
      } catch (error: any) {
        console.error(`  ✗ Failed to migrate submission:`, error.message);
      }
    }
  }

  // 4. Migrate theme settings
  console.log('\n🎨 Migrating theme settings...');
  const themePath = path.join(DATA_DIR, 'theme.json');
  if (fs.existsSync(themePath)) {
    const themeData = JSON.parse(fs.readFileSync(themePath, 'utf-8'));
    
    for (const [key, value] of Object.entries(themeData)) {
      themeSettings.set(key, value);
      console.log(`  ✓ Migrated theme setting: ${key}`);
    }
  }

  console.log('\n✅ Migration completed successfully!');
  console.log('\n📊 Database statistics:');
  
  const stats = {
    cms_pages: db.prepare('SELECT COUNT(*) as count FROM cms_content').get() as any,
    admins: db.prepare('SELECT COUNT(*) as count FROM admins').get() as any,
    submissions: db.prepare('SELECT COUNT(*) as count FROM submissions').get() as any,
    theme_settings: db.prepare('SELECT COUNT(*) as count FROM theme_settings').get() as any,
  };
  
  console.log(`  • CMS pages: ${stats.cms_pages.count}`);
  console.log(`  • Admins: ${stats.admins.count}`);
  console.log(`  • Submissions: ${stats.submissions.count}`);
  console.log(`  • Theme settings: ${stats.theme_settings.count}`);
  
  console.log('\n💡 Next steps:');
  console.log('  1. Test the admin panel: npm run dev');
  console.log('  2. Backup the database: cp data/digibit.db data/digibit.db.backup');
  console.log('  3. Consider removing JSON files once you verify everything works');
  
  db.close();
}

migrate().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
