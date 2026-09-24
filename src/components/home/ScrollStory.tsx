// src/components/home/ScrollStory.tsx
"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { MapPin } from "lucide-react";

const scenes = [
  {
    id: 1,
    lines: ["Some places", "are visited."],
    sub: "A fleeting weekend escape to the hills, leaving you wishing for more.",
  },
  {
    id: 2,
    lines: ["Some places", "are owned."],
    sub: "A piece of the Himalayas to call your own. A foundation for your future.",
  },
  {
    id: 3,
    lines: ["Build your legacy", "in Uttarakhand."],
    sub: "Find the perfect plot. Design your dream home. A landscape that stays with you forever.",
  },
];

export default function ScrollStory() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden bg-[#111111] flex flex-col items-center">
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-30 md:opacity-40"
        style={{
          backgroundImage: "url('/dehradun.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      
      {/* 2. Atmospheric Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]" />
      <div className="absolute inset-0 z-0 bg-black/50 md:bg-black/30" />

      {/* 3. Animated Curved Winding Path */}
      <div className="absolute inset-0 z-10 flex justify-center pointer-events-none overflow-hidden opacity-30 md:opacity-40">
        <svg 
          className="w-full h-full max-w-5xl text-gold" 
          preserveAspectRatio="none" 
          viewBox="0 0 100 100"
          fill="none"
        >
          <path 
            d="M 50 0 C 70 15, 30 35, 50 50 C 70 65, 30 85, 50 100" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="2 2" 
            vectorEffect="non-scaling-stroke"
            className="animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </svg>
      </div>

      {/* 4. Central Anchor Line (Desktop Only) */}
      <div className="absolute left-1/2 top-10 bottom-10 w-px -translate-x-1/2 bg-white/5 z-10 hidden md:block" />

      {/* 5. Main Content Container */}
      <div className="container-custom relative z-20 w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto relative pt-10">
          
          {scenes.map((scene, i) => {
            // Determine if the item sits on the left (even index) or right (odd index)
            const isLeft = i % 2 === 0;

            return (
              <ScrollReveal
                key={scene.id}
                delay={0.1}
                direction="up"
                // Alternating flex-row reverse logic for desktop
                className={`relative flex flex-col md:flex-row w-full items-center mb-28 md:mb-48 last:mb-0 ${
                  !isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Block (Takes 50% width on Desktop) */}
                <div 
                  className={`w-full md:w-1/2 flex flex-col items-center z-20 ${
                    isLeft 
                      ? "md:items-end text-center md:text-right md:pr-16 lg:pr-24" 
                      : "md:items-start text-center md:text-left md:pl-16 lg:pl-24"
                  }`}
                >
                  {/* Mobile-Only Marker (Stacks on top for phones) */}
                  <div className="md:hidden flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center text-gold shadow-[0_0_20px_rgba(201,168,76,0.3)] mb-3 border border-gold/30">
                      <MapPin size={18} />
                    </div>
                    <span
                      className="text-gold opacity-90 tracking-widest text-[10px] uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      STEP 0{i + 1}
                    </span>
                  </div>

                  {/* Headlines */}
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 leading-tight drop-shadow-xl"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                  >
                    {scene.lines.map((line, li) => (
                      <span key={li} className="block">
                        {li === scene.lines.length - 1 ? (
                          <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
                            {line}
                          </em>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </h2>

                  {/* Subtext Card */}
                  {scene.sub && (
                    <p
                      className="text-stone/90 text-sm md:text-base leading-relaxed glass-dark p-6 rounded-xl border border-white/10 shadow-2xl max-w-sm backdrop-blur-md"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {scene.sub}
                    </p>
                  )}
                </div>

                {/* Desktop-Only Center Marker (Pinned to the middle) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center z-30">
                  <div className="w-14 h-14 rounded-full bg-[#111111] flex items-center justify-center text-gold shadow-[0_0_30px_rgba(201,168,76,0.4)] border border-gold/40 transition-transform duration-500 hover:scale-110 group cursor-default">
                    <MapPin size={22} className="group-hover:animate-bounce" />
                  </div>
                  <span
                    className="absolute top-16 text-gold opacity-80 tracking-widest text-[10px] uppercase whitespace-nowrap bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    STEP 0{i + 1}
                  </span>
                </div>

                {/* Empty Half Space for Desktop Grid Balance */}
                <div className="hidden md:block w-1/2" />
              </ScrollReveal>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
