"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  MapPin, Network, Eye, BadgeCheck, Building2, GraduationCap, Globe,
  MonitorPlay, FileText, ArrowRight, Mail, type LucideIcon,
} from "lucide-react";

const statsBase: { value: string; labelEn: string; labelTh: string; icon: LucideIcon }[] = [
  { value: "252",   labelEn: "Active Locations",   labelTh: "จุดป้ายในเครือข่าย",    icon: MapPin     },
  { value: "3",     labelEn: "Network Segments",   labelTh: "กลุ่มเครือข่ายหลัก",   icon: Network    },
  { value: "450K+", labelEn: "Daily Reach",        labelTh: "การเข้าถึงต่อวัน",     icon: Eye        },
  { value: "99.9%", labelEn: "Display Uptime",     labelTh: "ความพร้อมใช้งานของจอ", icon: BadgeCheck },
];

const networksBase: { icon: LucideIcon; titleEn: string; titleTh: string; count: string; subEn: string; subTh: string; descEn: string; descTh: string; tagEn: string; tagTh: string; color: string }[] = [
  {
    icon: Building2,
    titleEn: "City Network",
    titleTh: "เครือข่ายเมือง",
    count: "124",
    subEn: "Verified Locations",
    subTh: "จุดที่ยืนยันแล้ว",
    descEn: "Urban intersections and main arterial roads in Chonburi — delivering continuous brand exposure to daily commuters.",
    descTh: "สี่แยกสำคัญและถนนสายหลักในชลบุรี สร้างการรับรู้แบรนด์อย่างต่อเนื่องสำหรับผู้ใช้รถบนท้องถนนทุกวัน",
    tagEn: "Core",
    tagTh: "หลัก",
    color: "#E63946",
  },
  {
    icon: GraduationCap,
    titleEn: "University Network",
    titleTh: "เครือข่ายมหาวิทยาลัย",
    count: "86",
    subEn: "Digital-First Nodes",
    subTh: "จุดดิจิทัลเฉพาะ",
    descEn: "Reaching Gen-Z and Millennials near universities and student districts — precise digital placements for the next generation.",
    descTh: "เข้าถึงกลุ่ม Gen-Z และวัยทำงานตอนต้นบริเวณมหาวิทยาลัยและย่านนักศึกษา ตำแหน่งโฆษณาดิจิทัลที่แม่นยำ",
    tagEn: "Growth",
    tagTh: "เติบโต",
    color: "#ffb3b1",
  },
  {
    icon: Globe,
    titleEn: "Tourism Network",
    titleTh: "เครือข่ายการท่องเที่ยว",
    count: "42",
    subEn: "Premium Placements",
    subTh: "ตำแหน่งพรีเมียม",
    descEn: "Premium coastal and entertainment zones — reaching high-spending tourists along Pattaya and Bang Saen beachfronts.",
    descTh: "ย่านชายหาดและบันเทิงชั้นนำ เข้าถึงนักท่องเที่ยวกำลังซื้อสูงตลอดแนวชายฝั่งพัทยาและบางแสน",
    tagEn: "Premium",
    tagTh: "พรีเมียม",
    color: "#bfc5e4",
  },
];

