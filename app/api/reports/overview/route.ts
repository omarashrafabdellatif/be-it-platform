import { getCurrentUser } from '@/lib/auth/session';
import { getWorkspaceOverview } from '@/lib/analytics/kpis';
import { badRequest, unauthorized } from '@/lib/utils/http';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId');
  if (!workspaceId) return badRequest('workspaceId is required');
  const overview = await getWorkspaceOverview(workspaceId);
  return Response.json({ ok: true, overview });
}
