"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCTA() {
  return (
    <section
      // Adjusted padding for mobile (py-24) and desktop (lg:py-40) to prevent footer overlap
      className="relative py-24 lg:py-40 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "var(--color-mountain-dark)" }}
    >
      {/* Mountain silhouette background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=40')",
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          // Optional: Adds a very slow, subtle zoom effect to the background if your CSS supports it, 
          // otherwise acts as a clean static backdrop.
          transition: "transform 10s ease-out",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-mountain-dark) 0%, transparent 20%, transparent 80%, var(--color-mountain-dark) 100%)",
        }}
      />

      {/* Top gold gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
        }}
      />

      <div className="container-custom relative z-10 text-center px-4">
        
        <ScrollReveal direction="up">
          <span className="text-label text-gold block mb-4">Begin Your Journey</span>
          <div className="gold-divider mx-auto mb-8" />
        </ScrollReveal>

        {/* Staggered Headlines for cinematic effect */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2
            className="display-xl text-ivory mb-2 lg:mb-4"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            YOUR PLOT.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h2
            className="display-xl text-ivory mb-2 lg:mb-4"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            YOUR LEGACY.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <h2
            className="display-xl mb-8 lg:mb-12"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              color: "var(--color-gold)",
              fontStyle: "italic",
            }}
          >
            YOUR UTTARAKHAND.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <p
            className="text-stone max-w-lg mx-auto leading-relaxed mb-10 text-sm md:text-base px-4 sm:px-0"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Whether you are searching for a premium highway plot, a nature-centric gated community, or a high-ROI investment — your journey to own a piece of Devbhoomi begins with a single conversation.
          </p>
        </ScrollReveal>

        {/* Buttons - Stack on mobile, side-by-side on larger screens */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Link
              href="/properties"
              className="btn-primary-filled text-xs px-12 py-5 w-full sm:w-auto text-center"
              data-cursor="Explore"
            >
              Explore Plots
            </Link>
            <Link
              href="/contact"
              className="btn-ghost text-xs px-12 py-5 w-full sm:w-auto text-center"
              data-cursor="Contact"
            >
              Talk to an Advisor
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
