# BE IT Ads Intelligence Platform

Phase 1 MVP scaffold for a public multi-tenant SaaS built with Next.js, Prisma, and MySQL for Hostinger deployment.

## Included
- Public signup/login/logout
- Default workspace creation on signup
- Workspace-based isolation model in Prisma schema
- Dashboard skeleton
- Integrations UI and OAuth scaffolding for Meta / Google / TikTok / Snapchat
- Manual sync job creation
- Report endpoints
- Cron endpoints for job processing
- Hostinger-ready single Next.js app structure

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Push schema: `npm run prisma:push`
5. Seed demo data: `npm run seed`
6. Run locally: `npm run dev`

## Hostinger deployment
- Framework preset: Next.js
- Root directory: `./`
- Build command: `npm run build`
- Output directory: `.next`
- Node version: 20.x or 22.x

## Important
OAuth connectors are scaffolded and ready for credentials, but production API approval and exact scopes must be completed in each platform developer console.



## Hostinger deployment notes

This project is structured for **Hostinger Node.js Web App** deployment.

### Required root files
- `package.json`
- `next.config.js`
- `app/`
- `prisma/`
- `.env.example`

### Important build notes
- `prisma` is installed in runtime dependencies so Hostinger can run `prisma generate` during build.
- The build script is:
  - `npm run build`
- The start script is:
  - `npm run start`

### Environment variable warning
If your MySQL password contains special characters such as `@`, `:`, `/`, `?`, `#`, or `%`, you **must URL-encode it** inside `DATABASE_URL`.

Example:

```env
DATABASE_URL="mysql://db_user:mypass%40123@localhost:3306/db_name"
```

If the password is `mypass@123`, the `@` must become `%40`.

### Suggested first deployment flow
1. Push the code to GitHub.
2. Import the repo into Hostinger Node.js Web App.
3. Add environment variables.
4. Run the build.
5. If build succeeds, run:
   - `npx prisma db push`
   or
   - `npx prisma migrate deploy`
6. Start the app.
