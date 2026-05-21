"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  MapPin, Network, Eye, BadgeCheck, Building2, GraduationCap, Globe,
  MonitorPlay, FileText, ArrowRight, Mail, type LucideIcon,
} from "lucide-react";

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "252",   label: "Active Locations", icon: MapPin     },
  { value: "3",     label: "Network Segments", icon: Network    },
  { value: "450K+", label: "Daily Reach",       icon: Eye        },
  { value: "99.9%", label: "Uptime SLA",        icon: BadgeCheck },
];

const networks: { icon: LucideIcon; title: string; count: string; sub: string; desc: string; tag: string; color: string }[] = [
  {
    icon: Building2,
    title: "City Network",
    count: "124",
    sub: "Verified Locations",
    desc: "Urban intersections and primary arterial roads in Chonburi. Continuous brand exposure for modern commuters.",
    tag: "Core",
    color: "#E63946",
  },
  {
    icon: GraduationCap,
    title: "University Network",
    count: "86",
    sub: "Digital-First Nodes",
    desc: "Targeting Gen-Z and Millennials near educational hubs and student districts. Precision digital clusters.",
    tag: "Growth",
    color: "#ffb3b1",
  },
  {
    icon: Globe,
    title: "Tourism Network",
    count: "42",
    sub: "Premium Placements",
    desc: "Coastal prestige and entertainment districts. Luxury reach across Pattaya and Bang Saen beachfronts.",
    tag: "Premium",
    color: "#bfc5e4",
  },
];

