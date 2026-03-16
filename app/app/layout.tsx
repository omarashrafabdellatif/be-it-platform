import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { getCurrentUser } from '@/lib/auth/session';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <div className="sidebar-layout">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}
