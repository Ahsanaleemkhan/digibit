import { NextRequest, NextResponse } from 'next/server';
import { admins, initializeDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

/**
 * Setup route to create initial admin account
 * This should be called once during deployment to set up the first admin
 */
export async function POST(request: NextRequest) {
  try {
    // Initialize database (creates tables if they don't exist)
    initializeDatabase();

    // Check if any admins already exist
    const existingAdmins = admins.getAll();
    
    if (existingAdmins.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Admin account already exists',
        adminCount: existingAdmins.length
      }, { status: 400 });
    }

    // Get credentials from request body
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({
        success: false,
        message: 'Email, password, and name are required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin account
    admins.create(email, hashedPassword, name, 'admin');

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      email: email,
      name: name
    });

  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create admin account',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * GET endpoint to check setup status
 */
export async function GET() {
  try {
    const existingAdmins = admins.getAll();
    
    return NextResponse.json({
      setup: existingAdmins.length > 0,
      adminCount: existingAdmins.length,
      message: existingAdmins.length > 0 
        ? 'Admin accounts exist' 
        : 'No admin accounts found - run POST to /api/auth/setup to create one'
    });
  } catch (error: any) {
    return NextResponse.json({
      setup: false,
      error: error.message
    }, { status: 500 });
  }
}
