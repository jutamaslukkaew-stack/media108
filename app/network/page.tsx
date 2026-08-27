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

const statsBase: { value: string; labelEn: string; labelTh: string; icon: LucideIcon; href: string }[] = [
  { value: "10",    labelEn: "Active Locations",   labelTh: "จุดป้ายในเครือข่าย",    icon: MapPin,     href: "/billboard"  },
  { value: "3",     labelEn: "Network Zones",      labelTh: "โซนเครือข่ายหลัก",     icon: Network,    href: "#networks"   },
  { value: "8",     labelEn: "Ad Slots / Loop",    labelTh: "สล็อตโฆษณาต่อรอบ",    icon: Eye,        href: "/media-kit"  },
  { value: "20+",   labelEn: "Years in Business",  labelTh: "ปีที่ดำเนินธุรกิจ",    icon: BadgeCheck, href: "/about"      },
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
        <section className="relative flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop pt-20 pb-16 overflow-hidden bg-surface-container-lowest">
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Network Grid" className="w-full h-full object-cover" src="/image/hero network.png" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Media Network", "เครือข่ายสื่อโฆษณา")}</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h1 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">
              {t("LED Billboards", "ป้ายโฆษณา LED")}{" "}
              <span className="text-primary-container">{t("Across Chonburi–Pattaya", "ทั่วชลบุรี–พัทยา")}</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              {t(
                "LED billboards in Chonburi's busiest locations — so your brand is seen by the right people, every single day.",
                "ป้าย LED ในทำเลที่คนผ่านเยอะที่สุดของชลบุรี ให้แบรนด์คุณอยู่ตรงหน้าลูกค้าทุกวัน"
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/billboard" className="bg-primary-container text-white px-8 py-4 rounded-lg font-label-md font-bold hover:brightness-110 active:scale-95 transition-all">
                {t("View All Billboards", "ดูรายการป้าย")}
              </Link>
              <Link href="/contact#form" className="border border-white/20 text-white px-8 py-4 rounded-lg font-label-md hover:bg-white/10 transition-all">
                {t("Request Quote", "ขอใบเสนอราคา")}
              </Link>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="bg-surface border-y border-border-glass py-14">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {statsBase.map((s, i) => (
                <a
                  key={s.labelEn}
                  href={s.href}
                  className={`relative text-center py-10 px-4 group cursor-pointer transition-all hover:bg-white/5 ${i < 3 ? "md:border-r border-white/10" : ""} ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""}`}
                >
                  {/* glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,57,70,0.08) 0%, transparent 100%)" }} />
                  <s.icon size={24} className="text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div
                    className="font-data-mono font-black text-primary-container leading-none mb-3"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 5rem)",
                      textShadow: "0 0 32px rgba(230,57,70,0.5)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-primary underline underline-offset-4 font-bold">{t(s.labelEn, s.labelTh)}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Network Segments ── */}
        <section id="networks" className="py-14 px-margin-mobile md:px-margin-desktop bg-surface">
          <div className="max-w-container-max mx-auto">
            <div className="sr sr-up text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-primary-container" />
                <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Coverage", "ความครอบคลุม")}</span>
                <span className="w-5 h-[1px] bg-primary-container" />
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
                {t("3 Networks, Every Target", "3 เครือข่าย ครอบคลุมทุกกลุ่มเป้าหมาย")}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
                {t(
                  "We split our billboard network into 3 zones by audience — so your campaign reaches the right people in the right area.",
                  "แบ่งป้ายเป็น 3 โซนตามกลุ่มผู้ชม เลือกได้ว่าจะเข้าถึงใคร ที่ไหน"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {networksBase.map((net, i) => (
                <div
                  key={net.titleEn}
                  className={`sr sr-scale sr-d${i + 1} group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1`}
                  style={{ border: `1px solid ${net.color}25`, background: "rgba(6,17,51,0.6)", backdropFilter: "blur(12px)" }}
                >
                  {/* Top color bar */}
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${net.color}, transparent)` }} />

                  <div className="p-7 flex flex-col gap-5 flex-1">
                    {/* Icon + Tag row */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${net.color}18`, border: `1px solid ${net.color}30` }}
                      >
                        <net.icon size={22} style={{ color: net.color }} />
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-label-md"
                        style={{ background: `${net.color}15`, color: net.color, border: `1px solid ${net.color}25` }}
                      >
                        {t(net.tagEn, net.tagTh)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-headline-lg text-headline-lg text-white leading-tight">
                      {t(net.titleEn, net.titleTh)}
                    </h3>

                    {/* Description */}
                    <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                      {t(net.descEn, net.descTh)}
                    </p>

                    {/* Count + CTA */}
                    <div className="pt-5 border-t flex items-center justify-between" style={{ borderColor: `${net.color}20` }}>
                      <div>
                        <div
                          className="font-data-mono font-black leading-none mb-1"
                          style={{ fontSize: "2.5rem", color: net.color, textShadow: `0 0 20px ${net.color}60` }}
                        >
                          {net.count}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest font-label-md text-on-surface-variant">{t(net.subEn, net.subTh)}</div>
                      </div>
                      <Link
                        href="/billboard"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all group-hover:translate-x-1"
                        style={{ color: net.color, background: `${net.color}12`, border: `1px solid ${net.color}25` }}
                      >
                        {t("Explore", "ดูป้าย")}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="pt-6 pb-0 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto">
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
              {/* Background */}
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Billboard" src="/image/hero network.png" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,17,51,0.92) 0%, rgba(6,17,51,0.75) 100%)" }} />
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 70% at 80% 50%, rgba(230,57,70,0.3) 0%, transparent 70%)" }} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center gap-8 p-10 md:p-16">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-5 h-[1px] bg-primary-container" />
                    <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Ready to advertise?", "สนใจลงโฆษณา?")}</span>
                    <span className="w-5 h-[1px] bg-primary-container" />
                  </div>
                  <h3 className="text-white font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {t("Your brand seen by thousands", "ให้คนเห็นแบรนด์คุณทุกวัน")}<br />
                    <span style={{ color: "#E63946" }}>{t("across Chonburi–Pattaya", "ทั่วชลบุรี–พัทยา")}</span>
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed max-w-xl mx-auto">
                    {t(
                      "Pick your billboard, send your artwork — go live within days.",
                      "เลือกทำเลที่ใช่ ส่งไฟล์โฆษณา ขึ้นป้ายได้ภายในไม่กี่วัน"
                    )}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/billboard"
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white hover:brightness-110 active:scale-95 transition-all"
                    style={{ background: "#E63946", boxShadow: "0 4px 24px rgba(230,57,70,0.5)" }}
                  >
                    <MonitorPlay size={18} />
                    {t("View All Billboards", "ดูรายการป้ายทั้งหมด")}
                  </Link>
                  <Link
                    href="/contact#form"
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white border border-white/25 hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <FileText size={18} />
                    {t("Request a Quote", "ขอใบเสนอราคาฟรี")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-10 pb-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
            <div className="md:col-span-1">
              <div className="mb-6 text-2xl font-black tracking-tight">
                <span className="text-primary">Media</span>
                <span className="text-white">108</span>
              </div>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                {t(
                  "Leading outdoor advertising network in Chonburi — connecting brands to audiences with real traffic data.",
                  "เครือข่ายสื่อโฆษณา LED ชั้นนำในพื้นที่ Chonburi ชลบุรี–พัทยา เชื่อมแบรนด์สู่กลุ่มเป้าหมายด้วยข้อมูลจราจรจริง"
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
                  { label: t("Pattaya Billboards",  "ป้ายพัทยา"),            href: "/billboard/pattaya-dolphin-roundabout" },
                  { label: t("Si Racha Hub",        "ฮับศรีราชา"),           href: "/billboard/sriracha-central-mall" },
                  { label: t("Bang Saen Network",   "เครือข่ายบางแสน"),     href: "/billboard/bangsaen-galaxy-junction" },
                  { label: t("Industrial Zone", "แถบอุตสาหกรรม Chonburi"),   href: "/billboard/chonburi-tech-college-sukhumvit" },
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
                  <a href="tel:+66802399353" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors font-body-md text-sm">
                    <Globe size={16} className="shrink-0" /> 080-239-9353
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
              <span>{t("Region:", "ภูมิภาค:")} <span className="text-on-surface font-bold">TH-CBI</span></span>
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
