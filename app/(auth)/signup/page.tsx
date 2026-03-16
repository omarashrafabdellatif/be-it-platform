import Link from 'next/link';
import { AuthForm } from '@/components/forms/auth-form';

export default function SignupPage() {
  return (
    <main className="container" style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <h1>Create your account</h1>
        <p className="small">Sign up, create your default workspace, and start connecting ad platforms.</p>
        <AuthForm action="/api/auth/signup" mode="signup" />
        <p className="small" style={{ marginTop: 16 }}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
