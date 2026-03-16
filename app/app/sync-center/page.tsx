import { prisma } from '@/lib/db/prisma';
import { getCurrentUser } from '@/lib/auth/session';

export default async function SyncCenterPage() {
  const user = await getCurrentUser();
  const workspaceId = user?.workspaceMemberships[0]?.workspaceId || '';
  const jobs = await prisma.syncJob.findMany({ where: { workspaceId }, include: { items: true }, orderBy: { createdAt: 'desc' }, take: 20 });

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h1>Sync Center</h1>
        <p className="small">Monitor manual and scheduled sync jobs.</p>
      </div>
      <div className="notice">Use POST /api/sync/manual with workspaceId + platform to enqueue a sync job.</div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Status</th>
              <th>Items</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr><td colSpan={4}>No sync jobs yet.</td></tr>
            ) : jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.platform}</td>
                <td>{job.status}</td>
                <td>{job.items.length}</td>
                <td>{job.createdAt.toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
