import { redirect } from 'next/navigation';
import { admins } from '@/lib/db';
import InitializeClient from './InitializeClient';

export default function InitializePage() {
  // Server-side check - redirect if already initialized
  try {
    const existingAdmins = admins.getAll();
    if (existingAdmins.length > 0) {
      redirect('/admin/login');
    }
  } catch (error) {
    // Database might not exist yet, allow access
  }

  return <InitializeClient />;
}
