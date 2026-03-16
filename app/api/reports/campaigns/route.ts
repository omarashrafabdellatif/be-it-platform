import { prisma } from '@/lib/db/prisma';
import { badRequest } from '@/lib/utils/http';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId');
  if (!workspaceId) return badRequest('workspaceId is required');
  const campaigns = await prisma.campaign.findMany({ where: { workspaceId }, include: { linkedAdAccount: true } });
  return Response.json({ ok: true, campaigns });
}
