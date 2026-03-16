import crypto from 'crypto';
import { tiktokConnector } from '@/lib/integrations/tiktok/connector';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId') || '';
  const state = `${workspaceId}:${crypto.randomBytes(8).toString('hex')}`;
  return Response.redirect(tiktokConnector.getAuthUrl(state), 302);
}
