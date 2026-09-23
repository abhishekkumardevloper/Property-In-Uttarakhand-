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
    <ScrollReveal delay={index * 100} direction="up">
      <Link
        href={`/properties/${property.slug}`}
        data-cursor="View"
        className="block h-full"
      >
        <div
          ref={tiltRef}
          className="property-card group relative bg-forest h-full"
          style={{
            aspectRatio: index === 0 ? "3/4" : "4/5",
            transition: "transform 0.2s ease, box-shadow 0.4s ease",
          }}
        >
          {/* Image */}
          <div className="card-image absolute inset-0">
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Tag */}
          {property.tag && (
            <div className="absolute top-5 left-5 z-20">
              <span
                className="px-3 py-1 text-[9px] tracking-widest uppercase bg-gold text-charcoal font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.tag}
              </span>
            </div>
          )}

          {/* Card Info */}
          <div className="card-info z-20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p
                  className="text-label text-gold mb-2"
                  style={{ fontSize: "9px" }}
                >
                  {property.type.toUpperCase()}
                </p>
                <h3
                  className="text-ivory text-xl font-light leading-tight mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem" }}
                >
                  {property.name}
                </h3>
                <div className="flex items-center gap-1 text-stone">
                  <MapPin size={10} />
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-inter)", fontSize: "11px" }}
                  >
                    {property.location}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-gold font-medium"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem" }}
                >
                  {property.priceDisplay}
                </p>
                <p className="text-stone text-xs flex items-center justify-end gap-1">
                  <Maximize2 size={9} />
                  {property.area}
                </p>
              </div>
            </div>

            {/* Description (reveals on hover) */}
            <p
              className="text-stone text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {property.shortDescription.substring(0, 80)}...
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "var(--font-inter)", fontSize: "9px" }}
              >
                View Property
              </span>
              <div className="h-px w-8 bg-gold transition-all duration-300 group-hover:w-12" />
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
    <section className="section-padding" style={{ background: "var(--color-charcoal)" }}>
      <div className="container-custom">
        {/* Header */}
        <ScrollReveal className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-label text-gold">Featured</span>
            <div className="gold-divider" />
            <h2
              className="display-md text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Extraordinary
              <br />
              <em style={{ fontStyle: "italic" }}>Properties.</em>
            </h2>
          </div>
          <Link
            href="/properties"
            className="btn-primary text-xs self-start md:self-end"
            data-cursor="Explore"
          >
            View All Properties
          </Link>
        </ScrollReveal>

        {/* Property Grid — Asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.slice(0, 3).map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>

        {featured.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {featured.slice(3, 5).map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i + 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
