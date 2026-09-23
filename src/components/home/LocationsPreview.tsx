"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PropertyStory() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden" style={{ background: "var(--color-charcoal)" }}>
      {/* Subtle mountain texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 400 L0 250 L100 180 L200 220 L300 120 L400 160 L500 80 L600 140 L700 100 L800 160 L800 400 Z' fill='%232d4a3e' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      <div className="container-custom px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Section */}
          <ScrollReveal direction="left" className="relative w-full">
            {/* 
              CSS Fix: Used responsive aspect ratios so it's not overly tall on mobile. 
              aspect-[4/3] for mobile, aspect-[4/5] for large screens.
            */}
            <div className="relative overflow-hidden w-full group aspect-[4/3] lg:aspect-[4/5] rounded-lg">
              <Image
                // Changed to a highly attractive, lush green mountain landscape suitable for plotting
                src="https://images.unsplash.com/photo-1596524471952-4fb326280db4?q=80&w=1200"
                alt="Premium plotted development in a lush Uttarakhand valley"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* 
                CSS Fix: Switched from 'margin' to 'inset' for the animated gold border. 
                This prevents layout jitter and makes the hover effect perfectly smooth.
              */}
              <div
                className="absolute inset-3 border border-gold/30 pointer-events-none transition-all duration-700 group-hover:border-gold/60 group-hover:inset-5 z-10"
              />
              
              {/* Stat overlay */}
              <div
                className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 glass-dark p-5 lg:p-6 rounded-lg backdrop-blur-md shadow-2xl z-20 border border-white/10"
                style={{ minWidth: "160px" }}
              >
                <p className="stat-number text-gold leading-none drop-shadow-md" style={{ fontSize: "2.5rem", fontFamily: "var(--font-cormorant)" }}>
                  100+
                </p>
                <p
                  className="text-stone text-xs mt-2 leading-relaxed uppercase tracking-widest"
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
          <ScrollReveal direction="right" delay={150}>
            <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <span className="text-label text-gold block mb-2 tracking-[0.2em]">Our Vision</span>
              <div className="gold-divider mx-auto lg:mx-0 mb-8" />

              <h2
                className="display-md text-ivory mb-6 lg:mb-8 leading-tight drop-shadow-sm"
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

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
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
