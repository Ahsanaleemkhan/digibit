# Digibit CMS - Deployment Guide

## ✅ Database Included

The fully seeded database (`data/digibit.db`) is now included in the repository for easy deployment to Hostinger.

### What's Included:

- ✅ All CMS content (homepage, about, services, work, blog, contact, careers, pricing)
- ✅ Admin account pre-configured
- ✅ Default theme settings
- ✅ Navigation structure
- ✅ Header & footer content

---

## 🔐 Admin Login Credentials

**URL**: https://dgbit.co/admin/login

**Credentials**:
- **Email**: `admin@digibit.co`
- **Password**: `Admin@123!`

⚠️ **IMPORTANT**: Change this password immediately after first login!

---

## 🚀 Hostinger Deployment Steps

### After Pushing to GitHub:

1. **Wait for Hostinger to auto-deploy** (pulls latest from GitHub)
2. **Verify database file exists** on server:
   - Check that `data/digibit.db` was uploaded
   - File should be ~150KB+
3. **Login** at https://dgbit.co/admin/login
4. **Change your password** in the admin panel

---

## 🔧 If Login Still Fails

### Option 1: Check File Permissions

SSH into Hostinger and run:
```bash
chmod 600 data/digibit.db
chmod 755 data
```

### Option 2: Verify Environment Variables

Make sure these are set in Hostinger:
```env
NEXTAUTH_URL=https://dgbit.co
NEXTAUTH_SECRET=<your-secret-key>
```

Generate secret:
```bash
openssl rand -base64 32
```

### Option 3: Check Server Logs

In Hostinger panel:
- Go to "Advanced" → "Error Logs"
- Look for database or authentication errors
- Share with developer if needed

---

## 📊 Database Information

### Location
- **Development**: `./data/digibit.db`
- **Production**: Same path (automatically created)

### Backup
To backup your database:
```bash
cp data/digibit.db data/digibit-backup-$(date +%Y%m%d).db
```

### Reset to Defaults
If you want to reset everything:
```bash
rm data/digibit.db
npx tsx scripts/seed-production.ts admin@digibit.co YourPassword "Your Name"
```

---

## 🔒 Security Notes

### Protected Routes (Auto-redirect to login after initialization):
- `/admin/setup`
- `/admin/setup/initialize`
- `/admin/setup/create-admin`

### Public Routes:
- `/admin/login` - Login page
- All front-end pages (/, /about, /services, etc.)

### Admin-Only Routes:
- `/admin` - Dashboard (requires authentication)
- `/admin/*` - All admin panels

---

## 🐛 Troubleshooting

### 503 Service Unavailable
- **Cause**: Database file missing or not readable
- **Fix**: Verify `data/digibit.db` exists and has proper permissions

### 504 Gateway Timeout
- **Cause**: Initialization taking too long on shared hosting
- **Fix**: Database is now pre-included, initialization not needed

### Invalid Email or Password
- **Cause**: Wrong credentials or admin not created
- **Fix**: Use credentials above or run seed script

### Database Locked Error
- **Cause**: Multiple processes accessing database
- **Fix**: Restart Node.js application on Hostinger

---

## 📞 Support

If you encounter issues:

1. Check Hostinger error logs
2. Verify database file permissions
3. Confirm environment variables are set
4. Check that deployment completed successfully

---

## ✅ Post-Deployment Checklist

- [ ] Login works at https://dgbit.co/admin/login
- [ ] Password changed from default
- [ ] All admin panels load without errors
- [ ] Front-end pages display content correctly
- [ ] Setup routes are protected (return to login)
- [ ] Environment variables configured
- [ ] Database file has correct permissions

---

**Last Updated**: 2026-07-16
**Database Version**: 1.0.0
**Admin Account**: admin@digibit.co
