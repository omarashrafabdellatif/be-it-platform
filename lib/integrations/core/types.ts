import { Platform } from '@/types';

export type RootEntity = {
  externalId: string;
  entityType: string;
  name: string;
  metadata?: Record<string, unknown>;
};

export type AdAccountPayload = {
  externalAccountId: string;
  accountName: string;
  currency?: string;
  timezone?: string;
};

export type CampaignPayload = {
  externalCampaignId: string;
  name: string;
  status?: string;
  objective?: string;
};

export type MetricsPayload = {
  date: string;
  spend: number;
  impressions: number;
  reach?: number;
  clicks: number;
  ctr?: number;
  cpc?: number;
  cpm?: number;
  conversions?: number;
  revenue?: number;
  roas?: number;
};

export interface AdPlatformConnector {
  platform: Platform;
  getAuthUrl(state: string): string;
  exchangeCode(code: string): Promise<{ accessToken: string; refreshToken?: string; expiresAt?: Date; platformUserId?: string }>;
  fetchRootEntities(accessToken: string): Promise<RootEntity[]>;
  fetchAdAccounts(accessToken: string, rootExternalId?: string): Promise<AdAccountPayload[]>;
  fetchCampaigns(accessToken: string, accountExternalId: string): Promise<CampaignPayload[]>;
  fetchMetrics(accessToken: string, accountExternalId: string, dateFrom: string, dateTo: string): Promise<MetricsPayload[]>;
}
