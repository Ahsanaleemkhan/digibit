'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DIGIBIT_MARK = (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <path d="M4 6 C4 4.9 4.9 4 6 4 L20 4 C28.8 4 36 11.2 36 20 C36 28.8 28.8 36 20 36 L6 36 C4.9 36 4 35.1 4 34 Z" fill="#1a1f5c"/>
    <circle cx="20" cy="20" r="9" fill="#f6f5f0"/>
    <circle cx="20" cy="20" r="4" fill="#2bb6ea"/>
    <path d="M30 11 C33 14 34.5 16.8 34.5 20 C34.5 23.2 33 26 30 29" stroke="#2bb6ea" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
);

const defaultLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/careers', label: 'Careers' },
];

interface NavProps {
  logo?: string;
  links?: { href: string; label: string }[];
  ctaLabel?: string;
}

export default function Nav({ logo, links, ctaLabel }: NavProps) {
  const pathname = usePathname();
  const navLinks = links ?? defaultLinks;
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          {logo ? (
            <img src={logo} alt="Logo" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
          ) : (
            <>
              <span className="nav-brand-mark">{DIGIBIT_MARK}</span>
              <span>digibit</span>
            </>
          )}
        </Link>
        <div className="nav-links">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className={`nav-link${pathname === l.href ? ' active' : ''}`}>{l.label}</Link>
          ))}
        </div>
        <Link href="/contact" className="nav-cta">
          {ctaLabel || 'Start a project'}
          <span className="arrow">→</span>
        </Link>
      </div>
    </nav>
  );
}
