import { prisma } from '@/lib/db/prisma';
import { badRequest } from '@/lib/utils/http';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId');
  if (!workspaceId) return badRequest('workspaceId is required');
  const items = await prisma.dailyMetric.groupBy({ by: ['platform'], where: { workspaceId }, _sum: { spend: true, revenue: true, impressions: true, clicks: true, conversions: true } });
  return Response.json({ ok: true, items });
}
