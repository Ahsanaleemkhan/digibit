import { NextRequest, NextResponse } from 'next/server';
import { blogPosts } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET - Get all blog posts or a single post by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const post = blogPosts.getById(id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }
    
    const allPosts = blogPosts.getAll();
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - Create or update a blog post
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    const existing = blogPosts.getById(data.id);
    
    if (existing) {
      // Update existing post
      blogPosts.update(data.id, data);
    } else {
      // Create new post
      blogPosts.create(data);
    }
    
    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

// DELETE - Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    blogPosts.delete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
