import { prisma } from '@/lib/db/prisma';

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  await prisma.syncJobItem.updateMany({ where: { syncJobId: params.id, status: 'FAILED' }, data: { status: 'RETRYING', lastError: null } });
  await prisma.syncJob.update({ where: { id: params.id }, data: { status: 'PENDING', finishedAt: null } });
  return Response.json({ ok: true });
}
