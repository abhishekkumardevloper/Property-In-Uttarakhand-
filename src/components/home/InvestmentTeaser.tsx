"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { TrendingUp, Shield, MapPin, Landmark } from "lucide-react";

// Updated content to specifically target plot buyers, high ROI, and clear title land
const reasons = [
  {
    icon: TrendingUp,
    title: "Consistent Appreciation",
    desc: "Land values in Uttarakhand are showing rapid growth, especially near new expressways and infrastructure corridors.",
  },
  {
    icon: Shield,
    title: "143 Approved & Clear Title",
    desc: "Every plotted development we list undergoes thorough legal verification ensuring safe, secure, and hassle-free ownership.",
  },
  {
    icon: MapPin,
    title: "Strategic Locations",
    desc: "We curate prime highway-facing and nature-centric plots that offer genuine lifestyle appeal and long-term investment merit.",
  },
  {
    icon: Landmark,
    title: "High ROI Potential",
    desc: "Premium, accessible mountain land is a finite asset, ensuring excellent returns on early plotted investments.",
  },
];

export default function InvestmentTeaser() {
  return (
    <section
      // Replaced generic section-padding with specific responsive Tailwind padding for perfect mobile & desktop spacing
      className="py-20 lg:py-32 relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "var(--color-charcoal)" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-charcoal) 0%, transparent 20%, transparent 80%, var(--color-charcoal) 100%)",
        }}
      />

      <div className="container-custom relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <ScrollReveal>
            <span className="text-label text-gold block mb-4">Investment</span>
            <div className="gold-divider mx-auto mb-8" />
            <h2
              className="display-md text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Invest Where Your
              <br />
              <em style={{ fontStyle: "italic" }}>Legacy Grows.</em>
            </h2>
            <p
              className="text-stone text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              Premium plotted land is among Uttarakhand's most valuable finite assets. With tourism expanding, the Delhi-Dehradun expressway nearing completion, and infrastructure improving rapidly — the case for investing in Uttarakhand real estate has never been stronger.
            </p>
          </ScrollReveal>
        </div>

        {/* Reasons grid - Optimized gap for mobile and desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1} direction="up" className="h-full">
              <div className="glass p-8 h-full flex flex-col items-center text-center group hover:glass-gold transition-all duration-500 rounded-xl">
                <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                  <r.icon
                    size={24}
                    className="text-gold"
                  />
                </div>
                <h3
                  className="text-ivory text-lg mb-4 font-light"
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
            className="btn-primary text-xs w-full sm:w-auto inline-flex justify-center"
            data-cursor="Invest"
          >
            Explore Plot Investments
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
