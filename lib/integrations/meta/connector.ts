import { env } from '@/lib/env';
import type { AdPlatformConnector } from '@/lib/integrations/core/types';
import { mockAdAccounts, mockCampaigns, mockMetrics, mockRootEntities } from '@/lib/integrations/core/mock-helper';

export const metaConnector: AdPlatformConnector = {
  platform: 'META',
  getAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: env.META_APP_ID || 'meta-app-id',
      redirect_uri: env.META_REDIRECT_URI || `${env.APP_URL}/api/integrations/meta/callback`,
      scope: 'ads_read,business_management',
      response_type: 'code',
      state
    });
    return `https://www.facebook.com/v20.0/dialog/oauth?${params.toString()}`;
  },
  async exchangeCode(code: string) {
    return { accessToken: `meta-token-${code}`, expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), platformUserId: 'meta-user-demo' };
  },
  async fetchRootEntities() {
    return mockRootEntities('meta');
  },
  async fetchAdAccounts() {
    return mockAdAccounts('meta');
  },
  async fetchCampaigns() {
    return mockCampaigns('meta');
  },
  async fetchMetrics() {
    return mockMetrics();
  }
};
