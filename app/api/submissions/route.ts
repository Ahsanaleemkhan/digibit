import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { submissions } from '@/lib/db-mysql';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Create submission in database
    const result: any = await submissions.create({
      type: body.type || 'contact',
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: body.message,
      services: body.services,
      budget: body.budget,
      timeline: body.timeline,
      data: body.data,
      status: 'new'
    });

    return NextResponse.json({
      ok: true,
      id: result?.insertId
    });

  } catch (error: any) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    return NextResponse.json(await submissions.getAll(type || undefined, status || undefined));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    await submissions.updateStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    await submissions.delete(id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
