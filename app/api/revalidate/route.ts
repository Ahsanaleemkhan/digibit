import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const DEFAULT_REVALIDATION_SECRET = 'digibit-reval-2026';

/**
 * On-demand revalidation endpoint.
 * WordPress fires a POST here whenever content is saved.
 * Body: { secret: string, paths: string[] }
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const secret = process.env.REVALIDATION_SECRET || DEFAULT_REVALIDATION_SECRET;

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  if (!secret || body.secret !== secret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const paths = Array.isArray(body.paths) && body.paths.length > 0 ? body.paths : ['/'];

  for (const p of paths) {
    revalidatePath(p);
  }

  return NextResponse.json({ revalidated: true, paths });
}
