'use client';

import { useState } from 'react';

export function AuthForm({ action, mode }: { action: string; mode: 'login' | 'signup' }) {
  const [loading, setLoading] = useState(false);

  return (
    <form action={action} method="post" className="card" onSubmit={() => setLoading(true)}>
      <div className="grid" style={{ gap: 14 }}>
        {mode === 'signup' && (
          <div>
            <label className="label">Full name</label>
            <input className="input" type="text" name="name" required />
          </div>
        )}
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" name="email" required />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" name="password" minLength={8} required />
        </div>
        {mode === 'signup' && (
          <div>
            <label className="label">Workspace name</label>
            <input className="input" type="text" name="workspaceName" required />
          </div>
        )}
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Login'}</button>
      </div>
    </form>
  );
}
