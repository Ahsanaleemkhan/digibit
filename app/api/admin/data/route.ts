import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { cmsContent, submissions, themeSettings, media } from '@/lib/db-mysql';

// ─── GET: Fetch data ─────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type'); // 'cms', 'submissions', 'theme', 'media'
  const key = searchParams.get('key'); // specific key for cms/theme

  try {
    switch (type) {
      case 'cms':
        if (key) {
          const data = await cmsContent.getByKey(key);
          return NextResponse.json(data || { error: 'Not found' });
        }
        return NextResponse.json(await cmsContent.getAll());

      case 'submissions':
        const submissionType = searchParams.get('submissionType');
        const status = searchParams.get('status');
        return NextResponse.json(await submissions.getAll(submissionType || undefined, status || undefined));

      case 'theme':
        if (key) {
          return NextResponse.json(await themeSettings.get(key));
        }
        return NextResponse.json(await themeSettings.getAll());

      case 'media':
        return NextResponse.json(await media.getAll());

      default:
        // Backwards compatibility: if no type, return all CMS content
        return NextResponse.json(await cmsContent.getAll());
    }
  } catch (error: any) {
    console.error('Admin data GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── POST: Create or update data ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const body = await req.json();

  try {
    switch (type) {
      case 'cms': {
        const { pageKey, content } = body;
        if (!pageKey || !content) {
          return NextResponse.json({ error: 'Missing pageKey or content' }, { status: 400 });
        }
        await cmsContent.upsert(pageKey, content, session.user?.email || undefined);
        return NextResponse.json({ ok: true, pageKey });
      }

      case 'theme': {
        const { key, value } = body;
        if (!key) {
          return NextResponse.json({ error: 'Missing key' }, { status: 400 });
        }
        await themeSettings.set(key, value);
        return NextResponse.json({ ok: true, key });
      }

      case 'submission-status': {
        const { id, status } = body;
        if (!id || !status) {
          return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
        }
        await submissions.updateStatus(id, status);
        return NextResponse.json({ ok: true, id, status });
      }

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Admin data POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── DELETE: Remove data ──────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  try {
    switch (type) {
      case 'submission':
        if (!id) {
          return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }
        await submissions.delete(parseInt(id));
        return NextResponse.json({ ok: true, id });

      case 'media':
        if (!id) {
          return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }
        await media.delete(parseInt(id));
        return NextResponse.json({ ok: true, id });

      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Admin data DELETE error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
