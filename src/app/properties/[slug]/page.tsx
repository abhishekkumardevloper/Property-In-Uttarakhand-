import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, Bed, Bath, Mountain, Phone, ArrowLeft } from "lucide-react";
import { getPropertyBySlug, properties } from "@/data/properties";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: `${property.name} | Himalayan Estates`,
    description: property.shortDescription,
    openGraph: {
      images: [{ url: property.images[0] }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const specs = [
    { label: "Price", value: property.priceDisplay },
    { label: "Area", value: property.area },
    { label: "Type", value: property.type.charAt(0).toUpperCase() + property.type.slice(1) },
    { label: "Status", value: property.status === "under-construction" ? "Under Construction" : property.status.charAt(0).toUpperCase() + property.status.slice(1) },
    ...(property.bedrooms ? [{ label: "Bedrooms", value: String(property.bedrooms) }] : []),
    ...(property.bathrooms ? [{ label: "Bathrooms", value: String(property.bathrooms) }] : []),
    ...(property.elevation ? [{ label: "Elevation", value: property.elevation }] : []),
    ...(property.views ? [{ label: "Views", value: property.views }] : []),
  ];

  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative" style={{ height: "85vh", minHeight: "500px" }}>
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* Back */}
        <div className="absolute top-24 left-8 z-20">
          <Link
            href="/properties"
            className="flex items-center gap-2 text-stone hover:text-ivory transition-colors text-xs"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
            data-cursor="Back"
          >
            <ArrowLeft size={14} />
            All Properties
          </Link>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16">
          <div className="container-custom">
            {property.tag && (
              <span
                className="inline-block px-3 py-1 text-[9px] tracking-widest uppercase bg-gold text-charcoal font-semibold mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.tag}
              </span>
            )}
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-gold" />
              <span className="text-mist text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                {property.location}
              </span>
            </div>
            <h1
              className="display-lg text-ivory mb-3"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              {property.name}
            </h1>
            <p
              className="text-mist text-lg font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {property.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <ScrollReveal>
              <span className="text-label text-gold">Overview</span>
              <div className="gold-divider" />
              <p
                className="text-stone leading-loose text-base"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {property.description}
              </p>
            </ScrollReveal>

            {/* Gallery */}
            <ScrollReveal>
              <span className="text-label text-gold">Gallery</span>
              <div className="gold-divider" />
              <div className="grid grid-cols-2 gap-3">
                {property.images.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden group ${i === 0 ? "col-span-2" : ""}`}
                    style={{ aspectRatio: i === 0 ? "16/7" : "4/3" }}
                  >
                    <Image
                      src={img}
                      alt={`${property.name} view ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Amenities */}
            <ScrollReveal>
              <span className="text-label text-gold">Amenities</span>
              <div className="gold-divider" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="amenity-item">
                    <Mountain size={14} className="text-gold shrink-0" />
                    <span
                      className="text-stone text-sm"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Location */}
            <ScrollReveal>
              <span className="text-label text-gold">Location</span>
              <div className="gold-divider" />
              <div className="glass p-8">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={16} className="text-gold mt-1 shrink-0" />
                  <div>
                    <p
                      className="text-ivory text-lg font-light mb-1"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {property.location}
                    </p>
                    <p
                      className="text-stone text-sm"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {property.district} District, Uttarakhand
                    </p>
                  </div>
                </div>
                {property.elevation && (
                  <p
                    className="text-stone text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Elevation: {property.elevation}
                  </p>
                )}
                {property.views && (
                  <p
                    className="text-stone text-sm mt-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Views: {property.views}
                  </p>
                )}
              </div>
            </ScrollReveal>

            {/* Investment */}
            <ScrollReveal>
              <span className="text-label text-gold">Investment Potential</span>
              <div className="gold-divider" />
              <div className="glass-gold p-8">
                <p
                  className="text-ivory leading-loose"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Properties in {property.district} have demonstrated consistent appreciation
                  over the past decade, driven by expanding infrastructure, growing tourism,
                  and increasing demand from urban professionals seeking mountain lifestyles.
                  With supply constrained by forest reserve boundaries and a finite amount of
                  quality land available, this property represents both lifestyle and long-term
                  financial value.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Spec card */}
              <div className="glass p-8">
                <p
                  className="text-label text-gold mb-6"
                  style={{ fontSize: "9px" }}
                >
                  Property Details
                </p>
                <p
                  className="text-gold mb-6"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.5rem", fontWeight: 300 }}
                >
                  {property.priceDisplay}
                </p>
                <div className="space-y-4 mb-8">
                  {specs.slice(1).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-stone text-xs"
                        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="text-ivory text-sm"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="btn-primary-filled text-xs w-full text-center block"
                    data-cursor="Visit"
                  >
                    Schedule a Site Visit
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-ghost text-xs w-full text-center block"
                    data-cursor="Details"
                  >
                    Request Full Details
                  </Link>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 text-xs border border-green-600 text-green-500 hover:bg-green-600 hover:text-white transition-all"
                    style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                  >
                    <Phone size={12} /> WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Also check */}
              <div className="glass p-6">
                <p className="text-label text-gold mb-4" style={{ fontSize: "9px" }}>
                  Need help deciding?
                </p>
                <p
                  className="text-stone text-xs leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Our advisors know every property personally. Let us help
                  you compare options and find the right fit.
                </p>
                <Link
                  href="/contact"
                  className="text-gold text-xs flex items-center gap-2 hover:gap-3 transition-all"
                  style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                >
                  Talk to an Advisor
                  <div className="h-px w-8 bg-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related CTA */}
      <section
        className="py-20 text-center"
        style={{ background: "var(--color-mountain-dark)" }}
      >
        <div className="container-custom">
          <h2
            className="display-sm text-ivory mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Explore More Properties
          </h2>
          <Link href="/properties" className="btn-primary text-xs" data-cursor="Explore">
            View All Properties
          </Link>
        </div>
      </section>
    </div>
  );
}
