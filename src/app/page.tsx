import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ScrollStory from "@/components/home/ScrollStory";
import PropertyStory from "@/components/home/PropertyStory";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import LocationsPreview from "@/components/home/LocationsPreview";
import InvestmentTeaser from "@/components/home/InvestmentTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Property In Uttarakhand | Premium Plots & Estates",
  description:
    "Premium plotted developments in Uttarakhand — highway land, mountain plots, and investment properties in Dehradun, Mussoorie, Rishikesh, Nainital and beyond.",
  alternates: {
    canonical: "https://propertyinuttarakhand.com",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#111111]">
      <HeroSection />
      
      {/* Spacer */}
      <div className="h-12 md:h-24 w-full"></div>
      
      <ScrollStory />
      
      {/* Spacer */}
      <div className="h-12 md:h-24 w-full"></div>
      
      <PropertyStory />
      
      {/* Spacer */}
      <div className="h-12 md:h-24 w-full"></div>
      
      <FeaturedProperties />
      
      {/* Spacer */}
      <div className="h-12 md:h-24 w-full"></div>
      
      <LocationsPreview />
      
      {/* Spacer */}
      <div className="h-12 md:h-24 w-full"></div>
      
      <InvestmentTeaser />
      
      {/* Spacer */}
      <div className="h-12 md:h-24 w-full"></div>
      
      <FinalCTA />
    </div>
  );
}
