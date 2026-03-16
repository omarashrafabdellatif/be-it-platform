import type { AdAccountPayload, CampaignPayload, MetricsPayload, RootEntity } from './types';

export function mockRootEntities(prefix: string): RootEntity[] {
  return [
    { externalId: `${prefix}-entity-1`, entityType: 'BUSINESS', name: `${prefix} Business 1` },
    { externalId: `${prefix}-entity-2`, entityType: 'BUSINESS', name: `${prefix} Business 2` }
  ];
}

export function mockAdAccounts(prefix: string): AdAccountPayload[] {
  return [
    { externalAccountId: `${prefix}-acc-1`, accountName: `${prefix} Account 1`, currency: 'USD', timezone: 'UTC' },
    { externalAccountId: `${prefix}-acc-2`, accountName: `${prefix} Account 2`, currency: 'SAR', timezone: 'Asia/Riyadh' }
  ];
}

export function mockCampaigns(prefix: string): CampaignPayload[] {
  return [
    { externalCampaignId: `${prefix}-camp-1`, name: `${prefix} Campaign 1`, status: 'ACTIVE', objective: 'CONVERSIONS' },
    { externalCampaignId: `${prefix}-camp-2`, name: `${prefix} Campaign 2`, status: 'PAUSED', objective: 'TRAFFIC' }
  ];
}

export function mockMetrics(): MetricsPayload[] {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    return {
      date: date.toISOString().slice(0, 10),
      spend: 100 + index * 12,
      impressions: 10000 + index * 1000,
      reach: 8000 + index * 800,
      clicks: 250 + index * 18,
      ctr: 2.5,
      cpc: 0.8,
      cpm: 12,
      conversions: 15 + index,
      revenue: 400 + index * 25,
      roas: 4
    };
  });
}
