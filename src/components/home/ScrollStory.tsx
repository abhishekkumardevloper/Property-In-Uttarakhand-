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
    <section className="relative py-20 md:py-40 overflow-hidden bg-[#111111] flex flex-col items-center">
      {/* 1. Background Image (Using your local dehradun.png) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 md:opacity-50"
        style={{
          backgroundImage: "url('/dehradun.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Parallax effect
        }}
      />
      
      {/* 2. Atmospheric Gradients for text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]" />
      <div className="absolute inset-0 z-0 bg-black/40 md:bg-black/20" />

      {/* 3. Animated Curved Winding Path (Desktop & Mobile) */}
      <div className="absolute inset-0 z-10 flex justify-center pointer-events-none overflow-hidden opacity-40 md:opacity-50">
        <svg 
          className="w-full h-full max-w-5xl text-gold" 
          preserveAspectRatio="none" 
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Beautiful weaving bezier curve that crosses the center (X=50) multiple times */}
          <path 
            d="M 50 0 C 70 15, 30 35, 50 50 C 70 65, 30 85, 50 100" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="2 2" 
            vectorEffect="non-scaling-stroke"
            className="animate-pulse"
            style={{ animationDuration: "3s" }}
          />
        </svg>
      </div>

      {/* 4. Content Container - Perfectly Centered */}
      <div className="container-custom relative z-20 w-full px-4 sm:px-6">
        <div className="max-w-3xl mx-auto relative pt-10">
          
          {scenes.map((scene, i) => (
            <ScrollReveal
              key={scene.id}
              delay={0.1}
              direction="up"
              className="relative flex flex-col items-center text-center w-full mb-28 md:mb-40 last:mb-0"
            >
              {/* Step Marker */}
              <div className="relative mb-6 md:mb-8 flex flex-col items-center z-30">
                <div 
                  className="w-12 h-12 rounded-full glass-gold flex items-center justify-center text-gold shadow-[0_0_20px_rgba(201,168,76,0.4)] mb-3 border border-gold/40 transition-transform duration-500 hover:scale-110 hover:bg-gold/20 backdrop-blur-md"
                >
                  <MapPin size={20} />
                </div>
                <span
                  className="text-label text-gold opacity-90 tracking-widest text-[10px] md:text-xs uppercase bg-[#111111]/50 px-3 py-1 rounded-full backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  STEP 0{i + 1}
                </span>
              </div>

              {/* Text Card */}
              <div className="w-full flex flex-col items-center px-2">
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

                {scene.sub && (
                  <p
                    className="text-stone text-sm md:text-base leading-relaxed glass-dark p-5 md:p-6 rounded-xl border border-white/10 shadow-2xl max-w-sm mx-auto backdrop-blur-md"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {scene.sub}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
          
        </div>
      </div>
    </section>
  );
}
