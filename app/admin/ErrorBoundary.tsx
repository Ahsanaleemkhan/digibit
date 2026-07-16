'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#161b2e',
          border: '1px solid rgba(196,30,58,0.3)',
          borderRadius: '16px',
          maxWidth: '600px',
          margin: '40px auto'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#ff6b9d', marginBottom: '16px', fontSize: '24px' }}>
            Failed to load homepage data
          </h2>
          <p style={{ color: 'rgba(246,245,240,0.7)', marginBottom: '24px', lineHeight: 1.6 }}>
            Your database needs to be initialized with default content.
          </p>
          <a
            href="/admin/setup/initialize"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: '#2bb6ea',
              color: '#0d1240',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '15px'
            }}
          >
            Initialize Database →
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export function DataLoadError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      background: '#161b2e',
      border: '1px solid rgba(196,30,58,0.3)',
      borderRadius: '16px'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
      <h2 style={{ color: '#ff6b9d', marginBottom: '12px', fontSize: '20px' }}>
        Failed to load data
      </h2>
      <p style={{ color: 'rgba(246,245,240,0.6)', marginBottom: '20px', fontSize: '14px' }}>
        Database might not be initialized yet.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <a
          href="/admin/setup/initialize"
          style={{
            padding: '12px 24px',
            background: '#2bb6ea',
            color: '#0d1240',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px'
          }}
        >
          Initialize Database
        </a>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              padding: '12px 24px',
              background: 'rgba(246,245,240,0.1)',
              color: '#f6f5f0',
              border: '1px solid rgba(246,245,240,0.2)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
