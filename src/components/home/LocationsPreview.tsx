"use client";

import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LocationsPreview() {
  const preview = locations.slice(0, 4);

  return (
    <section
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-charcoal) 0%, var(--color-mountain-dark) 100%)",
      }}
    >
      <div className="container-custom px-4 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <span className="text-label text-gold block mb-2 tracking-[0.2em]">Destinations</span>
          <div className="gold-divider mx-auto mb-6" />
          <h2
            className="display-md text-ivory mb-4 leading-tight drop-shadow-sm"
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
                className="group block relative overflow-hidden rounded-lg w-full h-full"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Image */}
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Gradient Overlay for Readability */}
                <div
                  className="absolute inset-0 z-10 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(17,17,17,0.7) 65%, rgba(17,17,17,0.95) 100%)",
                  }}
                />

                {/* Hover fog effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(200,205,208,0.4) 0%, transparent 60%)",
                  }}
                />

                {/* Content - Smooth translate hover effect */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
                  <p
                    className="text-label text-gold mb-2 opacity-90"
                    style={{ fontSize: "9px" }}
                  >
                    {location.elevation}
                  </p>
                  
                  <h3
                    className="text-ivory text-2xl lg:text-3xl font-light mb-1 drop-shadow-md"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {location.name}
                  </h3>
                  
                  {/* Tagline reveals smoothly on hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-2">
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
          <Link href="/locations" className="btn-ghost text-xs w-full sm:w-auto inline-flex justify-center" data-cursor="Discover">
            Discover All Locations
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
