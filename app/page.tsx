"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import GlobalCTABar from "./components/GlobalCTABar";
import { useLanguage } from "./context/LanguageContext";
import {
  MapPin, Umbrella, Factory, Monitor, Film, Paintbrush, CalendarDays,
  Building2, LineChart, Wand2, BadgeCheck, TrendingUp, Clock, Users,
  FileDown, Download, Phone, MessageCircle, ArrowRight, ArrowUpRight,
  Share2, Mail, type LucideIcon,
} from "lucide-react";

const featuredBillboards = [
  {
    href: "/billboard/m108-cbd-01",
    img: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1200&q=80",
    alt: "Pattaya Sukhumvit 01",
    name: "Pattaya Sukhumvit 01",
    locationEn: "Main Pattaya Route",
    locationTh: "เส้นทางหลักพัทยา",
    badge: "Available",
    badgeClass: "bg-primary/10 text-primary",
    descEn: "Clients like Love Pier Beach Cafe, Camera Hotel and Pool-Villa.com chose this billboard to reach Pattaya inbound tourists around the clock.",
    descTh: "ลูกค้าอย่าง Love Pier Beach Cafe, Camera Hotel และ Pool-Villa.com เลือกป้ายนี้เพื่อเข้าถึงนักท่องเที่ยวขาเข้าพัทยาตลอด 24 ชม.",
  },
  {
    href: "/billboard/m108-uni-42",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    alt: "Pattaya Gateway",
    name: "Pattaya Gateway",
    locationEn: "Pattaya Central Intersection",
    locationTh: "สี่แยกพัทยากลาง",
    badge: "Available",
    badgeClass: "bg-primary/10 text-primary",
    descEn: "Concert Hall, Wedding Hall, Corporate Hall and Draco campaigns all chose this spot to announce events to urban residents and families.",
    descTh: "แคมเปญ Concert Hall, Wedding Hall, Corporate Hall และ Draco ต่างเลือกจุดนี้เพื่อประกาศกิจกรรมสู่กลุ่มคนเมืองและครอบครัว",
  },
  {
    href: "/billboard/m108-air-09",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80",
    alt: "EEC Tech Square",
    name: "EEC Tech Square",
    locationEn: "Sri Racha – Industrial Estate",
    locationTh: "ศรีราชา–นิคมอุตสาหกรรม",
    badge: "High Demand",
    badgeClass: "bg-[#E63946]/20 text-[#E63946]",
    descEn: "SCC, Dev recruitment and Printing 108 chose this location to precisely target employees and executives in the EEC zone.",
    descTh: "SCC, รับสมัครพนักงาน Dev และ Printing 108 เลือกพื้นที่นี้เจาะกลุ่มพนักงานและผู้บริหารในย่าน EEC โดยตรง",
  },
];

const coverageAreas: { icon: LucideIcon; title: string; descEn: string; descTh: string }[] = [
  { icon: MapPin,   title: "Chonburi Hub",       descEn: "Key strategic locations in the city center and main business districts", descTh: "จุดยุทธศาสตร์กลางเมืองและย่านธุรกิจหลัก" },
  { icon: Umbrella, title: "Pattaya & Bang Saen", descEn: "Reach both Thai and international tourists",                           descTh: "เข้าถึงกลุ่มนักท่องเที่ยวทั้งไทยและต่างชาติ" },
  { icon: Factory,  title: "Sri Racha EEC",       descEn: "New economic zone and industrial worker demographic",                   descTh: "ย่านเศรษฐกิจใหม่และกลุ่มพนักงานอุตสาหกรรม" },
];

const stats = [
  { label: "Total Reach",  value: "2.4M+", width: "85%" },
  { label: "Daily Traffic", value: "1.2M+", width: "70%" },
  { label: "Impressions",  value: "35M+",  width: "95%" },
];

const peakTimes = [
  { time: "07:00 - 09:30 (Morning Rush)", pct: "92% Peak", width: "92%" },
  { time: "16:30 - 19:30 (Evening Rush)", pct: "95% Peak", width: "95%" },
  { time: "12:00 - 13:30 (Lunch Break)",  pct: "68% Peak", width: "68%" },
];

const audienceRatios = [
  { label: "Local Residents",          pct: "45%", barClass: "bg-primary",           width: "45%" },
  { label: "Tourists & Travelers",     pct: "35%", barClass: "bg-primary-container",  width: "35%" },
  { label: "Students & Professionals", pct: "20%", barClass: "bg-white/40",           width: "20%" },
];

const services: { icon: LucideIcon; title: string; descEn: string; descTh: string }[] = [
  { icon: Monitor,      title: "LED Billboard",    descEn: "Advertise on premium LED billboards in key locations across Chonburi and Pattaya.",                          descTh: "ลงโฆษณาบนป้าย LED คุณภาพสูงในทำเลสำคัญทั่วชลบุรีและพัทยา" },
  { icon: Film,         title: "Video Ads",         descEn: "Produce and publish video ads with brightness and color tuned for LED displays.",                           descTh: "ผลิตและลงวิดีโอโฆษณาที่ปรับจูนความสว่างและสีสันให้เหมาะกับจอ LED" },
  { icon: Paintbrush,   title: "Motion Graphic",    descEn: "Design 2D/3D motion graphics that stand out and capture attention from the street.",                       descTh: "ออกแบบภาพเคลื่อนไหว 2D/3D ให้โดดเด่นและดึงดูดสายตาจากท้องถนน" },
  { icon: CalendarDays, title: "Campaign Planning", descEn: "Plan locations, timing, and campaign formats to maximize value for your budget.",                           descTh: "วางแผนเลือกทำเล ช่วงเวลา และรูปแบบแคมเปญให้คุ้มค่า Budget ที่สุด" },
];

