import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { services, workItems } from '@/lib/db-mysql';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Idempotent seed of services + work items from data/*-seed.json.
// Default: only creates entries whose slug does not yet exist.
// With ?force=true (or body.force===true): overwrites existing entries via update().
async function runSeed(force: boolean) {
  let servicesCreated = 0;
  let servicesUpdated = 0;
  let servicesSkipped = 0;
  let workCreated = 0;
  let workUpdated = 0;
  let workSkipped = 0;
  const errors: string[] = [];

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

  for (const entry of serviceSeed) {
    try {
      const existing = await services.getBySlug(entry.slug);
      if (existing) {
        if (force) {
          await services.update((existing as any).id, entry);
          servicesUpdated++;
        } else {
          servicesSkipped++;
        }
      } else {
        await services.create(entry);
        servicesCreated++;
      }
    } catch (err: any) {
      errors.push(`Service ${entry.slug}: ${err.message}`);
    }
  }

  for (const entry of workSeed) {
    try {
      const existing = await workItems.getBySlug(entry.slug);
      if (existing) {
        if (force) {
          await workItems.update((existing as any).id, entry);
          workUpdated++;
        } else {
          workSkipped++;
        }
      } else {
        await workItems.create(entry);
        workCreated++;
      }
    } catch (err: any) {
      errors.push(`Work ${entry.slug}: ${err.message}`);
    }
  }

  return {
    force,
    servicesCreated,
    servicesUpdated,
    servicesSkipped,
    workCreated,
    workUpdated,
    workSkipped,
    errors: errors.length > 0 ? errors : undefined,
  };
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = new URL(req.url);
    const queryForce = url.searchParams.get('force') === 'true';
    let bodyForce = false;
    try {
      const body = await req.json();
      bodyForce = body?.force === true;
    } catch {
      // no body — ignore
    }
    return NextResponse.json(await runSeed(queryForce || bodyForce));
  } catch (error: any) {
    console.error('Seed catalog failed:', error);
    return NextResponse.json(
      { error: 'Seed failed', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = new URL(req.url);
    const force = url.searchParams.get('force') === 'true';
    return NextResponse.json(await runSeed(force));
  } catch (error: any) {
    console.error('Seed catalog failed:', error);
    return NextResponse.json(
      { error: 'Seed failed', message: error?.message || String(error) },
      { status: 500 }
    );
  }
}
