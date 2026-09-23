"use client";

import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LocationsPreview() {
  const preview = locations.slice(0, 4);

  return (
    <section
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, var(--color-charcoal) 0%, var(--color-mountain-dark) 100%)",
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-label text-gold">Destinations</span>
          <div className="gold-divider mx-auto" />
          <h2
            className="display-md text-ivory mb-4"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Six Extraordinary
            <br />
            <em style={{ fontStyle: "italic" }}>Himalayan Locations.</em>
          </h2>
          <p
            className="text-stone max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Each destination offers its own story, its own elevation, its own
            reason to stay.
          </p>
        </ScrollReveal>

        {/* Location cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {preview.map((location, i) => (
            <ScrollReveal key={location.id} delay={i * 80} direction="up">
              <Link
                href="/locations"
                data-cursor="Explore"
                className="group block relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Image */}
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                {/* Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.9) 100%)",
                  }}
                />

                {/* Hover fog effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(200,205,208,0.5) 0%, transparent 60%)",
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p
                    className="text-label text-gold mb-2"
                    style={{ fontSize: "9px" }}
                  >
                    {location.elevation}
                  </p>
                  <h3
                    className="text-ivory text-2xl font-light mb-2 transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {location.name}
                  </h3>
                  <p
                    className="text-stone text-xs leading-relaxed line-clamp-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {location.tagline}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link href="/locations" className="btn-ghost text-xs" data-cursor="Discover">
            Discover All Locations
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
