# Hostinger Deployment Checklist

## Pre-deploy state

- [x] `lib/db.ts` (SQLite) deleted; `lib/db-mysql.ts` is the sole async MySQL layer with all tables (`cmsContent`, `submissions`, `admins`, `themeSettings`, `media`, `workItems`, `services`, `blogPosts`).
- [x] All 19 app callers switched to `@/lib/db-mysql` with `await` / `async`.
- [x] `better-sqlite3` removed from `package.json`.
- [x] `next.config.ts` uses `output: 'standalone'` (produces `.next/standalone/server.js`).
- [x] Dangerous `/api/admin/force-init` route deleted.
- [x] Broken `/admin/setup/diagnostic` page deleted.
- [x] Local `npm run build` passes.

## Env vars to set in Hostinger (Advanced → Environment Variables)

```env
DB_HOST=localhost
DB_USER=u653153417_Digibit
DB_PASSWORD=<your MySQL password>
DB_NAME=u653153417_digibit
NEXTAUTH_URL=https://dgbit.co
NEXTAUTH_SECRET=<paste one from `openssl rand -base64 32`>
# optional, only if you want uploads outside public/uploads:
# UPLOAD_DIR=/home/<hostinger-user>/uploads
```

**CRITICAL:** `NEXTAUTH_URL` must have **no trailing slash**. `https://dgbit.co/` (with slash) breaks NextAuth callbacks.

## Deploy steps

1. Push your local changes to the branch Hostinger tracks. Hostinger will pull and run `npm install` + `npm run build` automatically. If it does not, trigger a redeploy manually.
2. Wait ~2 min for the Node process to restart.
3. Verify MySQL DB `u653153417_digibit` exists (Hostinger → Databases → MySQL).
4. Hit **https://dgbit.co/admin/setup/initialize** exactly once. Fill in your admin email/password. This creates all tables, seeds default CMS content, and creates your admin account. The page auto-disables after the first successful run.
5. Log in at **https://dgbit.co/admin/login**.

## Security cleanup before making the site public

- ⚠️ **`/api/admin/reset-password`** has no authentication. Anyone who knows an admin email can POST to it and reset the password. Choose one:
  - Delete `app/api/admin/reset-password/` and `app/admin/setup/reset-password/` entirely.
  - Gate the route with a one-time env-var token (e.g. `RESET_TOKEN`, require it in the request body).
  - Require an active admin session (call `auth()` at the top of the handler).
- Rotate `NEXTAUTH_SECRET` after first successful login (secrets shared in a chat screenshot are considered exposed).
- Rotate `DB_PASSWORD` to something stronger than `Digibit123@`. Hostinger MySQL is `localhost`-only so it's not internet-exposed, but weak local passwords are still a footgun.

## Media / uploads persistence

`app/api/admin/media/route.ts` writes to `UPLOAD_DIR` (defaults to `public/uploads/`) and stores the path `/uploads/<filename>` in the DB. Because the deploy overwrites `public/` on each git pull, **uploaded images will be lost on redeploy** unless you do one of:

1. **Symlink** (simplest): SSH into Hostinger, create `/home/<user>/persistent-uploads/`, then symlink `public/uploads` → that path. Leave `UPLOAD_DIR` unset. Files land inside the symlink → survive redeploys.
2. **Env var + reverse-proxy**: set `UPLOAD_DIR=/home/<user>/persistent-uploads/` and configure Hostinger to serve `/uploads/*` from that dir. More work.
3. **Object store** (S3, R2, Cloudinary): swap the write path in `media/route.ts` for an SDK upload. Best long-term, most work.

None of these block first launch — the site works with default behavior, you just lose uploads on next deploy.

## Troubleshooting

- **503 / 504 after deploy** — env vars missing or MySQL user lacks privileges. Check Hostinger error logs.
- **Login fails / infinite redirect** — check `NEXTAUTH_URL` has no trailing slash.
- **`/admin/setup/initialize` says "already initialized"** — good, admin exists. Go straight to `/admin/login`.
- **Empty pages / no content** — you haven't run the initialize step yet, or DB seed didn't run. Re-hit `/admin/setup/initialize`.
- **502 with `ECONNREFUSED`** — `DB_HOST` wrong or MySQL not started.
