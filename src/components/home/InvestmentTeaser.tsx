"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { TrendingUp, Shield, MapPin, Leaf } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Consistent Appreciation",
    desc: "Uttarakhand property values have shown resilience and growth across economic cycles.",
  },
  {
    icon: Shield,
    title: "Clear Title Properties",
    desc: "Every property we list undergoes thorough legal and title verification.",
  },
  {
    icon: MapPin,
    title: "Exceptional Locations",
    desc: "We only list in destinations with genuine lifestyle and investment merit.",
  },
  {
    icon: Leaf,
    title: "Natural Value",
    desc: "Mountain land with forest, water, and views is a finite, irreplaceable asset.",
  },
];

export default function InvestmentTeaser() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--color-charcoal)" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-charcoal) 0%, transparent 30%, transparent 70%, var(--color-charcoal) 100%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <ScrollReveal>
            <span className="text-label text-gold">Investment</span>
            <div className="gold-divider mx-auto" />
            <h2
              className="display-md text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Invest Where
              <br />
              <em style={{ fontStyle: "italic" }}>
                The Land Tells a Story.
              </em>
            </h2>
            <p
              className="text-stone leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Himalayan land is among India's most finite assets. With
              tourism expanding, infrastructure improving, and remote-work
              culture permanently reshaping where people choose to live — the
              case for Uttarakhand real estate has never been stronger.
            </p>
          </ScrollReveal>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 80} direction="up">
              <div className="glass p-8 h-full group hover:glass-gold transition-all duration-400">
                <r.icon
                  size={24}
                  className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110"
                />
                <h3
                  className="text-ivory text-lg mb-3 font-light"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-stone text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {r.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <Link
            href="/investment"
            className="btn-primary text-xs"
            data-cursor="Invest"
          >
            Explore Investment Opportunities
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
