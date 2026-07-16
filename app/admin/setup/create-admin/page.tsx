'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminExists, setAdminExists] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Check if admin already exists on page load
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const response = await fetch('/api/auth/setup');
        const data = await response.json();
        
        if (data.setup && data.adminCount > 0) {
          setAdminExists(true);
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/admin/login');
          }, 3000);
        }
      } catch (error) {
        console.error('Failed to check admin status:', error);
      } finally {
        setChecking(false);
      }
    };

    checkAdminExists();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        // Clear form on success
        setEmail('');
        setPassword('');
        setName('');
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error: ' + (error as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  const S = {
    container: {
      minHeight: '100vh',
      background: '#0f1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    } as React.CSSProperties,
    card: {
      background: '#161b2e',
      border: '1px solid rgba(246,245,240,0.1)',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '500px',
      width: '100%'
    } as React.CSSProperties,
    title: {
      fontSize: '28px',
      fontWeight: 600,
      color: '#2bb6ea',
      marginBottom: '8px',
      fontFamily: 'Bricolage Grotesque, sans-serif'
    } as React.CSSProperties,
    subtitle: {
      fontSize: '14px',
      color: 'rgba(246,245,240,0.6)',
      marginBottom: '32px',
      lineHeight: 1.6
    } as React.CSSProperties,
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px'
    } as React.CSSProperties,
    label: {
      fontSize: '13px',
      fontWeight: 500,
      color: 'rgba(246,245,240,0.8)',
      marginBottom: '8px',
      display: 'block',
      fontFamily: 'monospace',
      letterSpacing: '0.02em'
    } as React.CSSProperties,
    input: {
      width: '100%',
      padding: '12px 16px',
      background: '#0d1240',
      border: '1px solid rgba(246,245,240,0.15)',
      borderRadius: '10px',
      color: '#f6f5f0',
      fontSize: '15px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'border-color 0.2s'
    } as React.CSSProperties,
    button: {
      padding: '14px 24px',
      background: '#2bb6ea',
      color: '#0d1240',
      border: 'none',
      borderRadius: '10px',
      fontWeight: 600,
      fontSize: '15px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      marginTop: '12px',
      transition: 'opacity 0.2s'
    } as React.CSSProperties,
    success: {
      padding: '16px',
      background: 'rgba(43,182,234,0.15)',
      border: '1px solid rgba(43,182,234,0.3)',
      borderRadius: '10px',
      color: '#2bb6ea',
      fontSize: '14px',
      marginTop: '20px',
      lineHeight: 1.6
    } as React.CSSProperties,
    error: {
      padding: '16px',
      background: 'rgba(196,30,58,0.15)',
      border: '1px solid rgba(196,30,58,0.3)',
      borderRadius: '10px',
      color: '#ff6b9d',
      fontSize: '14px',
      marginTop: '20px',
      lineHeight: 1.6
    } as React.CSSProperties,
    warning: {
      padding: '20px',
      background: 'rgba(244,185,66,0.1)',
      border: '1px solid rgba(244,185,66,0.3)',
      borderRadius: '10px',
      color: '#f4b942',
      fontSize: '15px',
      lineHeight: 1.6,
      textAlign: 'center' as const
    } as React.CSSProperties,
    note: {
      marginTop: '24px',
      padding: '16px',
      background: 'rgba(43,182,234,0.05)',
      borderRadius: '8px',
      fontSize: '13px',
      color: 'rgba(246,245,240,0.6)',
      lineHeight: 1.6
    } as React.CSSProperties
  };

  // Show loading state while checking
  if (checking) {
    return (
      <div style={S.container}>
        <div style={S.card}>
          <div style={{ textAlign: 'center', color: 'rgba(246,245,240,0.6)' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            <div>Checking setup status...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show blocked message if admin already exists
  if (adminExists) {
    return (
      <div style={S.container}>
        <div style={S.card}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>🔒</div>
            <h1 style={S.title}>Setup Already Complete</h1>
            <div style={S.warning}>
              <strong>Admin account already exists.</strong>
              <div style={{ marginTop: '12px' }}>
                This page is only accessible during initial setup.
                Redirecting to login page...
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <a 
                href="/admin/login"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#2bb6ea',
                  color: '#0d1240',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: 600
                }}
              >
                Go to Login →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={S.container}>
      <div style={S.card}>
        <h1 style={S.title}>Create Admin Account</h1>
        <p style={S.subtitle}>
          Set up your first admin account to access the Digibit admin panel.
          This page will be disabled after the first admin is created.
        </p>

        <form onSubmit={handleSubmit} style={S.form}>
          <div>
            <label style={S.label}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              style={S.input}
              disabled={loading}
            />
          </div>

          <div>
            <label style={S.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@digibit.co"
              required
              style={S.input}
              disabled={loading}
            />
          </div>

          <div>
            <label style={S.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a strong password"
              required
              minLength={8}
              style={S.input}
              disabled={loading}
            />
            <div style={{ fontSize: '12px', color: 'rgba(246,245,240,0.5)', marginTop: '6px' }}>
              At least 8 characters
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...S.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Admin Account'}
          </button>
        </form>

        {result && (
          <div style={result.success ? S.success : S.error}>
            <strong>{result.success ? '✅ Success!' : '❌ Error'}</strong>
            <div style={{ marginTop: '8px' }}>{result.message}</div>
            {result.success && (
              <div style={{ marginTop: '16px' }}>
                <a 
                  href="/admin/login" 
                  style={{ 
                    color: '#2bb6ea', 
                    textDecoration: 'underline',
                    fontWeight: 600
                  }}
                >
                  → Go to Admin Login
                </a>
              </div>
            )}
            {result.adminCount > 0 && !result.success && (
              <div style={{ marginTop: '8px' }}>
                An admin account already exists. Use the login page instead.
              </div>
            )}
          </div>
        )}

        <div style={S.note}>
          🔒 <strong>Security:</strong> This page is only accessible when no admin accounts exist. 
          Once you create the first admin, this page will automatically block access and redirect to login.
        </div>
      </div>
    </div>
  );
}
