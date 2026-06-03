"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  Calendar, MonitorPlay, Eye, TrendingUp, Rocket, Cpu,
  BarChart2, ShieldCheck, ChevronLeft, ChevronRight, Globe, Mail,
  MapPin, BadgeCheck,
  type LucideIcon,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */
const leaders = [
  {
    name: "ฉัตรมงคล เขมาภิรัตน์",
    nameEn: "Chatmongkol Khemapirat",
    title: "CEO",
    titleTh: "ประธานเจ้าหน้าที่บริหาร",
    bio: "ผู้นำและผู้ก่อตั้ง Media108 ด้วยประสบการณ์กว่า 15 ปีในธุรกิจสื่อโฆษณากลางแจ้งและเครือข่าย DOOH ในภาคตะวันออก",
    bioEn: "Founder and driving force behind Media108, with 15+ years in outdoor advertising and DOOH networks across the Chonburi–Pattaya region.",
    img: "/team/ceo.jpg",
    initials: "ฉ",
  },
  {
    name: "เสริมสุข อรุณคีรีวัฒน์",
    nameEn: "Sermsuk Arunkheerwat",
    title: "Sales Manager",
    titleTh: "ผู้จัดการฝ่ายขาย",
    bio: "ผู้เชี่ยวชาญด้านกลยุทธ์การขายสื่อโฆษณา ดูแลลูกค้าและพันธมิตรธุรกิจทั่วภาคตะวันออก",
    bioEn: "Media sales strategy specialist managing key accounts and business partnerships across the Eastern region.",
    img: "/team/sales-manager.jpg",
    initials: "ส",
  },
  {
    name: "ปัณณภัสร์ แสงแก้ว",
    nameEn: "Pannaphat Saengkaew",
    title: "Sales Manager",
    titleTh: "ผู้จัดการฝ่ายขาย",
    bio: "ดูแลงานขายและประสานงานลูกค้า ช่วยแบรนด์วางแผนแคมเปญสื่อโฆษณาอย่างตรงกลุ่มเป้าหมาย",
    bioEn: "Handles sales and client coordination, helping brands plan targeted advertising campaigns.",
    img: "/team/sales-manager-2.jpg",
    initials: "ป",
  },
];


