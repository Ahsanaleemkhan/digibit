import { NextRequest, NextResponse } from 'next/server';
import { cmsContent, admins, initializeDatabase } from '@/lib/db-mysql';
import bcrypt from 'bcryptjs';
import defaultsData from '@/data/cms-defaults.json';

/**
 * Complete initialization endpoint for Hostinger deployment
 * Seeds all data and creates admin account via web interface
 */
export async function POST(request: NextRequest) {
  const results: string[] = [];

  try {
    // Step 1: Initialize database tables
    results.push('✅ Database tables initialized');
    await initializeDatabase();

    // Step 2: Check if already initialized
    const existingAdmins: any = await admins.getAll();
    if (existingAdmins.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'System already initialized. Admin account exists.',
        results
      }, { status: 400 });
    }

    // Get admin credentials from request
    const body = await request.json();
    const adminEmail = body.adminEmail || 'admin@digibit.co';
    const adminPassword = body.adminPassword || 'Admin@123!';
    const adminName = body.adminName || 'Admin User';

    // Step 3: Seed all CMS content
    try {
      await cmsContent.upsert('homepage', defaultsData.homepage, 'initialize');
      results.push('✅ Homepage content seeded');

      await cmsContent.upsert('about', defaultsData.about, 'initialize');
      results.push('✅ About page seeded');

      await cmsContent.upsert('services_index', defaultsData.services_index, 'initialize');
      results.push('✅ Services index seeded');

      await cmsContent.upsert('work', defaultsData.work, 'initialize');
      results.push('✅ Work page seeded');

      await cmsContent.upsert('insights', defaultsData.insights, 'initialize');
      results.push('✅ Insights page seeded');

      await cmsContent.upsert('contact', defaultsData.contact, 'initialize');
      results.push('✅ Contact page seeded');

      await cmsContent.upsert('careers', defaultsData.careers, 'initialize');
      results.push('✅ Careers page seeded');

      await cmsContent.upsert('pricing', defaultsData.pricing, 'initialize');
      results.push('✅ Pricing page seeded');

      await cmsContent.upsert('header_footer', defaultsData.header_footer, 'initialize');
      results.push('✅ Header & Footer seeded');

      await cmsContent.upsert('navigation', defaultsData.navigation, 'initialize');
      results.push('✅ Navigation seeded');
    } catch (err: any) {
      return NextResponse.json({
        success: false,
        message: 'Failed to seed content: ' + err.message,
        results
      }, { status: 500 });
    }

    // Step 4: Create admin account
    try {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await admins.create(adminEmail, hashedPassword, adminName, 'admin');
      results.push('✅ Admin account created');
    } catch (err: any) {
      return NextResponse.json({
        success: false,
        message: 'Failed to create admin: ' + err.message,
        results
      }, { status: 500 });
    }

    // Success!
    return NextResponse.json({
      success: true,
      message: 'Initialization complete',
      results,
      credentials: {
        email: adminEmail,
        password: adminPassword,
        note: 'Change this password immediately after login'
      }
    });

  } catch (error: any) {
    console.error('Initialization error:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Initialization failed',
      results,
      error: error.toString()
    }, { status: 500 });
  }
}

/**
 * Check initialization status
 */
export async function GET() {
  try {
    const existingAdmins: any = await admins.getAll();
    const hasContent = (await cmsContent.getByKey('homepage')) !== null;

    return NextResponse.json({
      initialized: existingAdmins.length > 0 && hasContent,
      adminCount: existingAdmins.length,
      hasContent
    });
  } catch (error: any) {
    return NextResponse.json({
      initialized: false,
      error: error.message
    }, { status: 500 });
  }
}
