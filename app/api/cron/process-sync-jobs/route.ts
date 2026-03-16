import { env } from '@/lib/env';
import { processPendingSyncJobs } from '@/lib/sync-engine/manual-sync';

export async function POST(request: Request) {
  const secret = request.headers.get('x-cron-secret');
  if (secret !== env.CRON_SECRET) return Response.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  const result = await processPendingSyncJobs();
  return Response.json({ ok: true, result });
}
