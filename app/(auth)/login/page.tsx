import Link from 'next/link';
import { AuthForm } from '@/components/forms/auth-form';

export default function LoginPage() {
  return (
    <main className="container" style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <h1>Login</h1>
        <p className="small">Access your workspace and analytics dashboard.</p>
        <AuthForm action="/api/auth/login" mode="login" />
        <p className="small" style={{ marginTop: 16 }}>
          No account? <Link href="/signup">Create one</Link>
        </p>
      </div>
    </main>
  );
}
