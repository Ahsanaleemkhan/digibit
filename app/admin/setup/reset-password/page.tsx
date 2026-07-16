'use client';

import { useState } from 'react';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Password reset successful! You can now login.');
        setFormData({ email: '', newPassword: '' });
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#1a1a1a'
        }}>
          Reset Admin Password
        </h1>
        <p style={{
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          Enter your admin email and new password
        </p>

        {message && (
          <div style={{
            padding: '12px 16px',
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '6px',
            color: '#155724',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            ✓ {message}
          </div>
        )}

        {error && (
          <div style={{
            padding: '12px 16px',
            background: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '6px',
            color: '#721c24',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            ✕ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              Admin Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@digibit.co"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#333',
              fontSize: '14px'
            }}>
              New Password
            </label>
            <input
              type="password"
              required
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              placeholder="Enter new password (min 8 characters)"
              minLength={8}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#999' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = '#5568d3';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = '#667eea';
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          <div style={{
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <a
              href="/admin/login"
              style={{
                color: '#667eea',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              ← Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
