"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCTA() {
  return (
    <section
      className="relative py-40 overflow-hidden"
      style={{ background: "var(--color-mountain-dark)" }}
    >
      {/* Mountain silhouette */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=40')",
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-mountain-dark) 0%, transparent 30%, transparent 70%, var(--color-mountain-dark) 100%)",
        }}
      />

      {/* Gold gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
        }}
      />

      <div className="container-custom relative z-10 text-center">
        <ScrollReveal direction="up">
          <span className="text-label text-gold">Begin Your Journey</span>
          <div className="gold-divider mx-auto" />
          <h2
            className="display-xl text-ivory mb-4"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            YOUR VIEW.
          </h2>
          <h2
            className="display-xl text-ivory mb-4"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            YOUR SPACE.
          </h2>
          <h2
            className="display-xl mb-12"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              color: "var(--color-gold)",
              fontStyle: "italic",
            }}
          >
            YOUR UTTARAKHAND.
          </h2>

          <p
            className="text-stone max-w-lg mx-auto leading-relaxed mb-12 text-base"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            Whether you are searching for a mountain home, a plot with a
            view, or an investment that endures — your Uttarakhand journey
            begins with a single conversation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/properties"
              className="btn-primary-filled text-xs px-12 py-5"
              data-cursor="Explore"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="btn-ghost text-xs px-12 py-5"
              data-cursor="Contact"
            >
              Talk to an Advisor
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
