// src/components/home/PropertyStory.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PropertyStory() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden flex items-center" style={{ background: "var(--color-charcoal)", minHeight: "80vh" }}>
      {/* Subtle mountain SVG background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 400 L0 250 L100 180 L200 220 L300 120 L400 160 L500 80 L600 140 L700 100 L800 160 L800 400 Z' fill='%232d4a3e'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      <div className="container-custom relative z-10 px-4 lg:px-8 w-full">
        {/* items-center ensures the text and image are perfectly centered vertically side-by-side on laptop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section */}
          <ScrollReveal direction="left" className="relative w-full">
            {/* 
              Responsive Aspect Ratio: 4/3 on mobile (so it doesn't take the whole screen), 
              and 4/5 on desktop for that elegant portrait look.
            */}
            <div className="relative overflow-hidden w-full group aspect-[4/3] lg:aspect-[4/5] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image
                src="/d1.png"
                alt="Premium plotted development with Himalayan views"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Always-on subtle gradient overlay so the image isn't too harsh */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Animated Gold Inner Frame */}
              <div
                className="absolute inset-4 border border-gold/30 rounded-lg pointer-events-none transition-all duration-700 ease-out group-hover:border-gold/70 group-hover:inset-6 z-10"
              />
              
              {/* Stat overlay */}
              <div
                className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 glass-dark p-5 lg:p-6 rounded-xl backdrop-blur-md shadow-2xl z-20 border border-white/10 transition-transform duration-700 group-hover:-translate-y-2"
                style={{ minWidth: "160px" }}
              >
                <p className="stat-number text-gold leading-none drop-shadow-md" style={{ fontSize: "2.5rem", fontFamily: "var(--font-cormorant)" }}>
                  100+
                </p>
                <p
                  className="text-stone text-[10px] md:text-xs mt-2 leading-relaxed uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Premium Plots
                  <br />
                  Sold
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Section */}
          <ScrollReveal direction="right" delay={150} className="flex flex-col justify-center h-full">
            {/* text-center on mobile, text-left on laptop for perfect reading flow */}
            <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
              
              <span className="text-label text-gold block mb-3 tracking-[0.2em] uppercase">Our Vision</span>
              <div className="gold-divider mx-auto lg:mx-0 mb-8 w-16" />

              <h2
                className="text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 lg:mb-8 leading-tight drop-shadow-sm"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                Plotting Your Future.
                <br />
                <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Securing Your Legacy.</em>
              </h2>

              <p
                className="text-stone text-sm md:text-base leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                In Uttarakhand, land is not simply a transaction. It is an enduring relationship — with the pristine forest that borders your property, the majestic mountains that frame your mornings, and the rapid infrastructure growth accelerating your investment.
              </p>
              
              <p
                className="text-stone text-sm md:text-base leading-relaxed mb-10"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                We specialize exclusively in 143-approved residential plots and highly accessible highway-facing land parcels. From Hanuman-themed spiritual communities near Rajaji National Park to prime expressway investments, we deliver clear-title properties where lifestyle meets unmatched ROI.
              </p>

              {/* Responsive Buttons: Stacked on small phones, side-by-side on larger screens */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <Link 
                  href="/properties" 
                  className="btn-primary-filled text-xs w-full sm:w-auto text-center" 
                  data-cursor="View"
                >
                  Explore Plots
                </Link>
                <Link 
                  href="/about" 
                  className="btn-ghost text-xs w-full sm:w-auto text-center" 
                  data-cursor="About"
                >
                  Our Approach
                </Link>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
