import crypto from 'crypto';
import { googleConnector } from '@/lib/integrations/google/connector';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId') || '';
  const state = `${workspaceId}:${crypto.randomBytes(8).toString('hex')}`;
  return Response.redirect(googleConnector.getAuthUrl(state), 302);
}
