"use client";

import React, { use, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import GlobalCTABar from "../../components/GlobalCTABar";
import { billboards } from "../../data/billboards";
import type { BillboardData } from "../../data/billboards";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import {
  ArrowRight, Download, Play, MapPin, BookOpen, Users, TrendingUp,
  Handshake, CheckCircle, ArrowUpRight, ShoppingCart, GraduationCap,
  Hospital, Building2, Store, Umbrella, Hotel, Factory, Ship, Utensils,
  type LucideIcon,
} from "lucide-react";

/* ── Map material-symbol strings → Lucide components ── */
const iconMap: Record<string, LucideIcon> = {
  shopping_cart:  ShoppingCart,
  school:         GraduationCap,
  local_hospital: Hospital,
  apartment:      Building2,
  local_mall:     Store,
  beach_access:   Umbrella,
  hotel:          Hotel,
  factory:        Factory,
  directions_boat: Ship,
  local_dining:   Utensils,
};

/* ── Category → campaign banner image mapping ── */
const categoryImages: Record<string, string> = {
  "ร้านอาหาร":          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80",
  "คาเฟ่":              "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=80",
  "ร้านอาหาร & คาเฟ่":  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
  "โรงแรม":             "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
  "ท่องเที่ยว":          "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80",
  "พักผ่อน & รีสอร์ท":  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
  "ท่องเที่ยว & รีสอร์ท":"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
  "กิจกรรม & บันเทิง":  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  "กิจกรรม":            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
  "กิจกรรม & ดนตรี":    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900&q=80",
  "อสังหาริมทรัพย์":     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
  "IT & เทคโนโลยี":     "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=80",
  "IT & Software":       "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80",
  "HR & Corporate":      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
  "CSR & องค์กร":       "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80",
  "สื่อ & โฆษณา":       "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80",
  "ตลาด & ชุมชน":       "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80",
  "สวนน้ำ & กีฬา":      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80",
  "สถานที่จัดงาน":       "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
  "บันเทิง & ไลฟ์สไตล์": "https://images.unsplash.com/photo-1549577434-d7615fd4ceac?w=900&q=80",
  "การเงิน & อสังหา":   "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=900&q=80",
};
const DEFAULT_CAMPAIGN_IMG = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BillboardDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const data = billboards[slug];
  if (!data) notFound();
  return <BillboardDetail data={data!} />;
}

