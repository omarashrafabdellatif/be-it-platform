import { prisma } from '@/lib/db/prisma';
import { googleConnector } from '@/lib/integrations/google/connector';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code') || 'demo';
  const state = url.searchParams.get('state') || '';
  const workspaceId = state.split(':')[0];
  const token = await googleConnector.exchangeCode(code);

  await prisma.platformConnection.upsert({
    where: { workspaceId_platform: { workspaceId, platform: 'GOOGLE' } },
    update: { accessToken: token.accessToken, refreshToken: token.refreshToken, tokenExpiresAt: token.expiresAt, platformUserId: token.platformUserId, status: 'ACTIVE' },
    create: { workspaceId, platform: 'GOOGLE', accessToken: token.accessToken, refreshToken: token.refreshToken, tokenExpiresAt: token.expiresAt, platformUserId: token.platformUserId, status: 'ACTIVE' }
  });
  return Response.redirect(new URL('/app/integrations', request.url), 302);
}
