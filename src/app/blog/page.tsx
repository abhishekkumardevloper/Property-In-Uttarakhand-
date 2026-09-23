import Image from "next/image";
import Link from "next/link";
import { blogPosts, getFeaturedPost } from "@/data/blogPosts";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Blog — Uttarakhand Real Estate | Himalayan Estates",
  description:
    "Investment guides, location insights, lifestyle stories, and real estate analysis for Uttarakhand properties.",
  alternates: { canonical: "https://himalayanestates.in/blog" },
};

const categories = [
  "All",
  "Investment",
  "Uttarakhand Property",
  "Location Guides",
  "Travel & Lifestyle",
  "Real Estate Insights",
];

export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{ height: "45vh", minHeight: "350px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #0d1f17 0%, #1e3a2a 60%, #111 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=40')",
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            opacity: 0.15,
          }}
        />
        <div className="container-custom relative z-10 pb-16">
          <span className="text-label text-gold">Insights</span>
          <div className="gold-divider" />
          <h1
            className="display-md text-ivory"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Stories from
            <br />
            <em style={{ fontStyle: "italic" }}>the Mountains.</em>
          </h1>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-20">
          <div className="container-custom">
            <ScrollReveal>
              <p className="text-label text-gold mb-6">Featured Article</p>
              <Link
                href={`/blog/${featured.slug}`}
                data-cursor="Read"
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-400"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="glass p-10 lg:p-14 flex flex-col justify-center">
                  <span
                    className="text-label text-gold mb-4"
                    style={{ fontSize: "9px" }}
                  >
                    {featured.category}
                  </span>
                  <h2
                    className="text-ivory text-3xl font-light mb-5 leading-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="text-stone text-sm leading-relaxed mb-8"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-stone text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                      {featured.date} · {featured.readTime}
                    </span>
                    <div className="flex items-center gap-2 text-gold text-xs group-hover:gap-3 transition-all">
                      <span style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em", fontSize: "10px", textTransform: "uppercase" }}>Read Article</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="pb-6">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 border border-white/10 text-stone text-xs hover:border-gold hover:text-gold transition-all duration-300"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="pb-32 pt-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80} direction="up">
                <Link
                  href={`/blog/${post.slug}`}
                  data-cursor="Read"
                  className="group block border border-white/5 hover:border-gold/20 transition-all duration-400 overflow-hidden"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-7">
                    <span
                      className="text-label text-gold mb-3 block"
                      style={{ fontSize: "9px" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="text-ivory text-xl font-light mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-stone text-xs leading-relaxed mb-5 line-clamp-3"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-stone text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                        {post.readTime}
                      </span>
                      <div className="flex items-center gap-2 text-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Read</span>
                        <ArrowRight size={10} />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-center"
        style={{ background: "var(--color-mountain-dark)" }}
      >
        <div className="container-custom">
          <ScrollReveal>
            <h2
              className="display-sm text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Ready to Own Your View?
            </h2>
            <Link href="/properties" className="btn-primary text-xs" data-cursor="Explore">
              Explore Properties
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
