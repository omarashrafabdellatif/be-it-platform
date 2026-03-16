import Link from 'next/link';

export function MarketingHeader() {
  return (
    <header className="container header">
      <Link href="/" style={{ fontWeight: 700 }}>BE IT Ads</Link>
      <nav className="nav">
        <Link href="/#features">Features</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup" className="btn">Start Free</Link>
      </nav>
    </header>
  );
}
