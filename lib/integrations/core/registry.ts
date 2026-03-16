import { googleConnector } from '@/lib/integrations/google/connector';
import { metaConnector } from '@/lib/integrations/meta/connector';
import { snapchatConnector } from '@/lib/integrations/snapchat/connector';
import { tiktokConnector } from '@/lib/integrations/tiktok/connector';
import type { Platform } from '@/types';

export function getConnector(platform: Platform) {
  switch (platform) {
    case 'META':
      return metaConnector;
    case 'GOOGLE':
      return googleConnector;
    case 'TIKTOK':
      return tiktokConnector;
    case 'SNAPCHAT':
      return snapchatConnector;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}
