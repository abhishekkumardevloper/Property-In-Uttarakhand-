import Link from "next/link";
import { Globe, Share2, Video, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      // Added mt-20 to push the footer down and prevent overlap with the buttons above it
      className="relative overflow-hidden mt-20"
      style={{ background: "var(--color-mountain-dark)" }}
    >
      {/* Top gradient line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
        }}
      />

      <div className="container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-4 lg:pr-12">
            <Link href="/" className="inline-flex flex-col leading-none mb-6">
              <span
                className="font-heading text-3xl font-light tracking-wider text-ivory uppercase"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Property In
              </span>
              <span className="text-label text-gold mt-1">UTTARAKHAND</span>
            </Link>
            <p
              className="text-stone text-sm leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Premium plotted developments and real estate investments in Uttarakhand's most extraordinary locations. We help you find the perfect plot.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-stone hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Globe size={15} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-stone hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Share2 size={15} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-stone hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="YouTube"
              >
                <Video size={15} />
              </Link>
            </div>
          </div>

          {/* Properties */}
          <div className="lg:col-span-2">
            <h4 className="text-label text-gold mb-6">Properties</h4>
            <ul className="space-y-4">
              {[
                { label: "Premium Plots", href: "/properties" },
                { label: "Highway Land", href: "/properties" },
                { label: "Gated Societies", href: "/properties" },
                { label: "Commercial", href: "/properties" },
                { label: "Investment Land", href: "/properties" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-stone text-sm hover:text-ivory transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-2">
            <h4 className="text-label text-gold mb-6">Locations</h4>
            <ul className="space-y-4">
              {[
                "Dehradun",
                "Mussoorie",
                "Rishikesh",
                "Nainital",
                "Haridwar",
                "Munsiyari",
              ].map((loc) => (
                <li key={loc}>
                  <Link
                    href="/locations"
                    className="text-stone text-sm hover:text-ivory transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-label text-gold mb-6">Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-stone text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  +91 92895 33826
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-stone text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  info@propertyinuttarakhand.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span className="text-stone text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  2nd Floor, Building No.30, 
                  <br />
                  The Vedas Tower, Ballupur Chowk,
                  <br />
                  Dehradun, Uttarakhand - 248001
                </span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="btn-primary text-xs mt-8 inline-flex"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-stone text-xs"
            style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
          >
            © {currentYear} Property in Uttarakhand. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Disclaimer"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-stone text-xs hover:text-ivory transition-colors duration-300"
                style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.05em" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative mountain silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-5 pointer-events-none"
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1440 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 128 L0 80 L120 40 L240 70 L360 20 L480 50 L600 10 L720 45 L840 15 L960 55 L1080 25 L1200 60 L1320 30 L1440 65 L1440 128 Z' fill='%23c9a84c'/%3E%3C/svg%3E\") bottom/cover no-repeat",
        }}
      />
    </footer>
  );
}
