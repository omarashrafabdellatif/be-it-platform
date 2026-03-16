import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';

const platforms = [
  { key: 'META', label: 'Meta Ads' },
  { key: 'GOOGLE', label: 'Google Ads' },
  { key: 'TIKTOK', label: 'TikTok Ads' },
  { key: 'SNAPCHAT', label: 'Snapchat Ads' }
] as const;

export default async function IntegrationsPage() {
  const user = await getCurrentUser();
  const workspaceId = user?.workspaceMemberships[0]?.workspaceId || '';
  const connections = await prisma.platformConnection.findMany({ where: { workspaceId } });

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h1>Integrations</h1>
        <p className="small">Connect ad platforms, fetch entities, and link ad accounts.</p>
      </div>
      <div className="grid grid-2">
        {platforms.map((platform) => {
          const connection = connections.find((row) => row.platform === platform.key);
          return (
            <div className="card" key={platform.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{platform.label}</strong>
                  <div className="small">Status: {connection?.status ?? 'NOT_CONNECTED'}</div>
                </div>
                <Link className="btn" href={`/api/integrations/${platform.key.toLowerCase()}/connect?workspaceId=${workspaceId}`}>
                  {connection ? 'Reconnect' : 'Connect'}
                </Link>
              </div>
              <div className="small" style={{ marginTop: 12 }}>
                OAuth callback, entities, ad accounts, and link/unlink routes are scaffolded.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
