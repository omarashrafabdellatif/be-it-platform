import crypto from 'crypto';
import { metaConnector } from '@/lib/integrations/meta/connector';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId') || '';
  const state = `${workspaceId}:${crypto.randomBytes(8).toString('hex')}`;
  return Response.redirect(metaConnector.getAuthUrl(state), 302);
}
