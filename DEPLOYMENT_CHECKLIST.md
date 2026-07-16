# 🚀 Deployment Checklist for Hostinger

## ✅ Code Status
- [x] MySQL conversion complete and pushed to GitHub (commit: fc3e241)
- [x] All database operations converted to async/await
- [x] Build successful with fallback to JSON defaults
- [x] Security checks in place for setup pages

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Pull Latest Code on Hostinger ✅ DONE
The latest code should auto-deploy from GitHub to your Hostinger hosting.

### Step 2: Create MySQL Database in Hostinger
1. Log into **Hostinger Control Panel**
2. Go to **Databases** → **MySQL Databases**
3. Click **"Create New Database"**
4. Database name: `digibit_cms` (Hostinger will prefix it like `u123456789_digibit`)
5. Create or use existing database user
6. Set a **strong password**
7. **Save these credentials** - you'll need them next!

### Step 3: Add Environment Variables in Hostinger
1. In Hostinger control panel, go to your website
2. Navigate to **Advanced** → **Environment Variables**
3. Add these variables (replace with YOUR actual values):

```env
DB_HOST=localhost
DB_USER=u123456789_user
DB_PASSWORD=your_strong_password_here
DB_NAME=u123456789_digibit
NEXTAUTH_URL=https://dgbit.co
NEXTAUTH_SECRET=your_generated_secret_here
```

**Generate NEXTAUTH_SECRET:**
On your local machine, run:
```bash
openssl rand -base64 32
```
Copy the output and use it as `NEXTAUTH_SECRET`

### Step 4: Initialize Database (One-Time Setup)
1. After adding environment variables, wait 2-3 minutes for Hostinger to restart
2. Visit: **https://dgbit.co/admin/setup/initialize**
3. Fill in the form:
   - Email: Your admin email (e.g., admin@digibit.co)
   - Password: Choose a strong password
   - Name: Your name
4. Click **"Initialize Database"**
5. Wait for success message

### Step 5: Login to Admin Panel
1. Go to: **https://dgbit.co/admin/login**
2. Enter the credentials you just created
3. You should see the admin dashboard!

### Step 6: Verify Everything Works
- [ ] Admin login successful
- [ ] All admin panels load without errors
- [ ] Homepage displays correctly
- [ ] All pages show content (may be demo content initially)
- [ ] Can edit and save content from admin panels

---

## 🔒 Security Features
- ✅ `/admin/setup/initialize` automatically redirects to login if database already has admins
- ✅ All admin routes require authentication
- ✅ Passwords are hashed with bcrypt
- ✅ Session expires after 24 hours
- ✅ No SQL injection vulnerabilities (using parameterized queries)

---

## 🐛 Troubleshooting

### Problem: 403 Forbidden Error
**Solution:** Make sure you've pulled the latest code from GitHub (commit fc3e241)

### Problem: 503/504 Gateway Timeout
**Cause:** Environment variables not set or database not created
**Solution:** 
1. Verify environment variables in Hostinger
2. Verify MySQL database exists
3. Wait 2-3 minutes after adding env vars for server restart

### Problem: Can't Login / Invalid Credentials
**Solutions:**
1. Make sure you completed Step 4 (Initialize Database)
2. Try visiting `/admin/setup/initialize` again
3. Check Hostinger error logs: **Advanced** → **Error Logs**

### Problem: Pages Show No Content
**This is NORMAL on first deployment!**
- The site falls back to default JSON data
- After initializing the database, seed data will be automatically added
- You can then edit all content from admin panels

### Problem: Initialize Page Shows "Already Initialized"
**This is GOOD!** It means:
- Database was already set up
- An admin user already exists
- Go directly to `/admin/login` and use your credentials

---

## 📊 What Gets Created in Database

The initialization creates:
1. **4 Database Tables:**
   - `cms_content` - All page content
   - `admins` - Admin users
   - `submissions` - Contact form submissions
   - `blog_posts` - Blog/insights posts

2. **Seed Data:**
   - Homepage content
   - About page content
   - Services pages
   - Work page
   - 6 demo blog posts
   - Contact page content
   - Careers page content
   - Footer/header content
   - Default theme settings

3. **Your Admin Account**

---

## 🎯 Next Steps After Successful Deployment

1. **Login and explore** all admin panels
2. **Customize content** to match your branding
3. **Upload your logo** in Header/Footer panel
4. **Edit About page** with your company story
5. **Add real blog posts** in Blog panel
6. **Test contact form** submissions
7. **Review theme colors** in Theme panel
8. **Change your password** if needed

---

## 📞 Need Help?

If you encounter any issues:
1. Check **Hostinger Error Logs** (Advanced → Error Logs)
2. Verify all environment variables are set correctly
3. Ensure MySQL database was created successfully
4. Wait 2-3 minutes after any changes for server restart

---

**Last Updated:** After MySQL conversion (commit fc3e241)
