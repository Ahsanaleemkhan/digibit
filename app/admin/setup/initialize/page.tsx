import { redirect } from 'next/navigation';
import { admins } from '@/lib/db';

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

  return <InitializePageClient />;
}

'use client';

import { useState } from 'react';

function InitializePageClient() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const steps = [
    'Initializing database tables',
    'Seeding homepage content',
    'Seeding about page',
    'Seeding services',
    'Seeding work items',
    'Seeding blog posts',
    'Seeding contact page',
    'Seeding careers page',
    'Seeding insights page',
    'Seeding header & footer',
    'Creating admin account'
  ];

  const handleInitialize = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    setStep(0);

    try {
      // Call the initialization API
      const response = await fetch('/api/admin/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: 'admin@digibit.co',
          adminPassword: 'Admin@123!',
          adminName: 'Admin User'
        })
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results || []);
        setStep(steps.length);
      } else {
        setError(data.message || 'Initialization failed');
      }
    } catch (err: any) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const S = {
    container: {
      minHeight: '100vh',
      background: '#0f1117',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    } as React.CSSProperties,
    card: {
      maxWidth: '700px',
      margin: '0 auto',
      background: '#161b2e',
      border: '1px solid rgba(246,245,240,0.1)',
      borderRadius: '16px',
      padding: '40px'
    } as React.CSSProperties,
    title: {
      fontSize: '32px',
      fontWeight: 600,
      color: '#2bb6ea',
      marginBottom: '8px',
      textAlign: 'center' as const
    } as React.CSSProperties,
    subtitle: {
      fontSize: '15px',
      color: 'rgba(246,245,240,0.6)',
      marginBottom: '32px',
      textAlign: 'center' as const,
      lineHeight: 1.6
    } as React.CSSProperties,
    button: {
      width: '100%',
      padding: '16px',
      background: '#2bb6ea',
      color: '#0d1240',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'opacity 0.2s'
    } as React.CSSProperties,
    progress: {
      marginTop: '32px'
    } as React.CSSProperties,
    stepItem: {
      padding: '12px 16px',
      background: '#0d1240',
      border: '1px solid rgba(246,245,240,0.1)',
      borderRadius: '8px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '14px',
      color: 'rgba(246,245,240,0.7)'
    } as React.CSSProperties,
    success: {
      marginTop: '32px',
      padding: '20px',
      background: 'rgba(43,182,234,0.15)',
      border: '1px solid rgba(43,182,234,0.3)',
      borderRadius: '12px',
      color: '#2bb6ea',
      textAlign: 'center' as const
    } as React.CSSProperties,
    error: {
      marginTop: '32px',
      padding: '20px',
      background: 'rgba(196,30,58,0.15)',
      border: '1px solid rgba(196,30,58,0.3)',
      borderRadius: '12px',
      color: '#ff6b9d'
    } as React.CSSProperties,
    warning: {
      marginTop: '32px',
      padding: '16px',
      background: 'rgba(244,185,66,0.1)',
      border: '1px solid rgba(244,185,66,0.3)',
      borderRadius: '8px',
      fontSize: '13px',
      color: 'rgba(246,245,240,0.7)',
      lineHeight: 1.6
    } as React.CSSProperties
  };

  return (
    <div style={S.container}>
      <div style={S.card}>
        <h1 style={S.title}>🚀 Initialize Digibit CMS</h1>
        <p style={S.subtitle}>
          This will set up your database, seed all content, and create your admin account.
          <br />
          <strong>Run this once only</strong> during initial deployment.
        </p>

        {!loading && step === 0 && (
          <>
            <button 
              onClick={handleInitialize}
              style={S.button}
            >
              Initialize Database & Create Admin
            </button>

            <div style={S.warning}>
              <strong>⚠️ Default Admin Credentials:</strong>
              <div style={{ marginTop: '12px', fontFamily: 'monospace', fontSize: '14px' }}>
                <div>📧 Email: <strong>admin@digibit.co</strong></div>
                <div style={{ marginTop: '8px' }}>🔑 Password: <strong>Admin@123!</strong></div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', opacity: 0.8 }}>
                Change this password immediately after logging in!
              </div>
            </div>
          </>
        )}

        {loading && (
          <div style={S.progress}>
            <div style={{ marginBottom: '20px', textAlign: 'center', fontSize: '18px', color: '#2bb6ea' }}>
              Initializing...
            </div>
            {steps.map((stepName, index) => (
              <div 
                key={index}
                style={{
                  ...S.stepItem,
                  opacity: index <= step ? 1 : 0.4
                }}
              >
                {index < step ? '✅' : index === step ? '⏳' : '⭕'}
                <span>{stepName}</span>
              </div>
            ))}
          </div>
        )}

        {!loading && step === steps.length && results.length > 0 && (
          <div style={S.success}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>✅</div>
            <div style={{ fontSize: '24px', fontWeight: 600, marginBottom: '16px' }}>
              Initialization Complete!
            </div>
            <div style={{ fontSize: '14px', marginBottom: '24px', opacity: 0.9 }}>
              {results.length} operations completed successfully
            </div>
            <div style={{ 
              textAlign: 'left',
              background: '#0d1240',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              <strong style={{ display: 'block', marginBottom: '12px' }}>
                Your Admin Login:
              </strong>
              <div style={{ fontFamily: 'monospace', opacity: 0.9 }}>
                <div>📧 Email: <strong>admin@digibit.co</strong></div>
                <div style={{ marginTop: '8px' }}>🔑 Password: <strong>Admin@123!</strong></div>
              </div>
            </div>
            <a 
              href="/admin/login"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: '#2bb6ea',
                color: '#0d1240',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '15px'
              }}
            >
              Go to Admin Login →
            </a>
          </div>
        )}

        {error && (
          <div style={S.error}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>❌</div>
            <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Initialization Failed
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {error}
            </div>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                background: '#ff6b9d',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

