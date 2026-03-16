import { prisma } from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const password = String(form.get('password') || '');
  const name = String(form.get('name') || '').trim();
  const workspaceName = String(form.get('workspaceName') || '').trim();

  if (!email || !password || !workspaceName) {
    return new Response('Missing required fields', { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response('Email already exists', { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, name, passwordHash }
  });

  const slugBase = workspaceName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'workspace';
  const workspace = await prisma.workspace.create({
    data: {
      name: workspaceName,
      slug: `${slugBase}-${Date.now()}`,
      ownerUserId: user.id
    }
  });

  await prisma.workspaceMember.create({
    data: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' }
  });

  await createSession(user.id);
  return Response.redirect(new URL('/app/dashboard', request.url), 302);
}
