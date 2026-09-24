"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import CloudLayer from "@/components/home/CloudLayer";

/* ------------------------------------------------------------------ */
/*  YOUR MEDIA — drop real files into /public/hero/                   */
/* ------------------------------------------------------------------ */

/** Real photo of your plots / the mountains. 2400px wide, JPG or WebP, ideally under 400 KB. */
const IMAGE_SRC = "/hero/hero.png";
/** Optional portrait crop for phones (1080x1600 works well). Leave "" to reuse IMAGE_SRC. */
const MOBILE_IMAGE_SRC = "";
/** Optional looping background video (muted, 6–12 s, MP4/H.264, under ~4 MB). Leave "" for photo only. */
const VIDEO_SRC = "";
/** Which part of the photo stays in view when it is cropped to the screen (x y). */
const FOCAL = "50% 58%";

/* ---- timing (ms) — the door timings are unchanged ---- */
const MIN_CLOSED = 1800; 
const FAILSAFE = 6000; 
const OPEN_DURATION = 2000; 
const CLOUD_START = 1300; 
const CLOUD_DURATION = 3800; 
const REVEAL_AFTER_OPEN = 3000; 

const EASE_DOOR = "cubic-bezier(0.76, 0, 0.24, 1)";
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

const IVORY = "#fbf7ec";

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
        transform: open ? `translateX(${isLeft ? "-101%" : "101%"})` : "translateX(0)",
        boxShadow: open
          ? "0 0 0 rgba(0,0,0,0)"
          : isLeft
            ? "40px 0 90px rgba(0,0,0,0.55)"
            : "-40px 0 90px rgba(0,0,0,0.55)",
        transition: `transform ${OPEN_DURATION}ms ${EASE_DOOR}, box-shadow 500ms ease`,
        willChange: "transform",
      }}
    >
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center justify-center text-center"
        style={{ width: "200%", [side]: 0 }}
      >
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
          <p className="text-label text-gold mb-5 md:mb-7">Premium Plots · Property in Uttarakhand</p>
          <h2
            className="text-ivory"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 9.5vw, 7.5rem)",
              lineHeight: 1.15,
              letterSpacing: "0.04em",
            }}
          >
            PROPERTY IN
            <br />
            UTTARAKHAND
          </h2>

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
  const [mediaReady, setMediaReady] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [cloudsReady, setCloudsReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [forceReady, setForceReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [videoOn, setVideoOn] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const handleCloudsReady = useCallback(() => setCloudsReady(true), []);
  const handleImgLoad = useCallback(() => setMediaReady(true), []);
  const handleImgError = useCallback(() => {
    setMediaFailed(true);
    setMediaReady(true);
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) setMediaReady(true);
      else handleImgError();
    }
  }, [handleImgError]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setOpen(true);
      setRevealed(true);
      setDone(true);
      return;
    }
    const raf = requestAnimationFrame(() => setArmed(true));
    const t1 = setTimeout(() => setMinElapsed(true), MIN_CLOSED);
    const t2 = setTimeout(() => setForceReady(true), FAILSAFE);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (((mediaReady && cloudsReady) || forceReady) && minElapsed) setOpen(true);
  }, [mediaReady, cloudsReady, forceReady, minElapsed]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setRevealed(true), REVEAL_AFTER_OPEN);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setDone(true), OPEN_DURATION + 300);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (done) return;
    const stop = (e: Event) => e.preventDefault();
    const keys = (e: KeyboardEvent) => {
      if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });
    window.addEventListener("keydown", keys);
    return () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      window.removeEventListener("keydown", keys);
    };
  }, [done]);

  const fadeUp = (delay: number, distance = 30) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ${EASE_OUT} ${delay}ms`,
  });

  return (
    <section
      className="relative w-full overflow-hidden h-screen h-[100svh] min-h-[600px] flex items-center justify-center"
      style={{ background: "#0d1f17" }}
    >
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #2c68b0 0%, #78aee0 38%, #4f9033 72%, #14291f 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: open && !reduced ? "scale(1.04)" : reduced ? "scale(1)" : "scale(1.2)",
            transition: "transform 14000ms cubic-bezier(0.22, 0.61, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {!mediaFailed && (
            <picture>
              {MOBILE_IMAGE_SRC && <source media="(max-width: 767px)" srcSet={MOBILE_IMAGE_SRC} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={IMAGE_SRC}
                alt=""
                decoding="async"
                onLoad={handleImgLoad}
                onError={handleImgError}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: FOCAL }}
              />
            </picture>
          )}
          {VIDEO_SRC && !reduced && !mediaFailed && (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: FOCAL, opacity: videoOn ? 1 : 0, transition: "opacity 1.2s ease" }}
              src={VIDEO_SRC}
              poster={IMAGE_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setVideoOn(true)}
              onError={() => setVideoOn(false)}
            />
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,12,10,0.5) 0%, rgba(4,12,10,0.3) 36%, rgba(4,12,10,0.14) 62%, rgba(4,12,10,0) 84%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 78% 46% at 50% 38%, rgba(4,12,10,0.42) 0%, rgba(4,12,10,0.22) 55%, rgba(4,12,10,0) 100%)",
        }}
      />

      <div className="absolute inset-0 z-[15] pointer-events-none">
        <CloudLayer
          clearing={open}
          delay={CLOUD_START}
          duration={CLOUD_DURATION}
          instant={reduced}
          onReady={handleCloudsReady}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-40 md:h-48 z-[16] pointer-events-none"
        style={{ background: "linear-gradient(0deg, var(--color-charcoal) 0%, transparent 100%)" }}
      />

      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
        
        <div className="mb-6 md:mb-8" style={fadeUp(0, 20)}>
          <span
            className="text-label text-gold inline-block whitespace-nowrap rounded-full px-4 py-2"
            style={{
              background: "rgba(5,14,11,0.55)",
              border: "1px solid rgba(201,169,110,0.35)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
              fontSize: "clamp(0.56rem, 2.5vw, 0.75rem)",
              letterSpacing: "clamp(0.14em, 0.6vw + 0.08em, 0.28em)",
            }}
          >
            Property in Uttarakhand · Premium Plots
          </span>
        </div>

        <h1
          className="text-center w-full mb-6 md:mb-8"
          style={{
            color: IVORY,
            fontFamily: "var(--font-cormorant)",
            fontWeight: 400,
            fontSize: "clamp(2.6rem, min(11vw, 12.5vh), 6.6rem)",
            lineHeight: 1.15,
            letterSpacing: "0.03em",
            filter:
              "drop-shadow(0 2px 3px rgba(0,0,0,0.55)) drop-shadow(0 6px 26px rgba(0,0,0,0.55))",
          }}
        >
          {HEADLINE.map((lineArray, li) => (
            <span key={li} className="block overflow-hidden py-3">
              {lineArray.map(({ w, i }, index) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(105%)",
                    transition: `opacity 0.9s ${EASE_OUT} ${i * 120}ms, transform 0.9s ${EASE_OUT} ${i * 120}ms`,
                    // FIX: Reliable inline margin-right applies spacing between words robustly
                    marginRight: index !== lineArray.length - 1 ? "0.25em" : "0",
                  }}
                >
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg max-w-md leading-relaxed px-2 mb-8 md:mb-12"
          style={{
            color: "#f3eee2",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 2px 18px rgba(0,0,0,0.6)",
            ...fadeUp(750),
          }}
        >
          Premium Plotted Developments & High-ROI Land Investments in Uttarakhand
        </p>
        
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6 sm:px-0"
          style={fadeUp(1000)}
        >
          <Link
            href="/properties"
            className="btn-primary-filled text-xs px-10 py-4 w-full sm:w-auto text-center"
            style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.35)" }}
            data-cursor="Explore"
          >
            Explore Plots
          </Link>
          <Link
            href="/contact"
            className="btn-ghost text-xs px-10 py-4 w-full sm:w-auto text-center"
            style={{
              color: IVORY,
              background: "rgba(5,14,11,0.5)",
              borderColor: "rgba(251,247,236,0.6)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            data-cursor="Discover"
          >
            Talk to an Advisor
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: revealed ? 0.75 : 0, transition: "opacity 1s ease 1.4s" }}
      >
        <span className="text-label text-stone" style={{ fontSize: "9px" }}>
          Scroll
        </span>
        <ChevronDown size={16} className="text-stone animate-bounce" style={{ animationDuration: "2s" }} />
      </div>

      {!done && (
        <div className="absolute inset-0 z-40" aria-hidden="true" style={{ pointerEvents: open ? "none" : "auto" }}>
          <Door side="left" open={open} armed={armed} />
          <Door side="right" open={open} armed={armed} />
        </div>
      )}
    </section>
  );
}
