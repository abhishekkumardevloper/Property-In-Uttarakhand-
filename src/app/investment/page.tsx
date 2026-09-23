import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { TrendingUp, Shield, MapPin, Leaf, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment in Uttarakhand — Mountain Real Estate | Himalayan Estates",
  description:
    "Discover why Uttarakhand is one of India's most promising real estate investment destinations. Luxury villas, mountain plots, and holiday homes.",
  alternates: { canonical: "https://himalayanestates.in/investment" },
};

const whyUttarakhand = [
  {
    title: "Limited Supply",
    desc: "Much of Uttarakhand is protected forest reserve. The amount of available residential land is finite and diminishing — creating natural scarcity that protects values.",
    icon: Leaf,
  },
  {
    title: "Growing Infrastructure",
    desc: "The Char Dham highway project, new tunnels, airport expansions, and rail connectivity are transforming access across the state — driving significant value appreciation.",
    icon: MapPin,
  },
  {
    title: "Tourism Momentum",
    desc: "Uttarakhand received over 40 million tourists in recent years. Spiritual, adventure, wellness, and luxury tourism are all expanding, creating strong rental demand.",
    icon: TrendingUp,
  },
  {
    title: "Stable Market",
    desc: "Uttarakhand property values have shown resilience across economic cycles. Demand from both domestic investors and NRIs provides consistent market depth.",
    icon: Shield,
  },
];

const categories = [
  {
    title: "Luxury Villas",
    desc: "Architect-designed mountain homes in premium locations. Strong lifestyle appeal and rental income potential.",
    locations: ["Mussoorie", "Dehradun", "Nainital"],
    return: "High Lifestyle + Appreciation",
  },
  {
    title: "Mountain Plots",
    desc: "Freehold land in premium Himalayan locations. Pure investment with maximum appreciation potential.",
    locations: ["Mussoorie", "Munsiyari", "Nainital", "Rishikesh"],
    return: "High Appreciation",
  },
  {
    title: "Holiday Homes",
    desc: "Properties optimized for Airbnb and short-term rental income in high-tourism destinations.",
    locations: ["Rishikesh", "Mussoorie", "Haridwar"],
    return: "60–80% Annual Occupancy",
  },
  {
    title: "Emerging Land",
    desc: "First-mover positions in destinations like Munsiyari — before full infrastructure arrives.",
    locations: ["Munsiyari", "Pithoragarh", "Chakrata"],
    return: "Maximum Long-Term Potential",
  },
];

const faqs = [
  {
    q: "Can non-Uttarakhand residents buy property here?",
    a: "Yes. Non-residents (including NRIs and foreign nationals of Indian origin) can purchase residential and commercial property in Uttarakhand. Agricultural land purchases have specific restrictions — our advisors will guide you through the applicable rules for each property.",
  },
  {
    q: "What documents are required for purchase?",
    a: "Standard requirements include PAN card, Aadhaar (for Indian nationals), address proof, and bank details. For NRI purchases, passport and OCI card are required. We provide complete documentation support for every transaction.",
  },
  {
    q: "What are the registration charges in Uttarakhand?",
    a: "Stamp duty in Uttarakhand is typically 5% for males and 3.75% for females. Registration fees are 2%. Our team will provide a complete cost breakdown for each property you consider.",
  },
  {
    q: "What is the rental income potential?",
    a: "Holiday homes in Rishikesh and Mussoorie can achieve 60–80% annual occupancy at premium nightly rates. Our team can share realistic income projections based on current market data for each location.",
  },
  {
    q: "Can I build on a plot I purchase?",
    a: "Yes, subject to the applicable development regulations for the specific area. We work only with properties that have clear construction permissions or strong permissibility. Our team will advise on specific building rules for each plot.",
  },
];

export default function InvestmentPage() {
  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{ height: "65vh", minHeight: "450px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&q=80"
          alt="Himalayan mountain investment Uttarakhand"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 60%, var(--color-charcoal) 100%)",
          }}
        />
        <div className="container-custom relative z-10 pb-20">
          <span className="text-label text-gold">Investment</span>
          <div className="gold-divider" />
          <h1
            className="display-lg text-ivory"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Invest Where
            <br />
            <em style={{ fontStyle: "italic" }}>The Land Tells a Story.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <p
              className="text-stone text-xl leading-loose"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              &ldquo;Himalayan land is among India&apos;s most finite assets. The mountains
              are not growing. The forest reserves are not shrinking. But the
              number of people who want to live near them is rising every year.&rdquo;
            </p>
            <div className="gold-divider mt-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* Why Uttarakhand */}
      <section className="section-padding" style={{ background: "var(--color-mountain-dark)" }}>
        <div className="container-custom">
          <ScrollReveal className="mb-16">
            <span className="text-label text-gold">Why Uttarakhand</span>
            <div className="gold-divider" />
            <h2
              className="display-md text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Four Fundamental
              <br />
              <em style={{ fontStyle: "italic" }}>Investment Arguments.</em>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUttarakhand.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80} direction="up">
                <div className="glass p-10 h-full group hover:glass-gold transition-all duration-400">
                  <item.icon size={28} className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3
                    className="text-ivory text-2xl font-light mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-stone text-sm leading-loose"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal className="mb-16">
            <span className="text-label text-gold">Opportunities</span>
            <div className="gold-divider" />
            <h2
              className="display-md text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Property
              <br />
              <em style={{ fontStyle: "italic" }}>Categories.</em>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.title} delay={i * 80}>
                <div className="glass p-10 h-full border border-white/5 hover:border-gold/20 transition-all duration-400 group">
                  <p className="text-label text-gold mb-4" style={{ fontSize: "9px" }}>
                    {cat.return}
                  </p>
                  <h3
                    className="text-ivory text-2xl font-light mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-stone text-sm leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {cat.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.locations.map((loc) => (
                      <span
                        key={loc}
                        className="px-3 py-1 border border-gold/20 text-gold text-xs"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: "var(--color-mountain-dark)" }}>
        <div className="container-custom max-w-3xl">
          <ScrollReveal className="mb-16">
            <span className="text-label text-gold">FAQ</span>
            <div className="gold-divider" />
            <h2
              className="display-md text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Frequently Asked
              <br />
              <em style={{ fontStyle: "italic" }}>Questions.</em>
            </h2>
          </ScrollReveal>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <FAQItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor CTA */}
      <section className="py-28 text-center" style={{ background: "var(--color-charcoal)" }}>
        <div className="container-custom">
          <ScrollReveal>
            <h2
              className="display-md text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Ready to Invest?
            </h2>
            <p
              className="text-stone max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Our investment advisors specialise exclusively in Uttarakhand
              real estate. We will help you identify the right property, the
              right location, and the right timing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary-filled text-xs px-10 py-4" data-cursor="Talk">
                Talk to an Advisor
              </Link>
              <Link href="/properties" className="btn-ghost text-xs px-10 py-4" data-cursor="View">
                Browse Properties
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item group py-6 cursor-pointer">
      <summary className="flex items-center justify-between list-none cursor-pointer">
        <h3
          className="text-ivory text-lg font-light pr-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {q}
        </h3>
        <ChevronDown
          size={16}
          className="text-gold shrink-0 transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <p
        className="text-stone text-sm leading-loose mt-4 pr-8"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
      >
        {a}
      </p>
    </details>
  );
}
