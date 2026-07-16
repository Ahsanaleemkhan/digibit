'use client';

import { usePathname } from 'next/navigation';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CursorBlob from "@/components/CursorBlob";

interface LayoutContentProps {
  children: React.ReactNode;
  headerFooterData?: any;
}

export default function LayoutContent({ children, headerFooterData }: LayoutContentProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    // Admin pages: no nav, no footer, no cursor blob
    return <>{children}</>;
  }

  // Public pages: full layout with data from database
  return (
    <>
      <CursorBlob />
      <Nav 
        logo={headerFooterData?.nav_logo}
        links={headerFooterData?.nav_links}
        ctaLabel={headerFooterData?.nav_cta_label}
      />
      {children}
      <Footer 
        logo={headerFooterData?.footer_logo}
        tagline={headerFooterData?.footer_tagline}
        email={headerFooterData?.footer_email}
        phone={headerFooterData?.footer_phone}
        companyHeading={headerFooterData?.footer_company_heading}
        companyLinks={headerFooterData?.footer_company_links}
        servicesHeading={headerFooterData?.footer_services_heading}
        serviceLinks={headerFooterData?.footer_service_links}
        contactHeading={headerFooterData?.footer_contact_heading}
        bottomLeft={headerFooterData?.footer_bottom_left}
        bottomRight={headerFooterData?.footer_bottom_right}
      />
    </>
  );
}
