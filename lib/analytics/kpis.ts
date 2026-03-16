import { prisma } from '@/lib/db/prisma';

export async function getWorkspaceOverview(workspaceId: string) {
  const metrics = await prisma.dailyMetric.findMany({ where: { workspaceId } });

  const totals = metrics.reduce(
    (acc, row) => {
      acc.spend += Number(row.spend);
      acc.impressions += row.impressions;
      acc.clicks += row.clicks;
      acc.conversions += Number(row.conversions);
      acc.revenue += Number(row.revenue);
      return acc;
    },
    { spend: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0 }
  );

  const ctr = totals.impressions ? (totals.clicks / totals.impressions) * 100 : 0;
  const cpa = totals.conversions ? totals.spend / totals.conversions : 0;
  const roas = totals.spend ? totals.revenue / totals.spend : 0;
  const cpc = totals.clicks ? totals.spend / totals.clicks : 0;
  const cpm = totals.impressions ? (totals.spend / totals.impressions) * 1000 : 0;

  return {
    ...totals,
    ctr,
    cpa,
    roas,
    cpc,
    cpm
  };
}
