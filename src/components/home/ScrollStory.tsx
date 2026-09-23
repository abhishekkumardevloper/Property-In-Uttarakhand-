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
      {/* 1. Epic Mountain & Road Background */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{
          // Updated to a stunning winding mountain road landscape
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Parallax effect
        }}
      />

      {/* 2. Atmospheric Gradients for text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, var(--color-charcoal) 0%, transparent 15%, transparent 85%, var(--color-charcoal) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          background: "radial-gradient(circle at center, rgba(17,17,17,0.4) 0%, var(--color-charcoal) 100%)",
        }}
      />

      {/* 3. Central Vertical Trail (Replaces the chaotic zig-zag SVG) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 border-l-2 border-dashed border-gold/30 z-10 hidden md:block" />

      {/* Content Container - Perfectly Centered */}
      <div className="container-custom relative z-20 w-full px-4">
        <div className="max-w-3xl mx-auto relative pt-10">
          
          {scenes.map((scene, i) => (
            <ScrollReveal
              key={scene.id}
              delay={0.1}
              direction="up"
              className="relative flex flex-col items-center text-center w-full mb-28 md:mb-40 last:mb-0"
            >
              {/* Road Marker Node (Map Pin) */}
              <div className="relative mb-6 flex flex-col items-center z-30">
                <div 
                  className="w-12 h-12 rounded-full glass-gold flex items-center justify-center text-gold shadow-[0_0_30px_rgba(201,168,76,0.5)] animate-pulse mb-3"
                  style={{ animationDuration: "3s" }}
                >
                  <MapPin size={20} />
                </div>
                <span
                  className="text-label text-gold opacity-80"
                  style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.2em" }}
                >
                  STEP 0{i + 1}
                </span>
              </div>

              {/* Text Card */}
              <div className="w-full flex flex-col items-center">
                {/* Lines */}
                <h2
                  className="display-md text-ivory mb-6 leading-tight drop-shadow-2xl"
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

                {/* Subtext inside a clean glassmorphism box for contrast */}
                {scene.sub && (
                  <p
                    className="text-stone text-sm md:text-base leading-relaxed glass-dark p-6 rounded-xl border border-white/10 shadow-2xl max-w-md mx-auto backdrop-blur-md"
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
