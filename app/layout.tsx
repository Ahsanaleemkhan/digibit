import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CursorBlob from "@/components/CursorBlob";

export const metadata: Metadata = {
  title: "Digibit — 360° Marketing, Design & Development",
  description: "We're a full-spectrum agency that designs, builds and grows brands across every surface your customer touches.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorBlob />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
