# Security Documentation

## Protected Setup Routes

The following routes are **automatically protected** and only accessible during initial deployment (when no admin accounts exist):

### 1. `/admin/setup/initialize`
- **Purpose**: One-click database initialization and admin account creation
- **Protection**: Server-side redirect to `/admin/login` if admin exists
- **Status**: ✅ Secured

### 2. `/admin/setup/create-admin`
- **Purpose**: Manual admin account creation form
- **Protection**: Server-side redirect to `/admin/login` if admin exists
- **Status**: ✅ Secured

### 3. `/admin/setup`
- **Purpose**: System diagnostics and configuration check
- **Protection**: Server-side redirect to `/admin/login` if admin exists
- **Status**: ✅ Secured

## How Protection Works

All setup routes use **server-side checks** that:

1. Check if any admin accounts exist in the database
2. If admin exists → **Redirect to `/admin/login`** (HTTP 307)
3. If no admin exists → Allow access (first-time setup only)

This happens **before** the page renders, making it impossible to bypass via client-side manipulation.

## API Endpoint Protection

### `/api/auth/setup` (POST)
- Creates admin accounts
- **Protection**: Returns 400 error if admin already exists
- **Status**: ✅ Secured

### `/api/admin/initialize` (POST)
- Seeds database and creates admin
- **Protection**: Returns 400 error if already initialized
- **Status**: ✅ Secured

## Default Credentials

**First-time setup creates:**
- **Email**: `admin@digibit.co`
- **Password**: `Admin@123!`

⚠️ **CRITICAL**: Change this password immediately after first login!

## Post-Setup Security Checklist

After running initialization:

- ✅ All setup routes automatically become inaccessible
- ✅ Only `/admin/login` is publicly accessible
- ✅ All admin panels require authentication
- ✅ Sessions expire after 24 hours
- ✅ Passwords are bcrypt hashed (10 rounds)

## Authentication Flow

1. User visits `/admin` → Redirects to `/admin/login` if not authenticated
2. User logs in → Session created (JWT, 24h expiry)
3. User accesses admin panels → Session validated
4. Session expires → User redirected to login

## File Permissions

Ensure proper file permissions on production:

```bash
# Database file (read/write for app only)
chmod 600 data/digibit.db

# Upload directory (read/write for app only)  
chmod 700 public/uploads
```

## Environment Variables

Required in production:

```env
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<generated-secret-key>
```

Generate secret with:
```bash
openssl rand -base64 32
```

## Security Best Practices

1. ✅ Never commit `.env.local` to git
2. ✅ Use strong passwords (min 8 characters)
3. ✅ Change default admin password immediately
4. ✅ Keep dependencies updated
5. ✅ Use HTTPS in production
6. ✅ Enable rate limiting on login endpoint (recommended)
7. ✅ Regular database backups

## Reporting Security Issues

If you discover a security vulnerability, please email: security@digibit.co

---

Last Updated: 2026-07-16
