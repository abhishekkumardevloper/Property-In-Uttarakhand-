import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Heart, Eye, Users, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Story | Himalayan Estates",
  description:
    "We don't just sell property. We help people find places. Himalayan Estates — a Uttarakhand-focused real estate company born in the mountains.",
  alternates: { canonical: "https://himalayanestates.in/about" },
};

const values = [
  {
    icon: Heart,
    title: "Place Before Property",
    desc: "We begin with the question: what kind of life do you want to live? The property follows.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "We tell you the truth about every property — its strengths, its challenges, its real value.",
  },
  {
    icon: Users,
    title: "Long-Term Relationships",
    desc: "Our clients return for their second property, refer their friends, and call us years later.",
  },
  {
    icon: Star,
    title: "Local Expertise",
    desc: "We have personally visited every location and every property we represent. No exceptions.",
  },
];

const team = [
  {
    name: "Arjun Negi",
    role: "Founder & Mountain Specialist",
    location: "Dehradun",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Born in Tehri Garhwal. 15 years in Uttarakhand real estate. Has personally visited over 400 properties across the state.",
  },
  {
    name: "Priya Rawat",
    role: "Investment Advisor",
    location: "Mussoorie",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "MBA from IIM Calcutta. Specialises in Kumaon and Garhwal investment properties. Previously with a major Delhi developer.",
  },
  {
    name: "Vikram Singh",
    role: "Property Research & Legals",
    location: "Dehradun",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "LLB from Dehradun Law College. 10 years verifying Uttarakhand property titles. Our clients sleep well at night.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-center"
        style={{ height: "75vh", minHeight: "500px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80"
          alt="Himalayan Estates story"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="text-label text-gold">Our Story</span>
            <div className="gold-divider" />
            <h1
              className="display-lg text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              We Don&apos;t Just Sell Property.
              <br />
              <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
                We Help People Find Places.
              </em>
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal direction="left">
              <span className="text-label text-gold">The Beginning</span>
              <div className="gold-divider" />
              <h2
                className="display-sm text-ivory mb-8"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
              >
                Born in the Mountains.
              </h2>
              <p
                className="text-stone leading-loose mb-6"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                Himalayan Estates began with a simple observation: Uttarakhand
                has some of the most extraordinary land in India, yet most of
                it was being sold by brokers who had never climbed the
                ridge, stood in the valley, or sat on the verandah watching the
                clouds move through the pines.
              </p>
              <p
                className="text-stone leading-loose mb-6"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                We started with one belief — that property is personal. That
                the right mountain home is not found on a spreadsheet. It is
                found by understanding what someone needs from the land, and
                then spending years learning the land well enough to match them.
              </p>
              <p
                className="text-stone leading-loose"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                Today we work with clients across India and around the world —
                from first-time mountain home buyers to serious portfolio
                investors — all united by one desire: a genuine stake in
                Uttarakhand.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150}>
              <div className="space-y-6">
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
                    alt="Mountain property office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { number: "15+", label: "Years in Uttarakhand" },
                    { number: "400+", label: "Properties Visited" },
                    { number: "300+", label: "Happy Clients" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass p-5 text-center">
                      <p className="stat-number" style={{ fontSize: "2rem" }}>{stat.number}</p>
                      <p
                        className="text-stone text-xs mt-2 leading-tight"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: "var(--color-mountain-dark)" }}>
        <div className="container-custom">
          <ScrollReveal className="mb-16">
            <span className="text-label text-gold">Our Approach</span>
            <div className="gold-divider" />
            <h2
              className="display-md text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              The Way
              <br />
              <em style={{ fontStyle: "italic" }}>We Work.</em>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80} direction="up">
                <div className="glass p-8 h-full group hover:glass-gold transition-all duration-400">
                  <v.icon size={24} className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3
                    className="text-ivory text-xl font-light mb-4"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-stone text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {v.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal className="mb-16">
            <span className="text-label text-gold">The Team</span>
            <div className="gold-divider" />
            <h2
              className="display-md text-ivory"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              People Who Know
              <br />
              <em style={{ fontStyle: "italic" }}>The Mountains.</em>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 100} direction="up">
                <div className="group">
                  <div
                    className="relative overflow-hidden mb-6"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.8) 100%)",
                      }}
                    />
                    <div className="absolute bottom-5 left-5">
                      <span className="text-label text-gold" style={{ fontSize: "9px" }}>
                        {member.location}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="text-ivory text-2xl font-light mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-gold text-xs mb-4"
                    style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.1em" }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-stone text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: "var(--color-mountain-dark)" }}>
        <div className="container-custom">
          <ScrollReveal>
            <h2
              className="display-sm text-ivory mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
            >
              Let Us Find Your Place.
            </h2>
            <p
              className="text-stone max-w-md mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              A conversation costs nothing. A missed mountain view costs
              everything.
            </p>
            <Link href="/contact" className="btn-primary text-xs" data-cursor="Contact">
              Start the Conversation
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
