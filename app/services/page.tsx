"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  LayoutGrid, MousePointerClick, Palette, Sparkles, Film, Plane,
  Camera, Share2, Target, Store, Coffee, HeartPulse, Briefcase,
  Hotel, Utensils, Map, Building2, Home, HardHat, Ticket, PartyPopper,
  Trophy, Globe, Radio, type LucideIcon,
} from "lucide-react";

/* ── Service cards data ─────────────────────────────────── */
const services: { icon: LucideIcon; title: string; descEn: string; descTh: string }[] = [
  { icon: LayoutGrid,        title: "พื้นที่โฆษณาบนจอ LED",           descEn: "Reserve ad space on single or multiple LED billboards in prime strategic locations.",                       descTh: "จองพื้นที่โฆษณาบนจอ LED เดี่ยวหรือหลายจุดในทำเลยุทธศาสตร์ที่คัดสรรมาแล้ว" },
  { icon: MousePointerClick, title: "แคมเปญ Digital Out-of-Home",       descEn: "Run coordinated multi-billboard campaigns to maximise brand awareness across the region.",              descTh: "รันแคมเปญพร้อมกันหลายป้าย เพื่อสร้างการรับรู้แบรนด์ในวงกว้างทั่วพื้นที่ EEC" },
  { icon: Palette,           title: "ออกแบบกราฟิกโฆษณา",              descEn: "Design high-impact artworks optimised for LED billboard display and road-visibility standards.",         descTh: "ออกแบบกราฟิกที่เหมาะกับจอ LED กลางแจ้ง มองเห็นชัดเจนจากถนน ดึงดูดสายตาผู้ผ่านไปมา" },
  { icon: Sparkles,          title: "Motion Graphic สำหรับ LED",        descEn: "Create fluid, attention-grabbing animations built to the technical specs of LED outdoor displays.",     descTh: "สร้างภาพเคลื่อนไหวที่ลื่นไหลและโดดเด่น ออกแบบตามข้อกำหนดทางเทคนิคของจอ LED กลางแจ้ง" },
  { icon: Film,              title: "ผลิตวิดีโอโฆษณา",                 descEn: "Full-cycle video production from script to final cut — built for both LED screens and digital platforms.", descTh: "ผลิตวิดีโอโฆษณาครบวงจร ตั้งแต่เขียนบทจนถึงตัดต่อสุดท้าย เหมาะทั้งจอ LED และสื่อออนไลน์" },
  { icon: Plane,             title: "ถ่าย Drone",                      descEn: "Aerial drone footage for locations, properties, or events — delivering cinematic wide-angle views.",    descTh: "บินถ่าย Drone เพื่อสถานที่ โครงการ หรืออีเวนต์ ได้มุมมองกว้างและสวยงามระดับมืออาชีพ" },
  { icon: Camera,            title: "ถ่ายภาพสินค้าและบริการ",           descEn: "Professional photography that elevates your product or service presentation.",                           descTh: "ถ่ายภาพสินค้าและบริการระดับมืออาชีพ ช่วยยกระดับภาพลักษณ์แบรนด์ได้ทันที" },
  { icon: Share2,            title: "คอนเทนต์โซเชียลมีเดีย",           descEn: "Produce ready-to-publish content for Facebook, TikTok, YouTube, and Instagram.",                      descTh: "ผลิตคอนเทนต์พร้อมลงสำหรับ Facebook, TikTok, YouTube และ Instagram อย่างครบวงจร" },
  { icon: Target,            title: "วางกลยุทธ์แคมเปญสื่อ",            descEn: "Build a data-driven media plan — picking the right locations, channels, and timing for your campaign.", descTh: "วางแผนกลยุทธ์สื่อด้วยข้อมูลจราจรจริง เลือกทำเล ช่วงเวลา และรูปแบบที่เหมาะกับเป้าหมาย" },
];

/* ── Package data ───────────────────────────────────────── */
const packages: {
  title: string;
  recommended: boolean;
  labelColor: string;
  accentBorder: string;
  items: { icon: LucideIcon; labelEn: string; labelTh: string }[];
}[] = [
  {
    title: "SME Starter",
    recommended: false,
    labelColor: "text-primary-fixed-dim",
    accentBorder: "border-t-secondary/30",
    items: [
      { icon: Store,      labelEn: "Restaurant",     labelTh: "ร้านอาหาร" },
      { icon: Coffee,     labelEn: "Café",           labelTh: "คาเฟ่" },
      { icon: HeartPulse, labelEn: "Clinic",         labelTh: "คลินิก" },
      { icon: Briefcase,  labelEn: "Local Business", labelTh: "ธุรกิจท้องถิ่น" },
    ],
  },
  {
    title: "Tourism Campaign",
    recommended: true,
    labelColor: "text-primary",
    accentBorder: "border-t-primary",
    items: [
      { icon: Hotel,    labelEn: "Hotel",          labelTh: "โรงแรม" },
      { icon: Utensils, labelEn: "Pattaya Restaurant", labelTh: "ร้านอาหารพัทยา" },
      { icon: Map,      labelEn: "Tourist Attraction", labelTh: "แหล่งท่องเที่ยว" },
    ],
  },
  {
    title: "Real Estate Launch",
    recommended: false,
    labelColor: "text-primary-fixed-dim",
    accentBorder: "border-t-secondary/30",
    items: [
      { icon: Building2, labelEn: "Condominium",    labelTh: "คอนโด" },
      { icon: Home,      labelEn: "Housing Estate", labelTh: "บ้านจัดสรร" },
      { icon: HardHat,   labelEn: "New Project",    labelTh: "โครงการใหม่" },
    ],
  },
  {
    title: "Event Promotion",
    recommended: false,
    labelColor: "text-primary-fixed-dim",
    accentBorder: "border-t-secondary/30",
    items: [
      { icon: Ticket,      labelEn: "Concert",     labelTh: "คอนเสิร์ต" },
      { icon: PartyPopper, labelEn: "Festival",    labelTh: "เทศกาล" },
      { icon: Trophy,      labelEn: "Sport Event", labelTh: "กีฬา" },
    ],
  },
];

