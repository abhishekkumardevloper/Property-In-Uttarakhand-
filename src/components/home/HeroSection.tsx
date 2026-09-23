"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type SceneProps = { started: boolean; onReady?: () => void };

const MountainScene = dynamic<SceneProps>(() => import("@/components/3d/MountainScene"), {
  ssr: false,
});

/* ---- timing (ms) ---- */
const MIN_CLOSED = 1800; // doors stay shut at least this long (title is readable)
const FAILSAFE = 6000; // open anyway if the 3D scene is slow / unavailable
const OPEN_DURATION = 2000; // door slide
const REVEAL_AFTER_OPEN = 1100; // headline starts once doors are ~half open

const EASE_DOOR = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

/* headline words with a global index for the stagger */
let n = 0;
const HEADLINE = ["WHERE THE", "MOUNTAINS", "BECOME HOME."].map((line) =>
  line.split(" ").map((w) => ({ w, i: n++ }))
);

/* ------------------------------------------------------------------ */
/*  One half of the intro doors                                        */
/* ------------------------------------------------------------------ */

function Door({ side, open, armed }: { side: "left" | "right"; open: boolean; armed: boolean }) {
  const isLeft = side === "left";
  return (
    <div
      className="absolute top-0 bottom-0 w-1/2 overflow-hidden"
      style={{
        [side]: 0,
        background: isLeft
          ? "linear-gradient(100deg, #08130e 0%, #0f2119 70%, #14291f 100%)"
          : "linear-gradient(260deg, #08130e 0%, #0f2119 70%, #14291f 100%)",
        transform: open ? `translateX(${isLeft ? "-100%" : "100%"})` : "translateX(0)",
        transition: `transform ${OPEN_DURATION}ms ${EASE_DOOR}`,
        boxShadow: isLeft ? "40px 0 90px rgba(0,0,0,0.55)" : "-40px 0 90px rgba(0,0,0,0.55)",
        willChange: "transform",
      }}
    >
      {/* Full-width face; each door shows its own half, so the title splits at the seam */}
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center justify-center text-center"
        style={{ width: "200%", [side]: 0 }}
      >
        {/* ridge silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[38%]"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 300 L0 210 L120 150 L210 190 L340 90 L450 170 L560 120 L640 60 L720 130 L830 100 L940 175 L1050 130 L1200 200 L1200 300 Z"
            fill="rgba(255,255,255,0.035)"
          />
          <path
            d="M0 300 L0 250 L160 200 L300 240 L470 170 L620 235 L780 185 L930 240 L1080 205 L1200 245 L1200 300 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>

        <div className="relative px-6">
          <p className="text-label text-gold mb-5 md:mb-7">Premium Plots · Himalayan Estates</p>
          <h2
            className="text-ivory"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 9.5vw, 7.5rem)",
              lineHeight: 0.98,
              letterSpacing: "0.04em",
            }}
          >
            PROPERTY IN
            <br />
            UTTARAKHAND
          </h2>

          {/* progress line — grows from the seam outward */}
          <div className="mx-auto mt-8 md:mt-10 h-px w-40 sm:w-56 bg-white/10 overflow-hidden">
            <div
              className="h-full w-full bg-gold"
              style={{
                transform: armed ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: `transform ${MIN_CLOSED - 200}ms cubic-bezier(0.65, 0, 0.35, 1)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* glowing seam */}
      <div
        className="absolute top-0 bottom-0 w-px"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(201,169,110,0.7) 50%, transparent 100%)",
          opacity: open ? 0 : 1,
          transition: "opacity 400ms ease",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const [armed, setArmed] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const handleReady = useCallback(() => setSceneReady(true), []);

  // boot: timers, reduced-motion shortcut
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      setRevealed(true);
      setDone(true);
      return;
    }
    const raf = requestAnimationFrame(() => setArmed(true));
    const t1 = setTimeout(() => setMinElapsed(true), MIN_CLOSED);
    const t2 = setTimeout(() => setSceneReady(true), FAILSAFE);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // open when the 3D scene is ready AND the title has been seen
  useEffect(() => {
    if (sceneReady && minElapsed) setOpen(true);
  }, [sceneReady, minElapsed]);

  // after opening: reveal text, then remove doors
  useEffect(() => {
    if (!open || done) return;
    const t1 = setTimeout(() => setRevealed(true), REVEAL_AFTER_OPEN);
    const t2 = setTimeout(() => setDone(true), OPEN_DURATION + 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open, done]);

  // lock scroll while the intro plays
  useEffect(() => {
    if (done) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [done]);

  const fadeUp = (delay: number, distance = 30) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ${EASE_OUT} ${delay}ms`,
  });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px", background: "#0d1f17" }}
    >
      {/* LAYER 1 — 3D valley */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #2c68b0 0%, #78aee0 40%, #4f9033 75%, #111111 100%)",
        }}
      >
        <MountainScene started={open} onReady={handleReady} />
      </div>

      {/* LAYER 2 — legibility + cinematic grade */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,18,14,0.55) 0%, rgba(6,18,14,0.18) 42%, rgba(6,18,14,0) 62%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(0deg, var(--color-charcoal) 0%, transparent 100%)" }}
      />

      {/* LAYER 3 — hero content */}
      <div className="relative z-20 h-full w-full max-w-5xl mx-auto flex flex-col items-center justify-between md:justify-center text-center px-4 sm:px-6 pt-24 pb-28 md:pt-16 md:pb-0">
        <div className="flex flex-col items-center w-full">
          <div className="mb-5 md:mb-8" style={fadeUp(0, 20)}>
            <span className="text-label text-gold" style={{ textShadow: "0 1px 14px rgba(0,0,0,0.6)" }}>
              Property in Uttarakhand · Premium Plots
            </span>
          </div>

          <h1
            className="text-ivory text-center w-full mb-5 md:mb-8"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 8.6vw, 6.6rem)",
              lineHeight: 0.98,
              letterSpacing: "0.01em",
              textShadow: "0 2px 34px rgba(0,0,0,0.4)",
            }}
          >
            {HEADLINE.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-2">
                {line.map(({ w, i }) => (
                  <span
                    key={i}
                    className="inline-block mr-[0.25em] last:mr-0"
                    style={{
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? "translateY(0)" : "translateY(105%)",
                      transition: `opacity 0.9s ${EASE_OUT} ${i * 120}ms, transform 0.9s ${EASE_OUT} ${i * 120}ms`,
                    }}
                  >
                    {w}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p
            className="text-mist text-sm sm:text-base md:text-lg max-w-md leading-relaxed px-2"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              textShadow: "0 1px 18px rgba(0,0,0,0.55)",
              ...fadeUp(750),
            }}
          >
            Premium Plotted Developments & High-ROI Land Investments in Uttarakhand
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0 md:mt-12"
          style={fadeUp(1000)}
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
        className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: revealed ? 0.65 : 0, transition: "opacity 1s ease 1.4s" }}
      >
        <span className="text-label text-stone" style={{ fontSize: "9px" }}>
          Scroll
        </span>
        <ChevronDown size={16} className="text-stone animate-bounce" style={{ animationDuration: "2s" }} />
      </div>

      {/* LAYER 4 — intro doors: two halves slide apart to reveal the valley */}
      {!done && (
        <div className="absolute inset-0 z-40" aria-hidden="true" style={{ pointerEvents: open ? "none" : "auto" }}>
          <Door side="left" open={open} armed={armed} />
          <Door side="right" open={open} armed={armed} />
        </div>
      )}
    </section>
  );
}
