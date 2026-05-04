'use client';
import { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const KEY = 'digibit-admin-2026';

export default function AdminPage() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    setAuth(localStorage.getItem('db-admin') === KEY);
  }, []);

  if (auth === null) return null;
  if (!auth) return <AdminLogin onLogin={() => setAuth(true)} />;
  return <AdminDashboard onLogout={() => { localStorage.removeItem('db-admin'); setAuth(false); }} />;
}
