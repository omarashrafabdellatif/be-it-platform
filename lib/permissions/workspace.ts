import { prisma } from '@/lib/db/prisma';
import { forbidden } from '@/lib/utils/http';

export async function getMembership(userId: string, workspaceId: string) {
  return prisma.workspaceMember.findFirst({
    where: { userId, workspaceId },
    include: { workspace: true, user: true }
  });
}

export async function requireMembership(userId: string, workspaceId: string) {
  const membership = await getMembership(userId, workspaceId);
  if (!membership) throw forbidden('You do not belong to this workspace');
  return membership;
}
