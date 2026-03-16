import { KpiCard } from '@/components/dashboard/kpi-card';
import { getCurrentUser } from '@/lib/auth/session';
import { getWorkspaceOverview } from '@/lib/analytics/kpis';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const workspaceId = user?.workspaceMemberships[0]?.workspaceId;
  const overview = workspaceId ? await getWorkspaceOverview(workspaceId) : null;

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h1>Dashboard</h1>
        <p className="small">Unified analytics for your active workspace.</p>
      </div>
      <div className="grid grid-4">
        <KpiCard label="Total Spend" value={`$${overview?.spend.toFixed(2) ?? '0.00'}`} />
        <KpiCard label="Impressions" value={String(overview?.impressions ?? 0)} />
        <KpiCard label="Clicks" value={String(overview?.clicks ?? 0)} />
        <KpiCard label="Conversions" value={String(overview?.conversions ?? 0)} />
        <KpiCard label="CTR" value={`${overview?.ctr.toFixed(2) ?? '0.00'}%`} />
        <KpiCard label="CPA" value={`$${overview?.cpa.toFixed(2) ?? '0.00'}`} />
        <KpiCard label="ROAS" value={`${overview?.roas.toFixed(2) ?? '0.00'}x`} />
        <KpiCard label="Revenue" value={`$${overview?.revenue.toFixed(2) ?? '0.00'}`} />
      </div>
      <div className="card">
        <h2>Phase 1 note</h2>
        <p className="small">This page uses normalized daily_metrics from the database. Add more widgets and visual charts after deployment is stable.</p>
      </div>
    </div>
  );
}