export default function NetworkPage() {
  useScrollReveal();
  return (
    <>
      <Navbar activePage="network" />

      <main className="pt-20 pb-24">

        {/* ── Hero ── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop py-32 overflow-hidden bg-surface-container-lowest">
          <div className="absolute inset-0 z-0 radial-glow-bg opacity-60" />
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Network Grid"
              className="w-full h-full object-cover grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_qt0JVrXbpsyslOzzlD0LEq5QEnvoejiTtXL3LwbxaPqfKuQ1RIhTWxVPcT1xLUk3vrPb4eZADXxsmji9b5FGecdnLIX_-RS-vKB1CmzVbVF3yyNjJJBKAA3RrrsJQKr6KfQFhvSlAfT1OYgvAap6BbEzOxuoJLSSFwZhlWway5ohKy0kpKcCcf7xWdjf-ZWpZjleKtiDolTDF5slxI71wDIFE9vzHV7XEK70cdmoACL0FD5bsyzgqSY8ClqNwQ-RaMVb0Nohdc8"
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div
              className="inline-flex items-center gap-3 mb-8 opacity-80"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
            >
              <div className="w-12 h-px bg-primary/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary-fixed-dim font-medium font-label-md">Global Standards</span>
              <div className="w-12 h-px bg-primary/40" />
            </div>
            <h1
              className="font-display-lg mb-10 uppercase leading-[1.1] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 200, letterSpacing: "0.2em", animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both" }}
            >
              Systematic{" "}
              <span className="font-black text-primary-container">Media</span>
              <br className="hidden md:block" />
              {" "}Network Strategy
            </h1>
            <p
              className="font-body-lg text-on-surface/60 mb-16 max-w-2xl mx-auto leading-relaxed font-light"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s both" }}
            >
              Engineering high-frequency visibility through curated media ecosystems. We don&apos;t just place ads; we design visual dominance.
            </p>
            <div
              className="flex flex-wrap justify-center gap-8 mb-16"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s both" }}
            >
              {["Campaign-Driven", "High Frequency", "Targeted Reach"].map((label) => (
                <div key={label} className="flex items-center gap-2 group cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-on-surface/50 group-hover:text-on-surface transition-colors font-label-md">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            {/* CTA buttons */}
            <div
              className="flex flex-wrap justify-center gap-4"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.54s both" }}
            >
              <Link
                href="/billboard"
                className="px-8 py-4 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] text-white hover:brightness-110 transition-all font-label-md"
                style={{ background: "#E63946", boxShadow: "0 0 24px rgba(230,57,70,0.35)" }}
              >
                Browse Inventory
              </Link>
              <Link
                href="/contact#form"
                className="px-8 py-4 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] text-white border border-white/20 hover:bg-white/10 transition-all font-label-md"
              >
                Request Proposal
              </Link>
            </div>
          </div>

          {/* Floating stats bar inside hero at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-12">
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center justify-center gap-2 py-8 px-6 text-center"
                    style={{
                      backdropFilter: "blur(16px)",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <s.icon size={20} className="text-primary/60" />
                    <span className="text-white font-black font-display-lg text-2xl md:text-3xl leading-none">{s.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-label-md">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Network Segments ── */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="sr sr-up text-center mb-20">
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold mb-4 block font-label-md">Coverage</span>
              <h2
                className="font-display-lg uppercase text-white mb-6"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.1em" }}
              >
                Three Strategic <span className="font-black text-primary-container">Networks</span>
              </h2>
              <p className="text-on-surface-variant/60 font-light max-w-xl mx-auto">
                Orchestrated inventory designed to meet specific demographic objectives across the EEC corridor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {networks.map((net, i) => (
                <div
                  key={net.title}
                  className={`sr sr-scale sr-d${i + 1} group relative rounded-2xl p-10 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-1`}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Tag */}
                  <span
                    className="absolute top-6 right-6 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full font-label-md"
                    style={{ background: `${net.color}18`, color: net.color, border: `1px solid ${net.color}30` }}
                  >
                    {net.tag}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${net.color}15`, border: `1px solid ${net.color}25` }}
                  >
                    <net.icon size={24} style={{ color: net.color }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-display-lg text-white text-lg font-bold uppercase tracking-wide mb-3">
                      {net.title}
                    </h3>
                    <p className="text-on-surface-variant/60 text-sm font-light leading-relaxed">
                      {net.desc}
                    </p>
                  </div>

                  {/* Count */}
                  <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-black text-white font-display-lg leading-none mb-1">{net.count}</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-label-md" style={{ color: net.color }}>{net.sub}</div>
                    </div>
                    <Link
                      href="/billboard"
                      className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-bold font-label-md transition-colors"
                      style={{ color: `${net.color}99` }}
                    >
                      Explore
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ minHeight: "480px", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="EEC Corridor Billboard"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXAcIyvYWhQFauG5XmUm0KlTMXygvTaej8_7fDuXKDRBkaJ0B5zieW88DjVCssqd_GLb6VQJ_u0wzochpGis_fXuwaL_yJ0EFMuW29-54R2BSXCXdYiqjjzkk8P4KAtIxOZXcQ0SE_YSMx9lFPay9J5ogYNd2ivKrN4iIll6HkUu5mz1jq3Qa3woKSpO_sDRxLMjX1BHpC0YI73uQ5uzRR6E7bisvCWbnxj6tl_5fzTpQC4QIU7d_l9bloaHSNgHDGNvl8x2D1Cow"
                  className="w-full h-full object-cover"
                />
                {/* Dark + red gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(6,17,51,0.97) 0%, rgba(6,17,51,0.88) 40%, rgba(187,21,44,0.55) 75%, rgba(230,57,70,0.4) 100%)" }} />
                {/* Bottom fade */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,11,46,0.7) 0%, transparent 60%)" }} />
              </div>

              {/* Decorative red glow */}
              <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 40%, rgba(230,57,70,0.25) 0%, transparent 65%)" }} />

              {/* Content */}
              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 p-12 md:p-20 h-full" style={{ minHeight: "480px" }}>
                {/* Left text */}
                <div className="sr sr-left flex-1">
                  <div className="inline-flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-primary/60" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-semibold font-label-md">Ready to Dominate</span>
                  </div>
                  <h3
                    className="font-display-lg text-white uppercase leading-tight mb-6"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "0.05em" }}
                  >
                    Own the EEC<br />
                    <span style={{ color: "#E63946" }}>Corridor</span> Today.
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed max-w-md mb-10">
                    Secure your brand&apos;s visibility at Thailand&apos;s highest-traffic DOOH locations. First-mover advantage in the fastest-growing economic zone in Southeast Asia.
                  </p>
                  {/* Mini stats row */}
                  <div className="flex flex-wrap gap-8">
                    {[
                      { v: "252+", l: "Locations" },
                      { v: "450K", l: "Daily Reach" },
                      { v: "16 Yrs", l: "Experience" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="text-white font-black text-xl font-display-lg leading-none">{s.v}</div>
                        <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-label-md mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right buttons */}
                <div className="sr sr-right flex-shrink-0 flex flex-col gap-4 w-full lg:w-auto">
                  <Link
                    href="/billboard"
                    className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#bb152c] rounded-xl font-label-md text-[12px] uppercase tracking-[0.15em] font-black hover:scale-105 transition-all text-center"
                    style={{ boxShadow: "0 8px 32px rgba(255,255,255,0.15)" }}
                  >
                    <MonitorPlay size={18} />
                    View Inventory
                  </Link>
                  <Link
                    href="/contact#form"
                    className="flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-label-md text-[12px] uppercase tracking-[0.15em] font-bold text-white transition-all text-center"
                    style={{ border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
                  >
                    <FileText size={18} />
                    Request Proposal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="w-full pt-24 pb-16 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-white/5">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-20">
            <div className="flex flex-col gap-8 max-w-sm">
              <span className="font-display-lg text-headline-lg text-white font-black">MEDIA108</span>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                Premium media architecture for the modern brand. Elevating the digital-out-of-home standard across Southeast Asia&apos;s most vital economic corridors.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-20">
              <div className="flex flex-col gap-8">
                <h4 className="uppercase text-primary font-medium text-[12px] tracking-[0.2em] font-label-md">Navigation</h4>
                <nav className="flex flex-col gap-4">
                  {[["Home", "/"], ["About", "/about"], ["Media Network", "/network"]].map(([l, h]) => (
                    <Link key={l} href={h} className="text-on-surface-variant hover:text-primary transition-all text-[13px] tracking-wide font-light">{l}</Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="uppercase text-primary font-medium text-[12px] tracking-[0.2em] font-label-md">Resources</h4>
                <nav className="flex flex-col gap-4">
                  {[["Media Kit", "/media-kit"], ["Quotations", "/contact#form"], ["LINE OA", "#"]].map(([l, h]) => (
                    <Link key={l} href={h} className="text-on-surface-variant hover:text-primary transition-all text-[13px] tracking-wide font-light">{l}</Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col gap-8">
                <h4 className="uppercase text-primary font-medium text-[12px] tracking-[0.2em] font-label-md">Contact</h4>
                <nav className="flex flex-col gap-4">
                  <Link href="/contact" className="text-on-surface-variant hover:text-primary transition-all text-[13px] tracking-wide font-light">Sales Inquiries</Link>
                  <div className="flex gap-6 mt-4">
                    {[Globe, Mail].map((Icon, idx) => (
                      <Icon key={idx} size={20} className="text-on-surface-variant/40 hover:text-primary cursor-pointer transition-colors" />
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/5 my-12" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-on-surface-variant/60 text-[11px] uppercase tracking-[0.15em] font-medium font-label-md">
              © 2024 Media108. All Rights Reserved.
            </p>
            <div className="flex gap-12">
              {[["Privacy", "#"], ["Terms", "#"]].map(([l, h]) => (
                <Link key={l} href={h} className="text-on-surface-variant/60 hover:text-primary text-[11px] uppercase tracking-[0.15em] font-medium transition-colors font-label-md">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <GlobalCTABar />
    </>
  );
}
