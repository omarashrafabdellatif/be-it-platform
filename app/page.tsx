import Link from 'next/link';
import { MarketingHeader } from '@/components/layout/marketing-header';

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main className="container hero">
        <span className="badge">Public SaaS · Multi-Tenant · Hostinger Ready</span>
        <h1>Connect ad accounts, sync performance, and analyze growth from one dashboard.</h1>
        <p>
          BE IT Ads Intelligence Platform is built for marketers, agencies, and teams who want one place to connect Meta,
          Google, TikTok, and Snapchat accounts with secure workspace isolation.
        </p>
        <div className="nav" style={{ marginTop: 24 }}>
          <Link href="/signup" className="btn">Start Free</Link>
          <Link href="/login" className="btn secondary">Login</Link>
        </div>
        <section id="features" className="grid grid-3" style={{ marginTop: 42 }}>
          <div className="card"><strong>Workspace isolation</strong><p className="small">Every account and report is scoped by workspace_id.</p></div>
          <div className="card"><strong>Platform connectors</strong><p className="small">Meta and Google implemented first, TikTok and Snapchat scaffolded.</p></div>
          <div className="card"><strong>Scalable sync jobs</strong><p className="small">MySQL queue + cron processing designed for Hostinger.</p></div>
        </section>
      </main>
    </>
  );
}
