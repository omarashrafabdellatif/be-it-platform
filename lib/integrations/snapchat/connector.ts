import { env } from '@/lib/env';
import type { AdPlatformConnector } from '@/lib/integrations/core/types';
import { mockAdAccounts, mockCampaigns, mockMetrics, mockRootEntities } from '@/lib/integrations/core/mock-helper';

export const snapchatConnector: AdPlatformConnector = {
  platform: 'SNAPCHAT',
  getAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: env.SNAPCHAT_CLIENT_ID || 'snapchat-client-id',
      redirect_uri: env.SNAPCHAT_REDIRECT_URI || `${env.APP_URL}/api/integrations/snapchat/callback`,
      response_type: 'code',
      scope: 'snapchat-marketing-api',
      state
    });
    return `https://accounts.snapchat.com/login/oauth2/authorize?${params.toString()}`;
  },
  async exchangeCode(code: string) {
    return { accessToken: `snapchat-token-${code}`, platformUserId: 'snapchat-user-demo' };
  },
  async fetchRootEntities() {
    return mockRootEntities('snapchat');
  },
  async fetchAdAccounts() {
    return mockAdAccounts('snapchat');
  },
  async fetchCampaigns() {
    return mockCampaigns('snapchat');
  },
  async fetchMetrics() {
    return mockMetrics();
  }
};
