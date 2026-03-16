import { prisma } from '@/lib/db/prisma';
import { googleConnector } from '@/lib/integrations/google/connector';
import { badRequest } from '@/lib/utils/http';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const workspaceId = url.searchParams.get('workspaceId');
  const rootExternalId = url.searchParams.get('rootExternalId') || undefined;
  if (!workspaceId) return badRequest('workspaceId is required');
  const connection = await prisma.platformConnection.findUnique({ where: { workspaceId_platform: { workspaceId, platform: 'GOOGLE' } } });
  if (!connection) return badRequest('Connection not found');
  const accounts = await googleConnector.fetchAdAccounts(connection.accessToken, rootExternalId);
  return Response.json({ ok: true, accounts });
}
