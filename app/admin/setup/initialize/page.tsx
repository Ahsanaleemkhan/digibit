import { redirect } from 'next/navigation';
import { admins } from '@/lib/db-mysql';
import InitializeClient from './InitializeClient';

export default async function InitializePage() {
  // Server-side check - redirect if already initialized
  try {
    const existingAdmins: any = await admins.getAll();
    if (existingAdmins.length > 0) {
      redirect('/admin/login');
    }
  } catch (error) {
    // Database might not exist yet, allow access
  }

  return <InitializeClient />;
}
