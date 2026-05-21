"use client";

import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  Store, Globe, Building2, Ticket, Maximize2, Ruler, Aperture,
  BarChart2, Map, FileText, CloudDownload, Video, CheckCircle,
  type LucideIcon,
} from "lucide-react";

/* ── Pricing packages ─────────────────────────────────── */
const pricingPackages: { icon: LucideIcon; title: string; subtitle: string; features: string[]; featured: boolean }[] = [
  { icon: Store,    title: "SME Starter",      subtitle: "สำหรับร้านอาหาร คาเฟ่ และคลินิกท้องถิ่น",         features: ["Local Targeting", "Flexible Scheduling"],          featured: false },
  { icon: Globe,    title: "Tourism Campaign",  subtitle: "โรงแรม ร้านอาหารพัทยา และสถานที่ท่องเที่ยว",      features: ["Prime Tourist Hotspots", "Multi-language Support"], featured: true  },
  { icon: Building2, title: "Real Estate",      subtitle: "โครงการคอนโดมิเนียม และบ้านจัดสรร",              features: ["High-Net-Worth Routes", "Day/Night Dominance"],     featured: false },
  { icon: Ticket,   title: "Event Promo",       subtitle: "คอนเสิร์ต เฟสติวัล และการแข่งกีฬา",             features: ["High Frequency Bursts", "Countdown Dynamic Content"], featured: false },
];

/* ── Tech spec bento cells ───────────────────────────── */
const smallSpecs: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: Maximize2, value: "3840 x 1920 px", label: "NATIVE RESOLUTION" },
  { icon: Ruler,     value: "24m x 12m",      label: "AVERAGE SCREEN SIZE" },
  { icon: Aperture,  value: "P10 RGB LED",     label: "PIXEL PITCH" },
];

/* ── Coverage report features ─────────────────────────── */
const coverageFeatures: { icon: LucideIcon; iconBg: string; iconColor: string; title: string; desc: string }[] = [
  { icon: BarChart2, iconBg: "bg-primary/20",   iconColor: "text-primary",   title: "Reach & Frequency",  desc: "วิเคราะห์จำนวนผู้เห็นโฆษณาจริงและความถี่ในการเข้าถึง" },
  { icon: Map,       iconBg: "bg-secondary/20",  iconColor: "text-secondary", title: "Traffic Heatmaps",   desc: "แผนภาพแสดงความหนาแน่นของกลุ่มเป้าหมายในแต่ละช่วงเวลา" },
];

