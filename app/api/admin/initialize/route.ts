import { NextRequest, NextResponse } from 'next/server';
import { cmsContent, admins, initializeDatabase } from '@/lib/db';
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
    initializeDatabase();

    // Step 2: Check if already initialized
    const existingAdmins = admins.getAll();
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
      cmsContent.upsert('homepage', defaultsData.homepage, 'initialize');
      results.push('✅ Homepage content seeded');

      cmsContent.upsert('about', defaultsData.about, 'initialize');
      results.push('✅ About page seeded');

      cmsContent.upsert('services_index', defaultsData.services_index, 'initialize');
      results.push('✅ Services index seeded');

      cmsContent.upsert('work', defaultsData.work, 'initialize');
      results.push('✅ Work page seeded');

      cmsContent.upsert('insights', defaultsData.insights, 'initialize');
      results.push('✅ Insights page seeded');

      cmsContent.upsert('contact', defaultsData.contact, 'initialize');
      results.push('✅ Contact page seeded');

      cmsContent.upsert('careers', defaultsData.careers, 'initialize');
      results.push('✅ Careers page seeded');

      cmsContent.upsert('pricing', defaultsData.pricing, 'initialize');
      results.push('✅ Pricing page seeded');

      cmsContent.upsert('header_footer', defaultsData.header_footer, 'initialize');
      results.push('✅ Header & Footer seeded');

      cmsContent.upsert('navigation', defaultsData.navigation, 'initialize');
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
      admins.create(adminEmail, hashedPassword, adminName, 'admin');
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
    const existingAdmins = admins.getAll();
    const hasContent = cmsContent.getByKey('homepage') !== null;
    
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