const whyUs: { icon: LucideIcon; title: string; descEn: string; descTh: string }[] = [
  { icon: Building2, title: "EEC Specialists",      descEn: "Deep expertise in Chonburi and the Eastern region, covering key strategic locations with high purchasing power.",                         descTh: "เชี่ยวชาญพื้นที่ชลบุรีและภาคตะวันออกอย่างลึกซึ้ง ครอบคลุมจุดยุทธศาสตร์สำคัญที่มีกำลังซื้อสูง" },
  { icon: LineChart, title: "Data-Driven Decisions", descEn: "Using real Traffic and Audience data to help clients choose the most precise locations and reduce budget waste.",                         descTh: "ใช้ข้อมูล Traffic และ Audience จริงในการช่วยลูกค้าเลือกทำเลที่แม่นยำที่สุด ลดการสูญเสียงบประมาณ" },
  { icon: Wand2,     title: "Full-Service Studio",   descEn: "A full-cycle creative production team for both Motion Graphics and Anamorphic 3D that delivers real-world impact.",                    descTh: "มีทีมผลิตสื่อโฆษณาครบวงจร ทั้ง Motion Graphics และ Anamorphic 3D ที่สร้าง Impact ได้จริง" },
];

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
    alt: "Daylight Shot",
    title: "Daylight Clarity",
    sub: "Sukhumvit Main Road",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    alt: "Night Shot",
    title: "Vibrant Night Life",
    sub: "Pattaya Central Hub",
    border: true,
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    alt: "Drone Shot",
    title: "Drone Overview",
    sub: "EEC Coverage Area",
  },
];

const steps = [
  { step: "01", titleEn: "Choose Location",  titleTh: "เลือกทำเล",     descEn: "Select the billboard or area that fits your target audience from the EEC-wide network.",                      descTh: "เลือกป้ายหรือพื้นที่ที่เหมาะกับกลุ่มเป้าหมายของคุณจาก Network ทั่ว EEC" },
  { step: "02", titleEn: "Request a Quote",  titleTh: "ขอราคา",        descEn: "Submit details to receive the best package and time slot suited to your budget.",                             descTh: "ส่งรายละเอียดเพื่อรับ Package และ Slot เวลาที่เหมาะสมกับ Budget" },
  { step: "03", titleEn: "Submit Ad Files",  titleTh: "ส่งไฟล์โฆษณา", descEn: "Upload your creative file for our team to verify quality and color standards.",                              descTh: "อัปโหลด Creative File ให้ทีมตรวจสอบความสมบูรณ์และมาตรฐานสี" },
  { step: "04", titleEn: "Launch Campaign",  titleTh: "เริ่มแคมเปญ",  descEn: "Your ad goes live on the billboard at the scheduled time, with a full campaign summary report provided.",   descTh: "โฆษณาขึ้นป้ายตามเวลาที่จอง พร้อมรับรายงานสรุปผลแคมเปญ" },
];

/* ── CountUp Component ── */
function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const tickerLocations = [
  "PATTAYA CENTRAL", "JOMTIEN BEACH", "SRI RACHA EEC", "BANG SAEN",
  "LAEM CHABANG PORT", "CHONBURI CITY", "AMATA CITY", "RAYONG",
  "PATTAYA GATEWAY", "MAP TA PHUT",
];

