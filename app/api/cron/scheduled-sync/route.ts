import { env } from '@/lib/env';

export async function POST(request: Request) {
  const secret = request.headers.get('x-cron-secret');
  if (secret !== env.CRON_SECRET) return Response.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  return Response.json({ ok: true, message: 'Scheduled sync scaffold ready. Queue recurring jobs here.' });
}