export default function ServicesPage() {
  useScrollReveal();
  const { t } = useLanguage();
  useEffect(() => {
    // 3D tilt effect on service cards
    const cards = document.querySelectorAll<HTMLElement>(".service-card");
    const handlers: Array<{
      card: HTMLElement;
      onMove: (e: MouseEvent) => void;
      onLeave: () => void;
      onEnter: () => void;
    }> = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top) - rect.height / 2) / 50;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 50;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      const onLeave = () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        card.style.transition = "transform 0.5s ease";
      };
      const onEnter = () => { card.style.transition = "none"; };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("mouseenter", onEnter);
      handlers.push({ card, onMove, onLeave, onEnter });
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave, onEnter }) => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("mouseenter", onEnter);
      });
    };
  }, []);

  return (
    <>
      <Navbar activePage="services" />

      <main>

        {/* ── Hero ── */}
        <section className="relative h-[600px] flex items-center px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Futuristic media production studio"
              className="w-full h-full object-cover grayscale opacity-40"
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80"
            />
          </div>

          <div className="relative z-20 max-w-4xl">
            <span
              className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
            >
              {t("Our Services", "บริการของเรา")}
            </span>
            <h1
              className="font-display-lg text-display-lg mb-6 leading-tight text-white"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both" }}
            >
              {t(
                "More than just \"selling ad space\"",
                "มากกว่าการ\"ขายพื้นที่ป้าย\" — เราช่วยวางกลยุทธ์สื่อให้คุณ"
              )}
            </h1>
            <p
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s both" }}
            >
              {t(
                "Media108 elevates your brand with comprehensive digital out-of-home solutions — from strategy and design to cinematic-quality content production.",
                "Media108 ให้บริการสื่อโฆษณากลางแจ้งแบบครบวงจร ตั้งแต่วางกลยุทธ์ เลือกทำเล ออกแบบกราฟิก จนถึงผลิตคอนเทนต์คุณภาพสูง — ทุกอย่างในทีมเดียว"
              )}
            </p>
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s both" }}
            >
              <a
                href="#packages"
                className="bg-primary-container text-white px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:-translate-y-px transition-all"
              >
                {t("View Recommended Packages", "ดูแพ็กเกจแนะนำ")}
              </a>
              <a
                href="#services"
                className="px-8 py-4 rounded-lg font-label-md text-label-md border border-white/20 hover:bg-white/10 transition-all uppercase tracking-wider text-white"
              >
                {t("All Services", "บริการทั้งหมด")}
              </a>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section id="services" className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="sr sr-up mb-16">
            <h2 className="font-headline-xl text-headline-xl mb-4 text-white">{t("Professional Services", "บริการระดับมืออาชีพ")}</h2>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`sr sr-scale sr-d${Math.min(i % 3 + 1, 5)} service-card glass-card p-8 rounded-xl flex flex-col transition-all duration-300 hover:border-primary-container/30`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svc.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-headline-md text-headline-md mb-3 text-white">{svc.title}</h3>
                <p className="font-body-md text-on-surface-variant">{t(svc.descEn, svc.descTh)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="packages" className="py-24 bg-surface-container-low border-y border-white/5">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="sr sr-up text-center mb-16">
              <h2 className="font-headline-xl text-headline-xl mb-4 text-white">{t("Recommended Packages", "แพ็กเกจแนะนำสำหรับธุรกิจของคุณ")}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                {t(
                  "Packages designed to meet the needs of every business size and industry.",
                  "เลือกแพ็กเกจที่เหมาะกับธุรกิจและงบประมาณของคุณ หรือให้ทีมเราออกแบบแผนเฉพาะสำหรับแคมเปญของคุณ"
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter items-start">
              {packages.map((pkg, i) => (
                <div
                  key={pkg.title}
                  className={`sr sr-up sr-d${i + 1} glass-card p-8 rounded-xl flex flex-col h-full border-t-4 ${pkg.accentBorder} relative ${
                    pkg.recommended ? "scale-105 shadow-2xl shadow-primary/10 z-10" : ""
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary font-label-md text-label-md px-4 py-1 rounded-full whitespace-nowrap">
                      RECOMMENDED
                    </div>
                  )}

                  <h3 className="font-headline-md text-headline-md mb-4 text-white">{pkg.title}</h3>
                  <p className={`${pkg.labelColor} font-bold mb-6`}>{t("Suitable for:", "เหมาะสำหรับ:")}</p>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.items.map((item) => (
                      <li key={item.labelEn} className="flex items-start">
                        <item.icon size={20} className="text-primary mr-3 shrink-0 mt-0.5" />
                        <span className="font-body-md text-on-surface-variant">{t(item.labelEn, item.labelTh)}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.recommended ? (
                    <Link
                      href="/contact"
                      className="block w-full py-4 rounded-lg bg-primary-container text-white font-label-md text-label-md uppercase tracking-wider font-bold text-center hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:-translate-y-px transition-all"
                    >
                      {t("Enquire Now", "สอบถามข้อมูล")}
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="block w-full py-4 rounded-lg border border-white/20 hover:bg-white/10 transition-all font-label-md text-label-md uppercase tracking-wider text-white text-center"
                    >
                      {t("Choose This Package", "เลือกแพ็กเกจนี้")}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Strategic CTA ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto text-center">
          <div className="sr sr-up max-w-3xl mx-auto">
            <h2 className="font-headline-xl text-headline-xl mb-6 text-white">
              {t("Need a media plan tailored specifically for you?", "ต้องการแผนสื่อที่ตอบโจทย์เฉพาะคุณ?")}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              {t(
                "We don't just sell space — we help you plan so that every second on screen is meaningful and delivers maximum return on investment.",
                "เราไม่ได้แค่ขายพื้นที่ป้าย เราช่วยวางกลยุทธ์สื่อทั้งหมดให้คุณ เพื่อให้ทุกวินาทีบนจอ LED สร้างผลลัพธ์ที่วัดได้จริง"
              )}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary-container text-white px-12 py-5 rounded-lg font-headline-md text-headline-md hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:-translate-y-px transition-all active:scale-95"
            >
              {t("Start Your Project", "เริ่มต้นโครงการของคุณ")}
            </Link>
          </div>
        </section>

      </main>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-white/5 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-20 max-w-container-max mx-auto">
          <div className="md:col-span-1">
            <div className="text-2xl font-black tracking-tight mb-6">
              <span className="text-primary">Media</span><span className="text-white">108</span>
            </div>
            <p className="text-on-surface-variant font-body-md text-sm mb-6 leading-relaxed opacity-70">
              {t(
                "Elevate your brand through precision digital out-of-home media and quality-driven production.",
                "เครือข่ายสื่อโฆษณา LED ชั้นนำในพื้นที่ EEC ชลบุรี–พัทยา เชื่อมแบรนด์สู่กลุ่มเป้าหมายด้วยข้อมูลจราจรจริง"
              )}
            </p>
            <div className="flex gap-4">
              {[Globe, Radio].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-primary cursor-pointer transition-colors text-on-surface-variant"
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-label-md text-label-md uppercase tracking-widest mb-2">{t("Network", "เครือข่าย")}</h4>
            {([
              { label: t("Network Map", "แผนที่เครือข่าย"), href: "/network" },
              { label: t("Global Offices", "สำนักงานทั่วโลก"), href: "/about" },
              { label: t("Case Studies", "กรณีศึกษา"), href: "/billboard" },
            ] as { label: string; href: string }[]).map((l) => (
              <Link key={l.label} className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm" href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-label-md text-label-md uppercase tracking-widest mb-2">{t("Company", "บริษัท")}</h4>
            {([
              { label: t("Careers", "ร่วมงานกับเรา"),               href: "/contact" },
              { label: t("Privacy Policy", "นโยบายความเป็นส่วนตัว"), href: "/privacy-policy" },
              { label: t("Terms of Service", "เงื่อนไขการให้บริการ"), href: "/privacy-policy" },
            ] as { label: string; href: string }[]).map((l) => (
              <Link key={l.label} className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm" href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-label-md text-label-md uppercase tracking-widest mb-2">{t("Contact", "ติดต่อ")}</h4>
            <a href="mailto:media.108.company@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm">media.108.company@gmail.com</a>
            <a href="tel:+66625636199" className="text-on-surface-variant hover:text-primary transition-colors text-sm">062-563-6199</a>
            <a href="https://lin.ee/NXKWYdJ" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors text-sm">LINE: @media108</a>
            <p className="text-on-surface-variant text-sm">800/108 ถ.สุขุมวิท ต.แสนสุข อ.เมืองชลบุรี จ.ชลบุรี</p>
          </div>
        </div>
        <div className="px-margin-desktop py-8 border-t border-white/5 text-center text-on-surface-variant text-xs opacity-60">
          © 2026 บริษัท มีเดีย 108 จำกัด (MEDIA 108 COMPANY LIMITED) {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")} | เลขทะเบียน 0205548033971
        </div>
      </footer>
    </>
  );
}
