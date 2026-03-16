import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BE IT Ads Intelligence Platform',
  description: 'Public multi-tenant SaaS for ad analytics and integrations.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
