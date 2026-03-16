import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  await prisma.linkedAdAccount.updateMany({ where: { workspaceId: body.workspaceId, platform: 'META', externalAccountId: body.externalAccountId }, data: { status: 'DISCONNECTED' } });
  return Response.json({ ok: true });
}
