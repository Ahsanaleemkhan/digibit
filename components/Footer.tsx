import Link from 'next/link';

const DIGIBIT_MARK = (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <path d="M4 6 C4 4.9 4.9 4 6 4 L20 4 C28.8 4 36 11.2 36 20 C36 28.8 28.8 36 20 36 L6 36 C4.9 36 4 35.1 4 34 Z" fill="#1a1f5c"/>
    <circle cx="20" cy="20" r="9" fill="#f6f5f0"/>
    <circle cx="20" cy="20" r="4" fill="#2bb6ea"/>
    <path d="M30 11 C33 14 34.5 16.8 34.5 20 C34.5 23.2 33 26 30 29" stroke="#2bb6ea" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
);

interface FooterProps {
  tagline?: string;
  email?: string;
  phone?: string;
  companyLinks?: { label: string; href: string }[];
  serviceLinks?: { label: string; href: string }[];
  bottomLeft?: string;
  bottomRight?: string;
}

export default function Footer({
  tagline,
  email,
  phone,
  companyLinks,
  serviceLinks,
  bottomLeft,
  bottomRight,
}: FooterProps) {
  const emailAddr = email || 'hello@digibit.co';
  const phoneNum = phone || '+1 (415) 555-0142';
  const cLinks = companyLinks || [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Our work', href: '/work' },
    { label: 'Insights', href: '/insights' },
  ];
  const sLinks = serviceLinks || [
    { label: 'Brand & Strategy', href: '/services' },
    { label: 'Websites & Apps', href: '/services' },
    { label: 'Paid Media', href: '/services' },
    { label: 'Social & Content', href: '/services' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
              {DIGIBIT_MARK}
              <span style={{fontFamily:'var(--font-display)',fontSize:'22px',fontWeight:600,letterSpacing:'-0.02em'}}>digibit</span>
            </div>
            <p style={{color:'rgba(246,245,240,0.65)',fontSize:'15px',maxWidth:'30ch',lineHeight:1.55,margin:0}}>
              {tagline || 'The full 360° agency. We build brands, websites, apps, and the marketing engines that feed them.'}
            </p>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              {cLinks.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              {sLinks.map((l, i) => <li key={i}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Get in touch</h5>
            <ul>
              <li><a href={`mailto:${emailAddr}`}>{emailAddr}</a></li>
              <li><a href={`tel:${phoneNum.replace(/[^+\d]/g,'')}`}>{phoneNum}</a></li>
              <li style={{marginTop:'18px'}}>
                <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 16px',background:'var(--cyan)',color:'var(--ink)',borderRadius:'var(--r-pill)',fontWeight:500}}>
                  Start a project →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-wordmark">digibit</div>
        <div className="footer-bottom">
          <span>{bottomLeft || '© 2026 Digibit Studio. All rights reserved.'}</span>
          <span>{bottomRight || 'Made with care. Powered by curiosity.'}</span>
        </div>
      </div>
    </footer>
  );
}
