import { env } from '@/lib/env';
import type { AdPlatformConnector } from '@/lib/integrations/core/types';
import { mockAdAccounts, mockCampaigns, mockMetrics, mockRootEntities } from '@/lib/integrations/core/mock-helper';

export const googleConnector: AdPlatformConnector = {
  platform: 'GOOGLE',
  getAuthUrl(state: string) {
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID || 'google-client-id',
      redirect_uri: env.GOOGLE_REDIRECT_URI || `${env.APP_URL}/api/integrations/google/callback`,
      scope: 'https://www.googleapis.com/auth/adwords',
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
      state
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },
  async exchangeCode(code: string) {
    return { accessToken: `google-token-${code}`, refreshToken: `google-refresh-${code}`, expiresAt: new Date(Date.now() + 3500 * 1000), platformUserId: 'google-user-demo' };
  },
  async fetchRootEntities() {
    return mockRootEntities('google');
  },
  async fetchAdAccounts() {
    return mockAdAccounts('google');
  },
  async fetchCampaigns() {
    return mockCampaigns('google');
  },
  async fetchMetrics() {
    return mockMetrics();
  }
};
