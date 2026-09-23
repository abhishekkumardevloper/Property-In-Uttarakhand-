"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const MountainScene = dynamic(() => import("@/components/3d/MountainScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background:
          "linear-gradient(180deg, #0d1f17 0%, #1e3a2a 50%, #111111 100%)",
      }}
    />
  ),
});

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Stagger animate words
    const words = titleRef.current?.querySelectorAll(".word");
    if (!words) return;
    words.forEach((word, i) => {
      setTimeout(() => {
        (word as HTMLElement).style.opacity = "1";
        (word as HTMLElement).style.transform = "translateY(0)";
      }, 200 + i * 120);
    });
  }, []);

  return (
    <section 
      className="relative w-full overflow-hidden flex flex-col items-center justify-center" 
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      
      {/* 3D Mountain Background */}
      <div className="absolute inset-0 -z-10">
        {mounted && (
          <Suspense
            fallback={
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, #0d1f17 0%, #1e3a2a 50%, #111111 100%)",
                }}
              />
            }
          >
            <MountainScene />
          </Suspense>
        )}
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none" />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, var(--color-charcoal) 0%, transparent 100%)",
        }}
      />

      {/* Hero Content - Uses relative positioning for perfect flex-centering */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full max-w-5xl mx-auto pt-16">
        
        {/* Location label */}
        <div
          className="mb-6 md:mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <span className="text-label text-gold">
            Property in Uttarakhand · Premium Plots
          </span>
        </div>

        {/* Main headline */}
        <h1
          ref={titleRef}
          className="display-xl text-ivory text-center mb-6 md:mb-8 w-full"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
        >
          {"WHERE THE\nMOUNTAINS\nBECOME HOME.".split("\n").map((line, li) => (
            <span key={li} className="block overflow-hidden pb-2">
              {line.split(" ").map((word, wi) => (
                <span
                  key={wi}
                  className="word inline-block mr-[0.25em]"
                  style={{
                    opacity: 0,
                    transform: "translateY(100%)",
                    transition:
                      "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-mist text-sm sm:text-base md:text-lg mb-10 md:mb-12 max-w-md leading-relaxed px-4"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 1.2s, transform 0.9s ease 1.2s",
          }}
        >
          Premium Plotted Developments & High-ROI Land Investments in Uttarakhand
        </p>

        {/* CTAs - Mobile optimized to stack nicely */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 1.5s, transform 0.9s ease 1.5s",
          }}
        >
          <Link
            href="/properties"
            className="btn-primary-filled text-xs px-10 py-4 w-full sm:w-auto text-center"
            data-cursor="Explore"
          >
            Explore Plots
          </Link>
          <Link
            href="/contact"
            className="btn-ghost text-xs px-10 py-4 w-full sm:w-auto text-center"
            data-cursor="Discover"
          >
            Talk to an Advisor
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        style={{
          opacity: mounted ? 0.6 : 0,
          transition: "opacity 1s ease 2s",
        }}
      >
        <span className="text-label text-stone" style={{ fontSize: "9px" }}>
          Scroll
        </span>
        <ChevronDown
          size={16}
          className="text-stone animate-bounce"
          style={{ animationDuration: "2s" }}
        />
      </div>
    </section>
  );
}
