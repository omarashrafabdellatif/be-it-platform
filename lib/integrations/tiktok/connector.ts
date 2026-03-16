import { env } from '@/lib/env';
import type { AdPlatformConnector } from '@/lib/integrations/core/types';
import { mockAdAccounts, mockCampaigns, mockMetrics, mockRootEntities } from '@/lib/integrations/core/mock-helper';

export const tiktokConnector: AdPlatformConnector = {
  platform: 'TIKTOK',
  getAuthUrl(state: string) {
    const params = new URLSearchParams({
      app_id: env.TIKTOK_CLIENT_ID || 'tiktok-client-id',
      redirect_uri: env.TIKTOK_REDIRECT_URI || `${env.APP_URL}/api/integrations/tiktok/callback`,
      state
    });
    return `https://ads.tiktok.com/marketing_api/auth?${params.toString()}`;
  },
  async exchangeCode(code: string) {
    return { accessToken: `tiktok-token-${code}`, platformUserId: 'tiktok-user-demo' };
  },
  async fetchRootEntities() {
    return mockRootEntities('tiktok');
  },
  async fetchAdAccounts() {
    return mockAdAccounts('tiktok');
  },
  async fetchCampaigns() {
    return mockCampaigns('tiktok');
  },
  async fetchMetrics() {
    return mockMetrics();
  }
};
