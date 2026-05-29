"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  Store, Globe, Building2, Ticket, Maximize2, Ruler, Aperture,
  BarChart2, Map, FileText, CloudDownload, Video, CheckCircle, Mail, Phone, MessageCircle,
  type LucideIcon,
} from "lucide-react";

/* ── Pricing packages ─────────────────────────────────── */
const pricingPackages: {
  icon: LucideIcon;
  title: string;
  subtitleEn: string;
  subtitleTh: string;
  featuresEn: string[];
  featuresTh: string[];
  featured: boolean;
}[] = [
  {
    icon: Store,
    title: "SME Starter",
    subtitleEn: "For restaurants, cafes, and local clinics",
    subtitleTh: "สำหรับร้านอาหาร คาเฟ่ และคลินิกท้องถิ่น",
    featuresEn: ["Local Targeting", "Flexible Scheduling"],
    featuresTh: ["เจาะกลุ่มในพื้นที่", "ยืดหยุ่นด้านตารางเวลา"],
    featured: false,
  },
  {
    icon: Globe,
    title: "Tourism Campaign",
    subtitleEn: "Hotels, Pattaya restaurants, and tourist attractions",
    subtitleTh: "โรงแรม ร้านอาหารพัทยา และสถานที่ท่องเที่ยว",
    featuresEn: ["Prime Tourist Hotspots", "Multi-language Support"],
    featuresTh: ["จุดท่องเที่ยวชั้นนำ", "รองรับหลายภาษา"],
    featured: true,
  },
  {
    icon: Building2,
    title: "Real Estate",
    subtitleEn: "Condominium and housing estate projects",
    subtitleTh: "โครงการคอนโดมิเนียม และบ้านจัดสรร",
    featuresEn: ["High-Net-Worth Routes", "Day/Night Dominance"],
    featuresTh: ["เส้นทางกลุ่มมีกำลังซื้อสูง", "โดดเด่นทั้งกลางวันและกลางคืน"],
    featured: false,
  },
  {
    icon: Ticket,
    title: "Event Promo",
    subtitleEn: "Concerts, festivals, and sporting events",
    subtitleTh: "คอนเสิร์ต เฟสติวัล และการแข่งกีฬา",
    featuresEn: ["High Frequency Bursts", "Countdown Dynamic Content"],
    featuresTh: ["ความถี่สูง", "เนื้อหาแบบนับถอยหลัง"],
    featured: false,
  },
];

/* ── Tech spec bento cells ───────────────────────────── */
const smallSpecs: { icon: LucideIcon; value: string; labelEn: string; labelTh: string }[] = [
  { icon: Maximize2, value: "3840 x 1920 px", labelEn: "NATIVE RESOLUTION",   labelTh: "ความละเอียดดั้งเดิม" },
  { icon: Ruler,     value: "24m x 12m",      labelEn: "AVERAGE SCREEN SIZE", labelTh: "ขนาดหน้าจอเฉลี่ย" },
  { icon: Aperture,  value: "P10 RGB LED",     labelEn: "PIXEL PITCH",         labelTh: "พิกเซลพิทช์" },
];

/* ── Coverage report features ─────────────────────────── */
const coverageFeatures: {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  descEn: string;
  descTh: string;
}[] = [
  {
    icon: BarChart2,
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    title: "Reach & Frequency",
    descEn: "Measure real viewer counts and exposure frequency — precise data for every campaign.",
    descTh: "วัดจำนวนผู้เห็นโฆษณาจริงและความถี่ในการเข้าถึง เพื่อวิเคราะห์ประสิทธิภาพแคมเปญได้แม่นยำ",
  },
  {
    icon: Map,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    title: "Traffic Heatmaps",
    descEn: "Traffic heatmaps showing audience density by time — helping you pick the highest-impact slots.",
    descTh: "แผนที่ความหนาแน่นจราจรแยกตามช่วงเวลา ช่วยเลือก Slot โฆษณาที่ให้ผลสูงสุด",
  },
];

