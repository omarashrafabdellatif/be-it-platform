import { prisma } from '@/lib/db/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  await prisma.platformConnection.update({ where: { workspaceId_platform: { workspaceId: body.workspaceId, platform: 'META' } }, data: { status: 'DISCONNECTED' } });
  return Response.json({ ok: true });
}
