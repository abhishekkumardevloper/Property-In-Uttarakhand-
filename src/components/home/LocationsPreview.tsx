"use client";

import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LocationsPreview() {
  // Only taking the first 3 locations to perfectly fit the 3-column grid
  const preview = locations.slice(0, 3);

  return (
    <section
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-charcoal) 0%, var(--color-mountain-dark) 100%)",
      }}
    >
      <div className="container-custom px-4 lg:px-8">
        
        {/* Header - Fixed Alignment */}
        <ScrollReveal className="flex flex-col items-center text-center mb-12 lg:mb-20 w-full">
          <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[10px]">
            Destinations
          </span>
          
          {/* 
            CSS Fix: Replaced .gold-divider with Tailwind classes 
            to prevent globals.css from pushing it to the left.
          */}
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 leading-tight drop-shadow-sm text-center w-full"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Extraordinary
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Himalayan Locations.</em>
          </h2>
          
          <p
            className="text-stone text-sm md:text-base max-w-lg mx-auto leading-relaxed text-center"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Each destination offers its own story, its own elevation, and its own unique investment opportunity.
          </p>
        </ScrollReveal>

        {/* Location cards - Fixed Grid (Changed to 3 columns to match data) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {preview.map((location, i) => (
            <ScrollReveal key={location.id} delay={i * 100} direction="up" className="h-full w-full">
              <Link
                href="/locations"
                data-cursor="Explore"
                className="group block relative overflow-hidden rounded-xl w-full h-full shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Image */}
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Gradient Overlay for Readability */}
                <div
                  className="absolute inset-0 z-10 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 20%, rgba(17,17,17,0.6) 60%, rgba(17,17,17,0.95) 100%)",
                  }}
                />

                {/* Hover fog effect - Adds premium luxury feel */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 60%)",
                  }}
                />

                {/* Content - Smooth translate hover effect */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-20 flex flex-col justify-end transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <p
                    className="text-gold mb-3 opacity-90 tracking-widest uppercase text-[10px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {location.elevation}
                  </p>
                  
                  <h3
                    className="text-ivory text-3xl lg:text-4xl font-light mb-2 drop-shadow-md"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {location.name}
                  </h3>
                  
                  {/* Tagline reveals smoothly on hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-700 overflow-hidden mt-1">
                    <p
                      className="text-stone/90 text-sm leading-relaxed line-clamp-3"
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

        <ScrollReveal className="text-center mt-16 lg:mt-20">
          <Link 
            href="/locations" 
            className="btn-ghost text-xs w-full sm:w-auto inline-flex justify-center tracking-widest" 
            data-cursor="Discover"
          >
            Discover All Locations
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
