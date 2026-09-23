"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { useScrollY } from "@/hooks/useScrollProgress";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Locations", href: "/locations" },
  { label: "Investment", href: "/investment" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollY();
  const pathname = usePathname();
  const isScrolled = scrollY > 60;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-600 ${
          isScrolled
            ? "glass-dark py-4 shadow-lg"
            : "py-6 bg-transparent"
        }`}
        style={{ height: "var(--nav-height)" }}
      >
        <div className="container-custom flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" data-cursor="Home">
            <span
              className="font-heading text-2xl font-light tracking-wider text-ivory uppercase"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Property In
            </span>
            <span
              className="text-[9px] tracking-[0.35em] uppercase text-gold font-light mt-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Uttarakhand
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/properties"
              className="btn-primary text-xs"
              data-cursor="Explore"
            >
              Explore Properties
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 text-ivory z-[9001]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {/* Mountain fog background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 80%, rgba(201,168,76,0.15) 0%, transparent 60%)",
          }}
        />

        <div className="flex flex-col items-center gap-8 relative z-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-menu-link ${
                pathname === link.href ? "!text-gold" : ""
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : "0ms" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="mt-8"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s`,
            }}
          >
            <Link
              href="/properties"
              className="btn-primary text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Explore Properties
            </Link>
          </div>
        </div>

        {/* Bottom brand */}
        <div
          className="absolute bottom-8 left-0 right-0 text-center"
          style={{
            opacity: mobileOpen ? 0.4 : 0,
            transition: "opacity 0.5s ease 0.6s",
          }}
        >
          <p className="text-label text-stone">
            Property in Uttarakhand
          </p>
        </div>
      </div>
    </>
  );
}
