import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'submissions.json');

function readSubs() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf-8')); } catch { return []; }
}
function writeSubs(data: unknown[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const subs = readSubs();
  const entry = { ...body, id: Date.now(), date: new Date().toISOString(), read: false };
  writeSubs([entry, ...subs]);
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('x-admin-key');
  if (auth !== (process.env.ADMIN_KEY || 'digibit-admin-2026')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(readSubs());
}

export async function PATCH(req: NextRequest) {
  const auth = req.headers.get('x-admin-key');
  if (auth !== (process.env.ADMIN_KEY || 'digibit-admin-2026')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, read } = await req.json();
  const subs = readSubs().map((s: { id: number; read: boolean }) => s.id === id ? { ...s, read } : s);
  writeSubs(subs);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const auth = req.headers.get('x-admin-key');
  if (auth !== (process.env.ADMIN_KEY || 'digibit-admin-2026')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  writeSubs(readSubs().filter((s: { id: number }) => s.id !== id));
  return NextResponse.json({ ok: true });
}
