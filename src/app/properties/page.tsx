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
    <ScrollReveal delay={index * 60} direction="up" className="h-full">
      <Link href={`/properties/${property.slug}`} data-cursor="View" className="block h-full">
        <div
          ref={tiltRef}
          // Changed inline aspect ratio to min-height for better mobile responsiveness
          className="property-card group relative overflow-hidden rounded-xl w-full min-h-[450px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          style={{ background: "#1a2e22" }}
        >
          {/* Image */}
          <div className="card-image absolute inset-0">
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Gradient for text readability */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-500"
            style={{
              background: "linear-gradient(180deg, transparent 20%, rgba(17,17,17,0.8) 60%, rgba(17,17,17,0.95) 100%)",
            }}
          />

          {/* Status Badge */}
          <div className="absolute top-5 left-5 z-20 shadow-md">
            <span
              className={`px-3 py-1.5 text-[9px] tracking-widest uppercase font-semibold rounded-sm backdrop-blur-sm ${
                property.status === "available"
                  ? "bg-green-700/90 text-white"
                  : property.status === "sold"
                  ? "bg-red-800/90 text-white"
                  : "bg-amber-700/90 text-white"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {property.status === "under-construction" ? "Under Construction" : property.status}
            </span>
          </div>

          {/* Tag Badge */}
          {property.tag && (
            <div className="absolute top-5 right-5 z-20 shadow-md">
              <span
                className="px-3 py-1.5 text-[9px] tracking-widest uppercase bg-gold/90 text-charcoal font-bold rounded-sm backdrop-blur-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.tag}
              </span>
            </div>
          )}

          {/* Card Info - Smooth translate on hover */}
          <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
            <p className="text-label text-gold mb-1 opacity-90" style={{ fontSize: "9px" }}>
              {property.type.toUpperCase()} · {property.district}
            </p>
            <h3
              className="text-ivory text-xl lg:text-2xl font-light mb-2 drop-shadow-md"
              style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.2 }}
            >
              {property.name}
            </h3>
            
            <div className="flex items-center gap-1.5 text-stone/90 mb-4">
              <MapPin size={12} className="text-gold" />
              <span className="text-xs" style={{ fontFamily: "var(--font-inter)", fontSize: "11px" }}>
                {property.location}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-4 text-stone/90">
                <span className="flex items-center gap-1.5 text-xs">
                  <Maximize2 size={10} className="text-gold" /> {property.area}
                </span>
                {property.bedrooms && (
                  <span className="flex items-center gap-1.5 text-xs">
                    <Bed size={10} className="text-gold" /> {property.bedrooms}
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1.5 text-xs">
                    <Bath size={10} className="text-gold" /> {property.bathrooms}
                  </span>
                )}
              </div>
              <p
                className="text-gold font-medium drop-shadow-md"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem" }}
              >
                {property.priceDisplay}
              </p>
            </div>

            {/* Hover Details Revealer */}
            <div className="max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-4">
              <div className="flex items-center gap-2 text-gold">
                <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                  View Full Details
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
      {/* Hero Section */}
      <section
        className="relative flex items-end pt-32 pb-16 lg:pb-24"
        style={{
          minHeight: "45vh",
          background: "linear-gradient(180deg, #0d1f17 0%, #1e3a2a 60%, #111111 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(17,17,17,0.7) 70%, var(--color-charcoal) 100%)",
          }}
        />
        <div className="container-custom relative z-10 px-4">
          <span className="text-label text-gold block mb-2 tracking-widest">Our Portfolio</span>
          <div className="gold-divider mb-6" />
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-ivory drop-shadow-sm leading-tight"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Find Your Place
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>In The Hills.</em>
          </h1>
        </div>
      </section>

      {/* Sticky Filters Bar */}
      <div
        className="sticky top-[80px] z-50 py-4 shadow-lg"
        style={{ background: "rgba(17,17,17,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="container-custom px-4">
          {/* Mobile toggle header */}
          <div className="flex items-center justify-between lg:hidden mb-1">
            <span className="text-stone text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {filtered.length} {filtered.length === 1 ? "Property" : "Properties"}
            </span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gold text-xs bg-white/5 px-3 py-2 rounded-md border border-white/10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <Filter size={14} />
              Filters
            </button>
          </div>

          {/* Desktop + Mobile expanding filters */}
          <div className={`flex-col lg:flex-row flex-wrap gap-3 lg:gap-4 mt-3 lg:mt-0 ${showFilters ? "flex" : "hidden lg:flex"}`}>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input w-full lg:w-auto text-xs rounded-md border-white/10 bg-white/5 text-ivory focus:border-gold"
              style={{ fontFamily: "var(--font-inter)", padding: "10px 16px", minWidth: "160px" }}
            >
              {locationOptions.map((o) => (
                <option key={o} value={o} className="bg-charcoal text-ivory">{o === "All" ? "Location: All" : o}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-input w-full lg:w-auto text-xs rounded-md border-white/10 bg-white/5 text-ivory focus:border-gold"
              style={{ fontFamily: "var(--font-inter)", padding: "10px 16px", minWidth: "160px" }}
            >
              {typeOptions.map((o) => (
                <option key={o} value={o} className="bg-charcoal text-ivory">
                  {o === "All" ? "Type: All" : o.charAt(0).toUpperCase() + o.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="form-input w-full lg:w-auto text-xs rounded-md border-white/10 bg-white/5 text-ivory focus:border-gold"
              style={{ fontFamily: "var(--font-inter)", padding: "10px 16px", minWidth: "180px" }}
            >
              {budgetOptions.map((o) => (
                <option key={o} value={o} className="bg-charcoal text-ivory">{o === "All" ? "Budget: All" : o}</option>
              ))}
            </select>

            {/* Clear Button */}
            {(location !== "All" || type !== "All" || budget !== "All") && (
              <button
                onClick={() => { setLocation("All"); setType("All"); setBudget("All"); }}
                className="flex items-center justify-center gap-2 text-stone text-xs border border-white/10 px-4 py-2.5 lg:py-0 rounded-md hover:text-ivory hover:border-white/30 transition-colors w-full lg:w-auto mt-2 lg:mt-0"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <X size={12} /> Clear Filters
              </button>
            )}

            {/* Desktop Counter */}
            <div className="ml-auto flex items-center">
              <span className="text-stone text-xs hidden lg:block tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid Section */}
      <section className="py-12 lg:py-20 bg-[#111111]">
        <div className="container-custom px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 lg:py-32 glass-dark rounded-xl border border-white/5">
              <p className="text-stone text-xl mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                No properties match your exact filters.
              </p>
              <button
                onClick={() => { setLocation("All"); setType("All"); setBudget("All"); }}
                className="btn-primary text-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 lg:py-28 text-center bg-[#0d1f17] border-t border-white/5">
        <div className="container-custom px-4">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl text-ivory mb-6 leading-tight drop-shadow-md"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Can&apos;t find exactly what you&apos;re looking for?
            </h2>
            <p
              className="text-stone text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              We have off-market plotted developments and new acquisitions arriving regularly. Share your exact requirements and our advisors will source it for you.
            </p>
            <Link href="/contact" className="btn-primary-filled text-xs w-full sm:w-auto inline-flex justify-center" data-cursor="Contact">
              Share Your Requirements
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
