import { prisma } from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';

export default async function ReportsPage() {
  const user = await getCurrentUser();
  const workspaceId = user?.workspaceMemberships[0]?.workspaceId || '';
  const campaigns = await prisma.campaign.findMany({ where: { workspaceId }, include: { linkedAdAccount: true }, orderBy: { createdAt: 'desc' }, take: 20 });

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h1>Reports</h1>
        <p className="small">Campaign-level reporting from normalized data tables.</p>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Platform</th>
              <th>Account</th>
              <th>Status</th>
              <th>Objective</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 ? (
              <tr><td colSpan={5}>No campaigns synced yet.</td></tr>
            ) : campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.campaignName}</td>
                <td>{campaign.platform}</td>
                <td>{campaign.linkedAdAccount.accountName}</td>
                <td>{campaign.status}</td>
                <td>{campaign.objective}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
