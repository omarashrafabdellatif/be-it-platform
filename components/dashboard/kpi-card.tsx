export function KpiCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="kpi">
      <div className="small">{label}</div>
      <strong>{value}</strong>
      {hint ? <div className="small">{hint}</div> : null}
    </div>
  );
}
