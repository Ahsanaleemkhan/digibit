import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

function readJSON(file: string) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
}
function writeJSON(file: string, data: unknown) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// Auth check
function checkAuth(req: NextRequest) {
  const auth = req.headers.get('x-admin-key');
  return auth === (process.env.ADMIN_KEY || 'digibit-admin-2026');
}

// ─── Content ─────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file') || 'content';
  try {
    return NextResponse.json(readJSON(`${file}.json`));
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file') || 'content';
  const body = await req.json();
  writeJSON(`${file}.json`, body);
  return NextResponse.json({ ok: true });
}
