import crypto from 'crypto';
import { snapchatConnector } from '@/lib/integrations/snapchat/connector';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId') || '';
  const state = `${workspaceId}:${crypto.randomBytes(8).toString('hex')}`;
  return Response.redirect(snapchatConnector.getAuthUrl(state), 302);
}