export default function NetworkPage() {
  useScrollReveal();
  const { t } = useLanguage();
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
              className="w-full h-full object-cover"
              src="/image/hero network.png"
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto">
            <div
              className="inline-flex items-center gap-3 mb-8 opacity-80"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
            >
              <div className="w-12 h-px bg-primary/40" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary-fixed-dim font-medium font-label-md">{t("Global Standards", "มาตรฐานระดับโลก")}</span>
              <div className="w-12 h-px bg-primary/40" />
            </div>
            <h1
              className="font-display-lg mb-10 uppercase leading-[1.1] text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 200, letterSpacing: "0.2em", animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both" }}
            >
              {t("Systematic", "เชิงระบบ")}{" "}
              <span className="font-black text-primary-container">{t("Media", "สื่อ")}</span>
              <br className="hidden md:block" />
              {" "}{t("Network Strategy", "กลยุทธ์เครือข่าย")}
            </h1>
            <p
              className="font-body-lg text-on-surface/60 mb-16 max-w-2xl mx-auto leading-relaxed font-light"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s both" }}
            >
              {t(
                "Engineering high-frequency visibility through curated media ecosystems. We don't just place ads; we design visual dominance.",
                "เครือข่ายป้ายโฆษณาที่คัดเลือกทำเลอย่างเป็นระบบ ให้แบรนด์ของคุณมองเห็นได้บ่อยที่สุดในจุดที่กลุ่มเป้าหมายสัญจรผ่านทุกวัน"
              )}
            </p>
            <div
              className="flex flex-wrap justify-center gap-8 mb-16"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s both" }}
            >
              {[t("Campaign-Driven", "ขับเคลื่อนด้วยแคมเปญ"), t("High Frequency", "ความถี่สูง"), t("Targeted Reach", "เข้าถึงเป้าหมาย")].map((label) => (
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
                {t("Browse Inventory", "ดูรายการป้าย")}
              </Link>
              <Link
                href="/contact#form"
                className="px-8 py-4 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] text-white border border-white/20 hover:bg-white/10 transition-all font-label-md"
              >
                {t("Request Proposal", "ขอใบเสนอราคา")}
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
                {statsBase.map((s, i) => (
                  <div
                    key={s.labelEn}
                    className="flex flex-col items-center justify-center gap-2 py-8 px-6 text-center"
                    style={{
                      backdropFilter: "blur(16px)",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <s.icon size={20} className="text-primary/60" />
                    <span className="text-white font-black font-display-lg text-2xl md:text-3xl leading-none">{s.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-label-md">{t(s.labelEn, s.labelTh)}</span>
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
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold mb-4 block font-label-md">{t("Coverage", "ความครอบคลุม")}</span>
              <h2
                className="font-display-lg uppercase text-white mb-6"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 300, letterSpacing: "0.1em" }}
              >
                {t("Three Strategic", "สาม")}{" "}<span className="font-black text-primary-container">{t("Networks", "เครือข่ายเชิงกลยุทธ์")}</span>
              </h2>
              <p className="text-on-surface-variant/60 font-light max-w-xl mx-auto">
                {t(
                  "Orchestrated inventory designed to meet specific demographic objectives across the EEC corridor.",
                  "แบ่งเครือข่ายป้ายเป็น 3 กลุ่มตามกลุ่มเป้าหมาย เพื่อให้แคมเปญของคุณเข้าถึงคนที่ใช่ในทำเลที่ใช่"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {networksBase.map((net, i) => (
                <div
                  key={net.titleEn}
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
                    {t(net.tagEn, net.tagTh)}
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
                      {t(net.titleEn, net.titleTh)}
                    </h3>
                    <p className="text-on-surface-variant/60 text-sm font-light leading-relaxed">
                      {t(net.descEn, net.descTh)}
                    </p>
                  </div>

                  {/* Count */}
                  <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-black text-white font-display-lg leading-none mb-1">{net.count}</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] font-label-md" style={{ color: net.color }}>{t(net.subEn, net.subTh)}</div>
                    </div>
                    <Link
                      href="/billboard"
                      className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-bold font-label-md transition-colors"
                      style={{ color: `${net.color}99` }}
                    >
                      {t("Explore", "สำรวจ")}
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
                  src="/image/hero network.png"
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
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary/80 font-semibold font-label-md">{t("Ready to Dominate", "พร้อมครองตลาด")}</span>
                  </div>
                  <h3
                    className="font-display-lg text-white uppercase leading-tight mb-6"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "0.05em" }}
                  >
                    {t("Start Your Brand's", "ให้แบรนด์ของคุณ")}<br />
                    <span style={{ color: "#E63946" }}>{t("EEC Presence", "ปรากฏทั่ว EEC")}</span> {t("Now.", "วันนี้เลย")}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed max-w-md mb-10">
                    {t(
                      "Secure your brand's visibility at Thailand's highest-traffic DOOH locations. First-mover advantage in the fastest-growing economic zone in Southeast Asia.",
                      "จอง ป้ายโฆษณา LED ในทำเลจราจรหนาแน่นที่สุดของ EEC ก่อนใคร เพิ่มการมองเห็นแบรนด์ในเขตเศรษฐกิจที่เติบโตเร็วที่สุดของไทย"
                    )}
                  </p>
                  {/* Mini stats row */}
                  <div className="flex flex-wrap gap-8">
                    {[
                      { v: "252+", l: t("Locations", "จำนวนจุด") },
                      { v: "450K", l: t("Daily Reach", "ผู้ชมต่อวัน") },
                      { v: "16 Yrs", l: t("Experience", "ประสบการณ์") },
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
                    {t("View Inventory", "ดูรายการป้าย")}
                  </Link>
                  <Link
                    href="/contact#form"
                    className="flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-label-md text-[12px] uppercase tracking-[0.15em] font-bold text-white transition-all text-center"
                    style={{ border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
                  >
                    <FileText size={18} />
                    {t("Request Proposal", "ขอใบเสนอราคา")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-20 pb-28">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
            <div className="md:col-span-1">
              <div className="mb-6 text-2xl font-black tracking-tight">
                <span className="text-primary">Media</span>
                <span className="text-white">108</span>
              </div>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                {t(
                  "Leading outdoor advertising network in the EEC zone — connecting brands to audiences with real traffic data.",
                  "เครือข่ายสื่อโฆษณา LED ชั้นนำในพื้นที่ EEC ชลบุรี–พัทยา เชื่อมแบรนด์สู่กลุ่มเป้าหมายด้วยข้อมูลจราจรจริง"
                )}
              </p>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">{t("Navigation", "เมนู")}</h6>
              <ul className="space-y-4">
                {([
                  [t("Home", "หน้าแรก"), "/"],
                  [t("About", "เกี่ยวกับเรา"), "/about"],
                  [t("Media Network", "เครือข่ายสื่อ"), "/network"],
                  [t("Our Services", "บริการของเรา"), "/services"],
                  [t("Contact Us", "ติดต่อเรา"), "/contact"],
                ] as [string, string][]).map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">{t("Media Focus", "โฟกัสสื่อ")}</h6>
              <ul className="space-y-4">
                {([
                  { label: t("Pattaya Digital Hub", "ฮับดิจิทัลพัทยา"),   href: "/billboard/pattaya-sukhumvit-01" },
                  { label: t("Chonburi Strategic",  "ชลบุรีเชิงกลยุทธ์"),  href: "/billboard/pattaya-gateway" },
                  { label: t("Bang Saen Network",   "เครือข่ายบางแสน"),    href: "/billboard" },
                  { label: t("EEC Industrial Belt", "แถบอุตสาหกรรม EEC"),  href: "/billboard/eec-tech-square" },
                ] as { label: string; href: string }[]).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">{t("Connect", "ติดต่อ")}</h6>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:media.108.company@gmail.com" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm">
                    <Mail size={16} className="shrink-0" /> media.108.company@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+66625636199" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm">
                    <Globe size={16} className="shrink-0" /> 062-563-6199
                  </a>
                </li>
                <li>
                  <a href="https://lin.ee/NXKWYdJ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm">
                    <Globe size={16} className="shrink-0" /> LINE: @media108
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-border-glass flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-on-surface-variant font-label-md text-sm">
              © 2026 บริษัท มีเดีย 108 จำกัด (MEDIA 108 COMPANY LIMITED) {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")}
              <br /><span className="text-xs opacity-60">เลขทะเบียน 0205548033971</span>
            </div>
            <div className="flex items-center gap-6 text-on-surface-variant font-label-md text-sm">
              <span>{t("Region:", "ภูมิภาค:")} <span className="text-on-surface font-bold">TH-EEC</span></span>
              <span className="flex items-center gap-2">
                {t("Status:", "สถานะ:")} <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> {t("Optimal", "ปกติ")}
              </span>
            </div>
          </div>
        </div>
      </footer>

      <GlobalCTABar />
    </>
  );
}
