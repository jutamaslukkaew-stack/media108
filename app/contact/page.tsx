"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

/* ── Quick contact cards ─────────────────────────────── */
const quickLinks = [
  {
    icon: "phone_in_talk",
    title: "Phone",
    body: "+66 (0) 38 123 4567",
    span: false,
  },
  {
    icon: "support_agent",
    title: "Support",
    body: "Report an Issue",
    span: false,
  },
  {
    icon: "work",
    title: "Careers",
    body: "Join our world-class media team",
    span: true,
    arrow: true,
  },
];

/* ── Desktop CTA bar items ───────────────────────────── */
const ctaItems = [
  { icon: "payments",       label: "Request Quotation",  href: "#form",      green: false },
  { icon: "campaign",       label: "Book This Billboard", href: "/network",   green: false },
  { icon: "cloud_download", label: "Media Kit",           href: "/media-kit", green: false },
  { icon: "support_agent",  label: "Contact Sales",       href: "#form",      green: false },
  { icon: "chat",           label: "LINE OA",             href: "#",          green: true  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", service: "", message: "",
  });
  const [pdpa, setPdpa] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-8");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pdpa) return;
    setSubmitted(true);
  }

  /* ── shared input class ── */
  const inputClass = (field: string) =>
    `w-full bg-surface-container-low border rounded-lg p-4 outline-none transition-all text-on-surface placeholder:text-on-surface-variant/50 ${
      focusedField === field
        ? "border-primary ring-2 ring-primary/20"
        : "border-white/10 focus:border-primary"
    }`;
  const labelClass = (field: string) =>
    `font-label-md text-label-md uppercase tracking-widest block mb-2 transition-colors ${
      focusedField === field ? "text-primary" : "text-on-surface-variant"
    }`;

  return (
    <>
      <Navbar activePage="contact" />

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center pt-24 pb-16 px-6 md:px-margin-desktop bg-surface text-center">
        <div className="relative z-10 max-w-4xl">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight text-white">
            Contact Our{" "}
            <span className="text-primary italic">Media Specialists</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Bridge the gap between your brand and millions of urban eyes. Our experts are ready to curate your
            global media footprint.
          </p>
        </div>
      </section>

      {/* ── Main content grid ── */}
      <main id="form" className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 pb-32 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Contact Form (7 cols) ── */}
          <div className="reveal lg:col-span-7 glass-card p-8 md:p-12 rounded-xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-primary shrink-0" />
              <h2 className="font-headline-md text-headline-md text-white">Request a Quotation</h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <span
                  className="material-symbols-outlined text-6xl text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <h3 className="font-headline-md text-headline-md text-white">ส่งข้อมูลเรียบร้อยแล้ว!</h3>
                <p className="text-on-surface-variant font-body-md max-w-sm">
                  ทีมงานของเราจะติดต่อกลับภายใน 1 วันทำการ ขอบคุณที่ไว้วางใจ Media108
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 border border-white/20 hover:bg-white/10 px-8 py-3 rounded-lg font-label-md text-label-md text-white transition-all"
                >
                  ส่งอีกครั้ง
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Row 1: Name + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass("name")}>Full Name</label>
                    <input
                      name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass("company")}>Company</label>
                    <input
                      name="company" type="text" value={form.company} onChange={handleChange}
                      placeholder="Your Company Ltd."
                      className={inputClass("company")}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass("phone")}>Phone Number</label>
                    <input
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+66 00 000 0000"
                      className={inputClass("phone")}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass("email")}>Email Address</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="contact@company.com"
                      className={inputClass("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>

                {/* Service select */}
                <div className="space-y-2">
                  <label className={labelClass("service")}>Interest / Service Type</label>
                  <div className="relative">
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className={`${inputClass("service")} appearance-none pr-10`}
                      onFocus={() => setFocusedField("service")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">Select a billboard location or service</option>
                      <option>Premium DOOH – Bangkok CBD</option>
                      <option>Regional Network – Chonburi</option>
                      <option>Data Analytics &amp; Insights</option>
                      <option>Full Media Strategy</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className={labelClass("message")}>Additional Requirements</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="How can our specialists assist you?"
                    rows={4}
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* PDPA */}
                <div className="flex items-start gap-3 py-4">
                  <input
                    id="pdpa" type="checkbox" checked={pdpa} onChange={(e) => setPdpa(e.target.checked)}
                    className="mt-1 w-5 h-5 bg-surface-container-low border-white/10 rounded accent-primary cursor-pointer shrink-0"
                  />
                  <label htmlFor="pdpa" className="font-body-md text-body-md text-on-surface-variant cursor-pointer">
                    I consent to the collection and processing of my personal data according to the{" "}
                    <a className="text-primary underline hover:text-primary/80" href="#">
                      PDPA Policy
                    </a>{" "}
                    for the purpose of this inquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!pdpa}
                  className="w-full bg-primary-container text-white font-headline-md text-headline-md py-5 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  Submit Proposal Request
                </button>
              </form>
            )}
          </div>

          {/* ── Right: sidebar (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* LINE OA */}
            <div className="reveal glass-card p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-[#06C755] text-4xl">chat</span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white">LINE Official Account</h3>
                  <p className="font-body-md text-on-surface-variant">Instant response from our team</p>
                </div>
              </div>
              <button className="w-full bg-[#06C755] hover:bg-[#05b14c] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors font-headline-md text-headline-md">
                <span className="material-symbols-outlined">add_circle</span>
                Add LINE OA
              </button>
            </div>

            {/* Quick links grid */}
            <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-6">
              {quickLinks.map((item) => (
                <div
                  key={item.title}
                  className={`glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer ${
                    item.span ? "col-span-1 sm:col-span-2" : ""
                  }`}
                >
                  <div className={`flex ${item.span ? "justify-between items-center" : "flex-col"}`}>
                    <div>
                      <span className="material-symbols-outlined text-primary mb-4 block group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <h4 className="font-headline-md text-headline-md text-white mb-1">{item.title}</h4>
                      <p className="font-body-md text-on-surface-variant">{item.body}</p>
                    </div>
                    {item.arrow && (
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-2 transition-transform">
                        arrow_forward
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Headquarters */}
            <div className="reveal glass-card p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary p-3 rounded-full shadow-lg shadow-primary/20 shrink-0">
                  <span className="material-symbols-outlined text-on-primary">location_on</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white">Headquarters</h3>
                  <p className="font-body-md text-on-surface-variant">Chonburi, Thailand</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <p className="font-label-md text-label-md text-white mb-1">Media108 Digital Hub</p>
                <p className="font-body-md text-on-surface-variant text-sm">Industrial Estate Road, 20130</p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Desktop CTA bar ── */}
      <section className="hidden md:block py-16 bg-surface-container-low border-y border-white/5">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-wrap justify-center items-center gap-12">
            {ctaItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 font-headline-md text-headline-md transition-colors ${
                  item.green
                    ? "text-[#06C755] hover:opacity-80"
                    : "text-on-surface hover:text-primary"
                }`}
              >
                <span className={`material-symbols-outlined ${item.green ? "text-[#06C755]" : "text-primary"}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile sticky footer bar ── */}
      <div className="fixed bottom-0 z-40 w-full bg-surface-container-high/90 backdrop-blur-2xl border-t border-white/5 md:hidden">
        <div className="flex justify-around items-center py-3">
          {[
            { icon: "request_quote", label: "Quotation", active: true,  color: "text-primary" },
            { icon: "book_online",   label: "Book",      active: false, color: "text-on-surface-variant" },
            { icon: "download",      label: "Kit",       active: false, color: "text-on-surface-variant" },
            { icon: "chat",          label: "LINE",      active: false, color: "text-[#06C755]" },
          ].map((btn) => (
            <button key={btn.label} className={`flex flex-col items-center gap-1 ${btn.color}`}>
              <span className="material-symbols-outlined">{btn.icon}</span>
              <span className="text-[10px] font-bold uppercase">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-white/5 py-12">
        <div className="w-full max-w-container-max mx-auto px-6 md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-primary">Media</span><span className="text-white">108</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Authority in Global Media. Transforming urban spaces into immersive digital landscapes.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Media Kit"].map((l) => (
              <a key={l} className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
                {l}
              </a>
            ))}
          </div>
          <div className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2024 Media108. Authority in Global Media.
          </div>
        </div>
      </footer>
    </>
  );
}
