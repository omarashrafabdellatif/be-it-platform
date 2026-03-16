import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from '@/lib/db/prisma';
import { env } from '@/lib/env';

const COOKIE_NAME = 'beit_session';

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + env.SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  });

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/'
  });
}

export async function clearSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
  cookies().delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: { token, expiresAt: { gt: new Date() } },
    include: {
      user: {
        include: {
          workspaceMemberships: {
            include: { workspace: true }
          }
        }
      }
    }
  });

  return session?.user ?? null;
}
