/**
 * MySQL seed script - Seeds database with default content
 * Run with: npx tsx scripts/seed-mysql.ts email password "Name"
 */
import { cmsContent, admins, initializeDatabase } from '../lib/db-mysql';
import bcrypt from 'bcryptjs';
import defaultsData from '../data/cms-defaults.json';

// Get command line arguments
const args = process.argv.slice(2);
const email = args[0] || 'admin@digibit.co';
const password = args[1] || 'Admin@123!';
const name = args[2] || 'Admin User';

console.log('🌱 Starting MySQL database setup...\n');

async function seedDatabase() {
  try {
    // Initialize database (creates tables)
    console.log('📊 Initializing database tables...');
    await initializeDatabase();
    console.log('✅ Database tables created\n');

    // Seed CMS content
    console.log('📝 Seeding CMS content...');
    
    await cmsContent.upsert('homepage', defaultsData.homepage, 'seed-script');
    console.log('  ✓ Homepage content');

    await cmsContent.upsert('about', defaultsData.about, 'seed-script');
    console.log('  ✓ About page');

    await cmsContent.upsert('services_index', defaultsData.services_index, 'seed-script');
    console.log('  ✓ Services index page');

    await cmsContent.upsert('work', defaultsData.work, 'seed-script');
    console.log('  ✓ Work index page');

    await cmsContent.upsert('insights', defaultsData.insights, 'seed-script');
    console.log('  ✓ Insights page');

    await cmsContent.upsert('contact', defaultsData.contact, 'seed-script');
    console.log('  ✓ Contact page');

    await cmsContent.upsert('careers', defaultsData.careers, 'seed-script');
    console.log('  ✓ Careers page');

    await cmsContent.upsert('pricing', defaultsData.pricing, 'seed-script');
    console.log('  ✓ Pricing page');

    await cmsContent.upsert('header_footer', defaultsData.header_footer, 'seed-script');
    console.log('  ✓ Header & Footer');

    await cmsContent.upsert('navigation', defaultsData.navigation, 'seed-script');
    console.log('  ✓ Navigation');

    console.log('✅ All CMS content seeded\n');

    // Create admin user
    console.log('👤 Creating admin user...');
    const existingAdmins: any = await admins.getAll();
    
    if (Array.isArray(existingAdmins) && existingAdmins.length > 0) {
      console.log('⚠️  Admin user already exists. Skipping admin creation.');
      console.log(`   Found ${existingAdmins.length} admin(s):`);
      existingAdmins.forEach((admin: any) => {
        console.log(`   - ${admin.email} (${admin.name})`);
      });
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create admin
      await admins.create(email, hashedPassword, name, 'admin');
      
      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Name: ${name}`);
      console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!\n');
    }

    console.log('🎉 MySQL setup complete!\n');
    console.log('Next steps:');
    console.log('1. Visit /admin/login');
    console.log(`2. Login with: ${email}`);
    console.log('3. Change your password in the admin panel\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedDatabase();
