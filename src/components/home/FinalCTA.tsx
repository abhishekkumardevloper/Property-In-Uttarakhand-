"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCTA() {
  return (
    <section
      className="relative py-24 lg:py-40 flex flex-col items-center justify-center w-full"
      style={{ background: "var(--color-mountain-dark)", minHeight: "75vh" }}
    >
      {/* Mountain silhouette background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=40')",
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
        }}
      />
      
      {/* Gradient Overlay for Text Legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-mountain-dark) 0%, transparent 20%, transparent 80%, var(--color-mountain-dark) 100%)",
        }}
      />

      {/* Top gold gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
        }}
      />

      {/* Main Content Container */}
      <div className="container-custom relative z-10 text-center px-4 flex flex-col items-center w-full">
        
        <ScrollReveal direction="up" className="w-full flex flex-col items-center">
          <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase text-[10px] md:text-xs">
            Begin Your Journey
          </span>
          <div className="w-16 h-px bg-gold mx-auto mb-10" />
        </ScrollReveal>

        {/* Staggered Headlines for cinematic effect */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2
            className="text-5xl md:text-6xl lg:text-8xl text-ivory mb-2 lg:mb-4 drop-shadow-lg leading-none"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            YOUR PLOT.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h2
            className="text-5xl md:text-6xl lg:text-8xl text-ivory mb-2 lg:mb-4 drop-shadow-lg leading-none"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            YOUR LEGACY.
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <h2
            className="text-5xl md:text-6xl lg:text-8xl mb-8 lg:mb-12 drop-shadow-lg leading-none"
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

        {/* 
          FIX: Removed ScrollReveal from the bottom paragraph and buttons.
          This guarantees they will always be visible and won't get stuck hiding above the footer.
        */}
        <p
          className="text-stone max-w-xl mx-auto leading-relaxed mb-12 text-sm md:text-base lg:text-lg px-4 sm:px-0 drop-shadow-md"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          Whether you are searching for a premium highway plot, a nature-centric gated community, or a high-ROI investment — your journey to own a piece of Devbhoomi begins with a single conversation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 w-full sm:w-auto px-6 sm:px-0 mb-8">
          <Link
            href="/properties"
            className="btn-primary-filled text-xs lg:text-sm px-10 py-4 lg:px-12 lg:py-5 w-full sm:w-auto text-center tracking-widest shadow-[0_10px_30px_rgba(201,168,76,0.2)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.4)] transition-all"
            data-cursor="Explore"
          >
            Explore Plots
          </Link>
          <Link
            href="/contact"
            className="btn-ghost text-xs lg:text-sm px-10 py-4 lg:px-12 lg:py-5 w-full sm:w-auto text-center tracking-widest bg-black/20 backdrop-blur-sm transition-all"
            data-cursor="Contact"
          >
            Talk to an Advisor
          </Link>
        </div>

      </div>

      {/* Bottom divider for clean separation from footer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
        }}
      />
    </section>
  );
}
