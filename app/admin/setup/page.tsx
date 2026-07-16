import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { admins } from '@/lib/db';

export default function SetupPage() {
  // Server-side check - redirect if already initialized
  try {
    const existingAdmins = admins.getAll();
    if (existingAdmins.length > 0) {
      redirect('/admin/login');
    }
  } catch (error) {
    // Database might not exist yet, allow access
  }
  const diagnostics = {
    nodeEnv: process.env.NODE_ENV,
    nextauthUrl: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Missing',
    nextauthSecret: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing',
    cwd: process.cwd(),
    dbPath: path.join(process.cwd(), 'data', 'digibit.db'),
    dbExists: false,
    dbWritable: false,
    dataDir: path.join(process.cwd(), 'data'),
    dataDirExists: false,
    dataDirWritable: false,
  };

  try {
    diagnostics.dbExists = fs.existsSync(diagnostics.dbPath);
    diagnostics.dataDirExists = fs.existsSync(diagnostics.dataDir);
    
    if (diagnostics.dataDirExists) {
      try {
        const testFile = path.join(diagnostics.dataDir, '.write-test');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);
        diagnostics.dataDirWritable = true;
      } catch (e) {
        diagnostics.dataDirWritable = false;
      }
    }

    if (diagnostics.dbExists) {
      try {
        fs.accessSync(diagnostics.dbPath, fs.constants.W_OK);
        diagnostics.dbWritable = true;
      } catch (e) {
        diagnostics.dbWritable = false;
      }
    }
  } catch (error) {
    console.error('Setup check error:', error);
  }

  const allGood = 
    diagnostics.nextauthUrl !== '❌ Missing' &&
    diagnostics.nextauthSecret !== '❌ Missing' &&
    diagnostics.dbExists &&
    diagnostics.dbWritable;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0f1117', 
      padding: '40px 20px',
      fontFamily: 'monospace',
      color: '#f6f5f0'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#2bb6ea' }}>
          Digibit Admin Setup Diagnostics
        </h1>
        <p style={{ color: 'rgba(246,245,240,0.6)', marginBottom: '32px' }}>
          Environment: {diagnostics.nodeEnv}
        </p>

        {allGood ? (
          <div style={{ 
            padding: '20px', 
            background: 'rgba(43,182,234,0.1)', 
            border: '1px solid rgba(43,182,234,0.3)',
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '18px', color: '#2bb6ea', marginBottom: '8px' }}>
              ✅ All systems operational
            </div>
            <p style={{ color: 'rgba(246,245,240,0.7)', fontSize: '14px' }}>
              Your admin panel should be working. <a href="/admin" style={{ color: '#2bb6ea' }}>Go to admin →</a>
            </p>
          </div>
        ) : (
          <div style={{ 
            padding: '20px', 
            background: 'rgba(196,30,58,0.1)', 
            border: '1px solid rgba(196,30,58,0.3)',
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '18px', color: '#ff6b9d', marginBottom: '8px' }}>
              ⚠️ Configuration issues detected
            </div>
            <p style={{ color: 'rgba(246,245,240,0.7)', fontSize: '14px' }}>
              Fix the issues below to enable admin access.
            </p>
          </div>
        )}

        <div style={{ 
          background: '#161b2e', 
          border: '1px solid rgba(246,245,240,0.1)', 
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#2bb6ea' }}>
            Environment Variables
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>NEXTAUTH_URL</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>{diagnostics.nextauthUrl}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>NEXTAUTH_SECRET</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>{diagnostics.nextauthSecret}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ 
          background: '#161b2e', 
          border: '1px solid rgba(246,245,240,0.1)', 
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#2bb6ea' }}>
            Database Status
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>Working Directory</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontSize: '12px' }}>{diagnostics.cwd}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>Data Directory Exists</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>{diagnostics.dataDirExists ? '✅' : '❌'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>Data Directory Writable</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>{diagnostics.dataDirWritable ? '✅' : '❌'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>Database Path</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontSize: '12px' }}>{diagnostics.dbPath}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(246,245,240,0.1)' }}>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>Database Exists</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>{diagnostics.dbExists ? '✅' : '❌'}</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 0', color: 'rgba(246,245,240,0.7)' }}>Database Writable</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>{diagnostics.dbWritable ? '✅' : '❌'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ 
          background: '#161b2e', 
          border: '1px solid rgba(246,245,240,0.1)', 
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#2bb6ea' }}>
            How to Fix
          </h2>
          
          {diagnostics.nextauthUrl === '❌ Missing' && (
            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(196,30,58,0.1)', borderRadius: '8px' }}>
              <strong style={{ color: '#ff6b9d' }}>Missing NEXTAUTH_URL:</strong>
              <p style={{ fontSize: '13px', color: 'rgba(246,245,240,0.7)', marginTop: '8px' }}>
                Add this to your hosting environment variables:<br/>
                <code style={{ background: '#0d1240', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' }}>
                  NEXTAUTH_URL=https://dgbit.co
                </code>
              </p>
            </div>
          )}

          {diagnostics.nextauthSecret === '❌ Missing' && (
            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(196,30,58,0.1)', borderRadius: '8px' }}>
              <strong style={{ color: '#ff6b9d' }}>Missing NEXTAUTH_SECRET:</strong>
              <p style={{ fontSize: '13px', color: 'rgba(246,245,240,0.7)', marginTop: '8px' }}>
                Generate a secret key and add to environment variables:<br/>
                <code style={{ background: '#0d1240', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', marginTop: '8px' }}>
                  openssl rand -base64 32
                </code>
              </p>
            </div>
          )}

          {(!diagnostics.dbExists || !diagnostics.dbWritable) && (
            <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(196,30,58,0.1)', borderRadius: '8px' }}>
              <strong style={{ color: '#ff6b9d' }}>Database Issue:</strong>
              <p style={{ fontSize: '13px', color: 'rgba(246,245,240,0.7)', marginTop: '8px' }}>
                {!diagnostics.dataDirWritable ? (
                  <>
                    Filesystem is read-only. SQLite won't work on serverless platforms like Vercel.<br/>
                    <strong>Solutions:</strong><br/>
                    1. Deploy to Railway, Render, or DigitalOcean (writable filesystem)<br/>
                    2. Migrate to Vercel Postgres for production
                  </>
                ) : (
                  <>
                    Database file missing. Run seed scripts locally and redeploy with the database file.
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(43,182,234,0.05)', borderRadius: '8px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(246,245,240,0.6)', margin: 0 }}>
            💡 <strong>Note:</strong> This diagnostic page is accessible without authentication. 
            Delete it after setup is complete for security.
          </p>
        </div>
      </div>
    </div>
  );
}
