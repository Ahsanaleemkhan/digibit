import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./providers";
import LayoutContent from "./LayoutContent";
import { getPageData } from "@/lib/graphql";

export const metadata: Metadata = {
  title: "Digibit — 360° Marketing, Design & Development",
  description: "We're a full-spectrum agency that designs, builds and grows brands across every surface your customer touches.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch header/footer data
  const headerFooterData = await getPageData('header_footer');
  
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutContent headerFooterData={headerFooterData}>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}

