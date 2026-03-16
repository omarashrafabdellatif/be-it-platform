import Link from 'next/link';

const items = [
  { href: '/app/dashboard', label: 'Dashboard' },
  { href: '/app/integrations', label: 'Integrations' },
  { href: '/app/reports', label: 'Reports' },
  { href: '/app/sync-center', label: 'Sync Center' },
  { href: '/app/settings', label: 'Settings' },
  { href: '/app/workspace', label: 'Workspace' }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ fontWeight: 700, marginBottom: 20 }}>BE IT Ads</div>
      {items.map((item) => (
        <Link key={item.href} href={item.href}>{item.label}</Link>
      ))}
      <form action="/api/auth/logout" method="post" style={{ marginTop: 20 }}>
        <button className="btn secondary" style={{ width: '100%' }} type="submit">Logout</button>
      </form>
    </aside>
  );
}