export default function Home() {
  const { t } = useLanguage();
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = requestAnimationFrame(() => setHeroReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Intersection Observer — Company Introduction
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIntroVisible(true); },
      { threshold: 0.15 }
    );
    if (introRef.current) observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  // Global scroll-reveal observer — watches .sr and .expand-bar elements
  useEffect(() => {
    const reveal = (el: Element) => {
      el.classList.add("visible");
      obs.unobserve(el);
    };

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); }),
      // ↓ looser: trigger as soon as 2% of element enters viewport, no bottom margin cut
      { threshold: 0.02, rootMargin: "0px 0px 60px 0px" }
    );

    const els = document.querySelectorAll<Element>(".sr, .expand-bar");
    els.forEach((el) => obs.observe(el));

    // Immediate pass — reveal anything already in the viewport on mount
    const immediate = setTimeout(() => {
      document.querySelectorAll<Element>(".sr:not(.visible), .expand-bar:not(.visible)")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
        });
    }, 80);

    return () => { obs.disconnect(); clearTimeout(immediate); };
  }, []);

  // Zoom-breathe + smooth-lerp parallax — "sucked-in" feel
  useEffect(() => {
    let animId: number;
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 22;
      targetY = (e.clientY / window.innerHeight - 0.5) * 22;
    };

    const tick = () => {
      // Smooth lerp — mouse position catches up with 6% per frame (feels weighty)
      curX += (targetX - curX) * 0.055;
      curY += (targetY - curY) * 0.055;

      if (heroImgRef.current) {
        const t = Date.now() / 1000;
        // Slow zoom breathe: 1.05 → 1.16 over ~9 s cycle
        const zoom = 1.05 + (Math.sin(t * 0.35) * 0.5 + 0.5) * 0.11;
        heroImgRef.current.style.transform =
          `scale(${zoom.toFixed(4)}) translate(${curX.toFixed(2)}px, ${curY.toFixed(2)}px)`;
      }
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <Navbar activePage="home" />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">

        {/* ── Background Layer ── */}
        <div className="absolute inset-0 z-0">

          {/* ── TV Power-On Wrapper ──
               clip-path starts as a razor-thin center line and expands
               to fill the entire screen, with brightness/saturation shift  */}
          <div
            className="absolute inset-0"
            style={{
              animation: "tv-expand 2.2s cubic-bezier(0.16,1,0.3,1) 0.25s both",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={heroImgRef}
              alt="ป้าย LED Media108 กลางคืน – Pattaya Sukhumvit DOOH Billboard"
              className="w-full h-full object-cover"
              style={{ willChange: "transform" }}
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 hero-gradient" />

            {/* Dot-matrix overlay — billboard pixel feel */}
            <div className="absolute inset-0 hero-dot-matrix pointer-events-none" />

            {/* Ambient glow orb — pulsing red radial */}
            <div className="absolute inset-0 hero-glow-orb pointer-events-none" />

            {/* ══════════════════════════════════════════
                3D VOLUMETRIC LIGHT SYSTEM
                Layer order (back → front):
                  1. Cool depth haze     — receding background
                  2. Warm billboard src  — LED panel light source
                  3. Chromatic corners   — RGB depth fringe
                  4. Volumetric rays     — god-ray cones
                  5. Edge bloom          — LED border bleed
                  6. Floating dust       — particles in the beam
            ══════════════════════════════════════════ */}

            {/* ── Layer 1: Cool depth haze (left) — things far away are blue ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 100% 70% at 4% 55%, rgba(8,18,72,0.55) 0%, transparent 58%)",
              }}
            />

            {/* ── Layer 2a: Primary warm light source — billboard panel (upper right) ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 85% at 88% 36%, rgba(230,57,70,0.28) 0%, rgba(200,50,70,0.10) 40%, transparent 58%)",
                animation: "atmos-drift 9s ease-in-out infinite",
              }}
            />

            {/* ── Layer 2b: Secondary warm fill — mid-scene spill ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 48% 55% at 60% 65%, rgba(255,85,40,0.13) 0%, transparent 62%)",
                animation: "atmos-drift 14s ease-in-out 5s infinite",
              }}
            />

            {/* ── Layer 2c: Cyan accent — opposite color for RGB depth ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 38% 42% at 12% 78%, rgba(0,185,220,0.09) 0%, transparent 65%)",
                animation: "atmos-drift 18s ease-in-out 8s infinite",
              }}
            />

            {/* ── Layer 3: Chromatic corner fringe (RGB depth cue) ── */}
            {/* Top-left: blue cast — deepest in scene */}
            <div
              className="absolute top-0 left-0 pointer-events-none"
              style={{
                width: "50%", height: "50%",
                background:
                  "radial-gradient(ellipse at top left, rgba(20,100,255,0.08) 0%, transparent 65%)",
              }}
            />
            {/* Bottom-right: red cast — closest to light source */}
            <div
              className="absolute bottom-0 right-0 pointer-events-none"
              style={{
                width: "42%", height: "42%",
                background:
                  "radial-gradient(ellipse at bottom right, rgba(255,45,75,0.11) 0%, transparent 65%)",
              }}
            />

            {/* ── Layer 4a: Volumetric Ray — primary cone from billboard ── */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 0,
                right: "7%",
                width: "52%",
                height: "100%",
                background:
                  "linear-gradient(168deg, rgba(255,95,65,0.11) 0%, rgba(230,57,70,0.07) 28%, transparent 62%)",
                transformOrigin: "top right",
                animation: "vol-ray-breathe 7s ease-in-out infinite",
                mixBlendMode: "screen",
              }}
            />

            {/* ── Layer 4b: Volumetric Ray — secondary softer cone ── */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 0,
                right: "23%",
                width: "40%",
                height: "88%",
                background:
                  "linear-gradient(155deg, rgba(255,55,88,0.06) 0%, rgba(180,38,60,0.03) 42%, transparent 72%)",
                transformOrigin: "top center",
                animation: "vol-ray-breathe 11s ease-in-out 3.5s infinite",
                mixBlendMode: "screen",
              }}
            />

            {/* ── Layer 5a: Billboard edge bloom — wide soft spread ── */}
            <div
              className="absolute top-0 right-0 bottom-0 pointer-events-none"
              style={{
                width: "100px",
                background:
                  "linear-gradient(270deg, rgba(230,57,70,0.20) 0%, rgba(200,50,70,0.08) 50%, transparent 100%)",
                animation: "edge-bloom 4.5s ease-in-out infinite",
              }}
            />

            {/* ── Layer 5b: Billboard edge bloom — sharp bright line ── */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "6%",
                right: 0,
                bottom: "6%",
                width: "3px",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(255,100,80,0.7) 22%, rgba(255,235,180,0.95) 50%, rgba(255,100,80,0.7) 78%, transparent 100%)",
                filter: "blur(3px)",
                animation: "edge-bloom 3s ease-in-out 0.6s infinite",
              }}
            />

            {/* ── Layer 6: Floating dust particles in the light beam ── */}
            {(
              [
                { left: "34%", bottom: "11%", size: 2.0, delay: 0.0, dur: 4.2, anim: "dust-rise-r", warm: true  },
                { left: "61%", bottom: "17%", size: 1.5, delay: 1.3, dur: 5.1, anim: "dust-rise-l", warm: false },
                { left: "75%", bottom: "7%",  size: 2.5, delay: 0.7, dur: 3.8, anim: "dust-rise-r", warm: true  },
                { left: "48%", bottom: "23%", size: 1.0, delay: 2.2, dur: 6.3, anim: "dust-rise-l", warm: true  },
                { left: "84%", bottom: "27%", size: 2.0, delay: 1.9, dur: 4.7, anim: "dust-rise-r", warm: false },
                { left: "23%", bottom: "15%", size: 1.5, delay: 3.1, dur: 5.5, anim: "dust-rise-l", warm: false },
                { left: "68%", bottom: "5%",  size: 1.8, delay: 0.4, dur: 4.9, anim: "dust-rise-r", warm: true  },
              ] as const
            ).map((p, i) => (
              <div
                key={`dust-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: p.left,
                  bottom: p.bottom,
                  width:  `${p.size}px`,
                  height: `${p.size}px`,
                  background: p.warm
                    ? "rgba(255,165,100,0.95)"
                    : "rgba(175,220,255,0.90)",
                  boxShadow: p.warm
                    ? `0 0 ${p.size * 5}px ${p.size * 2}px rgba(255,100,45,0.65)`
                    : `0 0 ${p.size * 5}px ${p.size * 2}px rgba(90,180,255,0.55)`,
                  animation: `${p.anim} ${p.dur}s ease-out ${p.delay}s infinite`,
                }}
              />
            ))}

            {/* ── Lens-Pull Vignette — edges close in like a gravity well ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 62% 62% at 50% 50%, transparent 0%, rgba(6,17,51,0.78) 100%)",
                animation: "vignette-pulse 9s ease-in-out infinite",
              }}
            />

            {/* ── Center Lure — glowing focal node that draws the eye inward ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 32% 32% at 50% 50%, rgba(255,210,190,0.10) 0%, transparent 70%)",
                animation: "center-lure 9s ease-in-out infinite",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* ── TV Static Noise ── flickers fast at startup, then gone */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 4px), " +
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 6px)",
              animation: "tv-static-flicker 2.4s ease-out 0.25s both",
              zIndex: 5,
            }}
          />

          {/* ── TV Black Vignette ── lifts off as screen expands */}
          <div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{
              animation: "tv-black-lift 2.2s cubic-bezier(0.16,1,0.3,1) 0.25s both",
              zIndex: 4,
            }}
          />

          {/* ── TV Center Flash Line ── bright horizontal line at startup */}
          <div
            className="absolute inset-x-0 top-1/2 pointer-events-none"
            style={{
              height: "3px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(200,220,255,0.8) 15%, white 50%, rgba(200,220,255,0.8) 85%, transparent 100%)",
              boxShadow:
                "0 0 18px 6px rgba(255,255,255,0.7), 0 0 50px 16px rgba(180,210,255,0.35)",
              animation: "tv-line-flash 2.0s cubic-bezier(0.16,1,0.3,1) 0.25s both",
              transformOrigin: "center",
              zIndex: 6,
            }}
          />

          {/* LED scan line — sweeps top→bottom like a display refresh (starts after TV turns on) */}
          <div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              top: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(230,57,70,0.15) 15%, rgba(255,255,255,0.55) 50%, rgba(230,57,70,0.15) 85%, transparent 100%)",
              boxShadow: "0 0 10px 1px rgba(230,57,70,0.4)",
              animation: "led-scan 5s cubic-bezier(0.4,0,0.6,1) 2.4s infinite",
              zIndex: 3,
            }}
          />
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-desktop py-24 flex flex-col items-center text-center">

          {/* Badge with broadcast signal rings */}
          <div
            className="relative inline-flex items-center mb-8"
            style={{
              animation: heroReady ? "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) both" : "none",
            }}
          >
            {/* Signal rings emanating from badge */}
            <span
              className="absolute inset-0 rounded-full border border-primary/50 pointer-events-none"
              style={{ animation: "broadcast-ring 2.4s ease-out 1.2s infinite" }}
            />
            <span
              className="absolute inset-0 rounded-full border border-primary/30 pointer-events-none"
              style={{ animation: "broadcast-ring 2.4s ease-out 1.8s infinite" }}
            />
            <div className="bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2.5 relative z-10">
              {/* Live broadcast dot */}
              <span
                className="w-2 h-2 rounded-full bg-[#E63946] block flex-shrink-0"
                style={{ animation: "live-blink 1.6s ease-in-out infinite" }}
              />
              <span className="text-primary font-label-md text-label-md tracking-widest uppercase">
                {t("Eastern Economic Corridor Pioneer", "ผู้บุกเบิก Eastern Economic Corridor")}
              </span>
            </div>
          </div>

          {/* H1 — staggered entrance */}
          <h1
            className="font-display-lg text-display-lg mb-8 max-w-4xl text-on-surface"
            style={{
              animation: heroReady
                ? "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both"
                : "none",
            }}
          >
            {t("Premium Digital Advertising in", "โฆษณาดิจิทัลพรีเมียมใน")}{" "}
            <span className="text-primary-container">{t("Chonburi's Prime Locations", "ทำเลชั้นนำของชลบุรี")}</span>
          </h1>

          {/* Description */}
          <p
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12"
            style={{
              animation: heroReady
                ? "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both"
                : "none",
            }}
          >
            {t(
              "Media108 is a LED & Digital Out-of-Home advertising platform that helps brands reach their target audience through verified locations, real data, and measurable campaigns.",
              "Media108 คือแพลตฟอร์มสื่อโฆษณา LED และ Digital Out-of-Home ที่ช่วยให้แบรนด์เข้าถึงกลุ่มเป้าหมายผ่านทำเลจริง ข้อมูลจริง และแคมเปญที่วัดผลได้"
            )}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6"
            style={{
              animation: heroReady
                ? "hero-scale-in 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both"
                : "none",
            }}
          >
            <Link
              href="/contact#form"
              className="bg-[#E63946] text-white px-8 py-4 rounded-lg font-label-md text-label-md glow-button flex items-center justify-center transition-all hover:-translate-y-0.5 active:scale-95"
              style={{ transition: "transform 150ms ease, box-shadow 150ms ease" }}
            >
              {t("Request Quotation", "ขอใบเสนอราคา")}{" "}
              <ArrowRight size={16} className="ml-2 inline" />
            </Link>
            <Link
              href="/network"
              className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-white/10 active:scale-95"
              style={{ transition: "all 200ms ease" }}
            >
              {t("View All Locations", "ดูทำเลทั้งหมด")}
            </Link>
          </div>
        </div>

        {/* ── Location Ticker Bar ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/5"
          style={{
            background: "rgba(6,17,51,0.6)",
            backdropFilter: "blur(8px)",
            animation: heroReady ? "hero-entry 0.6s ease-out 0.7s both" : "none",
          }}
        >
          <div className="flex items-center gap-0 py-2.5 px-4">
            {/* "ON AIR" badge */}
            <div className="flex items-center gap-1.5 flex-shrink-0 mr-4 pr-4 border-r border-white/10">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#E63946]"
                style={{ animation: "live-blink 1.2s ease-in-out infinite" }}
              />
              <span className="text-[10px] font-bold tracking-[0.18em] text-[#E63946] uppercase">
                On Air
              </span>
            </div>
            {/* Scrolling locations — doubled for seamless loop */}
            <div className="overflow-hidden flex-1">
              <div
                className="flex gap-0 whitespace-nowrap"
                style={{ animation: "ticker-scroll 24s linear infinite" }}
              >
                {[...tickerLocations, ...tickerLocations].map((loc, i) => (
                  <span key={i} className="inline-flex items-center gap-4 px-6">
                    <span className="text-[11px] font-bold tracking-[0.14em] text-white/60 uppercase">
                      {loc}
                    </span>
                    <span className="text-white/20 text-[8px]">◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── 2. Company Introduction ── */}
      <section
        ref={introRef}
        className="relative py-32 overflow-hidden"
        id="about"
        style={{ background: "linear-gradient(180deg, #0f193b 0%, #061133 100%)" }}
      >
        {/* Subtle grid bg */}
        <div className="absolute inset-0 network-grid-bg opacity-40 pointer-events-none" />
        {/* Ambient side glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)", transform: "translate(-30%, -50%)" }} />

        <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row gap-16 items-center">

            {/* ── Left: Text Column ── */}
            <div
              className="w-full md:w-1/2"
              style={{
                opacity: introVisible ? 1 : 0,
                transform: introVisible ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Section label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-[1px] bg-primary-container" />
                <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("About Media108", "เกี่ยวกับ Media108")}</span>
              </div>

              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-5">
                {t("Company Introduction", "แนะนำบริษัท")}
              </h2>

              {/* Animated expand bar */}
              <div
                className="h-[2px] mb-8 rounded-full origin-left"
                style={{
                  background: "linear-gradient(90deg, #E63946, #ff535b, transparent)",
                  width: introVisible ? "96px" : "0px",
                  transition: "width 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />

              <p
                className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed"
                style={{
                  opacity: introVisible ? 1 : 0,
                  transform: introVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                {t(
                  "Media108 is a digital advertising media network built for businesses in Chonburi, Pattaya, Bang Saen, Sri Racha and the EEC area. We don't just sell space on LED screens — we help brands choose the right location, understand their audience, and plan advertising effectively with a vision to elevate local media to international standards.",
                  "Media108 คือเครือข่ายสื่อโฆษณาดิจิทัลที่พัฒนาเพื่อธุรกิจในจังหวัดชลบุรี พัทยา บางแสน ศรีราชา และพื้นที่ EEC เราไม่ได้ขายเพียงพื้นที่บนจอ LED แต่ช่วยให้แบรนด์เลือกทำเลที่เหมาะสม เข้าใจกลุ่มผู้ชม และวางแผนโฆษณาได้อย่างมีประสิทธิภาพด้วยวิสัยทัศน์ที่ต้องการยกระดับสื่อท้องถิ่นสู่มาตรฐานสากล"
                )}
              </p>

              {/* Feature chips — stagger pop-in */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: BadgeCheck, labelEn: "Smart City Network",   labelTh: "เครือข่าย Smart City",        delay: "0.45s" },
                  { icon: TrendingUp, labelEn: "Data-Driven Planning", labelTh: "วางแผนด้วยข้อมูลจริง",       delay: "0.55s" },
                ].map(({ icon: Icon, labelEn, labelTh, delay }) => (
                  <div
                    key={labelEn}
                    className="group flex items-center gap-4 p-4 rounded-xl border cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(255,255,255,0.08)",
                      opacity: introVisible ? 1 : 0,
                      transform: introVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                      transition: `opacity 0.6s ease ${delay}, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}, border-color 200ms ease, background 200ms ease`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(230,57,70,0.4)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(230,57,70,0.05)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <Icon
                      size={22}
                      className="text-primary flex-shrink-0 transition-transform duration-200"
                      style={{ transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1)" }}
                      onMouseEnter={e => { (e.currentTarget as SVGElement).style.transform = "scale(1.2) rotate(-5deg)"; }}
                      onMouseLeave={e => { (e.currentTarget as SVGElement).style.transform = "scale(1) rotate(0deg)"; }}
                    />
                    <span className="text-on-surface font-label-md text-[13px]">{t(labelEn, labelTh)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Map Column ── */}
            <div
              className="w-full md:w-1/2"
              style={{
                opacity: introVisible ? 1 : 0,
                transform: introVisible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              {/* Outer glow ring */}
              <div
                className="rounded-2xl p-[1px]"
                style={{
                  background: introVisible
                    ? "linear-gradient(135deg, rgba(230,57,70,0.5) 0%, rgba(255,83,91,0.15) 40%, rgba(255,255,255,0.05) 100%)"
                    : "transparent",
                  transition: "background 1.2s ease 0.4s",
                  boxShadow: introVisible ? "0 0 40px rgba(230,57,70,0.12), 0 24px 48px rgba(0,0,0,0.4)" : "none",
                }}
              >
                <div className="rounded-2xl overflow-hidden relative" style={{ height: "380px" }}>
                  {/* Map iframe */}
                  <iframe
                    src="https://maps.google.com/maps?q=13.2399983,100.9344037&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.85) brightness(0.88)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Media108 Location"
                  />

                  {/* Top overlay — coordinates HUD */}
                  <div
                    className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, rgba(6,17,51,0.85) 0%, transparent 100%)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#E63946]"
                        style={{ animation: "live-blink 1.6s ease-in-out infinite" }}
                      />
                      <span className="text-[10px] font-bold tracking-[0.15em] text-[#E63946] uppercase">Live Location</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40 tracking-wide">
                      13.2400°N · 100.9344°E
                    </span>
                  </div>

                  {/* Bottom overlay — address */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-4 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(6,17,51,0.95) 0%, rgba(6,17,51,0.6) 60%, transparent 100%)" }}
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-on-surface font-label-md text-[13px] leading-tight">บริษัท พริ้นติ้ง 108 จำกัด</p>
                        <p className="text-on-surface-variant text-[11px] mt-0.5">Chonburi, Thailand · EEC Zone</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. Key Numbers ── */}
      <section className="py-24 relative z-10 bg-surface border-y border-border-glass overflow-hidden">
        {/* Subtle scan line accent */}
        <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(230,57,70,0.4), transparent)" }} />
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {[
              { to: 10,  suffix: "+",  labelEn: "Billboard Network",     labelTh: "เครือข่ายป้ายโฆษณา" },
              { to: 1,   suffix: "M+", labelEn: "Daily Traffic",          labelTh: "ทราฟฟิกต่อวัน" },
              { to: 100, suffix: "%",  labelEn: "EEC Coverage",            labelTh: "ครอบคลุม EEC" },
              { to: 100, suffix: "%",  labelEn: "Estimated Impression",    labelTh: "Impression โดยประมาณ" },
            ].map((stat, i) => (
              <div
                key={stat.labelEn}
                className={`sr sr-up sr-d${i + 1} text-center p-8 ${i < 3 ? "md:border-r border-white/10" : ""}`}
              >
                <div className="font-data-mono text-5xl mb-2 text-primary font-black">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="font-label-md uppercase tracking-wider text-on-surface-variant">
                  {t(stat.labelEn, stat.labelTh)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(230,57,70,0.3), transparent)" }} />
      </section>

      {/* ── 4. Featured Billboards ── */}
      <section className="bg-surface py-32 overflow-hidden" id="billboard">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="sr sr-left">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[1px] bg-primary-container" />
                <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Prime Locations", "ทำเลชั้นนำ")}</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
                {t("Featured Billboards", "ป้ายโฆษณาแนะนำ")}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t("Top billboards in strategic locations with the highest audience reach.", "ป้ายเด่นในจุดยุทธศาสตร์ที่เข้าถึงกลุ่มเป้าหมายสูงสุด")}
              </p>
            </div>
            <Link
              href="/network"
              className="sr sr-right text-primary font-label-md text-label-md border-b border-primary/20 pb-1 hover:text-white hover:border-white transition-all flex items-center group"
            >
              {t("VIEW ALL LOCATIONS", "ดูทำเลทั้งหมด")}{" "}
              <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {featuredBillboards.map((bb, i) => (
              <div key={bb.name} className={`sr sr-scale sr-d${i + 1} billboard-card group relative overflow-hidden rounded-xl glass-card`}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={bb.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={bb.img}
                  />
                  {/* Scan line overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(230,57,70,0.15) 100%)" }} />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-headline-md text-headline-md text-on-surface mb-1 group-hover:text-primary transition-colors duration-300">
                        {bb.name}
                      </h4>
                      <span className="text-on-surface-variant font-label-md text-label-md">
                        {t(bb.locationEn, bb.locationTh)}
                      </span>
                    </div>
                    <span className={`${bb.badgeClass} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                      {bb.badge}
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">{t(bb.descEn, bb.descTh)}</p>
                  <Link
                    href={bb.href}
                    className="block w-full py-3 bg-white/5 hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-lg font-label-md text-center group-hover:shadow-lg"
                    style={{ transition: "all 250ms cubic-bezier(0.34,1.56,0.64,1)" }}
                  >
                    {t("View Detail", "ดูรายละเอียด")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Coverage Area Map ── */}
      <section className="bg-surface-container-low py-32 border-t border-border-glass" id="network">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="sr sr-left mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-[1px] bg-primary-container" />
                  <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Network Coverage", "ขอบเขตเครือข่าย")}</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
                  {t("Coverage Area Map", "แผนที่พื้นที่ครอบคลุม")}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {t(
                    "The Media108 network covers key routes in Chonburi province — from tourist zones and education zones to business corridors. We select only locations with the best visibility.",
                    "เครือข่าย Media108 ครอบคลุมเส้นทางสำคัญในจังหวัดชลบุรี ตั้งแต่โซนท่องเที่ยว โซนการศึกษา ไปจนถึงเส้นทางธุรกิจ เราคัดเลือกจุดที่การมองเห็นดีที่สุด"
                  )}
                </p>
              </div>
              <div className="space-y-6">
                {coverageAreas.map((area, i) => (
                  <div
                    key={area.title}
                    className={`sr sr-left sr-d${i + 2} flex items-center gap-4 p-5 glass-card rounded-lg hover:bg-primary/5 transition-colors cursor-pointer group`}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 group-hover:scale-110">
                      <area.icon size={20} />
                    </div>
                    <div>
                      <h5 className="font-headline-md text-primary text-xl">{area.title}</h5>
                      <p className="text-on-surface-variant text-sm">{t(area.descEn, area.descTh)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sr sr-right relative aspect-square bg-[#0a1538] rounded-2xl border-4 border-surface-container shadow-2xl overflow-hidden flex flex-col items-center justify-center p-12 text-center group">
              <div className="absolute inset-0 opacity-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Map Data Overlay"
                  className="w-full h-full object-cover grayscale brightness-50"
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80"
                />
              </div>
              <div className="absolute top-1/4 left-1/3 animate-bounce">
                <MapPin size={48} className="text-[#E63946]" />
              </div>
              <div
                className="absolute top-1/2 right-1/4 animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <MapPin size={48} className="text-primary" />
              </div>
              <div
                className="absolute bottom-1/3 left-1/2 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <MapPin size={48} className="text-white" />
              </div>
              <div className="relative z-10 p-8 glass-card rounded-2xl">
                <h4 className="font-headline-md text-white mb-6">{t("Interactive Network Map", "แผนที่เครือข่ายแบบอินเทอร์แอคทีฟ")}</h4>
                <p className="text-on-surface-variant mb-8 text-sm">
                  {t("Explore our dynamic billboard network across the EEC region in high definition.", "สำรวจเครือข่ายป้ายโฆษณาไดนามิกทั่วพื้นที่ EEC ในความละเอียดสูง")}
                </p>
                <button className="px-10 py-4 bg-[#E63946] text-white rounded-lg font-label-md text-label-md hover:bg-white hover:text-[#E63946] transition-all transform hover:scale-105 shadow-xl">
                  {t("Launch Fullscreen Viewer", "เปิดในโหมดเต็มจอ")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Audience & Traffic ── */}
      <section className="bg-surface-container-highest py-32">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="sr sr-up text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Data Insights", "ข้อมูลเชิงลึก")}</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
              {t("Audience & Traffic", "ผู้ชม & ทราฟฟิก")}
            </h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-[#E63946] to-transparent mx-auto rounded-full" />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-8">
              {t(
                "Reach and Traffic statistics that help brands choose media precisely aligned with their target audience.",
                "สถิติ Reach และ Traffic รวม ที่ช่วยให้แบรนด์เลือกสื่อได้ตรงกับกลุ่มเป้าหมายอย่างแม่นยำ"
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-20">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`sr sr-scale sr-d${i + 1} glass-card p-10 rounded-2xl text-center border-b-4 border-b-primary/50 hover:border-b-primary transition-colors duration-300`}
              >
                <p className="text-primary font-label-md uppercase tracking-widest mb-4">{s.label}</p>
                <div className="font-data-mono text-6xl text-white mb-6">{s.value}</div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full progress-bar" style={{ width: s.width }} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="sr sr-left glass-card p-10 rounded-2xl">
              <h4 className="font-headline-md text-on-surface mb-8 flex items-center gap-3">
                <Clock size={20} className="text-primary" /> {t("Peak Traffic Times", "ช่วงเวลาทราฟฟิกพีค")}
              </h4>
              <div className="space-y-8">
                {peakTimes.map((row, i) => (
                  <div key={row.time} className={`sr sr-up sr-d${i + 1}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-on-surface-variant font-body-md">{row.time}</span>
                      <span className="text-primary font-bold">{row.pct}</span>
                    </div>
                    <div className="bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full progress-bar" style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sr sr-right glass-card p-10 rounded-2xl">
              <h4 className="font-headline-md text-on-surface mb-8 flex items-center gap-3">
                <Users size={20} className="text-primary" /> {t("Audience Ratio", "สัดส่วนผู้ชม")}
              </h4>
              <div className="space-y-6">
                {audienceRatios.map((row, i) => (
                  <div key={row.label} className={`sr sr-up sr-d${i + 1}`}>
                    <div className="flex justify-between mb-3">
                      <span className="text-on-surface-variant font-body-md">{row.label}</span>
                      <span className="text-white font-bold">{row.pct}</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div className={`${row.barClass} h-full progress-bar`} style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="sr sr-up sr-d4 mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-on-surface-variant">{t("Data verified by Media108 Analytics Q4 2023", "ข้อมูลตรวจสอบโดย Media108 Analytics Q4 2023")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Services Overview ── */}
      <section className="bg-surface-container py-32" id="services">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="sr sr-up mb-16 text-center md:text-left">
            <div className="flex items-center gap-2 md:justify-start justify-center mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("What We Do", "สิ่งที่เราทำ")}</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">{t("Services Overview", "ภาพรวมบริการ")}</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-[#E63946] to-transparent rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {services.map((svc, i) => (
              <div key={svc.title}
                className={`sr sr-scale sr-d${i + 1} glass-card p-10 rounded-xl hover:bg-primary/5 transition-all duration-300 border-t-2 border-t-transparent hover:border-t-primary group cursor-default`}>
                <svc.icon size={44} className="service-icon-hover text-primary mb-6 block transition-colors duration-300" />
                <h4 className="font-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">{svc.title}</h4>
                <p className="text-on-surface-variant font-body-md">{t(svc.descEn, svc.descTh)}</p>
              </div>
            ))}
          </div>
          <div className="sr sr-up sr-d5 mt-16 flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/services"
              className="bg-[#E63946] text-white px-12 py-5 rounded-lg font-label-md shadow-xl hover:bg-[#d1323f] hover:-translate-y-0.5 transition-all text-center"
              style={{ transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)" }}>
              {t("View All Services", "ดูบริการทั้งหมด")}
            </Link>
            <Link href="/contact#form"
              className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-lg font-label-md hover:bg-white/5 hover:border-white/40 transition-all text-center">
              {t("Consult Our Sales Team", "ปรึกษาแคมเปญกับทีมขาย")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Why Media108 ── */}
      <section className="bg-surface py-32 border-y border-border-glass">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="sr sr-up text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Our Edge", "จุดเด่นของเรา")}</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">{t("Why Media108", "ทำไมต้อง Media108")}</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full mx-auto" />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-8 leading-relaxed">
              {t(
                "We make outdoor advertising not just about choosing a visible sign, but about selecting precise locations and media using data and technology.",
                "เราช่วยให้การลงโฆษณากลางแจ้งไม่ใช่แค่การเลือกป้ายที่มองเห็นง่าย แต่เป็นการเลือกทำเลและสื่อที่แม่นยำด้วยข้อมูลและเทคโนโลยี"
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {whyUs.map((item, i) => (
              <div key={item.title}
                className={`sr sr-scale sr-d${i + 1} glass-card p-12 rounded-xl border-l-4 border-l-primary/30 hover:border-l-primary transition-all duration-500 shadow-lg group cursor-default`}>
                <item.icon size={44} className="service-icon-hover text-primary-container mb-8 block transition-colors duration-300 group-hover:text-primary" />
                <h4 className="font-headline-md text-on-surface mb-6 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{t(item.descEn, item.descTh)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Photo Gallery ── */}
      <section className="bg-surface-container-lowest py-32">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="sr sr-up mb-16 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("On Location", "ณ ทำเล")}</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">{t("Photo Gallery", "แกลเลอรีภาพถ่าย")}</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full mx-auto" />
            <p className="font-body-md text-on-surface-variant mt-6">
              {t(
                "Experience the real atmosphere of billboard locations in the Media108 network, both day and night.",
                "สัมผัสบรรยากาศจริงของทำเลป้ายในเครือข่าย Media108 ทั้งช่วงกลางวันและกลางคืน"
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallery.map((photo, i) => (
              <div key={photo.alt}
                className={`sr sr-scale sr-d${i + 1} relative group overflow-hidden rounded-xl aspect-[4/5] shadow-2xl ${photo.border ? "border-2 border-primary/20" : ""}`}
                style={{ transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.12}s` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src={photo.src} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-headline-md mb-1">{photo.title}</p>
                    <p className="text-primary font-label-md text-xs uppercase tracking-widest">{photo.sub}</p>
                  </div>
                </div>
                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. How to Buy Ads ── */}
      <section className="bg-surface-container py-32 border-t border-border-glass">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="sr sr-up mb-20 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-5 h-[1px] bg-primary-container" />
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Get Started", "เริ่มต้น")}</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">{t("How to Buy Ads", "วิธีลงโฆษณา")}</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full mx-auto" />
            <p className="text-on-surface-variant mt-8 font-body-lg">
              {t("Simple steps to start your digital advertising campaign with us.", "ขั้นตอนง่ายๆ ในการเริ่มแคมเปญโฆษณาดิจิทัลกับเรา")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {steps.map((s, i) => (
              <div key={s.step}
                className={`sr sr-up sr-d${i + 1} relative z-10 p-8 glass-card rounded-xl hover:border-primary/50 transition-all group`}>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
                )}
                <div className="step-number font-display-lg text-8xl leading-none mb-4 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                  {s.step}
                </div>
                <h4 className="font-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">{t(s.titleEn, s.titleTh)}</h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{t(s.descEn, s.descTh)}</p>
              </div>
            ))}
          </div>
          <div className="sr sr-scale sr-d5 mt-20 flex justify-center">
            <Link href="/contact#form"
              className="px-16 py-6 bg-[#E63946] text-white rounded-lg font-label-md text-label-md glow-button transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-2xl uppercase tracking-widest"
              style={{ transition: "all 250ms cubic-bezier(0.34,1.56,0.64,1)" }}>
              {t("Book a Billboard Now", "เริ่มจองป้ายเลย")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. Media Kit CTA ── */}
      <section className="bg-primary-container py-24 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        {/* Floating icon */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"
          style={{ animation: "spin-slow 20s linear infinite" }}>
          <FileDown size={350} className="text-white rotate-12" />
        </div>
        {/* Shimmer strip */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />
        <div className="max-w-container-max mx-auto px-margin-desktop text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="sr sr-left max-w-2xl">
            <div className="flex items-center gap-2 mb-4 md:justify-start justify-center">
              <span
                className="w-1.5 h-1.5 rounded-full bg-white"
                style={{ animation: "live-blink 1.6s ease-in-out infinite" }}
              />
              <span className="text-white/70 font-label-md text-[11px] tracking-[0.2em] uppercase">{t("Free Download", "ดาวน์โหลดฟรี")}</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6">{t("Download Our Media Kit", "ดาวน์โหลด Media Kit ของเรา")}</h2>
            <p className="text-white/90 font-body-lg leading-relaxed">
              {t(
                "Want detailed location information, pricing, packages, and audience statistics? Download our Media Kit or request a custom quotation designed specifically for your business.",
                "ต้องการดูรายละเอียดทำเล ราคา แพ็กเกจ และข้อมูลสถิติผู้ชมอย่างละเอียด ดาวน์โหลด Media Kit หรือขอใบเสนอราคาที่ออกแบบเฉพาะสำหรับธุรกิจของคุณ"
              )}
            </p>
          </div>
          <div className="sr sr-right sr-d2 flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <Link href="/media-kit"
              className="bg-white text-primary-container px-12 py-5 rounded-lg font-label-md text-label-md font-bold flex items-center justify-center shadow-2xl hover:-translate-y-1 active:scale-95"
              style={{ transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)" }}>
              <Download size={18} className="mr-3 inline" /> {t("DOWNLOAD MEDIA KIT", "ดาวน์โหลด MEDIA KIT")}
            </Link>
            <Link href="/contact#form"
              className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-lg font-label-md text-label-md font-bold hover:bg-white/10 active:scale-95 text-center hover:-translate-y-0.5"
              style={{ transition: "all 200ms ease" }}>
              {t("REQUEST QUOTATION", "ขอใบเสนอราคา")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 12. Contact & Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-32 pb-32" id="contact">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          {/* Contact block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
            <div className="sr sr-left">
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8">{t("Get In Touch", "ติดต่อเรา")}</h2>
              <p className="text-on-surface-variant font-body-lg mb-12">
                {t(
                  "We're ready to be your advertising media partner to help drive your campaign to success. Contact us for a free consultation.",
                  "เราพร้อมเป็นพาร์ทเนอร์สื่อโฆษณาที่จะช่วยขับเคลื่อนแคมเปญของคุณให้ประสบความสำเร็จ ติดต่อเราเพื่อรับคำปรึกษาฟรี"
                )}
              </p>
              <div className="space-y-8">
                <a href="tel:+66625636199" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary border border-border-glass group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      {t("Phone Number", "เบอร์โทรศัพท์")}
                    </p>
                    <p className="text-xl text-on-surface font-headline-md">062-563-6199</p>
                  </div>
                </a>
                <a href="mailto:media.108.company@gmail.com" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary border border-border-glass group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      {t("Email", "อีเมล")}
                    </p>
                    <p className="text-xl text-on-surface font-headline-md">media.108.company@gmail.com</p>
                  </div>
                </a>
                <a href="https://lin.ee/NXKWYdJ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-[#06C755] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      {t("Line Official", "LINE Official")}
                    </p>
                    <p className="text-xl text-on-surface font-headline-md">@media108</p>
                  </div>
                </a>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary border border-border-glass">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      {t("Head Office", "สำนักงานใหญ่")}
                    </p>
                    <p className="text-on-surface font-body-md">{t("Chonburi City, Thailand 20000", "ชลบุรี, ประเทศไทย 20000")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-10 rounded-2xl shadow-2xl border-t-4 border-t-[#E63946]">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                      {t("Name", "ชื่อ")}
                    </label>
                    <input
                      className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                      placeholder={t("Your Name", "ชื่อของคุณ")}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                      {t("Email", "อีเมล")}
                    </label>
                    <input
                      className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                      placeholder={t("Email Address", "ที่อยู่อีเมล")}
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                    {t("Company", "บริษัท")}
                  </label>
                  <input
                    className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                    placeholder={t("Company Name", "ชื่อบริษัท")}
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                    {t("Message", "ข้อความ")}
                  </label>
                  <textarea
                    className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                    placeholder={t("Tell us about your campaign...", "บอกเราเกี่ยวกับแคมเปญของคุณ...")}
                    rows={4}
                  ></textarea>
                </div>
                <button
                  className="w-full bg-[#E63946] text-white py-4 rounded-lg font-label-md text-label-md hover:bg-[#d1323f] transition-all shadow-xl"
                  type="submit"
                >
                  {t("SEND MESSAGE", "ส่งข้อความ")}
                </button>
              </form>
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-20 border-t border-border-glass pt-20">
            <div className="md:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Media108 Logo"
                className="h-10 w-auto mb-8"
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80"
              />
              <p className="text-on-surface-variant font-body-md pr-12 leading-relaxed">
                {t(
                  "Leading the digital outdoor revolution in the Eastern Economic Corridor. Precision media solutions driven by data and impact.",
                  "ผู้นำการปฏิวัติสื่อดิจิทัลกลางแจ้งใน Eastern Economic Corridor โซลูชันสื่อแม่นยำขับเคลื่อนด้วยข้อมูลและผลกระทบ"
                )}
              </p>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">
                {t("Navigation", "นำทาง")}
              </h6>
              <ul className="space-y-4">
                {([
                  { en: "Home",         th: "หน้าหลัก",     href: "/" },
                  { en: "Media Network",th: "เครือข่ายสื่อ", href: "/network" },
                  { en: "Our Services", th: "บริการของเรา",  href: "/services" },
                  { en: "Contact Us",   th: "ติดต่อเรา",     href: "/contact" },
                ] as { en: string; th: string; href: string }[]).map(({ en, th, href }) => (
                  <li key={en}>
                    <Link
                      href={href}
                      className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
                    >
                      {t(en, th)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">
                {t("Media Focus", "จุดเน้นสื่อ")}
              </h6>
              <ul className="space-y-4">
                {([
                  { en: "Pattaya Digital Hub",  th: "พัทยา ดิจิทัล ฮับ" },
                  { en: "Chonburi Strategic",   th: "ชลบุรี สตราทีจิค" },
                  { en: "Bang Saen Network",    th: "เครือข่ายบางแสน" },
                  { en: "EEC Industrial Belt",  th: "เขต EEC อุตสาหกรรม" },
                ] as { en: string; th: string }[]).map(({ en, th }) => (
                  <li key={en}>
                    <a
                      href="#"
                      className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
                    >
                      {t(en, th)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">
                {t("Connect", "ติดต่อ")}
              </h6>
              <div className="flex gap-4 mb-8">
                {[Share2, Mail].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-on-surface hover:text-on-primary"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
              <div className="p-4 bg-surface-container-high rounded-lg border border-border-glass">
                <p className="text-[11px] font-label-md text-on-surface-variant uppercase mb-2">
                  {t("Subscribe to Media Kit Updates", "รับอัปเดต Media Kit")}
                </p>
                <div className="flex gap-2">
                  <input
                    className="bg-transparent border border-white/10 rounded px-3 py-2 text-sm focus:border-primary outline-none flex-1"
                    placeholder="Email"
                    type="email"
                  />
                  <button className="bg-primary-container text-on-primary-container px-3 rounded hover:opacity-90 flex items-center justify-center">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border-glass flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-on-surface-variant font-label-md text-sm">
              © 2024 MEDIA108. {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")} Precision DOOH Media Solutions.
            </div>
            <div className="flex items-center gap-6 text-on-surface-variant font-label-md text-sm">
              <span>
                Region: <span className="text-on-surface font-bold">TH-EEC</span>
              </span>
              <span className="flex items-center gap-2">
                {t("Status", "สถานะ")}: <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>{" "}
                {t("Optimal", "ปกติ")}
              </span>
            </div>
          </div>
        </div>
      </footer>

      <GlobalCTABar />
    </>
  );
}
