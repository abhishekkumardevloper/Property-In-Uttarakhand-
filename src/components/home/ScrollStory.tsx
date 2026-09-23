"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MapPin } from "lucide-react";

const scenes = [
  {
    id: 1,
    lines: ["Some places", "are visited."],
    sub: "A fleeting weekend escape to the hills, leaving you wishing for more.",
    align: "left",
  },
  {
    id: 2,
    lines: ["Some places", "are owned."],
    sub: "A piece of the Himalayas to call your own. A foundation for your future.",
    align: "right",
  },
  {
    id: 3,
    lines: ["Build your legacy", "in Uttarakhand."],
    sub: "Find the perfect plot. Design your dream home. A landscape that stays with you forever.",
    align: "left",
  },
];

export default function ScrollStory() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-[#111111]">
      {/* 1. Mountain Background with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Creates the parallax scroll effect
        }}
      />

      {/* 2. Atmospheric Gradients (Fades top and bottom into the dark theme) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, var(--color-charcoal) 0%, transparent 20%, transparent 80%, var(--color-charcoal) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, var(--color-charcoal) 100%)",
        }}
      />

      {/* 3. The Winding Mountain Road (Desktop SVG) */}
      <div className="absolute inset-0 z-10 hidden md:block pointer-events-none">
        <svg 
          className="w-full h-full text-gold opacity-30" 
          preserveAspectRatio="none" 
          viewBox="0 0 1000 1000"
          fill="none"
        >
          {/* Winding S-curve trail down the center */}
          <path 
            d="M500,0 C650,200 350,300 500,500 C650,700 350,800 500,1000" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeDasharray="12 12" 
            className="animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </svg>
      </div>

      {/* 4. Straight Trail (Mobile) */}
      <div className="absolute left-8 top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gold/30 md:hidden z-10" />

      {/* Content Container */}
      <div className="container-custom relative z-20">
        <div className="max-w-5xl mx-auto relative">
          
          {scenes.map((scene, i) => (
            <ScrollReveal
              key={scene.id}
              delay={0.2}
              direction={scene.align === "left" ? "right" : "left"}
              className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-32 last:mb-0 ${
                scene.align === "left" ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Road Marker Node (Map Pin) */}
              <div 
                className={`absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full glass-gold flex items-center justify-center text-gold z-30 shadow-[0_0_30px_rgba(201,168,76,0.4)] ${
                  scene.align === "left" ? "md:-ml-[2px]" : "md:ml-[2px]"
                }`}
              >
                <MapPin size={18} />
              </div>

              {/* Text Card */}
              <div 
                className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                  scene.align === "left" ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                }`}
              >
                {/* Scene number */}
                <div className={`flex items-center gap-4 mb-6 ${scene.align === "left" ? "md:justify-end" : "md:justify-start"}`}>
                  <span
                    className="text-label text-gold opacity-60"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    0{i + 1}
                  </span>
                  <div className="h-px w-16" style={{ background: "var(--color-gold)", opacity: 0.3 }} />
                </div>

                {/* Lines */}
                <h2
                  className="display-md text-ivory mb-6 leading-tight drop-shadow-lg"
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

                {/* Subtext */}
                {scene.sub && (
                  <p
                    className={`text-stone text-sm md:text-base leading-relaxed glass-dark p-5 rounded-lg border border-white/5 shadow-2xl ${
                      scene.align === "left" ? "md:ml-auto" : "md:mr-auto"
                    } max-w-sm`}
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
