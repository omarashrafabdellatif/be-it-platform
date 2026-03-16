import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@be-it.site';
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Demo User', passwordHash: await bcrypt.hash('Password123!', 12) }
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: { name: 'Demo Workspace', slug: 'demo-workspace', ownerUserId: user.id }
  });

  await prisma.workspaceMember.upsert({
    where: { workspaceId_userId: { workspaceId: workspace.id, userId: user.id } },
    update: { role: 'OWNER' },
    create: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' }
  });
}

main().finally(async () => { await prisma.$disconnect(); });
