import { prisma } from '@/lib/db/prisma';
import { badRequest } from '@/lib/utils/http';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId');
  if (!workspaceId) return badRequest('workspaceId is required');
  const trends = await prisma.dailyMetric.findMany({ where: { workspaceId }, orderBy: { metricDate: 'asc' }, take: 90 });
  return Response.json({ ok: true, trends });
}
