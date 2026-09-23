"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, Bed, Bath, Filter, X } from "lucide-react";
import { properties } from "@/data/properties";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useTilt } from "@/hooks/useMousePosition";

const locationOptions = ["All", "Dehradun", "Mussoorie", "Rishikesh", "Nainital", "Haridwar", "Pithoragarh"];
const typeOptions = ["All", "villa", "plot", "home", "holiday", "commercial", "land"];
const budgetOptions = ["All", "Under ₹50L", "₹50L–₹1Cr", "₹1Cr–₹2Cr", "Above ₹2Cr"];

function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const tiltRef = useTilt(6);
  return (
    <ScrollReveal delay={index * 60} direction="up">
      <Link href={`/properties/${property.slug}`} data-cursor="View" className="block">
        <div
          ref={tiltRef}
          className="property-card group relative overflow-hidden"
          style={{ aspectRatio: "4/5", background: "#1a2e22" }}
        >
          {/* Image */}
          <div className="card-image absolute inset-0">
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Gradient */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          {/* Status */}
          <div className="absolute top-5 left-5 z-20">
            <span
              className={`px-3 py-1 text-[9px] tracking-widest uppercase font-semibold ${
                property.status === "available"
                  ? "bg-green-700 text-white"
                  : property.status === "sold"
                  ? "bg-red-800 text-white"
                  : "bg-amber-700 text-white"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {property.status === "under-construction" ? "Under Construction" : property.status}
            </span>
          </div>

          {/* Tag */}
          {property.tag && (
            <div className="absolute top-5 right-5 z-20">
              <span
                className="px-2 py-1 text-[9px] tracking-widest uppercase bg-gold text-charcoal font-semibold"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.tag}
              </span>
            </div>
          )}

          {/* Card Info */}
          <div className="card-info z-20">
            <p className="text-label text-gold mb-2" style={{ fontSize: "9px" }}>
              {property.type.toUpperCase()} · {property.district}
            </p>
            <h3
              className="text-ivory text-xl font-light mb-2"
              style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.2 }}
            >
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-stone mb-4">
              <MapPin size={10} />
              <span className="text-xs" style={{ fontFamily: "var(--font-inter)", fontSize: "11px" }}>
                {property.location}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-stone">
                <span className="flex items-center gap-1 text-xs">
                  <Maximize2 size={9} /> {property.area}
                </span>
                {property.bedrooms && (
                  <span className="flex items-center gap-1 text-xs">
                    <Bed size={9} /> {property.bedrooms}
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1 text-xs">
                    <Bath size={9} /> {property.bathrooms}
                  </span>
                )}
              </div>
              <p
                className="text-gold font-light"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem" }}
              >
                {property.priceDisplay}
              </p>
            </div>

            {/* Hover CTA */}
            <div className="flex items-center gap-2 text-gold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                View Details
              </span>
              <div className="h-px w-8 bg-gold" />
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function PropertiesPage() {
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [budget, setBudget] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = properties.filter((p) => {
    const locMatch = location === "All" || p.district === location;
    const typeMatch = type === "All" || p.type === type;
    const budgetMatch =
      budget === "All" ||
      (budget === "Under ₹50L" && p.price < 5000000) ||
      (budget === "₹50L–₹1Cr" && p.price >= 5000000 && p.price < 10000000) ||
      (budget === "₹1Cr–₹2Cr" && p.price >= 10000000 && p.price < 20000000) ||
      (budget === "Above ₹2Cr" && p.price >= 20000000);
    return locMatch && typeMatch && budgetMatch;
  });

  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{
          height: "55vh",
          minHeight: "400px",
          background:
            "linear-gradient(180deg, #0d1f17 0%, #1e3a2a 60%, #111 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            opacity: 0.2,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 70%, var(--color-charcoal) 100%)",
          }}
        />
        <div className="container-custom relative z-10 pb-16">
          <span className="text-label text-gold">Our Portfolio</span>
          <div className="gold-divider" />
          <h1
            className="display-lg text-ivory"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Find Your Place
            <br />
            <em style={{ fontStyle: "italic" }}>In The Hills.</em>
          </h1>
        </div>
      </section>

      {/* Filters */}
      <div
        className="sticky top-[80px] z-50 py-4"
        style={{ background: "rgba(10,10,10,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-custom">
          {/* Mobile toggle */}
          <div className="flex items-center justify-between lg:hidden mb-3">
            <span className="text-stone text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {filtered.length} Properties
            </span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gold text-xs"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Filter size={14} />
              Filters
            </button>
          </div>

          {/* Desktop filters */}
          <div className={`flex flex-wrap gap-3 ${showFilters ? "flex" : "hidden lg:flex"}`}>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input w-auto text-xs"
              style={{ fontFamily: "var(--font-inter)", padding: "10px 16px", minWidth: "140px" }}
            >
              {locationOptions.map((o) => (
                <option key={o} value={o}>{o === "All" ? "Location: All" : o}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-input w-auto text-xs"
              style={{ fontFamily: "var(--font-inter)", padding: "10px 16px", minWidth: "140px" }}
            >
              {typeOptions.map((o) => (
                <option key={o} value={o}>
                  {o === "All" ? "Type: All" : o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="form-input w-auto text-xs"
              style={{ fontFamily: "var(--font-inter)", padding: "10px 16px", minWidth: "160px" }}
            >
              {budgetOptions.map((o) => (
                <option key={o} value={o}>{o === "All" ? "Budget: All" : o}</option>
              ))}
            </select>

            {(location !== "All" || type !== "All" || budget !== "All") && (
              <button
                onClick={() => { setLocation("All"); setType("All"); setBudget("All"); }}
                className="flex items-center gap-2 text-stone text-xs border border-white/10 px-4 hover:text-ivory transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <X size={12} /> Clear
              </button>
            )}

            <div className="ml-auto flex items-center">
              <span className="text-stone text-xs hidden lg:block" style={{ fontFamily: "var(--font-inter)" }}>
                {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-stone text-lg mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
                No properties match your filters.
              </p>
              <button
                onClick={() => { setLocation("All"); setType("All"); setBudget("All"); }}
                className="btn-ghost text-xs"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "var(--color-mountain-dark)" }}
      >
        <div className="container-custom">
          <ScrollReveal>
            <h2
              className="display-sm text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p
              className="text-stone max-w-md mx-auto mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              We have unlisted properties and new acquisitions arriving
              regularly. Share your requirements and we will find it.
            </p>
            <Link href="/contact" className="btn-primary text-xs" data-cursor="Contact">
              Share Your Requirements
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
