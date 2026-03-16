import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const { workspaceId, rootEntityId, accounts } = body as { workspaceId: string; rootEntityId?: string | null; accounts: Array<{ externalAccountId: string; accountName: string; currency?: string; timezone?: string }>; };
  const connection = await prisma.platformConnection.findUnique({ where: { workspaceId_platform: { workspaceId, platform: 'GOOGLE' } } });
  if (!connection) return Response.json({ ok: false, message: 'Connection not found' }, { status: 400 });
  const linkedAccounts = await Promise.all(accounts.map((account) => prisma.linkedAdAccount.upsert({
    where: { workspaceId_platform_externalAccountId: { workspaceId, platform: 'GOOGLE', externalAccountId: account.externalAccountId } },
    update: { accountName: account.accountName, currency: account.currency, timezone: account.timezone, status: 'ACTIVE' },
    create: { workspaceId, connectionId: connection.id, rootEntityId, platform: 'GOOGLE', externalAccountId: account.externalAccountId, accountName: account.accountName, currency: account.currency, timezone: account.timezone, status: 'ACTIVE' }
  })));
  return Response.json({ ok: true, linkedAccounts });
}
