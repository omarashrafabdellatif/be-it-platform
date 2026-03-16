import { getCurrentUser } from '@/lib/auth/session';
import { queueManualSync } from '@/lib/sync-engine/manual-sync';
import { unauthorized, badRequest } from '@/lib/utils/http';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const body = await request.json();
  if (!body.workspaceId || !body.platform) return badRequest('workspaceId and platform are required');
  const job = await queueManualSync(body.workspaceId, body.platform, user.id);
  return Response.json({ ok: true, job });
}
