'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117' }}>
        <div style={{ color: 'rgba(246,245,240,0.4)', fontSize: '16px' }}>Loading…</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <AdminDashboard onLogout={() => signOut({ callbackUrl: '/admin/login' })} />;
}
