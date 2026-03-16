import { getCurrentUser } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { unauthorized, badRequest } from '@/lib/utils/http';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId');
  if (!workspaceId) return badRequest('workspaceId is required');
  const jobs = await prisma.syncJob.findMany({ where: { workspaceId }, include: { items: true }, orderBy: { createdAt: 'desc' } });
  return Response.json({ ok: true, jobs });
}
