"use client";

import Image from "next/image";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const locations = [
  "Dehradun",
  "Mussoorie",
  "Rishikesh",
  "Nainital",
  "Haridwar",
  "Munsiyari",
  "Other",
];
const propertyTypes = [
  "Luxury Villa",
  "Mountain Plot",
  "Holiday Home",
  "Commercial Property",
  "Investment Land",
  "Not Sure Yet",
];
const budgets = [
  "Under ₹50 Lakh",
  "₹50L – ₹1 Crore",
  "₹1 Crore – ₹2 Crore",
  "₹2 Crore – ₹5 Crore",
  "Above ₹5 Crore",
  "Flexible",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    type: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submission — replace with actual API
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--color-charcoal)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-end"
        style={{ height: "55vh", minHeight: "400px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=1400&q=80"
          alt="Contact Himalayan Estates"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, var(--color-charcoal) 100%)",
          }}
        />
        <div className="container-custom relative z-10 pb-20">
          <span className="text-label text-gold">Get in Touch</span>
          <div className="gold-divider" />
          <h1
            className="display-lg text-ivory"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
          >
            Your Next View
            <br />
            <em style={{ fontStyle: "italic" }}>Starts Here.</em>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2
                  className="display-sm text-ivory mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
                >
                  Start Your Property Journey
                </h2>
                <p
                  className="text-stone mb-10 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  Share your requirements and we will reach out within 24 hours.
                </p>

                {submitted ? (
                  <div className="glass-gold p-12 text-center">
                    <div className="text-gold text-5xl mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>✓</div>
                    <h3
                      className="text-ivory text-2xl font-light mb-4"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      Thank you, {form.name || "friend"}.
                    </h3>
                    <p
                      className="text-stone leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                    >
                      Your message has reached us. One of our mountain
                      specialists will be in touch within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="form-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                          Preferred Location
                        </label>
                        <select
                          value={form.location}
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          className="form-input"
                        >
                          <option value="">Select location</option>
                          {locations.map((l) => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                          Property Type
                        </label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                          className="form-input"
                        >
                          <option value="">Select type</option>
                          {propertyTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                        Budget Range
                      </label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="form-input"
                      >
                        <option value="">Select budget</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-label text-stone block mb-2" style={{ fontSize: "9px" }}>
                        Your Message
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about what you are looking for — lifestyle, investment goals, timeline..."
                        className="form-input"
                        style={{ resize: "vertical" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary-filled text-xs flex items-center gap-3 px-10 py-4"
                      data-cursor="Send"
                    >
                      <Send size={14} />
                      Start My Property Journey
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Info panel */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={150} direction="right">
                <div className="space-y-6">
                  {/* Contact details */}
                  <div className="glass p-8">
                    <h3
                      className="text-ivory text-xl font-light mb-6"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      Himalayan Estates
                    </h3>
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <Phone size={14} className="text-gold mt-1 shrink-0" />
                        <div>
                          <p className="text-label text-gold mb-1" style={{ fontSize: "9px" }}>Call / WhatsApp</p>
                          <a
                            href="tel:+919999999999"
                            className="text-ivory text-sm hover:text-gold transition-colors"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            +91 99999 99999
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail size={14} className="text-gold mt-1 shrink-0" />
                        <div>
                          <p className="text-label text-gold mb-1" style={{ fontSize: "9px" }}>Email</p>
                          <a
                            href="mailto:info@himalayanestates.in"
                            className="text-ivory text-sm hover:text-gold transition-colors"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            info@himalayanestates.in
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={14} className="text-gold mt-1 shrink-0" />
                        <div>
                          <p className="text-label text-gold mb-1" style={{ fontSize: "9px" }}>Office</p>
                          <p
                            className="text-ivory text-sm leading-relaxed"
                            style={{ fontFamily: "var(--font-inter)" }}
                          >
                            Race Course Road,
                            <br />
                            Dehradun — 248001,
                            <br />
                            Uttarakhand, India
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Office hours */}
                  <div className="glass p-8">
                    <h4 className="text-label text-gold mb-4" style={{ fontSize: "9px" }}>Office Hours</h4>
                    <div className="space-y-3">
                      {[
                        { day: "Mon – Sat", hours: "9:00 AM – 7:00 PM" },
                        { day: "Sunday", hours: "10:00 AM – 5:00 PM" },
                        { day: "WhatsApp", hours: "7 AM – 9 PM, Daily" },
                      ].map((item) => (
                        <div key={item.day} className="flex justify-between">
                          <span className="text-stone text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            {item.day}
                          </span>
                          <span className="text-ivory text-xs" style={{ fontFamily: "var(--font-inter)" }}>
                            {item.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 text-xs font-semibold"
                    style={{
                      background: "#25D366",
                      color: "white",
                      fontFamily: "var(--font-inter)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
