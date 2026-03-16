export default function SettingsPage() {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h1>Settings</h1>
        <p className="small">Manage workspace settings, domain URLs, credentials, and future billing options.</p>
      </div>
      <div className="card">
        <ul className="small">
          <li>Workspace profile</li>
          <li>Platform connection management</li>
          <li>Email settings</li>
          <li>Security and future team management</li>
        </ul>
      </div>
    </div>
  );
}
