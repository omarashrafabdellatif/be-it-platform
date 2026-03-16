import { getCurrentUser } from '@/lib/auth/session';

export default async function WorkspacePage() {
  const user = await getCurrentUser();
  const memberships = user?.workspaceMemberships ?? [];

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h1>Workspace</h1>
        <p className="small">Your memberships and current roles.</p>
      </div>
      {memberships.map((membership) => (
        <div className="card" key={membership.id}>
          <strong>{membership.workspace.name}</strong>
          <div className="small">Role: {membership.role}</div>
          <div className="small">Workspace ID: {membership.workspaceId}</div>
        </div>
      ))}
    </div>
  );
}
