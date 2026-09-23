"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PropertyStory() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: "var(--color-charcoal)" }}>
      {/* Subtle mountain texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 400 L0 250 L100 180 L200 220 L300 120 L400 160 L500 80 L600 140 L700 100 L800 160 L800 400 Z' fill='%232d4a3e' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <Image
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80"
                alt="Premium mountain property in Uttarakhand"
                fill
                className="object-cover"
                style={{ transition: "transform 0.8s ease" }}
              />
              {/* Gold frame accent */}
              <div
                className="absolute inset-0 border border-white/5"
                style={{ margin: "12px" }}
              />
              {/* Stat overlay */}
              <div
                className="absolute bottom-8 left-8 glass-dark p-6"
                style={{ minWidth: "180px" }}
              >
                <p className="stat-number" style={{ fontSize: "3rem" }}>
                  6+
                </p>
                <p
                  className="text-stone text-xs mt-1 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
                >
                  Premium Himalayan
                  <br />
                  Locations
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction="right" delay={150}>
            <div className="max-w-lg">
              <span className="text-label text-gold">Our Properties</span>
              <div className="gold-divider" />

              <h2
                className="display-md text-ivory mb-8"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                Property, Surrounded by Possibility.
              </h2>

              <p
                className="text-stone leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                In Uttarakhand, land is not simply a transaction. It is a
                relationship — with the mountain that frames your morning, the
                valley that stretches below your window, the forest that holds
                your boundary wall.
              </p>
              <p
                className="text-stone leading-relaxed mb-12"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                We curate properties where extraordinary location meets genuine
                investment potential — from architect-designed villas in
                Mussoorie to emerging alpine land in Munsiyari.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/properties" className="btn-primary text-xs" data-cursor="View">
                  View All Properties
                </Link>
                <Link href="/about" className="btn-ghost text-xs" data-cursor="About">
                  Our Approach
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
