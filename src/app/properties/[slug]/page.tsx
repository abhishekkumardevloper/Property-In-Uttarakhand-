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
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh", paddingBottom: "0" }}>
      
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] min-h-[500px] flex flex-col justify-end">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.7) 60%, var(--color-charcoal) 100%)",
          }}
        />

        <div className="absolute top-24 md:top-32 left-4 md:left-8 z-30">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-ivory hover:text-gold transition-colors text-xs bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-lg"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
          >
            <ArrowLeft size={14} />
            All Properties
          </Link>
        </div>

        <div className="relative z-20 w-full pb-12 md:pb-20 px-4 md:px-8">
          <div className="container-custom mx-auto">
            <ScrollReveal direction="up">
              {property.tag && (
                <span
                  className="inline-block px-4 py-2 text-[10px] tracking-widest uppercase bg-gold text-charcoal font-bold rounded-sm shadow-md mb-6"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {property.tag}
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={16} className="text-gold" />
                <span className="text-mist text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-inter)" }}>
                  {property.location}
                </span>
              </div>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-tight drop-shadow-lg"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                {property.name}
              </h1>
              <p
                className="text-mist text-lg md:text-xl font-light max-w-3xl drop-shadow-md leading-relaxed"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {property.shortDescription}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-custom px-4 lg:px-8 py-16 md:py-24">
        {/* Changed to a 12-column grid for better proportional control */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Details) - Takes up 8 columns */}
          <div className="lg:col-span-8 flex flex-col gap-16 md:gap-20">

            {/* Overview */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[11px]">Overview</span>
              <div className="w-16 h-px bg-gold mb-8" />
              <p
                className="text-stone/90 leading-loose text-base md:text-lg font-light text-justify md:text-left"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {property.description}
              </p>
            </ScrollReveal>

            {/* Gallery Grid */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[11px]">Gallery</span>
              <div className="w-16 h-px bg-gold mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.images.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl shadow-xl group ${i === 0 ? "md:col-span-2" : ""}`}
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
              <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[11px]">Amenities & Features</span>
              <div className="w-16 h-px bg-gold mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 shadow-sm">
                    <CheckCircle2 size={18} className="text-gold shrink-0" />
                    <span
                      className="text-ivory text-sm md:text-base tracking-wide font-light"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Location & Details Card */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[11px]">Location Details</span>
              <div className="w-16 h-px bg-gold mb-8" />
              {/* Increased padding drastically to give elements breathing room */}
              <div className="glass p-8 md:p-12 rounded-2xl border border-white/10 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                    <MapPin size={24} className="text-gold" />
                  </div>
                  <div>
                    <p
                      className="text-ivory text-2xl md:text-3xl font-light mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {property.location}
                    </p>
                    <p
                      className="text-stone text-sm tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {property.district} District, Uttarakhand
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-4">
                  {property.elevation && (
                    <div className="flex flex-col gap-2">
                      <span className="text-stone/60 text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Elevation</span>
                      <span className="text-ivory text-base">{property.elevation}</span>
                    </div>
                  )}
                  {property.views && (
                    <div className="flex flex-col gap-2">
                      <span className="text-stone/60 text-xs uppercase tracking-widest font-semibold" style={{ fontFamily: "var(--font-inter)" }}>Primary Views</span>
                      <span className="text-ivory text-base leading-relaxed">{property.views}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* Investment Potential */}
            <ScrollReveal>
              <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[11px]">Investment Potential</span>
              <div className="w-16 h-px bg-gold mb-8" />
              <div className="glass-gold p-8 md:p-12 rounded-2xl shadow-xl border border-gold/20">
                <p
                  className="text-ivory/90 leading-loose text-base md:text-lg text-justify md:text-left font-light"
                  style={{ fontFamily: "var(--font-inter)" }}
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

          {/* Right Column (Sticky Sidebar) - Takes up 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-8 z-10 pb-12">
              
              {/* Specs Card */}
              <div className="glass p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
                <p
                  className="text-label text-gold mb-4 tracking-[0.2em] uppercase block"
                  style={{ fontSize: "11px" }}
                >
                  Property Details
                </p>
                <p
                  className="text-gold mb-10 drop-shadow-sm leading-none"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 300 }}
                >
                  {property.priceDisplay}
                </p>
                
                <div className="flex flex-col gap-5 mb-12">
                  {specs.slice(1).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start justify-between gap-6 border-b border-white/10 pb-5 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-stone/80 text-xs uppercase shrink-0 mt-1"
                        style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                      >
                        {spec.label}
                      </span>
                      <span
                        className="text-ivory text-sm font-medium text-right leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href="/contact"
                    className="btn-primary-filled text-xs w-full text-center block py-4 lg:py-5 rounded-lg shadow-lg hover:shadow-gold/20 tracking-widest"
                  >
                    Schedule a Site Visit
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-ghost text-xs w-full text-center block py-4 lg:py-5 rounded-lg tracking-widest"
                  >
                    Request Full Brochure
                  </Link>
                  <a
                    href="https://wa.me/919289533826"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 lg:py-5 text-xs font-bold rounded-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-sm tracking-widest"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Phone size={16} /> WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Assistance Card */}
              <div className="glass p-8 md:p-10 rounded-2xl border border-white/5 shadow-xl">
                <p className="text-label text-gold mb-4 tracking-widest uppercase" style={{ fontSize: "11px" }}>
                  Need help deciding?
                </p>
                <p
                  className="text-stone/90 text-sm md:text-base leading-relaxed mb-8 font-light"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Our advisors know every property personally. Let us help you compare options and find the perfect fit for your legacy.
                </p>
                <Link
                  href="/contact"
                  className="text-gold text-xs flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest font-semibold group"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Talk to an Advisor
                  <div className="h-px w-10 bg-gold transition-all duration-300 group-hover:w-16" />
                </Link>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

      {/* Related Properties CTA - With huge padding to prevent footer overlap */}
      <section
        className="pt-24 pb-32 md:pt-32 md:pb-40 text-center border-t border-white/5"
        style={{ background: "var(--color-mountain-dark)" }}
      >
        <div className="container-custom px-4">
          <ScrollReveal>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl text-ivory mb-10"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Explore More Properties
            </h2>
            <Link href="/properties" className="btn-primary text-xs lg:text-sm px-12 py-5 w-full sm:w-auto inline-flex justify-center tracking-widest">
              View All Properties
            </Link>
          </ScrollReveal>
        </div>
      </section>
      
    </div>
  );
}
