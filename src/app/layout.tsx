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
    default: "Himalayan Estates — Premium Properties in Uttarakhand",
    template: "%s | Himalayan Estates",
  },
  description:
    "Discover luxury villas, mountain plots, and investment properties in Dehradun, Mussoorie, Rishikesh, Nainital, and across the Himalayan landscapes of Uttarakhand.",
  keywords: [
    "Uttarakhand properties",
    "property in Dehradun",
    "property in Mussoorie",
    "plots in Uttarakhand",
    "villas in Uttarakhand",
    "real estate in Dehradun",
    "mountain property Uttarakhand",
    "Rishikesh property",
    "Nainital property",
    "Himalayan real estate",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://himalayanestates.in",
    siteName: "Himalayan Estates",
    title: "Himalayan Estates — Own a View. Own the Mountains.",
    description:
      "Premium properties in Uttarakhand's most extraordinary Himalayan locations.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Himalayan Estates - Mountain Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Himalayan Estates — Own a View. Own the Mountains.",
    description: "Premium properties in Uttarakhand's most extraordinary locations.",
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
