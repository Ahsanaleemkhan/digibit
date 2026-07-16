import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { media } from '@/lib/db';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// ─── GET: Fetch all media ────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allMedia = media.getAll();
    return NextResponse.json(allMedia);
  } catch (error: any) {
    console.error('Media GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── POST: Upload new media ──────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureUploadDir();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const altText = formData.get('alt_text') as string || '';
    const caption = formData.get('caption') as string || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG' 
      }, { status: 400 });
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size: 10MB' 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.name);
    const filename = `${timestamp}-${randomStr}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Save metadata to database
    const result = media.create({
      filename: filename,
      original_name: file.name,
      mime_type: file.type,
      size: file.size,
      path: `/uploads/${filename}`,
      alt_text: altText,
      caption: caption,
      uploaded_by: session.user?.email || 'unknown'
    });

    // Get the created media item
    const newMedia = media.getById(Number(result.lastInsertRowid));

    return NextResponse.json({ 
      ok: true, 
      media: newMedia 
    });

  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file' 
    }, { status: 500 });
  }
}

// ─── PATCH: Update media metadata ────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, alt_text, caption } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing media ID' }, { status: 400 });
    }

    // Update in database
    media.update(id, { alt_text, caption });

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('Media update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ─── DELETE: Remove media ────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing media ID' }, { status: 400 });
    }

    // Get media info before deleting
    const mediaItem = media.getById(parseInt(id)) as any;
    
    if (mediaItem) {
      // Delete file from disk
      const filepath = path.join(process.cwd(), 'public', mediaItem.path);
      try {
        await unlink(filepath);
      } catch (err) {
        console.warn('Could not delete file from disk:', err);
      }

      // Delete from database
      media.delete(parseInt(id));
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('Media delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
