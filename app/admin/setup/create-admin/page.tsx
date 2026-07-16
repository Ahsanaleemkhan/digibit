import { redirect } from 'next/navigation';
import { admins } from '@/lib/db-mysql';

export default async function CreateAdminPage() {
  // Server-side check - redirect if already initialized
  try {
    const existingAdmins: any = await admins.getAll();
    if (existingAdmins.length > 0) {
      redirect('/admin/login');
    }
  } catch (error) {
    // Database might not exist yet, allow access
  }

  // If admin doesn't exist, redirect to initialize page instead
  redirect('/admin/setup/initialize');
}
