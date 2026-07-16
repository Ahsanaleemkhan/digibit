import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { services, workItems } from '@/lib/db-mysql';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// POST - Idempotent seed of services + work items from data/*-seed.json.
// Only creates entries whose slug does not yet exist. Never overwrites.
export async function POST() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let servicesCreated = 0;
    let servicesSkipped = 0;
    let workCreated = 0;
    let workSkipped = 0;
    const errors: string[] = [];

    // Load seed files
    let serviceSeed: any[] = [];
    let workSeed: any[] = [];
    try {
      const servicesPath = path.join(process.cwd(), 'data', 'services-seed.json');
      serviceSeed = JSON.parse(await readFile(servicesPath, 'utf-8'));
    } catch (err: any) {
      errors.push(`Failed to read services-seed.json: ${err.message}`);
    }
    try {
      const workPath = path.join(process.cwd(), 'data', 'work-seed.json');
      workSeed = JSON.parse(await readFile(workPath, 'utf-8'));
    } catch (err: any) {
      errors.push(`Failed to read work-seed.json: ${err.message}`);
    }

    // Seed services
    for (const entry of serviceSeed) {
      try {
        const existing = await services.getBySlug(entry.slug);
        if (existing) {
          servicesSkipped++;
        } else {
          await services.create(entry);
          servicesCreated++;
        }
      } catch (err: any) {
        errors.push(`Service ${entry.slug}: ${err.message}`);
      }
    }

    // Seed work items
    for (const entry of workSeed) {
      try {
        const existing = await workItems.getBySlug(entry.slug);
        if (existing) {
          workSkipped++;
        } else {
          await workItems.create(entry);
          workCreated++;
        }
      } catch (err: any) {
        errors.push(`Work ${entry.slug}: ${err.message}`);
      }
    }

    return NextResponse.json({
      servicesCreated,
      servicesSkipped,
      workCreated,
      workSkipped,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error: any) {
    console.error('Seed catalog failed:', error);
    return NextResponse.json(
      { error: 'Seed failed', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

// GET - Also seeds (convenience for hitting via browser). Same behavior as POST.
export async function GET() {
  return POST();
}