export default function AboutPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <Navbar activePage="about" />

      {/* ── Hero ── */}
      <section className="relative flex items-center pb-10 px-6 md:px-margin-desktop overflow-hidden pt-24">
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
        <div className="relative z-10 max-w-container-max mx-auto w-full flex flex-col lg:flex-row items-center gap-10">
          {/* Left — main text */}
          <div className="flex-1 max-w-2xl">
            <span
              className="inline-block py-1 px-3 mb-6 bg-primary/10 border border-primary/20 text-primary font-label-md text-label-md rounded-full uppercase tracking-widest"
              style={{ animation: "hero-entry 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
            >
              Est. 2005
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
                "Media108 คือเครือข่ายสื่อโฆษณา LED และ DOOH ชั้นนำในพื้นที่ชลบุรี-พัทยา-Chonburi เราไม่ได้แค่ขายพื้นที่ป้าย แต่ช่วยแบรนด์วางกลยุทธ์สื่อ เลือกทำเลที่แม่นยำ และวัดผลลัพธ์ได้จริง"
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

        </div>
      </section>

      {/* ── Stats + Vision & Mission ── */}
      <section className="py-10 px-6 md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto space-y-10">

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { value: "20+",  label: t("Years in Business",     "ปีที่ดำเนินธุรกิจ"),        icon: Calendar   },
              { value: "10",   label: t("Billboard Locations",   "จุดป้ายในเครือข่าย"),      icon: MonitorPlay},
              { value: "4",    label: t("Cities Covered",        "เมืองหลักที่ครอบคลุม"),   icon: MapPin     },
              { value: "2548", label: t("Est. (DBD Registered)", "ปีจดทะเบียน (กรมพัฒน์ฯ)"), icon: BadgeCheck },
            ] as { value: string; label: string; icon: LucideIcon }[]).map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6 flex flex-col gap-3">
                <s.icon size={20} className="text-primary" />
                <div className="text-white text-3xl font-black leading-none">{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/70">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
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
        </div>{/* end grid vision/mission */}
        </div>{/* end space-y-10 */}
      </section>

      {/* ── Chonburi Corridor ── */}
      <section className="py-14 px-6 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Image */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="aspect-square glass-card rounded-2xl overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Chonburi–Pattaya region"
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
                <span className="text-primary">{t("The Chonburi.", "เขต Chonburi ชลบุรี–ระยอง")}</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                {t(
                  "We recognized early that Chonburi and the Chonburi–Pattaya region represent the beating heart of Thailand's future economy. By concentrating our highest-fidelity digital assets in this zone, we offer advertisers exclusive access to a high-net-worth demographic of industrial leaders, international tourists, and growing middle-class residents.",
                  "ชลบุรีและเขต Chonburi คือศูนย์กลางเศรษฐกิจที่เติบโตเร็วที่สุดของไทย Media108 วางเครือข่ายป้ายโฆษณาในทุกจุดยุทธศาสตร์ของพื้นที่นี้ ให้แบรนด์เข้าถึงทั้งนักท่องเที่ยว คนทำงาน และผู้บริหารในย่านอุตสาหกรรมได้ในจุดเดียว"
                )}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">20+</h4>
                  <p className="font-body-md text-on-surface-variant">{t("Years in Business (Est. 2005)", "ปีที่ดำเนินธุรกิจ (จดทะเบียน 2548)")}</p>
                </div>
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">10</h4>
                  <p className="font-body-md text-on-surface-variant">{t("Strategic Locations", "จุดป้ายยุทธศาสตร์ในชลบุรี")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Strengths Bento ── */}
      <section className="py-14 px-6 md:px-margin-desktop bg-surface-dim">
        <div className="max-w-container-max mx-auto text-center mb-8">
          <h2 className="font-headline-xl text-headline-xl text-white mb-4">{t("Core Strengths", "จุดแข็งหลัก")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        <div
          className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
          style={{ gridAutoRows: "220px" }}
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
          <div className="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffb3b1,_transparent)]" />
            <MapPin size={44} className="text-primary relative z-10" />
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
      <section className="py-14 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div key={leader.name} className="group">
                {/* Portrait */}
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-5 relative">
                  {/* Initials placeholder — shown while/if photo missing */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(145deg, #1e3a6e 0%, #0d1b3e 100%)" }}
                  >
                    <span className="text-white/20 font-bold" style={{ fontSize: "7rem", userSelect: "none" }}>
                      {leader.initials}
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={leader.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{
                      filter: "grayscale(0.1) brightness(0.9) contrast(1.05)",
                      transition: "filter 800ms ease, transform 800ms cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(0) brightness(0.97) contrast(1)";
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(0.1) brightness(0.9) contrast(1.05)";
                      (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    }}
                    src={leader.img}
                    onError={(e) => {
                      /* hide broken-image icon — placeholder div behind will show */
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />

                  {/* Deep cinematic vignette */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 85% at 50% 40%, transparent 45%, rgba(3,8,30,0.65) 100%)" }}
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(6,17,51,0.97) 0%, transparent 100%)" }}
                  />
                  {/* Hover: red tint */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "linear-gradient(160deg, rgba(230,57,70,0.15) 0%, transparent 55%)" }}
                  />

                  {/* Name overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <p className="font-label-md text-[11px] text-primary uppercase tracking-[0.22em] mb-2">
                      {leader.title}
                    </p>
                    <h3 className="font-headline-md text-[22px] text-white leading-tight mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-white/50 text-[12px] tracking-wide">
                      {leader.titleTh}
                    </p>
                  </div>
                </div>

                {/* Bio below card */}
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t(leader.bioEn, leader.bio)}
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
                {t("Ready to grow your brand in Chonburi & Chonburi?", "พร้อมขยายแบรนด์ในชลบุรีและ Chonburi แล้วหรือยัง?")}
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

      {/* ── ทำไมต้องชลบุรี ── */}
      <section className="bg-surface-container-highest py-10 md:py-20 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">

          <div className="sr sr-up text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Why Chonburi", "ทำไมต้องชลบุรี")}</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
              {t("Market You Can't Ignore", "ตลาดที่ไม่ควรมองข้าม")}
            </h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-[#E63946] to-transparent mx-auto rounded-full" />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-6">
              {t(
                "Chonburi is Thailand's industrial and tourism powerhouse — a high-purchasing-power market that brands need to reach.",
                "ชลบุรีคือศูนย์กลางอุตสาหกรรมและท่องเที่ยวของไทย — ตลาดกำลังซื้อสูงที่แบรนด์ไม่ควรพลาด"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { value: "1.5M+", labelTh: "ประชากรในจังหวัด",        labelEn: "Residents",          src: "กรมการปกครอง 2566" },
              { value: "อันดับ 3", labelTh: "GPP ของประเทศไทย",     labelEn: "Thailand GDP Rank",  src: "สภาพัฒน์" },
              { value: "10M+",  labelTh: "นักท่องเที่ยว/ปี",        labelEn: "Tourists / Year",    src: "ททท. 2566" },
              { value: "9",     labelTh: "นิคมอุตสาหกรรมในพื้นที่", labelEn: "Industrial Estates", src: "กนอ." },
            ].map((s) => (
              <div key={s.labelTh} className="sr sr-up glass-card rounded-2xl p-6 text-center flex flex-col gap-2">
                <p className="font-data-mono text-3xl md:text-4xl text-primary-container font-black">{s.value}</p>
                <p className="text-on-surface font-bold text-sm">{t(s.labelEn, s.labelTh)}</p>
                {/* eslint-disable-next-line */}
                <p className="text-outline text-[10px] uppercase tracking-widest mt-auto">{t("Source", "ที่มา")}: {s.src}</p>
              </div>
            ))}
          </div>

          <div className="sr sr-up text-center mb-10">
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">
              {t("Why Out-of-Home Advertising?", "ทำไมต้องสื่อโฆษณานอกบ้าน?")}
            </h3>
            <p className="text-on-surface-variant text-sm">{t("Global research from Nielsen & OAAA", "ข้อมูลจากงานวิจัยระดับโลก Nielsen & OAAA")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "71%",
                titleTh: "คนจำโฆษณา OOH ได้",
                titleEn: "Notice OOH Ads",
                bodyTh: "ผู้บริโภคสังเกตเห็นและจดจำป้ายโฆษณานอกบ้านได้ สูงกว่าสื่อหลายประเภท",
                bodyEn: "Consumers notice and recall out-of-home ads at high rates.",
                src: "Nielsen",
              },
              {
                stat: "4×",
                titleTh: "เพิ่ม Online Search",
                titleEn: "Drives Online Search",
                bodyTh: "OOH สร้าง Online Search ได้มากกว่าสื่อดั้งเดิมอื่นถึง 4 เท่าต่อเงินที่ใช้",
                bodyEn: "OOH drives 4x more online search per dollar than other traditional media.",
                src: "Nielsen",
              },
              {
                stat: "80%",
                titleTh: "ตัดสินใจซื้อหลังเห็นป้าย",
                titleEn: "Influenced Purchase Decision",
                bodyTh: "ผู้บริโภคส่วนใหญ่ที่เห็นป้าย OOH มีการค้นหาข้อมูลหรือตัดสินใจซื้อตามมา",
                bodyEn: "Most consumers who see OOH ads follow up with a search or purchase.",
                src: "OAAA",
              },
            ].map((item) => (
              <div key={item.stat} className="sr sr-up glass-card rounded-2xl p-8 flex flex-col gap-4 border border-white/5">
                <p className="font-data-mono text-5xl text-primary-container font-black">{item.stat}</p>
                <div>
                  <p className="text-white font-bold text-lg mb-2">{t(item.titleEn, item.titleTh)}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{t(item.bodyEn, item.bodyTh)}</p>
                </div>
                {/* eslint-disable-next-line */}
                <p className="text-outline text-[10px] uppercase tracking-widest mt-auto">{t("Source", "ที่มา")}: {item.src}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-20 pb-28">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-6">
            <div className="md:col-span-1">
              <div className="mb-6 text-2xl font-black tracking-tight">
                <span className="text-primary">Media</span>
                <span className="text-white">108</span>
              </div>
              <p className="text-on-surface-variant font-body-md leading-relaxed">
                {t(
                  "Leading the digital outdoor revolution in the Chonburi–Pattaya region. Precision media solutions driven by data and impact.",
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
              <span>{t("Region:", "ภูมิภาค:")} <span className="text-on-surface font-bold">TH-CBI</span></span>
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
