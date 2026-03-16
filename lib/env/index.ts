import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  APP_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(16),
  SESSION_SECRET: z.string().min(16),
  SESSION_EXPIRY_DAYS: z.coerce.number().default(7),
  ENCRYPTION_KEY: z.string().min(16),
  CRON_SECRET: z.string().min(8),
  MARKETING_URL: z.string().url().optional(),
  META_APP_ID: z.string().optional(),
  META_APP_SECRET: z.string().optional(),
  META_REDIRECT_URI: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REDIRECT_URI: z.string().url().optional(),
  TIKTOK_CLIENT_ID: z.string().optional(),
  TIKTOK_CLIENT_SECRET: z.string().optional(),
  TIKTOK_REDIRECT_URI: z.string().url().optional(),
  SNAPCHAT_CLIENT_ID: z.string().optional(),
  SNAPCHAT_CLIENT_SECRET: z.string().optional(),
  SNAPCHAT_REDIRECT_URI: z.string().url().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

export const env = envSchema.parse(process.env);
