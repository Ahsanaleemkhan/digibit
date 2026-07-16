# MySQL Setup Guide for Hostinger

## ✅ Step 1: Create MySQL Database in Hostinger

1. Log into your **Hostinger control panel**
2. Go to **Databases** → **MySQL Databases**  
3. Click **"Create New Database"**
4. Fill in the details:
   - Database name: Choose a name (e.g., `digibit_cms`)
   - Hostinger will prefix it like: `u123456789_digibit`
5. Create a **database user** or use existing
6. Set a **strong password**
7. Click **Create**

### Save These Credentials:
```
DB_HOST=localhost
DB_USER=u123456789_user
DB_PASSWORD=your_strong_password
DB_NAME=u123456789_digibit
```

---

## ✅ Step 2: Add Environment Variables

In Hostinger control panel:

1. Go to your website → **Advanced** → **Environment Variables**
2. Add these variables:

```env
DB_HOST=localhost
DB_USER=u123456789_user
DB_PASSWORD=your_password_here
DB_NAME=u123456789_digibit
NEXTAUTH_URL=https://dgbit.co
NEXTAUTH_SECRET=your_generated_secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## ✅ Step 3: Deploy and Initialize

### Option A: Automatic (Recommended)

1. Push latest code to GitHub
2. Wait for Hostinger to auto-deploy
3. Visit: `https://dgbit.co/admin/setup/initialize`
4. Click "Initialize Database"

### Option B: Manual via SSH

If you have SSH access:

```bash
cd /path/to/your/app
npx tsx scripts/seed-mysql.ts admin@digibit.co "YourPassword" "Your Name"
```

---

## ✅ Step 4: Login

1. Go to: `https://dgbit.co/admin/login`
2. Use the credentials you set during initialization
3. Change your password immediately!

---

## 🔧 Troubleshooting

### Can't Connect to Database

**Check:**
1. Database credentials are correct
2. Environment variables are set in Hostinger
3. Database user has permissions on the database

**Fix:**
```bash
# In Hostinger MySQL panel, ensure user has ALL PRIVILEGES on the database
```

### Tables Not Created

**Solution:**
Visit `/admin/setup/initialize` which will create all tables automatically.

Or via SSH:
```bash
npx tsx scripts/seed-mysql.ts
```

### Authentication Fails

**Check:**
1. Admin user was created during seeding
2. Password is correct
3. Check Hostinger error logs

---

## 📊 Database Structure

The seed script creates these tables:
- `cms_content` - Page content (homepage, about, etc.)
- `admins` - Admin users
- `submissions` - Contact form submissions
- `blog_posts` - Blog/insights posts

---

## 🔄 Migration from SQLite

The new MySQL code is already in place. Once you:
1. Create MySQL database
2. Add environment variables
3. Run seed script

Everything will work automatically!

---

## ✅ Verification Checklist

- [ ] MySQL database created in Hostinger
- [ ] Environment variables added
- [ ] Code deployed from GitHub
- [ ] Seed script run successfully
- [ ] Login works at /admin/login
- [ ] All pages display content
- [ ] Admin panels load without errors

---

**Need Help?**  
Check Hostinger error logs: **Advanced** → **Error Logs**
