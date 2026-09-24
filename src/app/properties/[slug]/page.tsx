import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, Bed, Bath, Mountain, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
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
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[85vh] min-h-[500px] flex flex-col justify-end">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay for Text Readability */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.6) 60%, var(--color-charcoal) 100%)",
          }}
        />

        {/* Back Button - Responsive Placement & Glassmorphism */}
        <div className="absolute top-24 md:top-32 left-4 md:left-8 z-30">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-ivory hover:text-gold transition-colors text-xs bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
            data-cursor="Back"
          >
            <ArrowLeft size={14} />
            All Properties
          </Link>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-20 w-full pb-10 md:pb-16 px-4 md:px-8">
          <div className="container-custom mx-auto">
            <ScrollReveal direction="up">
              {property.tag && (
                <span
                  className="inline-block px-3 py-1.5 text-[10px] tracking-widest uppercase bg-gold text-charcoal font-bold rounded-sm shadow-md mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {property.tag}
                </span>
              )}
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-gold" />
                <span className="text-mist text-xs md:text-sm tracking-wide" style={{ fontFamily: "var(--font-inter)" }}>
                  {property.location}
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-7xl text-ivory mb-4 leading-tight drop-shadow-lg"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                {property.name}
              </h1>
              <p
                className="text-mist text-base md:text-xl font-light max-w-2xl drop-shadow-md leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {property.shortDescription}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-custom px-4 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-2 tracking-[0.2em] uppercase text-[10px]">Overview</span>
              <div className="w-12 h-px bg-gold mb-6" />
              <p
                className="text-stone/90 leading-loose text-sm md:text-base text-justify md:text-left"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {property.description}
              </p>
            </ScrollReveal>

            {/* Gallery Grid */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-2 tracking-[0.2em] uppercase text-[10px]">Gallery</span>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.images.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-xl shadow-lg group ${i === 0 ? "md:col-span-2" : ""}`}
                    // Responsive aspect ratios for mobile vs desktop
                    style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                  >
                    <Image
                      src={img}
                      alt={`${property.name} view ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Amenities Grid */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-2 tracking-[0.2em] uppercase text-[10px]">Amenities & Features</span>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 shadow-sm">
                    <CheckCircle2 size={16} className="text-gold shrink-0" />
                    <span
                      className="text-stone/90 text-sm tracking-wide"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Location & Details Card */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-2 tracking-[0.2em] uppercase text-[10px]">Location</span>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="glass p-6 md:p-8 rounded-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p
                      className="text-ivory text-xl md:text-2xl font-light mb-2 leading-tight"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {property.location}
                    </p>
                    <p
                      className="text-stone/80 text-sm tracking-wide uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {property.district} District, Uttarakhand
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-2">
                  {property.elevation && (
                    <div className="flex flex-col gap-1">
                      <span className="text-stone/60 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>Elevation</span>
                      <span className="text-ivory text-sm">{property.elevation}</span>
                    </div>
                  )}
                  {property.views && (
                    <div className="flex flex-col gap-1">
                      <span className="text-stone/60 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>Primary Views</span>
                      <span className="text-ivory text-sm">{property.views}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Investment Potential */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-2 tracking-[0.2em] uppercase text-[10px]">Investment Potential</span>
              <div className="w-12 h-px bg-gold mb-6" />
              <div className="glass-gold p-6 md:p-8 rounded-xl shadow-lg">
                <p
                  className="text-ivory/90 leading-loose text-sm md:text-base text-justify md:text-left"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Properties in <strong className="text-gold font-normal">{property.district}</strong> have demonstrated consistent appreciation
                  over the past decade, driven by expanding infrastructure, growing tourism,
                  and increasing demand from urban professionals seeking mountain lifestyles.
                  With supply constrained by forest reserve boundaries and a finite amount of
                  quality land available, this property represents both exceptional lifestyle and long-term
                  financial value.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (Sticky Sidebar) */}
          <div className="lg:col-span-1">
            {/* sticky and top adjustments ensure it scrolls naturally on mobile, but stays fixed on desktop */}
            <div className="sticky top-28 space-y-6">
              
              {/* Specs Card */}
              <div className="glass p-6 md:p-8 rounded-xl shadow-2xl border border-white/10">
                <p
                  className="text-label text-gold mb-4 tracking-[0.2em] uppercase block"
                  style={{ fontSize: "10px" }}
                >
                  Property Details
                </p>
                <p
                  className="text-gold mb-8 drop-shadow-sm leading-none"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.8rem", fontWeight: 300 }}
                >
                  {property.priceDisplay}
                </p>
                
                <div className="space-y-4 mb-10">
                  {specs.slice(1).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-stone/80 text-xs uppercase"
                        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.08em" }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="text-ivory text-sm font-medium"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="btn-primary-filled text-xs w-full text-center block py-4 rounded-md shadow-lg hover:shadow-gold/20"
                    data-cursor="Visit"
                  >
                    Schedule a Site Visit
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-ghost text-xs w-full text-center block py-4 rounded-md"
                    data-cursor="Details"
                  >
                    Request Full Brochure
                  </Link>
                  <a
                    href="https://wa.me/919289533826"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 text-xs font-semibold rounded-md border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                    style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                  >
                    <Phone size={14} /> WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Assistance Card */}
              <div className="glass p-6 md:p-8 rounded-xl border border-white/5">
                <p className="text-label text-gold mb-3 tracking-widest uppercase" style={{ fontSize: "10px" }}>
                  Need help deciding?
                </p>
                <p
                  className="text-stone/90 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Our advisors know every property personally. Let us help you compare options and find the perfect fit for your legacy.
                </p>
                <Link
                  href="/contact"
                  className="text-gold text-xs flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest font-semibold group"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Talk to an Advisor
                  <div className="h-px w-8 bg-gold transition-all duration-300 group-hover:w-12" />
                </Link>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

      {/* Related Properties CTA */}
      <section
        className="py-24 text-center border-t border-white/5 mt-10"
        style={{ background: "var(--color-mountain-dark)" }}
      >
        <div className="container-custom px-4">
          <ScrollReveal>
            <h2
              className="text-4xl md:text-5xl text-ivory mb-8"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Explore More Properties
            </h2>
            <Link href="/properties" className="btn-primary text-xs w-full sm:w-auto inline-flex justify-center" data-cursor="Explore">
              View All Properties
            </Link>
          </ScrollReveal>
        </div>
      </section>
      
    </div>
  );
}
