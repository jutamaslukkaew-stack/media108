"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  Calendar, MonitorPlay, Eye, TrendingUp, Rocket, Cpu,
  BarChart2, ShieldCheck, ChevronLeft, ChevronRight, Globe, Mail,
  type LucideIcon,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */
const leaders = [
  {
    name: "Dr. Arisara Tan",
    title: "CEO & Chief Visionary",
    bio: "20+ years in regional DOOH and smart city infrastructure development.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&crop=face&facepad=3",
  },
  {
    name: "Pakorn V.",
    title: "Head of Data Science",
    bio: "Former lead algorithm architect for global logistics networks.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face&facepad=3",
  },
  {
    name: "Sarah Jenkins",
    title: "Chief Creative Officer",
    bio: "Award-winning creative director specializing in immersive large-scale digital campaigns.",
    img: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=800&h=1000&fit=crop&crop=face&facepad=3",
  },
  {
    name: "Lester Cheng",
    title: "Director of Operations",
    bio: "Specialist in large-scale hardware rollout and smart-grid integration.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop&crop=face&facepad=3",
  },
];


export default function AboutPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <Navbar activePage="about" />

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-end pb-24 px-6 md:px-margin-desktop overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Media108 Billboard Hero"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-container-max mx-auto w-full flex flex-col lg:flex-row items-end gap-16">
          {/* Left — main text */}
          <div className="flex-1 max-w-2xl">
            <span
              className="inline-block py-1 px-3 mb-6 bg-primary/10 border border-primary/20 text-primary font-label-md text-label-md rounded-full uppercase tracking-widest"
              style={{ animation: "hero-entry 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
            >
              Est. 2008
            </span>
            <h1
              className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-8 leading-tight"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
            >
              {t("Strategic Outdoor Media", "สื่อโฆษณากลางแจ้งเชิงกลยุทธ์")}{" "}
              <span className="text-primary">{t("Across Eastern Thailand.", "ทั่วภาคตะวันออกของไทย")}</span>
            </h1>
            <p
              className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-10 max-w-xl"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
            >
              {t(
                "Media108 is Thailand's premier DOOH and billboard network provider. We bridge the gap between brands and their audiences through high-impact, technologically superior media assets located in the nation's most strategic economic corridors.",
                "Media108 คือเครือข่ายสื่อโฆษณา LED และ DOOH ชั้นนำในพื้นที่ชลบุรี-พัทยา-EEC เราไม่ได้แค่ขายพื้นที่ป้าย แต่ช่วยแบรนด์วางกลยุทธ์สื่อ เลือกทำเลที่แม่นยำ และวัดผลลัพธ์ได้จริง"
              )}
            </p>
            <div
              className="flex flex-wrap gap-6"
              style={{ animation: "hero-entry 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}
            >
              <Link
                href="/network"
                className="bg-primary-container text-white px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest red-glow-hover transition-all active:scale-95"
              >
                {t("Explore Network", "สำรวจเครือข่าย")}
              </Link>
              <Link
                href="/media-kit"
                className="border border-white/20 text-white px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
              >
                {t("Download Kit", "ดาวน์โหลดสื่อ")}
              </Link>
            </div>
          </div>

          {/* Right — stats panel */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-[340px]">
            {([
              { value: "16+",    label: t("Years in Market",   "ปีประสบการณ์ด้านสื่อ"),     icon: Calendar     },
              { value: "250+",   label: t("Active Billboards", "ป้ายโฆษณาในเครือข่าย"),    icon: MonitorPlay  },
              { value: "450K+",  label: t("Daily Impressions", "Impressions ต่อวัน"),       icon: Eye          },
              { value: "85%",    label: t("EEC Market Share",  "ส่วนแบ่งตลาด EEC"),        icon: TrendingUp   },
            ] as { value: string; label: string; icon: LucideIcon }[]).map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
              >
                <s.icon size={22} className="text-primary" />
                <div className="font-display-lg text-white text-3xl font-black leading-none">{s.value}</div>
                <div className="font-label-md text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-24 px-6 md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Vision */}
          <div className="sr sr-left sr-d1 glass-card p-12 rounded-xl flex flex-col justify-center">
            <div className="mb-6 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye size={36} className="text-primary" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6">{t("Our Vision", "วิสัยทัศน์ของเรา")}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {t(
                "To be the undisputed leader in media technology across Southeast Asia, transforming every urban surface into a canvas for meaningful brand storytelling through data-driven innovation.",
                "เป็นผู้นำด้านเครือข่ายสื่อโฆษณากลางแจ้งในภาคตะวันออก ด้วยการนำเทคโนโลยีและข้อมูลจราจรมาใช้วางกลยุทธ์สื่อให้แบรนด์เข้าถึงกลุ่มเป้าหมายได้แม่นยำและวัดผลได้จริง"
              )}
            </p>
          </div>

          {/* Mission */}
          <div className="sr sr-right sr-d2 glass-card p-12 rounded-xl flex flex-col justify-center border border-primary/20 bg-primary/5">
            <div className="mb-6 w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
              <Rocket size={36} className="text-white" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6">{t("Our Mission", "พันธกิจของเรา")}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {t(
                "Empowering advertisers with unmatched visibility and precision. We commit to maintaining the highest standards of hardware integrity and audience analytics to ensure every campaign achieves maximum ROI.",
                "ช่วยให้ผู้โฆษณาเข้าถึงกลุ่มเป้าหมายได้ตรงจุดและแม่นยำที่สุด เรารักษามาตรฐานคุณภาพของจอ LED และวิเคราะห์ข้อมูลผู้ชมอย่างต่อเนื่อง เพื่อให้ทุกแคมเปญได้ผลลัพธ์ที่คุ้มค่าที่สุด"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── EEC Corridor ── */}
      <section className="py-32 px-6 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Image */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="aspect-square glass-card rounded-2xl overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Eastern Economic Corridor"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-data-mono text-data-mono text-primary mb-2">{t("Location Strategy", "กลยุทธ์ทำเล")}</p>
                  <h3 className="font-headline-lg text-headline-lg text-white">{t("Chonburi: The Gateway", "ชลบุรี: ประตูสู่อนาคต")}</h3>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h2 className="font-headline-xl text-headline-xl text-white mb-8">
                {t("Our Home Ground:", "พื้นที่ที่เราเชี่ยวชาญ:")}{" "}
                <span className="text-primary">{t("The EEC Zone.", "เขต EEC ชลบุรี–ระยอง")}</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                {t(
                  "We recognized early that Chonburi and the Eastern Economic Corridor (EEC) represent the beating heart of Thailand's future economy. By concentrating our highest-fidelity digital assets in this zone, we offer advertisers exclusive access to a high-net-worth demographic of industrial leaders, international tourists, and growing middle-class residents.",
                  "ชลบุรีและเขต EEC คือศูนย์กลางเศรษฐกิจที่เติบโตเร็วที่สุดของไทย Media108 วางเครือข่ายป้ายโฆษณาในทุกจุดยุทธศาสตร์ของพื้นที่นี้ ให้แบรนด์เข้าถึงทั้งนักท่องเที่ยว คนทำงาน และผู้บริหารในย่านอุตสาหกรรมได้ในจุดเดียว"
                )}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">450K+</h4>
                  <p className="font-body-md text-on-surface-variant">{t("Daily Traffic Impressions", "Impressions จากจราจรต่อวัน")}</p>
                </div>
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">85%</h4>
                  <p className="font-body-md text-on-surface-variant">{t("Market Share in EEC Region", "ส่วนแบ่งตลาดในภูมิภาค EEC")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Strengths Bento ── */}
      <section className="py-32 px-6 md:px-margin-desktop bg-surface-dim">
        <div className="max-w-container-max mx-auto text-center mb-20">
          <h2 className="font-headline-xl text-headline-xl text-white mb-4">{t("Core Strengths", "จุดแข็งหลัก")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        <div
          className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
          style={{ gridAutoRows: "280px" }}
        >
          {/* Strength 1 — wide */}
          <div className="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-end group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <Cpu size={96} className="text-primary/30 group-hover:text-primary transition-colors" />
            </div>
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-white mb-2">{t("Proprietary Technology", "เทคโนโลยีที่พัฒนาเอง")}</h3>
              <p className="text-on-surface-variant max-w-md">
                {t(
                  "Our LED boards feature custom hardware built for the tropical climate, ensuring 99.9% uptime and true-to-life color reproduction even in direct sunlight.",
                  "จอ LED ของเราออกแบบสำหรับสภาพอากาศร้อนชื้นในไทยโดยเฉพาะ รับประกันความพร้อมใช้งาน 99.9% และแสดงผลสีสันคมชัดแม้กลางแดดจัด"
                )}
              </p>
            </div>
          </div>

          {/* Strength 2 — narrow, red */}
          <div className="md:col-span-4 bg-primary-container rounded-2xl p-8 flex flex-col justify-between shadow-xl shadow-primary/20">
            <BarChart2 size={44} className="text-white" />
            <div>
              <h3 className="font-headline-md text-headline-md text-white mb-2">{t("Audience Intelligence", "ข้อมูลเชิงลึกผู้ชม")}</h3>
              <p className="text-white/80">
                {t(
                  "Every billboard is equipped with anonymous video analytics to provide precise demographic data.",
                  "ป้ายทุกจุดมีระบบวิเคราะห์กลุ่มผู้ชมแบบไม่ระบุตัวตน ให้ข้อมูลกลุ่มเป้าหมายที่แม่นยำแก่ลูกค้า"
                )}
              </p>
            </div>
          </div>

          {/* Strength 3 — narrow */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between hover:bg-white/5 transition-all">
            <ShieldCheck size={44} className="text-primary" />
            <div>
              <h3 className="font-headline-md text-headline-md text-white mb-2">{t("Regulatory Mastery", "ความเชี่ยวชาญด้านกฎระเบียบ")}</h3>
              <p className="text-on-surface-variant">
                {t(
                  "100% legal compliance and structural certification for every site in our portfolio.",
                  "ป้ายทุกจุดได้รับใบอนุญาตถูกต้องตามกฎหมายและผ่านการรับรองโครงสร้างมาตรฐาน 100%"
                )}
              </p>
            </div>
          </div>

          {/* Strength 4 — wide */}
          <div className="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffb3b1,_transparent)]" />
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-white mb-2">{t("Hyper-Local Domination", "ครองพื้นที่ระดับท้องถิ่น")}</h3>
              <p className="text-on-surface-variant">
                {t(
                  "Strategic placement at the busiest intersections and main arterial roads of Eastern Thailand, capturing attention where it matters most.",
                  "คัดเลือกทำเลบริเวณสี่แยกหนาแน่นและถนนสายหลักในภาคตะวันออก เพื่อให้แบรนด์ของคุณปรากฏในจุดที่กลุ่มเป้าหมายมองเห็นมากที่สุด"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-32 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-headline-xl text-white mb-4">{t("Leadership", "ทีมผู้บริหาร")}</h2>
              <p className="text-on-surface-variant font-body-lg">
                {t(
                  "The visionaries steering Media108 toward the future of digital advertising in Thailand.",
                  "ทีมผู้บริหารที่ขับเคลื่อน Media108 ให้เป็นเครือข่ายสื่อโฆษณาชั้นนำของภาคตะวันออก"
                )}
              </p>
            </div>
            <div className="hidden md:flex gap-4 mt-6 md:mt-0">
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <ChevronLeft size={22} />
              </button>
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-gutter">
            {leaders.map((leader) => (
              <div key={leader.name} className="group">
                {/* Portrait */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-5 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    style={{
                      filter: "grayscale(1) brightness(0.68) contrast(1.35) saturate(0)",
                      transition: "filter 800ms ease, transform 800ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(0.2) brightness(0.82) contrast(1.15) saturate(1.2)";
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(1) brightness(0.68) contrast(1.35) saturate(0)";
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    }}
                    src={leader.img}
                  />

                  {/* Deep cinematic vignette — corners & edges */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 85% at 50% 40%, transparent 45%, rgba(3,8,30,0.75) 100%)",
                    }}
                  />
                  {/* Bottom gradient — text legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(6,17,51,0.98) 0%, transparent 100%)",
                    }}
                  />
                  {/* Hover: red brand tint */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(230,57,70,0.18) 0%, transparent 55%)" }}
                  />

                  {/* Name overlay inside card (bottom) */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="font-label-md text-[10px] text-primary uppercase tracking-[0.2em] mb-1">
                      {leader.title}
                    </p>
                    <h3 className="font-headline-md text-[18px] text-white leading-tight">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                {/* Bio below card */}
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Block ── */}
      <section className="py-20 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto bg-primary-container rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="font-headline-xl text-headline-xl text-white mb-6">
                {t("Ready to grow your brand in Chonburi & EEC?", "พร้อมขยายแบรนด์ในชลบุรีและ EEC แล้วหรือยัง?")}
              </h2>
              <p className="font-body-lg text-white/80">
                {t(
                  "Connect with our sales team today to receive a custom media strategy and billboard availability map.",
                  "คุยกับทีมงานของเราเพื่อรับกลยุทธ์สื่อที่ออกแบบเฉพาะแบรนด์ของคุณ พร้อมรายชื่อทำเลที่พร้อมลงโฆษณา"
                )}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/contact#form"
                className="bg-white text-on-primary-container px-10 py-5 rounded-xl font-label-md text-label-md uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-xl text-center"
              >
                {t("Contact Sales", "ติดต่อฝ่ายขาย")}
              </Link>
              <Link
                href="/network"
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-label-md text-label-md uppercase tracking-widest hover:bg-white/10 transition-all text-center"
              >
                {t("Media Network", "เครือข่ายสื่อ")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-20 pb-28">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
            <div className="md:col-span-1">
              <div className="mb-6 text-2xl font-black tracking-tight">
                <span className="text-primary">Media</span>
                <span className="text-white">108</span>
              </div>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                {t(
                  "Leading the digital outdoor revolution in the Eastern Economic Corridor. Precision media solutions driven by data and impact.",
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
              {t("© 2024 MEDIA108. All rights reserved. Precision DOOH Media Solutions.", "© 2024 MEDIA108. สงวนลิขสิทธิ์ โซลูชันสื่อ DOOH ที่แม่นยำ")}
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

    </>
  );
}
