import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { admins } from '@/lib/db-mysql';

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if admin exists
    const admin = await admins.getByEmail(email);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin account not found' },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    const result = await admins.updatePassword(email, hashedPassword);

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update password' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Password reset successfully! You can now login with your new password.',
      success: true
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
