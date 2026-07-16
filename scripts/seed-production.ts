/**
 * Production seed script - Seeds database with default content and creates admin user
 * Run with: npx tsx scripts/seed-production.ts
 * 
 * Usage:
 * npx tsx scripts/seed-production.ts admin@example.com password123 "Admin Name"
 */
import { cmsContent, admins, initializeDatabase } from '../lib/db';
import bcrypt from 'bcryptjs';
import defaultsData from '../data/cms-defaults.json';

// Get command line arguments
const args = process.argv.slice(2);
const email = args[0] || 'admin@digibit.co';
const password = args[1] || 'changeme123';
const name = args[2] || 'Admin User';

console.log('🌱 Starting production database setup...\n');

// Initialize database (creates tables)
console.log('📊 Initializing database tables...');
initializeDatabase();
console.log('✅ Database tables created\n');

// Seed CMS content
console.log('📝 Seeding CMS content...');
try {
  // Homepage
  cmsContent.upsert('homepage', defaultsData.homepage, 'seed-script');
  console.log('  ✓ Homepage content');

  // About page
  cmsContent.upsert('about', defaultsData.about, 'seed-script');
  console.log('  ✓ About page');

  // Services index
  cmsContent.upsert('services_index', defaultsData.services_index, 'seed-script');
  console.log('  ✓ Services index page');

  // Work index
  cmsContent.upsert('work', defaultsData.work, 'seed-script');
  console.log('  ✓ Work index page');

  // Insights
  cmsContent.upsert('insights', defaultsData.insights, 'seed-script');
  console.log('  ✓ Insights page');

  // Contact
  cmsContent.upsert('contact', defaultsData.contact, 'seed-script');
  console.log('  ✓ Contact page');

  // Careers
  cmsContent.upsert('careers', defaultsData.careers, 'seed-script');
  console.log('  ✓ Careers page');

  // Pricing
  cmsContent.upsert('pricing', defaultsData.pricing, 'seed-script');
  console.log('  ✓ Pricing page');

  // Header & Footer
  cmsContent.upsert('header_footer', defaultsData.header_footer, 'seed-script');
  console.log('  ✓ Header & Footer');

  console.log('✅ All CMS content seeded\n');
} catch (err) {
  console.error('❌ Failed to seed CMS content:', err);
  process.exit(1);
}

// Create admin user
console.log('👤 Creating admin user...');
try {
  // Check if admin already exists
  const existingAdmins = admins.getAll();
  
  if (existingAdmins.length > 0) {
    console.log('⚠️  Admin user already exists. Skipping admin creation.');
    console.log(`   Found ${existingAdmins.length} admin(s):`);
    existingAdmins.forEach((admin: any) => {
      console.log(`   - ${admin.email} (${admin.name})`);
    });
  } else {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    admins.create(email, hashedPassword, name, 'admin');
    
    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Name: ${name}`);
    console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!\n');
  }
} catch (err) {
  console.error('❌ Failed to create admin user:', err);
  process.exit(1);
}

console.log('🎉 Production setup complete!\n');
console.log('Next steps:');
console.log('1. Visit /admin/login');
console.log(`2. Login with: ${email}`);
console.log('3. Change your password in the admin panel');
console.log('4. Delete or protect the /admin/setup routes\n');
