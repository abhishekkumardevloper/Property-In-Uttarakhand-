"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2 } from "lucide-react";
import { getFeaturedProperties } from "@/data/properties";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useTilt } from "@/hooks/useMousePosition";

function PropertyCard({ property, index }: { property: ReturnType<typeof getFeaturedProperties>[0]; index: number }) {
  const tiltRef = useTilt(8);

  return (
    <ScrollReveal delay={index * 100} direction="up" className="h-full">
      <Link
        href={`/properties/${property.slug}`}
        data-cursor="View"
        className="block h-full"
      >
        <div
          ref={tiltRef}
          className="property-card group relative bg-forest w-full rounded-lg overflow-hidden"
          style={{
            // Removed fixed aspect ratios that cause layout breaks; using Tailwind min-h instead.
            minHeight: "450px",
            transition: "transform 0.2s ease, box-shadow 0.4s ease",
          }}
        >
          {/* Image */}
          <div className="card-image absolute inset-0">
            <Image
              src={property.images[0] || "/images/placeholder.jpg"}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-300 group-hover:opacity-90"
            style={{
              background:
                "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.6) 60%, rgba(17,17,17,0.95) 100%)",
            }}
          />

          {/* Tag */}
          {property.tag && (
            <div className="absolute top-5 left-5 z-20">
              <span
                className="px-3 py-1 text-[9px] tracking-widest uppercase bg-gold text-charcoal font-semibold rounded-sm shadow-md"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.tag}
              </span>
            </div>
          )}

          {/* Card Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p
                  className="text-label text-gold mb-1 opacity-80"
                  style={{ fontSize: "9px" }}
                >
                  {property.type.toUpperCase()}
                </p>
                <h3
                  className="text-ivory text-xl lg:text-2xl font-light leading-tight mb-2 drop-shadow-md"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {property.name}
                </h3>
                <div className="flex items-center gap-1 text-stone/90">
                  <MapPin size={12} className="text-gold" />
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "11px" }}
                  >
                    {property.location}
                  </span>
                </div>
              </div>
              
              <div className="text-right shrink-0 ml-4">
                <p
                  className="text-gold font-medium mb-1 drop-shadow-md"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem" }}
                >
                  {property.priceDisplay}
                </p>
                <p className="text-stone/90 text-xs flex items-center justify-end gap-1">
                  <Maximize2 size={10} className="text-gold" />
                  {property.area}
                </p>
              </div>
            </div>

            {/* Description & CTA Container (Reveals on Hover) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
              <p
                className="text-stone/80 text-xs leading-relaxed mb-4 line-clamp-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.shortDescription}
              </p>

              <div className="flex items-center gap-2 text-gold">
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "10px" }}
                >
                  View Details
                </span>
                <div className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function FeaturedProperties() {
  const featured = getFeaturedProperties().slice(0, 5);

  return (
    <section className="py-20 lg:py-32" style={{ background: "var(--color-charcoal)" }}>
      <div className="container-custom px-4 lg:px-8">
        {/* Header */}
        <ScrollReveal className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-8">
          <div>
            <span className="text-label text-gold block mb-2">Featured</span>
            <div className="gold-divider mb-6" />
            <h2
              className="display-md text-ivory leading-none"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Extraordinary
              <br />
              <em style={{ fontStyle: "italic" }}>Plots & Land.</em>
            </h2>
          </div>
          <Link
            href="/properties"
            className="btn-primary text-xs w-full md:w-auto text-center self-start md:self-end"
            data-cursor="Explore"
          >
            View All Properties
          </Link>
        </ScrollReveal>

        {/* Property Grid — Mobile optimized (1 col) to Desktop (3 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-4 lg:mb-6">
          {featured.slice(0, 3).map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        {featured.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {featured.slice(3, 5).map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i + 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