/* ── Campaign Showcase Carousel Component ── */
function CampaignCarousel({
  campaigns,
  t,
}: {
  campaigns: { name: string; category: string }[];
  t: (en: string, th: string) => string;
}) {
  /* Show max 5 slides */
  const slides = campaigns.slice(0, 5).map((c) => ({
    ...c,
    img: categoryImages[c.category] ?? DEFAULT_CAMPAIGN_IMG,
  }));

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);

  /* Auto-play every 4 s */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="py-20 bg-surface-container-lowest border-t border-border-glass overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-desktop">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="sr sr-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Real Campaigns</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-white mb-1">
              {t("Sample Campaigns on This Billboard", "ตัวอย่างแคมเปญบนป้ายนี้")}
            </h2>
            <p className="text-on-surface-variant text-sm">
              {t("Brands that have run real campaigns here", "แบรนด์และธุรกิจที่เคยลงโฆษณาจริงบนป้ายนี้")}
            </p>
          </div>
          {/* Prev / Next buttons */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={prev}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all"
              aria-label="Previous"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={next}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all"
              aria-label="Next"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="relative shrink-0 w-full"
                style={{ aspectRatio: "16/7" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.img}
                  alt={slide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Slide number badge */}
                <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-4">
                    {slide.category}
                  </span>
                  <h3 className="text-white font-bold mb-2 leading-tight"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}>
                    {slide.name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t("Advertised on this billboard", "โฆษณาบนป้ายนี้จริง")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators + progress */}
        <div className="flex items-center gap-3 mt-6 justify-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 6000); }}
              className="relative overflow-hidden rounded-full transition-all duration-300"
              style={{
                width: i === current ? "32px" : "8px",
                height: "8px",
                background: i === current ? "#E63946" : "rgba(255,255,255,0.2)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === current && !paused && (
                <span
                  className="absolute inset-y-0 left-0 bg-white/40 rounded-full"
                  style={{ animation: "progress-bar 4s linear forwards" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
function BillboardDetail({ data }: { data: BillboardData }) {
  const { t } = useLanguage();
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => {
      const img = document.getElementById("hero-bg-img");
      if (img) img.style.transform = `translateY(${window.pageYOffset * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); };
  }, []);

  const heroImg = data.imgHero ?? data.imgNight ?? data.imgDay;

  return (
    <>
      <Navbar activePage="billboard" />

      <main className="kinetic-bg w-full pb-24">

        {/* ── 1. Hero ── */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="hero-bg-img"
              alt={`ป้าย LED ${data.title} – ${data.subtitle} สื่อโฆษณา DOOH Media108`}
              className="w-full h-full object-cover will-change-transform"
              src={heroImg}
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-desktop pb-20">
            <div className="flex flex-col gap-6 max-w-3xl">
              <div
                className="flex items-center gap-3 flex-wrap"
                style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
              >
                <span className="px-3 py-1 bg-primary-container/20 border border-primary-container/30 rounded-full text-primary-container text-xs font-bold uppercase tracking-widest">
                  {data.tag}
                </span>
                <span className="text-outline text-xs font-data-mono uppercase tracking-widest">{data.subtitle}</span>
              </div>
              <h1
                className="font-headline-xl text-headline-xl text-white leading-none"
                style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s both" }}
              >
                {data.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-primary-container">{data.title.split(" ").slice(-2).join(" ")}</span>
              </h1>
              <p
                className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed"
                style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
              >
                {data.description}
              </p>
              <div
                className="flex flex-wrap gap-4 pt-4"
                style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s both" }}
              >
                <Link href="/contact#form" className="bg-primary-container hover:brightness-110 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(230,57,70,0.3)]">
                  {t("Request Immediate Quote", "ขอใบเสนอราคาทันที")}
                  <ArrowRight size={18} />
                </Link>
                <Link href="/media-kit" className="glass-card hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all">
                  <Download size={18} />
                  {t("Download Media Kit", "ดาวน์โหลด Media Kit")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Visual Performance ── */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">{t("Visual Performance", "คุณภาพภาพในทุกสภาพแสง")}</h2>
              <p className="text-outline">{t("Brilliant clarity 24/7 — day or night, rain or shine.", "คมชัดตลอด 24 ชั่วโมง ไม่ว่าจะกลางวัน กลางคืน หรือในวันที่มีฝน")}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sr sr-up space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Day View" className="w-full h-full object-cover" src={data.imgDay} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center text-on-surface-variant">{t("Daytime Visibility (10,000 Nits)", "ความชัดเจนกลางวัน (10,000 Nits)")}</p>
            </div>
            <div className="sr sr-up space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Night View" className="w-full h-full object-cover brightness-75" src={data.imgNight} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center text-on-surface-variant">{t("Night Visibility (Dynamic Contrast)", "ความโดดเด่นกลางคืน (Contrast ไดนามิก)")}</p>
            </div>
            <div className="sr sr-up space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card relative group cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Drone View" className="w-full h-full object-cover opacity-60" src={data.imgDrone ?? data.imgDay} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary-container/20 border border-primary-container/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={36} className="text-primary-container fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center text-on-surface-variant">{t("Drone View Preview", "ตัวอย่างมุมมองโดรน")}</p>
            </div>
          </div>
        </section>

        {/* ── 3. Strategic Dominance ── */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="sr sr-left space-y-8">
              <h2 className="font-headline-lg text-headline-lg text-white">
                {t("Location", "ทำเล")} <span className="text-primary-container">{t("Strategy", "เชิงกลยุทธ์")}</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {data.strategicDescription ?? data.locationStory}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.nearby.map((place) => {
                  const PlaceIcon = iconMap[place.icon] ?? MapPin;
                  return (
                  <div key={place.name} className="flex items-start gap-4">
                    <PlaceIcon size={20} className="text-primary-container mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">{place.name}</p>
                      <p className="text-sm text-outline">{place.distance}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
            <div className="sr sr-right glass-card rounded-2xl overflow-hidden aspect-square relative border border-white/10">
              {data.mapLat && data.mapLng ? (
                /* OpenStreetMap embed – ไม่ต้องใช้ API Key */
                <iframe
                  title={`แผนที่ตำแหน่ง ${data.title}`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.mapLng - 0.018},${data.mapLat - 0.018},${data.mapLng + 0.018},${data.mapLat + 0.018}&layer=mapnik&marker=${data.mapLat},${data.mapLng}`}
                />
              ) : (
                /* fallback: static image */
                <div className="absolute inset-0 bg-[#0A1128] flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={`แผนที่ตำแหน่ง ${data.title}`}
                    className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                    src={data.mapImg}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-primary-container rounded-full animate-ping absolute inset-0 opacity-75" />
                    <div className="w-8 h-8 bg-primary-container rounded-full relative flex items-center justify-center border-4 border-surface shadow-2xl">
                      <MapPin size={12} className="text-white" />
                    </div>
                  </div>
                </div>
              )}
              {/* Open in Google Maps button */}
              {data.mapLat && data.mapLng && (
                <a
                  href={`https://www.google.com/maps?q=${data.mapLat},${data.mapLng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-primary font-bold flex items-center gap-1.5 hover:bg-primary hover:text-white transition-all border border-white/10"
                >
                  <MapPin size={12} /> เปิดใน Google Maps
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. Performance Data ── */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-white mb-12">{t("Performance Data", "ข้อมูลประสิทธิภาพ")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { labelEn: "Daily Traffic",   labelTh: "ยานพาหนะต่อวัน",      value: data.carsPerDay,                         subEn: "Estimated daily vehicle count", subTh: "จำนวนยานพาหนะโดยประมาณต่อวัน", accent: true },
              { labelEn: "Avg. Speed",     labelTh: "ความเร็วเฉลี่ย",       value: data.avgSpeed,                           subEn: "Longer exposure per pass",      subTh: "เวลาที่มองเห็นป้ายนานขึ้น",     accent: false },
              { labelEn: "Viewing Time",   labelTh: "เวลามองเห็นป้าย",      value: data.viewingDuration,                    subEn: "Clear line-of-sight",           subTh: "เส้นสายตาชัดเจนจากถนน",         accent: false },
              { labelEn: "Peak Hours",     labelTh: "ช่วงจราจรหนาแน่น",    value: data.peakHours.split("–")[0].trim(),     subEn: "Rush hour peak exposure",       subTh: "การมองเห็นสูงสุดช่วงชั่วโมงเร่งด่วน", accent: false },
            ].map((item) => (
              <div
                key={item.labelEn}
                className={`sr sr-up glass-card p-8 rounded-2xl ${item.accent ? "border-l-4 border-l-primary-container" : ""}`}
              >
                <p className="text-outline text-xs uppercase tracking-widest mb-4">{t(item.labelEn, item.labelTh)}</p>
                <p className="font-data-mono text-3xl text-white mb-2">{item.value}</p>
                <p className="text-sm text-on-surface-variant">{t(item.subEn, item.subTh)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Audience Insights ── */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row gap-24">
              <div className="sr sr-left flex-1 space-y-8">
                <h2 className="font-headline-lg text-headline-lg text-white">
                  {t("Audience", "กลุ่มผู้ชม")} <span className="text-primary-container">{t("Breakdown", "โดยละเอียด")}</span>
                </h2>
                <div className="space-y-6">
                  {data.audienceBreakdown.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>{item.label}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sr sr-right flex-1 glass-card p-12 rounded-2xl flex flex-col justify-center items-center text-center">
                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  <div
                    className="absolute inset-0 rounded-full border-[12px] border-primary-container"
                    style={{
                      background: `conic-gradient(transparent ${data.visibilityBar * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />
                  <span className="font-data-mono text-3xl text-white relative z-10">{data.visibilityBar}%</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-2">{t("Visibility Score", "คะแนนประสิทธิภาพสื่อ")}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {t("Scored on visibility, dwell time, audience density, and strategic location value.", "คำนวณจากการมองเห็น เวลาสัมผัสสื่อ ความหนาแน่นผู้ชม และมูลค่าทางกลยุทธ์ของทำเล")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. The Sales Story ── */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { icon: BookOpen,    titleEn: "About This Location",    titleTh: "เกี่ยวกับทำเลนี้",       body: data.locationStory },
              { icon: Users,       titleEn: "Who Are the Audience?",  titleTh: "กลุ่มผู้ชมเป็นใคร?",    body: data.audienceStory },
              { icon: TrendingUp,  titleEn: "Traffic Insights",        titleTh: "ข้อมูลจราจรเชิงลึก",   body: data.trafficStory },
              { icon: Handshake,   titleEn: "Best For Your Business",  titleTh: "เหมาะกับธุรกิจประเภทใด?", body: data.businessFit },
            ] as { icon: LucideIcon; titleEn: string; titleTh: string; body: string }[]).map((item) => (
              <div
                key={item.titleEn}
                className="sr sr-up p-10 border border-border-glass rounded-2xl hover:border-primary-container/40 transition-colors"
              >
                <item.icon size={36} className="text-primary-container mb-6 block" />
                <h3 className="font-headline-md text-headline-md text-white mb-4">{t(item.titleEn, item.titleTh)}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Technical Specifications ── */}
        <section className="py-24 bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <h2 className="font-headline-lg text-headline-lg text-white mb-12">{t("Technical Specifications", "ข้อมูลจำเพาะทางเทคนิค")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-glass border border-border-glass rounded-2xl overflow-hidden">
              {data.specs.map((spec) => (
                <div key={spec.label} className="bg-surface p-8">
                  <p className="text-outline text-xs uppercase mb-2 tracking-wide">{spec.label}</p>
                  <p className={`font-data-mono text-lg ${spec.label === "Smart Sync" ? "text-primary-container" : "text-white"}`}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="sr sr-up mt-8 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg glass-card border border-border-glass text-white font-bold hover:bg-white/10 transition-all">
                <Download size={18} />
                {t("Download Media Kit (PDF)", "ดาวน์โหลด Media Kit (PDF)")}
              </button>
            </div>
          </div>
        </section>

        {/* ── 8. Investment Tiers ── */}
        {data.pricingTiers && (
          <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-white mb-4">{t("Pricing & Packages", "ราคาและแพ็กเกจ")}</h2>
              <p className="text-on-surface-variant">{t("Flexible packages for every campaign scale and budget.", "แพ็กเกจยืดหยุ่นสำหรับทุกขนาดแคมเปญและงบประมาณ")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`sr sr-up glass-card p-10 rounded-2xl flex flex-col items-center text-center relative overflow-hidden ${tier.highlight ? "border border-primary-container/60" : ""}`}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 right-0 bg-primary-container text-white px-4 py-1 text-xs font-bold uppercase tracking-tight">
                      {t("Most Popular", "ยอดนิยม")}
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-widest mb-6 text-outline">{tier.label}</p>
                  <p className="font-headline-md text-headline-md text-white mb-2">{tier.name}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-headline-lg text-headline-lg text-primary-container">{tier.price}</span>
                    {tier.unit && <span className="text-sm text-outline">{tier.unit}</span>}
                  </div>
                  <ul className="space-y-4 mb-10 text-on-surface-variant w-full text-left">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-400 flex-shrink-0 fill-green-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact#form"
                    className={`mt-auto w-full py-4 rounded-lg font-bold transition-all text-center block ${
                      tier.highlight
                        ? "bg-primary-container text-white hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] active:scale-95"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 8b. Campaign Showcase Carousel ── */}
        {data.recentCampaigns && data.recentCampaigns.length > 0 && (
          <CampaignCarousel campaigns={data.recentCampaigns} t={t} />
        )}

        {/* ── 9. Related Billboards ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">{t("Related Locations", "ป้ายใกล้เคียงในเครือข่าย")}</h2>
              <p className="text-on-surface-variant">{t("Boost your campaign reach with nearby billboards in our network", "เพิ่มการเข้าถึงแคมเปญด้วยป้ายโฆษณาใกล้เคียงในเครือข่าย Media108")}</p>
            </div>
            <Link href="/network" className="text-primary-container font-bold flex items-center gap-2 hover:underline whitespace-nowrap text-sm uppercase tracking-widest">
              {t("View All", "ดูทั้งหมด")} <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.related.map((rel) => (
              <div key={rel.slug} className="sr sr-scale glass-card rounded-2xl overflow-hidden group">
                <div className="h-56 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={rel.img}
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded text-white text-xs font-bold uppercase backdrop-blur ${
                    rel.status === "High Demand" ? "bg-primary-container/80" : "bg-surface-container-highest/80"
                  }`}>
                    {rel.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline-md text-headline-md text-white mb-1">{rel.title}</h3>
                  <p className="text-on-surface-variant mb-6">{rel.subtitle}</p>
                  <Link
                    href={`/billboard/${rel.slug}`}
                    className="block w-full text-center bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg border border-white/10 transition-colors font-bold text-sm"
                  >
                    {t("View Billboard Details", "ดูรายละเอียดป้ายนี้")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-white/10 py-24 pb-36">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div>
            <div className="text-2xl font-black tracking-tight mb-6">
              <span className="text-primary-container">Media</span><span className="text-white">108</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              {t("Leading LED billboard network in Chonburi–Pattaya EEC, connecting brands to their audience with real data.", "เครือข่ายป้าย LED ชั้นนำในพื้นที่ EEC ชลบุรี–พัทยา ช่วยแบรนด์เข้าถึงกลุ่มเป้าหมายด้วยข้อมูลจราจรจริง")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">{t("Quick Links", "ลิงก์ด่วน")}</h4>
            {([
              { en: "Privacy Policy",   th: "นโยบายความเป็นส่วนตัว", href: "/privacy-policy" },
              { en: "Terms of Service", th: "ข้อกำหนดการใช้งาน",     href: "/privacy-policy" },
              { en: "Contact Support",  th: "ติดต่อฝ่ายสนับสนุน",    href: "/contact" },
              { en: "Global Network",   th: "เครือข่ายป้ายโฆษณา",     href: "/network" },
            ] as { en: string; th: string; href: string }[]).map((l) => (
              <Link key={l.en} className="text-on-surface-variant hover:text-primary-container transition-colors text-sm" href={l.href}>{t(l.en, l.th)}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">{t("Contact", "ติดต่อ")}</h4>
            <a href="mailto:media.108.company@gmail.com" className="text-on-surface-variant hover:text-primary transition-colors text-sm">media.108.company@gmail.com</a>
            <a href="tel:+66625636199" className="text-on-surface-variant hover:text-primary transition-colors text-sm">062-563-6199</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">{t("Social", "โซเชียล")}</h4>
            <div className="flex gap-4">
              <a href="https://lin.ee/NXKWYdJ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-[#06C755] hover:text-white transition-all text-sm font-bold">LN</a>
              <a href="mailto:media.108.company@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-white transition-all text-sm font-bold">@</a>
              <a href="tel:+66625636199" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-white transition-all text-sm font-bold">☎</a>
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-xs">© 2024 Media108. {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")}</p>
          <div className="flex gap-8">
            <span className="text-on-surface-variant text-xs">GLOBAL PARTNER PROGRAM</span>
            <span className="text-on-surface-variant text-xs">ISO 27001 CERTIFIED</span>
          </div>
        </div>
      </footer>
    </>
  );
}
