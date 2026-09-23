import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ScrollStory from "@/components/home/ScrollStory";
import PropertyStory from "@/components/home/PropertyStory";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import LocationsPreview from "@/components/home/LocationsPreview";
import InvestmentTeaser from "@/components/home/InvestmentTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Own a View. Own the Mountains. | Himalayan Estates",
  description:
    "Premium properties in Uttarakhand — luxury villas, mountain plots, and investment land in Dehradun, Mussoorie, Rishikesh, Nainital and beyond.",
  alternates: {
    canonical: "https://himalayanestates.in",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollStory />
      <PropertyStory />
      <FeaturedProperties />
      <LocationsPreview />
      <InvestmentTeaser />
      <FinalCTA />
    </>
  );
}
