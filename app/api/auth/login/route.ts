import { prisma } from '@/lib/db/prisma';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response('Invalid credentials', { status: 401 });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return new Response('Invalid credentials', { status: 401 });

  await createSession(user.id);
  return Response.redirect(new URL('/app/dashboard', request.url), 302);
}
