// src/components/home/LocationsPreview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LocationsPreview() {
  const preview = locations.slice(0, 4);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-[#111111]">
      <div className="container-custom px-4 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <span className="text-label text-gold block mb-2 tracking-[0.2em] uppercase text-[10px]">Destinations</span>
          <div className="gold-divider mx-auto mb-6" />
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-ivory mb-4 leading-tight drop-shadow-sm"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Extraordinary
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Himalayan Locations.</em>
          </h2>
          <p
            className="text-stone text-sm md:text-base max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Each destination offers its own story, its own elevation, and its own unique investment opportunity.
          </p>
        </ScrollReveal>

        {/* Location cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {preview.map((location, i) => (
            <ScrollReveal key={location.id} delay={i * 100} direction="up" className="h-full">
              <Link
                href="/locations"
                data-cursor="Explore"
                // Fixed: using Tailwind aspect ratio instead of inline style to prevent mobile collapse
                className="group block relative overflow-hidden rounded-lg w-full aspect-[3/4] sm:aspect-[4/5] bg-gray-900"
              >
                {/* Image */}
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Always-on gradient for text readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 z-20 flex flex-col justify-end">
                  <p
                    className="text-gold mb-2 opacity-90 tracking-widest uppercase text-[10px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {location.elevation}
                  </p>
                  
                  <h3
                    className="text-ivory text-2xl lg:text-3xl font-light mb-1 drop-shadow-md"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {location.name}
                  </h3>
                  
                  {/* Tagline */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-1">
                    <p
                      className="text-stone/90 text-xs leading-relaxed line-clamp-2"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {location.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12 lg:mt-16">
          <Link href="/locations" className="btn-ghost text-xs w-full sm:w-auto inline-flex justify-center uppercase tracking-widest">
            Discover All Locations
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
