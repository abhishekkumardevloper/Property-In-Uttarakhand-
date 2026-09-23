"use client";

import { useRef, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const scenes = [
  {
    id: 1,
    lines: ["Some places", "are visited."],
    sub: "",
  },
  {
    id: 2,
    lines: ["Some places", "are lived."],
    sub: "",
  },
  {
    id: 3,
    lines: ["Find yours", "in Uttarakhand."],
    sub: "A landscape that stays with you long after you leave.",
  },
];

export default function ScrollStory() {
  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-charcoal) 0%, var(--color-mountain-dark) 50%, var(--color-charcoal) 100%)",
      }}
    >
      {/* Atmospheric gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        {scenes.map((scene, i) => (
          <ScrollReveal
            key={scene.id}
            delay={0}
            direction="up"
            className={`flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            } mb-32 last:mb-0`}
          >
            <div className="max-w-2xl">
              {/* Scene number */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-label text-gold opacity-40"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  0{i + 1}
                </span>
                <div className="h-px flex-1 max-w-16" style={{ background: "var(--color-gold)", opacity: 0.2 }} />
              </div>

              {/* Lines */}
              <h2
                className="display-lg text-ivory mb-6"
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
                  className="text-stone text-sm leading-relaxed max-w-sm"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {scene.sub}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
