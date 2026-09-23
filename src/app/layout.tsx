import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import LenisProvider from "@/components/layout/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Property In Uttarakhand — Premium Plots & Real Estate",
    template: "%s | Property In Uttarakhand",
  },
  description:
    "Discover premium 143-approved plots, highway land, and investment properties in Dehradun, Mussoorie, Rishikesh, and across Uttarakhand.",
  keywords: [
    "Uttarakhand properties",
    "plots in Dehradun",
    "property in Uttarakhand",
    "buy land in Uttarakhand",
    "real estate in Dehradun",
    "highway plots Uttarakhand",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://propertyinuttarakhand.com",
    siteName: "Property In Uttarakhand",
    title: "Property In Uttarakhand — Secure Your Legacy.",
    description:
      "Premium plotted developments and real estate investments in Uttarakhand.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Property In Uttarakhand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property In Uttarakhand",
    description: "Premium plotted developments in Uttarakhand.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  );
}