export default function MediaKitPage() {
  const { lang, t } = useLanguage();
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
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80"
            />
          </div>
          <div className="relative z-20 space-y-4">
            <h1
              className="font-display-lg text-display-lg text-white tracking-tighter uppercase leading-none"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
            >
              {t("Media Kit", "มีเดีย คิต")} <span className="text-primary">&amp;</span>{" "}
              {t("Pricing", "ราคา")}
            </h1>
            <p
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto opacity-80"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
            >
              {t(
                "Elevate your brand with Precision DOOH Solutions that reach your target audience with maximum accuracy.",
                "ข้อมูลครบสำหรับการตัดสินใจลงโฆษณา — ทำเล ราคา แพ็กเกจ และสถิติกลุ่มผู้ชมในเครือข่าย Media108"
              )}
            </p>
          </div>
        </section>

        {/* ── Download Media Kit ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="sr sr-up glass-card rounded-xl p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

            <div className="flex-1 space-y-6 relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-white">
                {t("Download Media Kit", "ดาวน์โหลด Media Kit")}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t(
                  "Get the complete kit including Company Profile and technical details of every billboard location in the Media108 network, along with campaign success case studies.",
                  "ดาวน์โหลดข้อมูลครบ: Company Profile รายละเอียดทำเลป้ายทุกจุด สเปคทางเทคนิค และตัวอย่างแคมเปญที่ประสบความสำเร็จ"
                )}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="inline-flex items-center gap-3 bg-primary-container text-white px-8 py-4 rounded-lg font-label-md text-label-md font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:scale-[1.02] transition-all duration-300">
                  <FileText size={20} />
                  {t("DOWNLOAD PDF MEDIA KIT", "ดาวน์โหลด PDF MEDIA KIT")}
                </button>
              </div>
            </div>

            <div className="w-full md:w-80 flex flex-col items-center justify-center p-8 glass-card border-2 border-dashed border-primary/30 group-hover:border-primary transition-colors rounded-xl">
              <CloudDownload size={56} className="text-primary mb-4" />
              <span className="font-data-mono text-data-mono text-white mb-2">Version 2024.1.0</span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                {t("Size: 12.4 MB", "ขนาด: 12.4 MB")}
              </span>
            </div>
          </div>
        </section>

        {/* ── Billboard Pricing & Packages ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto bg-surface-container-lowest/30">
          <div className="sr sr-up mb-16 text-center">
            <h2 className="font-headline-xl text-headline-xl mb-4 text-white">
              {t("Billboard Pricing & Packages", "ราคา & แพ็กเกจป้ายโฆษณา")}
            </h2>
            <p className="text-on-surface-variant font-body-md">
              {t(
                "Choose the package that best fits your business and campaign.",
                "เลือกแพ็กเกจที่เหมาะสมกับธุรกิจและแคมเปญของคุณ"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {pricingPackages.map((pkg, i) => {
              const features = lang === "en" ? pkg.featuresEn : pkg.featuresTh;
              return (
                <div
                  key={pkg.title}
                  className={`sr sr-up sr-d${i + 1} glass-card rounded-xl p-8 flex flex-col h-full hover:border-primary/50 transition-colors border-b-4 ${
                    pkg.featured ? "border-b-primary/50" : "border-b-secondary/20"
                  }`}
                >
                  <div className="mb-8">
                    <pkg.icon size={36} className="text-primary mb-4 block" />
                    <h3 className="font-headline-md text-headline-md mb-2 text-white">{pkg.title}</h3>
                    <p className="text-on-surface-variant text-sm">{t(pkg.subtitleEn, pkg.subtitleTh)}</p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {features.map((feat) => (
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
                    {t("Request Price", "สอบถามราคา")}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Technical Specifications Bento ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="sr sr-up mb-16">
            <h2 className="font-headline-xl text-headline-xl mb-2 text-white">
              {t("Technical Specifications", "ข้อมูลจำเพาะทางเทคนิค")}
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Main hero card */}
            <div className="sr sr-up sr-d1 md:col-span-2 lg:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between overflow-hidden relative group min-h-[200px]">
              <div className="relative z-10">
                <p className="font-label-md text-label-md text-primary mb-4 uppercase tracking-widest">
                  {t("Display Standard", "มาตรฐานจอแสดงผล")}
                </p>
                <h4 className="font-headline-lg text-headline-lg text-white mb-8">
                  {t("Ultra-High Definition LED Network", "เครือข่าย LED ความคมชัดสูงสุด")}
                </h4>
              </div>
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <span className="text-5xl font-data-mono text-white block mb-1">8,500</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {t("MAX NIT BRIGHTNESS", "ความสว่างสูงสุด (NIT)")}
                  </span>
                </div>
              </div>
              <Aperture size={120} className="text-white/5 absolute -right-4 -bottom-4 select-none" />
            </div>

            {/* Small spec cards */}
            {smallSpecs.map((spec, i) => (
              <div
                key={spec.labelEn}
                className={`sr sr-up sr-d${i + 2} glass-card rounded-xl p-8 flex flex-col justify-between group`}
              >
                <spec.icon size={22} className="text-primary" />
                <div>
                  <span className="font-data-mono text-headline-md block mb-1 text-white">{spec.value}</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {t(spec.labelEn, spec.labelTh)}
                  </span>
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
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {t("SUPPORTED FORMATS", "ฟอร์แมตที่รองรับ")}
                </span>
              </div>
            </div>

            {/* 60 FPS */}
            <div className="sr sr-up sr-d5 md:col-span-1 lg:col-span-2 glass-card rounded-xl p-8 flex items-center gap-8 group">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin-slow flex items-center justify-center shrink-0">
                <span className="font-data-mono text-2xl text-white">60</span>
              </div>
              <div>
                <span className="font-headline-md text-headline-md block text-white">
                  {t("FPS Performance", "ประสิทธิภาพ FPS")}
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {t(
                    "Smooth motion playback for cinematic visuals.",
                    "เล่นวิดีโอราบรื่น ไม่กระตุก เหมาะสำหรับ Motion Graphic ทุกประเภท"
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Coverage & Insight Reports ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto bg-surface-container-low overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
              <h2 className="font-headline-xl text-headline-xl text-white">
                {t("Coverage & Audience Insights", "รายงานผลและข้อมูลเชิงลึกกลุ่มผู้ชม")}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {t(
                  'We don\'t just provide ad space — we provide "data" for the best decision-making. Our coverage reports include precise insights to measure campaign success.',
                  "เราไม่ได้ให้แค่พื้นที่ป้ายโฆษณา แต่ให้ข้อมูลจราจรและกลุ่มผู้ชมที่ช่วยให้คุณตัดสินใจได้อย่างมั่นใจ พร้อมรายงานสรุปผลแคมเปญหลังสิ้นสุดการลงโฆษณา"
                )}
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
                      <p className="text-on-surface-variant text-sm">{t(feat.descEn, feat.descTh)}</p>
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
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex justify-between items-end">
                    <div className="bg-primary-container px-4 py-2 rounded text-white font-data-mono text-sm">
                      {t("LIVE REPORTING", "รายงานแบบสด")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </section>

      </main>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-20 pb-28">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
            <div className="space-y-4">
              <div className="text-2xl font-black tracking-tight">
                <span className="text-primary">Media</span><span className="text-white">108</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("Leading outdoor advertising network across Chonburi–Pattaya EEC.", "เครือข่ายสื่อโฆษณา LED ชั้นนำในพื้นที่ EEC ชลบุรี–พัทยา")}
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">
                {t("Navigation", "นำทาง")}
              </h5>
              <nav className="flex flex-col gap-2">
                {([
                  { en: "Home",         th: "หน้าหลัก",     href: "/" },
                  { en: "About",        th: "เกี่ยวกับเรา",  href: "/about" },
                  { en: "Media Network",th: "เครือข่ายสื่อ", href: "/network" },
                  { en: "Our Services", th: "บริการของเรา",  href: "/services" },
                  { en: "Contact Us",   th: "ติดต่อเรา",     href: "/contact" },
                ] as { en: string; th: string; href: string }[]).map((l) => (
                  <a key={l.en} href={l.href} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
                    {t(l.en, l.th)}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">
                {t("Media Focus", "จุดเน้นสื่อ")}
              </h5>
              <nav className="flex flex-col gap-2">
                {([
                  { en: "Pattaya Digital Hub", th: "พัทยา ดิจิทัล ฮับ",  href: "/billboard/pattaya-sukhumvit-01" },
                  { en: "Chonburi Strategic",  th: "ชลบุรี สตราทีจิค",    href: "/billboard/pattaya-gateway" },
                  { en: "Bang Saen Network",   th: "เครือข่ายบางแสน",     href: "/billboard" },
                  { en: "EEC Industrial Belt", th: "เขต EEC อุตสาหกรรม",  href: "/billboard/eec-tech-square" },
                ] as { en: string; th: string; href: string }[]).map((l) => (
                  <Link key={l.en} className="text-on-surface-variant hover:text-primary transition-colors text-sm" href={l.href}>
                    {t(l.en, l.th)}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">
                {t("Connect", "ติดต่อ")}
              </h5>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:media.108.company@gmail.com" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
                    <Mail size={14} className="shrink-0" /> media.108.company@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+66625636199" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
                    <Globe size={14} className="shrink-0" /> 062-563-6199
                  </a>
                </li>
                <li>
                  <a href="https://lin.ee/NXKWYdJ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm">
                    <Globe size={14} className="shrink-0" /> LINE: @media108
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-border-glass flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-label-md text-label-md text-on-surface-variant opacity-60 text-sm">
              © 2024 MEDIA108. {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")} Precision DOOH Media Solutions.
            </p>
            <div className="flex items-center gap-6 text-on-surface-variant font-label-md text-sm">
              <span>Region: <span className="text-on-surface font-bold">TH-EEC</span></span>
              <span className="flex items-center gap-2">
                {t("Status", "สถานะ")}:{" "}
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{" "}
                {t("Optimal", "ปกติ")}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
