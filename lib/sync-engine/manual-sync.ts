import { prisma } from '@/lib/db/prisma';
import { getConnector } from '@/lib/integrations/core/registry';
import type { Platform } from '@/types';

export async function queueManualSync(workspaceId: string, platform: Platform, userId: string) {
  const linkedAccounts = await prisma.linkedAdAccount.findMany({
    where: { workspaceId, platform, status: 'ACTIVE' }
  });

  const syncJob = await prisma.syncJob.create({
    data: {
      workspaceId,
      platform,
      jobType: 'MANUAL',
      triggerType: 'USER',
      status: 'PENDING',
      createdByUserId: userId,
      items: {
        create: linkedAccounts.map((account) => ({
          workspaceId,
          platform,
          linkedAdAccountId: account.id,
          dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          dateTo: new Date(),
          entityType: 'DAILY_METRICS',
          status: 'PENDING'
        }))
      }
    },
    include: { items: true }
  });

  return syncJob;
}

export async function processPendingSyncJobs(limit = 5) {
  const items = await prisma.syncJobItem.findMany({
    where: { status: { in: ['PENDING', 'RETRYING'] } },
    orderBy: { createdAt: 'asc' },
    take: limit,
    include: {
      linkedAdAccount: true,
      syncJob: true
    }
  });

  for (const item of items) {
    await prisma.syncJobItem.update({ where: { id: item.id }, data: { status: 'PROCESSING', startedAt: new Date() } });

    try {
      const connection = await prisma.platformConnection.findFirst({
        where: {
          workspaceId: item.workspaceId,
          platform: item.platform,
          status: 'ACTIVE'
        }
      });

      if (!connection) throw new Error('Active platform connection not found');

      const connector = getConnector(item.platform as Platform);
      const campaigns = await connector.fetchCampaigns(connection.accessToken, item.linkedAdAccount.externalAccountId);
      const metrics = await connector.fetchMetrics(
        connection.accessToken,
        item.linkedAdAccount.externalAccountId,
        item.dateFrom.toISOString().slice(0, 10),
        item.dateTo.toISOString().slice(0, 10)
      );

      for (const campaign of campaigns) {
        await prisma.campaign.upsert({
          where: {
            workspaceId_platform_externalCampaignId: {
              workspaceId: item.workspaceId,
              platform: item.platform,
              externalCampaignId: campaign.externalCampaignId
            }
          },
          update: {
            campaignName: campaign.name,
            status: campaign.status,
            objective: campaign.objective
          },
          create: {
            workspaceId: item.workspaceId,
            platform: item.platform,
            linkedAdAccountId: item.linkedAdAccount.id,
            externalCampaignId: campaign.externalCampaignId,
            campaignName: campaign.name,
            status: campaign.status,
            objective: campaign.objective
          }
        });
      }

      const firstCampaign = await prisma.campaign.findFirst({
        where: { workspaceId: item.workspaceId, linkedAdAccountId: item.linkedAdAccount.id },
        orderBy: { createdAt: 'asc' }
      });

      for (const metric of metrics) {
        await prisma.dailyMetric.create({
          data: {
            workspaceId: item.workspaceId,
            platform: item.platform,
            linkedAdAccountId: item.linkedAdAccount.id,
            campaignId: firstCampaign?.id,
            metricDate: new Date(metric.date),
            spend: metric.spend,
            impressions: metric.impressions,
            reach: metric.reach ?? 0,
            clicks: metric.clicks,
            ctr: metric.ctr ?? 0,
            cpc: metric.cpc ?? 0,
            cpm: metric.cpm ?? 0,
            conversions: metric.conversions ?? 0,
            revenue: metric.revenue ?? 0,
            roas: metric.roas ?? 0
          }
        });
      }

      await prisma.syncJobItem.update({
        where: { id: item.id },
        data: { status: 'COMPLETED', finishedAt: new Date(), lastError: null }
      });
    } catch (error) {
      await prisma.syncJobItem.update({
        where: { id: item.id },
        data: {
          status: item.attempts >= 2 ? 'FAILED' : 'RETRYING',
          attempts: { increment: 1 },
          lastError: error instanceof Error ? error.message : 'Unknown error',
          finishedAt: new Date()
        }
      });
    }
  }

  const affectedJobs = [...new Set(items.map((item) => item.syncJobId))];
  for (const jobId of affectedJobs) {
    const jobItems = await prisma.syncJobItem.findMany({ where: { syncJobId: jobId } });
    const hasFailed = jobItems.some((item) => item.status === 'FAILED');
    const hasPending = jobItems.some((item) => ['PENDING', 'PROCESSING', 'RETRYING'].includes(item.status));
    const hasCompleted = jobItems.some((item) => item.status === 'COMPLETED');

    let status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PARTIAL' = 'RUNNING';
    if (!hasPending && hasFailed && hasCompleted) status = 'PARTIAL';
    else if (!hasPending && hasFailed && !hasCompleted) status = 'FAILED';
    else if (!hasPending && !hasFailed) status = 'COMPLETED';

    await prisma.syncJob.update({
      where: { id: jobId },
      data: {
        status,
        startedAt: new Date(),
        finishedAt: !hasPending ? new Date() : null
      }
    });
  }

  return { processed: items.length };
}