export default function MediaKitPage() {
  useScrollReveal();

  return (
    <>
      <Navbar activePage="media-kit" />

      <main className="w-full">

        {/* ── Hero ── */}
        <section className="relative h-[614px] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Urban billboard night view"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWdZxCR3MAYjouPnKyslvRn1ZEtz8TM1TSedjqJ0I4VEdv5Nirw2SmtTsKlW8O0p0KmKQBfbjhVD9wE112Cl3a4pshbBRaZiIGLGuheLrniEaDBcm181_IoZ49CptVFAqPG2Re2m7_8FuKvWh30MqMEa2Ro9l3CVeTNSJGMeE-Ntdgfhb4ldvR0Dz0hqeT4KZ5bkgqyhyc4u9kyU7K_4XTkjcr14A06IRPssW16p785Raok8InzZ9qJueDz3lvGQipMv0gIDNDaSk"
            />
          </div>
          <div className="relative z-20 space-y-4">
            <h1
              className="font-display-lg text-display-lg text-white tracking-tighter uppercase leading-none"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
            >
              Media Kit <span className="text-primary">&amp;</span> Pricing
            </h1>
            <p
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto opacity-80"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
            >
              ยกระดับแบรนด์ของคุณด้วยนวัตกรรมสื่อโฆษณา Precision DOOH Solutions ที่เข้าถึงกลุ่มเป้าหมายอย่างแม่นยำที่สุด
            </p>
          </div>
        </section>

        {/* ── Download Media Kit ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="sr sr-up glass-card rounded-xl p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

            {/* Left: text */}
            <div className="flex-1 space-y-6 relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-white">ดาวน์โหลด Media Kit</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                รับข้อมูลฉบับเต็มประกอบด้วย Company Profile และรายละเอียดทางเทคนิคของ Billboard ทุกตำแหน่งในเครือข่าย
                Media108 พร้อมกรณีศึกษาความสำเร็จ
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="inline-flex items-center gap-3 bg-primary-container text-white px-8 py-4 rounded-lg font-label-md text-label-md font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:scale-[1.02] transition-all duration-300">
                  <FileText size={20} />
                  DOWNLOAD PDF MEDIA KIT
                </button>
              </div>
            </div>

            {/* Right: file info */}
            <div className="w-full md:w-80 flex flex-col items-center justify-center p-8 glass-card border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors rounded-xl">
              <CloudDownload size={56} className="text-primary mb-4" />
              <span className="font-data-mono text-data-mono text-white mb-2">Version 2024.1.0</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Size: 12.4 MB</span>
            </div>
          </div>
        </section>

        {/* ── Billboard Pricing & Packages ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto bg-surface-container-lowest/30">
          <div className="sr sr-up mb-16 text-center">
            <h2 className="font-headline-xl text-headline-xl mb-4 text-white">Billboard Pricing &amp; Packages</h2>
            <p className="text-on-surface-variant font-body-md">เลือกแพ็กเกจที่เหมาะสมกับธุรกิจและแคมเปญของคุณ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {pricingPackages.map((pkg, i) => (
              <div
                key={pkg.title}
                className={`sr sr-up sr-d${i + 1} glass-card rounded-xl p-8 flex flex-col h-full hover:border-primary/50 transition-colors border-b-4 ${
                  pkg.featured ? "border-b-primary/50" : "border-b-secondary/20"
                }`}
              >
                <div className="mb-8">
                  <pkg.icon size={36} className="text-primary mb-4 block" />
                  <h3 className="font-headline-md text-headline-md mb-2 text-white">{pkg.title}</h3>
                  <p className="text-on-surface-variant text-sm">{pkg.subtitle}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-on-surface">
                      <CheckCircle size={16} className="text-primary leading-5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-label-md text-label-md transition-all ${
                    pkg.featured
                      ? "bg-primary-container text-white hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:scale-[1.02]"
                      : "bg-surface-container-highest text-on-surface hover:bg-primary hover:text-on-primary"
                  }`}
                >
                  Request Price
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Technical Specifications Bento ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="sr sr-up mb-16">
            <h2 className="font-headline-xl text-headline-xl mb-2 text-white">Technical Specifications</h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Main hero card — 8,500 Nits */}
            <div className="sr sr-up sr-d1 md:col-span-2 lg:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between overflow-hidden relative group min-h-[200px]">
              <div className="relative z-10">
                <p className="font-label-md text-label-md text-primary mb-4 uppercase tracking-widest">
                  Display Standard
                </p>
                <h4 className="font-headline-lg text-headline-lg text-white mb-8">
                  Ultra-High Definition LED Network
                </h4>
              </div>
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <span className="text-5xl font-data-mono text-white block mb-1">8,500</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">MAX NIT BRIGHTNESS</span>
                </div>
              </div>
              {/* Decorative icon */}
              <Aperture size={120} className="text-white/5 absolute -right-4 -bottom-4 select-none" />
            </div>

            {/* Small spec cards */}
            {smallSpecs.map((spec, i) => (
              <div
                key={spec.label}
                className={`sr sr-up sr-d${i + 2} glass-card rounded-xl p-8 flex flex-col justify-between group`}
              >
                <spec.icon size={22} className="text-primary" />
                <div>
                  <span className="font-data-mono text-headline-md block mb-1 text-white">{spec.value}</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">{spec.label}</span>
                </div>
              </div>
            ))}

            {/* Supported Formats */}
            <div className="sr sr-up sr-d4 md:col-span-2 lg:col-span-1 glass-card rounded-xl p-8 flex flex-col justify-between group">
              <Video size={22} className="text-primary" />
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {["MP4", "JPG", "PNG", "MOV"].map((fmt) => (
                    <span
                      key={fmt}
                      className="bg-surface-container-highest px-2 py-1 rounded font-data-mono text-xs text-white"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">SUPPORTED FORMATS</span>
              </div>
            </div>

            {/* 60 FPS — spinning circle */}
            <div className="sr sr-up sr-d5 md:col-span-1 lg:col-span-2 glass-card rounded-xl p-8 flex items-center gap-8 group">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow flex items-center justify-center shrink-0">
                <span className="font-data-mono text-2xl text-white">60</span>
              </div>
              <div>
                <span className="font-headline-md text-headline-md block text-white">FPS Performance</span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Smooth motion playback for cinematic visuals.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Coverage & Insight Reports ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto bg-surface-container-low overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left: text */}
            <div className="space-y-8">
              <h2 className="font-headline-xl text-headline-xl text-white">Coverage &amp; Insight Reports</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                เราไม่ได้ให้แค่พื้นที่โฆษณา แต่เราให้ &ldquo;ข้อมูล&rdquo; เพื่อการตัดสินใจที่ดีที่สุด
                รายงานความครอบคลุมของเราประกอบด้วยข้อมูลเชิงลึกที่แม่นยำเพื่อวัดผลสำเร็จของแคมเปญ
              </p>
              <div className="space-y-6">
                {coverageFeatures.map((feat) => (
                  <div
                    key={feat.title}
                    className="sr sr-left glass-card p-6 rounded-xl flex items-center gap-6 hover:bg-surface-container-high transition-all"
                  >
                    <div className={`w-12 h-12 rounded-lg ${feat.iconBg} flex items-center justify-center ${feat.iconColor} shrink-0`}>
                      <feat.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[18px] text-white mb-1">{feat.title}</h4>
                      <p className="text-on-surface-variant text-sm">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: dashboard mockup */}
            <div className="sr sr-right relative">
              <div className="glass-card rounded-2xl p-4 shadow-2xl relative z-10 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Analytics dashboard mockup"
                  className="w-full h-[400px] object-cover rounded-xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Y827Y1pbpharSjUhKSBIrpaQ8esbD-8zFovi3OTqEIkm4gQZZ3b7NMFf5LVT1IFGW3B5ys-qKId73gEq5XSSQUQHsLpIDb2G-_iR6kDchXVXg7P5bbhr9Qz3NmRiSboSLSVxESc9_vzJrrnXb1phWnYfJypzGzJ6qgk1z2WYKdCT5j2-OwTr3WB9yyepTV7rtPNH0cAGBz3YRXZVdNP6m2t3llCWBNr-4tm3M5PZH0uLNnZ0sOZQ7MsG5m72r2Zt1qesWF-gfMg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex justify-between items-end">
                    <div className="bg-primary-container px-4 py-2 rounded text-white font-data-mono text-sm">
                      LIVE REPORTING
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow decor */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </section>

      </main>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-white/10 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-12 w-full max-w-container-max mx-auto">
          <div className="space-y-6">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-primary">Media</span><span className="text-white">108</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Precision DOOH Media Solutions for the Modern Era.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">Navigation</h5>
            <nav className="flex flex-col gap-2">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a key={l} className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">
                  {l}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">Support</h5>
            <nav className="flex flex-col gap-2">
              {["Contact Support", "Global Network"].map((l) => (
                <a key={l} className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">
                  {l}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">Follow Us</h5>
            <div className="flex gap-4">
              {([Globe, Map] as LucideIcon[]).map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded bg-surface-container flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  <Icon size={20} className="text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-margin-desktop py-8 border-t border-white/5 text-center">
          <p className="font-label-md text-label-md text-on-surface-variant opacity-60">
            © 2024 Media108. All rights reserved. Precision DOOH Media Solutions.
          </p>
        </div>
      </footer>
    </>
  );
}
