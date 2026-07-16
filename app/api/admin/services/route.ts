import { NextRequest, NextResponse } from 'next/server';
import { services } from '@/lib/db-mysql';

export const dynamic = 'force-dynamic';

// GET - List all services
export async function GET() {
  try {
    const allServices = await services.getAll();
    return NextResponse.json(allServices);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST - Create or update service
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title || !data.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    // Check if service exists
    const existing = await services.getById(data.id);

    if (existing) {
      // Update existing service
      await services.update(data.id, data);
    } else {
      // Create new service
      await services.create(data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save service:', error);
    return NextResponse.json({ error: 'Failed to save service' }, { status: 500 });
  }
}

// DELETE - Delete service
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    await services.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
