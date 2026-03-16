import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { badRequest, unauthorized } from '@/lib/utils/http';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const memberships = await prisma.workspaceMember.findMany({ where: { userId: user.id }, include: { workspace: true } });
  return Response.json({ ok: true, workspaces: memberships.map((m) => ({ id: m.workspace.id, name: m.workspace.name, role: m.role })) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json();
  const name = String(body.name || '').trim();
  if (!name) return badRequest('Workspace name is required');

  const workspace = await prisma.workspace.create({
    data: {
      name,
      slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'workspace'}-${Date.now()}`,
      ownerUserId: user.id,
      members: { create: { userId: user.id, role: 'OWNER' } }
    }
  });

  return Response.json({ ok: true, workspace });
}
