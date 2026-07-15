# NextAuth.js Admin Authentication Setup Guide

## Overview

Your admin dashboard is now protected with NextAuth.js using secure JWT sessions and password hashing with bcryptjs.

## Security Features Implemented

✅ **JWT-based Sessions** - Secure token-based authentication
✅ **Password Hashing** - Bcrypt with salt rounds 10
✅ **Secure Cookies** - HttpOnly, SameSite=Lax
✅ **Session Expiration** - 24 hour max age
✅ **Protected API Routes** - All admin endpoints require authentication
✅ **CSRF Protection** - Built-in with NextAuth.js

## Creating the First Admin User

### Option 1: Using the Setup API (Recommended)

1. Make a POST request to `/api/auth/setup`:

```bash
curl -X POST http://localhost:3000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create-first-admin",
    "email": "admin@digibit.co",
    "password": "your-secure-password-here",
    "name": "Admin User"
  }'
```

2. You'll receive a success response:
```json
{
  "success": true,
  "message": "First admin created successfully"
}
```

3. Go to `http://localhost:3000/admin/login` and sign in with your credentials.

### Option 2: Using Node.js Script

Create a file called `create-admin.js`:

```javascript
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function createAdmin() {
  const email = process.argv[2] || 'admin@digibit.co';
  const password = process.argv[3] || 'admin123';
  const name = process.argv[4] || 'Admin';
  
  const hash = await bcrypt.hash(password, 10);
  const adminsFile = path.join(__dirname, 'data', 'admins.json');
  
  const admin = {
    id: 'admin_' + Date.now(),
    email,
    name,
    password: hash,
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  
  fs.writeFileSync(adminsFile, JSON.stringify([admin], null, 2));
  console.log(`✓ Admin created: ${email}`);
}

createAdmin();
```

Run it:
```bash
node create-admin.js admin@digibit.co yourpassword "Your Name"
```

## Admin Dashboard Features

### Pages You Can Now Manage

- **Homepage** - Edit hero section, stats, CTAs
- **Contact Info** - Manage contact information
- **About Page** - Edit about section content
- **Navigation** - Customize navigation links
- **Theme & Colors** - Change brand colors in real-time
- **Submissions** - View and manage form submissions

### Accessing the Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Sign in with your email and password
3. You'll be redirected to `/admin` dashboard
4. Session lasts 24 hours

## File Structure

```
lib/
  └── auth.ts              # NextAuth configuration
app/
  ├── admin/
  │   ├── page.tsx         # Main admin page (protected)
  │   ├── login/
  │   │   └── page.tsx     # Login page (public)
  │   ├── AdminDashboard.tsx
  │   ├── AdminLogin.tsx   # Old login (can be deleted)
  │   └── panels/
  │       ├── SubmissionsPanel.tsx
  │       ├── ThemePanel.tsx
  │       └── ContentPanel.tsx
  ├── api/
  │   ├── auth/
  │   │   ├── [...nextauth]/route.ts   # NextAuth handler
  │   │   └── setup/route.ts           # Admin setup endpoint
  │   ├── submissions/route.ts          # Protected
  │   └── admin/data/route.ts           # Protected
data/
  └── admins.json          # Admin users (do not commit!)
```

## Environment Variables

Your `.env.local` now contains:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=zaLyNKObRa/bNKmAePOr1g2kn/U5FwWkzrRiimjXQiA=
```

⚠️ **Production**: Change `NEXTAUTH_SECRET` to a new value and set `NEXTAUTH_URL` to your production domain!

## API Authentication

All protected API endpoints now require a valid NextAuth session. The session is automatically attached to requests.

### Protected Endpoints

- `GET /api/submissions` - List submissions
- `PATCH /api/submissions` - Update submission status
- `DELETE /api/submissions` - Delete submission
- `POST /api/admin/data` - Save admin data (homepage, theme, etc.)

### Public Endpoints

- `POST /api/submissions` - Create new submission (contact form)
- `GET /api/admin/data` - Get admin data (public)

## Adding More Admins

Edit `data/admins.json` and add new admin entries:

```json
[
  {
    "id": "admin_1",
    "email": "admin@digibit.co",
    "name": "Admin User",
    "password": "$2a$10$...", // bcrypt hash
    "role": "admin",
    "createdAt": "2026-07-15T..."
  },
  {
    "id": "admin_2",
    "email": "another@digibit.co",
    "name": "Another Admin",
    "password": "$2a$10$...",
    "role": "admin",
    "createdAt": "2026-07-15T..."
  }
]
```

Or use the setup API again:
```bash
curl -X POST http://localhost:3000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create-first-admin",
    "email": "another@digibit.co",
    "password": "password123",
    "name": "Another Admin"
  }'
```

⚠️ **Warning**: Only the first call to setup works (if admins.json is empty). After that, you need to edit the JSON file or create an admin management interface.

## Production Deployment Checklist

- [ ] Change `NEXTAUTH_SECRET` to a new random value
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Store `NEXTAUTH_SECRET` securely in your hosting environment
- [ ] Never commit `data/admins.json` to version control
- [ ] Implement password reset functionality
- [ ] Add rate limiting to login endpoint
- [ ] Enable HTTPS (required for secure cookies)
- [ ] Consider adding two-factor authentication
- [ ] Set up logging for admin actions
- [ ] Implement audit trails

## Troubleshooting

### Login page shows but can't sign in
- Check that `data/admins.json` exists and has admin users
- Verify password is correct
- Check browser console for errors

### Sessions not persisting
- Clear browser cookies and try again
- Check that `NEXTAUTH_SECRET` is set in `.env.local`
- Verify `NEXTAUTH_URL` matches your current domain

### API returns 401 Unauthorized
- Make sure you're logged in before accessing admin pages
- Check that your session hasn't expired (24 hours)
- Try logging out and in again

## Next Steps

1. ✅ Create your first admin user (see "Creating the First Admin User" section)
2. Test the login flow
3. Customize admin dashboard (add more content types, etc.)
4. Deploy to production with proper environment variables
5. Consider adding password reset functionality
6. Implement admin audit logs

## Security Notes

- Never hardcode passwords in your code
- Rotate `NEXTAUTH_SECRET` regularly in production
- Use HTTPS in production (mandatory for cookies)
- Implement CORS if admin is on a different domain
- Consider rate limiting on login endpoint
- Implement account lockout after failed attempts
- Store sensitive operations in audit logs

---

For more information, see:
- NextAuth.js Docs: https://next-auth.js.org
- Bcryptjs: https://github.com/dcodeIO/bcrypt.js
- Next.js Security: https://nextjs.org/docs/advanced-features/security
