# Hostinger Deployment Guide

## Build settings
- Framework preset: `Next.js`
- Branch: `main`
- Root directory: `./`
- Build command: `npm run build`
- Output directory: `.next`
- Package manager: `npm`

## Required environment variables
Copy values from `.env.example` and fill in real secrets.

### Critical note for DATABASE_URL
If your DB password includes `@`, encode it as `%40`.

Example:
- raw password: `abc@123`
- encoded password: `abc%40123`

Example final URL:
```env
DATABASE_URL="mysql://user:abc%40123@localhost:3306/dbname"
```

## After first successful build
Run one of:
```bash
npx prisma db push
```

Or if using migrations:
```bash
npx prisma migrate deploy
```

## Common build failures

### `sh: 1: prisma: not found`
Cause: `prisma` is not available during Hostinger build.
Fix: keep `prisma` in `dependencies`, not only `devDependencies`.

### `Cannot find module '@prisma/client'`
Cause: Prisma client not generated.
Fix: ensure `postinstall` runs `prisma generate` and build script includes it.

### `Environment variable not found: DATABASE_URL`
Cause: missing env variable on Hostinger.
Fix: add `DATABASE_URL` before build.

### `P1013` or invalid database URL
Cause: malformed `DATABASE_URL`.
Fix: verify username/password/database name and URL-encode special characters in the password.

### TypeScript package missing during build
Cause: Hostinger installs production packages only.
Fix: keep `typescript` and required `@types/*` packages in `dependencies`.
