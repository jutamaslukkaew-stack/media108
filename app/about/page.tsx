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
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXAcIyvYWhQFauG5XmUm0KlTMXygvTaej8_7fDuXKDRBkaJ0B5zieW88DjVCssqd_GLb6VQJ_u0wzochpGis_fXuwaL_yJ0EFMuW29-54R2BSXCXdYiqjjzkk8P4KAtIxOZXcQ0SE_YSMx9lFPay9J5ogYNd2ivKrN4iIll6HkUu5mz1jq3Qa3woKSpO_sDRxLMjX1BHpC0YI73uQ5uzRR6E7bisvCWbnxj6tl_5fzTpQC4QIU7d_l9bloaHSNgHDGNvl8x2D1Cow"
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
              {t("Redefining the", "ยกระดับ")}{" "}
              <span className="text-primary">{t("Urban Horizon.", "เส้นขอบฟ้าเมือง")}</span>
            </h1>
            <p
              className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-10 max-w-xl"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
            >
              {t(
                "Media108 is Thailand's premier DOOH and billboard network provider. We bridge the gap between brands and their audiences through high-impact, technologically superior media assets located in the nation's most strategic economic corridors.",
                "Media108 คือผู้ให้บริการเครือข่ายป้ายบิลบอร์ดและ DOOH ชั้นนำของไทย เราเชื่อมต่อแบรนด์กับกลุ่มเป้าหมายผ่านสื่อที่ทรงพลังและเหนือกว่าด้วยเทคโนโลยี ณ จุดยุทธศาสตร์สำคัญที่สุดของประเทศ"
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
              { value: "16+",    label: t("Years in Market", "ปีในตลาด"),         icon: Calendar     },
              { value: "250+",   label: t("Active Billboards", "ป้ายที่ใช้งานอยู่"), icon: MonitorPlay  },
              { value: "450K+",  label: t("Daily Impressions", "ผู้ชมต่อวัน"),      icon: Eye          },
              { value: "85%",    label: t("EEC Market Share", "ส่วนแบ่งตลาด EEC"), icon: TrendingUp   },
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
                "เป็นผู้นำด้านเทคโนโลยีสื่อที่ไม่มีใครโต้แย้งได้ทั่วเอเชียตะวันออกเฉียงใต้ แปลงทุกพื้นผิวเมืองให้กลายเป็นผืนผ้าใบเพื่อการเล่าเรื่องแบรนด์ที่มีความหมายผ่านนวัตกรรมขับเคลื่อนด้วยข้อมูล"
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
                "มอบพลังให้ผู้โฆษณาด้วยการมองเห็นและความแม่นยำที่ไม่มีใครเทียบ เรามุ่งมั่นรักษามาตรฐานสูงสุดด้านความสมบูรณ์ของฮาร์ดแวร์และการวิเคราะห์ผู้ชม เพื่อให้ทุกแคมเปญบรรลุ ROI สูงสุด"
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
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVas6tFtrdwlaP370s6AzdHLzBCDNT8mV7GQlBCNjCOGquJtGaXzS9KJQJf1HkF2SL7rbwmf0sHM6oG9HOM8N2EUlrqS6zjULBIUW9G5oeofCtYPucRPnuFgFzjlGxwpFohsozQeWpkD-bijSONPb6fGnhAocYa4ERFAOCPMjYLcuvwwcjcbJa1fITyiYvvuDichiFokCVf90JR6kIKJPzyBKeTh2WfpIwwd8j5G2IVYEnTUvkff-DheSvYI6lLUZMZxhDuQn1b14"
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
                {t("Dominating the", "ครองความเป็นเจ้าใน")}{" "}
                <span className="text-primary">{t("EEC Corridor.", "EEC Corridor")}</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                {t(
                  "We recognized early that Chonburi and the Eastern Economic Corridor (EEC) represent the beating heart of Thailand's future economy. By concentrating our highest-fidelity digital assets in this zone, we offer advertisers exclusive access to a high-net-worth demographic of industrial leaders, international tourists, and growing middle-class residents.",
                  "เราตระหนักตั้งแต่เนิ่นๆ ว่าชลบุรีและเขตพัฒนาพิเศษภาคตะวันออก (EEC) คือหัวใจของเศรษฐกิจไทยในอนาคต ด้วยการกระจุกตัวสินทรัพย์ดิจิทัลคุณภาพสูงสุดในโซนนี้ เราให้ผู้โฆษณาเข้าถึงกลุ่มประชากรที่มีรายได้สูง ทั้งผู้นำอุตสาหกรรม นักท่องเที่ยวต่างชาติ และชนชั้นกลางที่กำลังเติบโต"
                )}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">450K+</h4>
                  <p className="font-body-md text-on-surface-variant">{t("Daily Traffic Impressions", "ผู้ชมต่อวัน")}</p>
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
                  "ป้าย LED ของเราใช้ฮาร์ดแวร์ที่ออกแบบมาเพื่อสภาพอากาศแบบร้อนชื้น รับประกันความพร้อมใช้งาน 99.9% และสีสันที่สมจริงแม้ในแสงแดดจัด"
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
                  "ป้ายทุกจุดติดตั้งระบบวิเคราะห์วิดีโอแบบนิรนามเพื่อให้ข้อมูลประชากรที่แม่นยำ"
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
                  "ปฏิบัติตามกฎหมาย 100% และได้รับการรับรองโครงสร้างทุกจุดในพอร์ตโฟลิโอ"
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
                  "การวางป้ายเชิงกลยุทธ์บริเวณสี่แยกหนาแน่นและถนนสายหลักในภาคตะวันออก ดึงดูดความสนใจในจุดที่สำคัญที่สุด"
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
                  "ผู้มีวิสัยทัศน์ที่นำพา Media108 มุ่งสู่อนาคตของการโฆษณาดิจิทัลในประเทศไทย"
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
                {t("Ready to amplify your presence in Chonburi?", "พร้อมขยายการรับรู้แบรนด์ในชลบุรีแล้วหรือยัง?")}
              </h2>
              <p className="font-body-lg text-white/80">
                {t(
                  "Connect with our sales team today to receive a custom media strategy and billboard availability map.",
                  "ติดต่อทีมขายของเราวันนี้เพื่อรับแผนกลยุทธ์สื่อที่ออกแบบมาเฉพาะคุณและแผนที่ตำแหน่งป้ายที่ว่าง"
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
                  "นำแนวโน้มปฏิวัติสื่อดิจิทัลกลางแจ้งในเขตพัฒนาพิเศษภาคตะวันออก โซลูชันสื่อที่แม่นยำขับเคลื่อนด้วยข้อมูลและผลกระทบ"
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
                {[
                  t("Pattaya Digital Hub", "ฮับดิจิทัลพัทยา"),
                  t("Chonburi Strategic", "ชลบุรีเชิงกลยุทธ์"),
                  t("Bang Saen Network", "เครือข่ายบางแสน"),
                  t("EEC Industrial Belt", "แถบอุตสาหกรรม EEC"),
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">{t("Connect", "ติดตาม")}</h6>
              <div className="flex gap-4">
                {([Globe, Mail] as LucideIcon[]).map((Icon, idx) => (
                  <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-on-surface-variant hover:text-white">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
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
