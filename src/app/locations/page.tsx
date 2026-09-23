import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MapPin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations — Discover Uttarakhand | Himalayan Estates",
  description:
    "Explore premium real estate destinations across Uttarakhand — Dehradun, Mussoorie, Rishikesh, Nainital, Haridwar, and Munsiyari.",
  alternates: { canonical: "https://himalayanestates.in/locations" },
};

export default function LocationsPage() {
  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{ height: "65vh", minHeight: "450px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80"
          alt="Himalayan aerial landscape Uttarakhand"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 70%, var(--color-charcoal) 100%)",
          }}
        />
        <div className="container-custom relative z-10 pb-20">
          <span className="text-label text-gold">Our Locations</span>
          <div className="gold-divider" />
          <h1
            className="display-lg text-ivory"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Discover
            <br />
            <em style={{ fontStyle: "italic" }}>Uttarakhand.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <p
              className="text-stone text-lg leading-loose"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Uttarakhand is not one landscape — it is many. From the broad
              forested valleys of Dehradun to the high-altitude drama of
              Munsiyari, each destination carries its own elevation, its own
              personality, and its own property opportunity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Locations — alternating layout */}
      <section className="pb-32">
        <div className="container-custom space-y-32">
          {locations.map((location, i) => (
            <ScrollReveal key={location.id} direction={i % 2 === 0 ? "left" : "right"}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Fog hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(200,205,208,0.5) 0%, transparent 60%)",
                    }}
                  />
                  {/* Elevation badge */}
                  <div className="absolute top-5 left-5 glass-dark px-4 py-2">
                    <span
                      className="text-gold text-xs"
                      style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                    >
                      {location.elevation}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin size={14} className="text-gold" />
                    <span className="text-label text-gold" style={{ fontSize: "9px" }}>
                      {location.distanceFromDehradun === "0 km"
                        ? "State Capital"
                        : `${location.distanceFromDehradun} from Dehradun`}
                    </span>
                  </div>

                  <h2
                    className="display-sm text-ivory mb-2"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                  >
                    {location.name}
                  </h2>

                  <p
                    className="text-gold text-lg font-light mb-6"
                    style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
                  >
                    {location.tagline}
                  </p>

                  <div className="gold-divider" />

                  <p
                    className="text-stone leading-loose mb-6"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {location.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div>
                      <p className="text-label text-gold mb-2" style={{ fontSize: "9px" }}>
                        Lifestyle
                      </p>
                      <p
                        className="text-stone text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                      >
                        {location.lifestyle}
                      </p>
                    </div>
                    <div>
                      <p className="text-label text-gold mb-2" style={{ fontSize: "9px" }}>
                        Connectivity
                      </p>
                      <p
                        className="text-stone text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                      >
                        {location.connectivity}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-label text-gold mb-3" style={{ fontSize: "9px" }}>
                      Property Types
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {location.propertyTypes.map((type) => (
                        <span
                          key={type}
                          className="px-3 py-1 border border-white/10 text-stone text-xs"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass-gold p-5 mb-8">
                    <p
                      className="text-ivory text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {location.investmentNote}
                    </p>
                  </div>

                  <Link
                    href="/properties"
                    className="flex items-center gap-3 text-gold hover:gap-4 transition-all"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                    data-cursor="View"
                  >
                    Explore {location.name} Properties
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-28 text-center"
        style={{ background: "var(--color-mountain-dark)" }}
      >
        <div className="container-custom">
          <ScrollReveal>
            <h2
              className="display-sm text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Not Sure Which Location?
            </h2>
            <p
              className="text-stone max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Our advisors have visited every location we list. Share your
              lifestyle and investment goals and we will point you toward the
              right Uttarakhand destination.
            </p>
            <Link href="/contact" className="btn-primary text-xs" data-cursor="Contact">
              Find My Location
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
