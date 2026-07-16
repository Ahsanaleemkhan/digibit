import { NextRequest, NextResponse } from 'next/server';
import { cmsContent, admins, initializeDatabase } from '@/lib/db-mysql';
import bcrypt from 'bcryptjs';
import defaultsData from '@/data/cms-defaults.json';
import { auth } from '@/lib/auth';

/**
 * Initialization endpoint.
 * - Default POST: full first-time init (create tables, seed CMS, create admin). Blocked once an admin exists.
 * - POST ?refresh=cms: re-seed ALL cms_content pages from data/cms-defaults.json,
 *   overwriting existing rows via upsert. Requires an active admin session.
 * - GET: report initialization status (public).
 */

async function seedAllCms(updatedBy: string): Promise<{ seeded: string[]; failed: string[] }> {
  const seeded: string[] = [];
  const failed: string[] = [];
  for (const [key, value] of Object.entries(defaultsData)) {
    try {
      await cmsContent.upsert(key, value, updatedBy);
      seeded.push(key);
    } catch (err: any) {
      failed.push(`${key}: ${err?.message || String(err)}`);
    }
  }
  return { seeded, failed };
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const refresh = url.searchParams.get('refresh');

  // Refresh-only path: overwrite CMS content, do not touch admin.
  if (refresh === 'cms') {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      await initializeDatabase();
      const { seeded, failed } = await seedAllCms(session.user?.email || 'refresh');
      return NextResponse.json({
        success: failed.length === 0,
        mode: 'refresh-cms',
        seeded,
        failed: failed.length > 0 ? failed : undefined,
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error?.message || 'Refresh failed' },
        { status: 500 }
      );
    }
  }

  // Default: first-time setup.
  const results: string[] = [];
  try {
    await initializeDatabase();
    results.push('✅ Database tables initialized');

    const existingAdmins: any = await admins.getAll();
    if (existingAdmins.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'System already initialized. Admin account exists.',
          results,
          hint: 'To re-seed content pages while keeping your admin account, log in and POST to /api/admin/initialize?refresh=cms',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const adminEmail = body.adminEmail || 'admin@digibit.co';
    const adminPassword = body.adminPassword || 'Admin@123!';
    const adminName = body.adminName || 'Admin User';

    const { seeded, failed } = await seedAllCms('initialize');
    for (const key of seeded) results.push(`✅ ${key} seeded`);
    if (failed.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to seed content: ' + failed.join('; '), results },
        { status: 500 }
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await admins.create(adminEmail, hashedPassword, adminName, 'admin');
      results.push('✅ Admin account created');
    } catch (err: any) {
      return NextResponse.json(
        { success: false, message: 'Failed to create admin: ' + err.message, results },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Initialization complete',
      results,
      credentials: {
        email: adminEmail,
        password: adminPassword,
        note: 'Change this password immediately after login',
      },
    });
  } catch (error: any) {
    console.error('Initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Initialization failed',
        results,
        error: error.toString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const existingAdmins: any = await admins.getAll();
    const hasContent = (await cmsContent.getByKey('homepage')) !== null;

    return NextResponse.json({
      initialized: existingAdmins.length > 0 && hasContent,
      adminCount: existingAdmins.length,
      hasContent,
    });
  } catch (error: any) {
    return NextResponse.json({ initialized: false, error: error.message }, { status: 500 });
  }
}
