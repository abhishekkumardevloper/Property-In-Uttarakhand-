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
    <section className="relative py-24 md:py-40 overflow-hidden bg-[#111111]">
      {/* 1. Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-30 md:opacity-40"
        style={{
          backgroundImage: "url('/dehradunn.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      
      {/* 2. Atmospheric Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]" />
      <div className="absolute inset-0 z-0 bg-black/50 md:bg-black/40" />

      {/* 3. Animated Curved Winding Path */}
      <div className="absolute inset-0 z-10 flex justify-center pointer-events-none overflow-hidden opacity-20 md:opacity-30">
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

      <div className="container-custom relative z-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto relative pt-10">

          {/* Center Vertical Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent -translate-x-1/2 z-10" />

          {scenes.map((scene, i) => {
            // Determine if the item sits on the left (even index) or right (odd index)
            const isLeft = i % 2 === 0;

            return (
              // FIX: The margin is now explicitly on a standard div, completely stopping the collapsing issue
              <div key={scene.id} className="relative w-full mb-32 md:mb-56 last:mb-0">
                <ScrollReveal delay={0.1} direction="up" className="w-full">
                  
                  {/* Strict Flex Layout to prevent overlaps */}
                  <div className={`flex flex-col md:flex-row items-center justify-between w-full ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Content Column - Strict 45% Width */}
                    <div className={`w-full md:w-[45%] flex flex-col items-center z-20 ${isLeft ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-center`}>
                      
                      {/* Mobile-Only Marker */}
                      <div className="md:hidden flex flex-col items-center mb-6">
                        <div className="w-14 h-14 rounded-full glass-dark flex items-center justify-center text-gold shadow-[0_0_20px_rgba(201,168,76,0.3)] mb-3 border border-gold/40">
                          <MapPin size={20} />
                        </div>
                        <span className="text-gold tracking-widest text-[10px] uppercase font-bold bg-black/40 px-3 py-1 rounded-full border border-white/5" style={{ fontFamily: "var(--font-inter)" }}>
                          STEP 0{i + 1}
                        </span>
                      </div>

                      {/* Headlines */}
                      <h2
                        className="text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 leading-tight drop-shadow-2xl"
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
                          className="text-stone/90 text-sm md:text-base leading-relaxed glass-dark p-6 md:p-8 rounded-xl border border-white/10 shadow-2xl max-w-md backdrop-blur-md"
                          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                        >
                          {scene.sub}
                        </p>
                      )}
                    </div>

                    {/* Center Marker Column - Strict 10% Width (Desktop Only) */}
                    <div className="hidden md:flex flex-col items-center justify-center w-[10%] z-30">
                       <div className="w-16 h-16 rounded-full glass-dark flex items-center justify-center text-gold shadow-[0_0_30px_rgba(201,168,76,0.5)] border border-gold/50 relative group transition-transform duration-500 hover:scale-110 hover:bg-gold/10">
                         <MapPin size={24} />
                         <span
                           className="absolute -bottom-10 text-gold tracking-widest text-[10px] uppercase font-bold whitespace-nowrap bg-black/60 px-3 py-1.5 rounded-full border border-white/10 shadow-md"
                           style={{ fontFamily: "var(--font-inter)" }}
                         >
                           STEP 0{i + 1}
                         </span>
                       </div>
                    </div>

                    {/* Empty Space Column - Strict 45% Width (Desktop Only) */}
                    <div className="hidden md:block w-[45%]" />

                  </div>

                </ScrollReveal>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
