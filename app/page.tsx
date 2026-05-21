"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import GlobalCTABar from "./components/GlobalCTABar";

const featuredBillboards = [
  {
    href: "/billboard/m108-cbd-01",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uiRggagh43z7tF_b4GZSla0gM2WVOSYRBw_4VzR4zG24G6WN_uepsl4bNBLG4Dj5qd8f18qX-awS_UjTRJ_0je-cAF7Dh8f4LXWtvYoVKGKNk9nhGHtOnN2gRnZQLzeUGSheeywVeXTiXVupHpuQCubssjTlYWgMSD0vy9bLQUOqSHUUi3oYPH_DAnmArcxI6g2sJGJmgrXHaFGJO_15K9jHNujqO8CGPnum6LtYnkU3kvh0aWzsXnRpd4",
    alt: "Pattaya Sukhumvit 01",
    name: "Pattaya Sukhumvit 01",
    location: "เส้นทางหลักพัทยา",
    badge: "Available",
    badgeClass: "bg-primary/10 text-primary",
    desc: "ลูกค้าอย่าง Love Pier Beach Cafe, Camera Hotel และ Pool-Villa.com เลือกป้ายนี้เพื่อเข้าถึงนักท่องเที่ยวขาเข้าพัทยาตลอด 24 ชม.",
  },
  {
    href: "/billboard/m108-uni-42",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uhFWwvThcMEI0OTDgPROsXUAO8-XrH4HNZNulN_QNQsaXXPr5qVRuhPVttKD0J8jA4l_3CWmw6w_yoeHsw9OjJmNki4b7TnQbxHlr9DbRjnPkZD3eyffI2k8xqN89sV_PGGovO92gvbgBD-einyVORlR1R7yZHBhfiOgOYz1vVo5ZqGgTDont9GP9W8dFFBSC-19frrVEDYUUJ3KB8b2PdWU7WcG_DLNXZGW-9hQqBKhz1XUET_lzctKdE",
    alt: "Pattaya Gateway",
    name: "Pattaya Gateway",
    location: "สี่แยกพัทยากลาง",
    badge: "Available",
    badgeClass: "bg-primary/10 text-primary",
    desc: "แคมเปญ Concert Hall, Wedding Hall, Corporate Hall และ Draco ต่างเลือกจุดนี้เพื่อประกาศกิจกรรมสู่กลุ่มคนเมืองและครอบครัว",
  },
  {
    href: "/billboard/m108-air-09",
    img: "https://lh3.googleusercontent.com/aida/ADBb0uiRggagh43z7tF_b4GZSla0gM2WVOSYRBw_4VzR4zG24G6WN_uepsl4bNBLG4Dj5qd8f18qX-awS_UjTRJ_0je-cAF7Dh8f4LXWtvYoVKGKNk9nhGHtOnN2gRnZQLzeUGSheeywVeXTiXVupHpuQCubssjTlYWgMSD0vy9bLQUOqSHUUi3oYPH_DAnmArcxI6g2sJGJmgrXHaFGJO_15K9jHNujqO8CGPnum6LtYnkU3kvh0aWzsXnRpd4",
    alt: "EEC Tech Square",
    name: "EEC Tech Square",
    location: "ศรีราชา–นิคมอุตสาหกรรม",
    badge: "High Demand",
    badgeClass: "bg-[#E63946]/20 text-[#E63946]",
    desc: "SCC, รับสมัครพนักงาน Dev และ Printing 108 เลือกพื้นที่นี้เจาะกลุ่มพนักงานและผู้บริหารในย่าน EEC โดยตรง",
  },
];

/* ── Recent Campaigns — real clients ── */
const campaignRow1 = [
  "Love Pier Beach Cafe", "เครื่องเล่น Flow Rider", "ตลาดบุญเครือ", "U Cafe",
  "รับสมัครพนักงาน SCC", "โฆษณา SCC เพื่อสังคม", "กิจกรรมแข่งหมากรุก",
  "กิจกรรมแข่งเปียโน & กีตาร์", "รับสมัครพนักงาน Dev", "รีสอร์ทเกาะสีชัง",
  "ร้านกาแฟเกาะสีชัง", "ไหว้พระเกาะสีชัง", "Pool-Villa.com",
  "Concert Hall", "Wedding Hall", "Corporate Hall", "Camera Cafe", "Camera Hotel",
];
const campaignRow2 = [
  "Printing 108", "รับพัฒนาโปรแกรม", "อพาร์ทเมนท์ 3,500฿", "โรงแรมแหม่ม",
  "Pattaya.com", "Chonburi108.com", "Ai News", "Three Bed Room",
  "ข้าวมันไก่ Love Pier", "Media 108", "ร้านหมูแดงกิ๊ว", "ร้านอาหารตลาดบุญเครือ",
  "Portal Cafe", "รับจำนอง-ขายฝาก", "นายหน้ารวมตัว", "Draco",
  "วัด & สถานปฏิบัติธรรม",
];

const coverageAreas = [
  { icon: "location_on",  title: "Chonburi Hub",       desc: "จุดยุทธศาสตร์กลางเมืองและย่านธุรกิจหลัก" },
  { icon: "beach_access", title: "Pattaya & Bang Saen", desc: "เข้าถึงกลุ่มนักท่องเที่ยวทั้งไทยและต่างชาติ" },
  { icon: "factory",      title: "Sri Racha EEC",       desc: "ย่านเศรษฐกิจใหม่และกลุ่มพนักงานอุตสาหกรรม" },
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

const services = [
  { icon: "screenshot_monitor", title: "LED Billboard",    desc: "ลงโฆษณาบนป้าย LED คุณภาพสูงในทำเลสำคัญทั่วชลบุรีและพัทยา" },
  { icon: "movie",              title: "Video Ads",         desc: "ผลิตและลงวิดีโอโฆษณาที่ปรับจูนความสว่างและสีสันให้เหมาะกับจอ LED" },
  { icon: "brush",              title: "Motion Graphic",    desc: "ออกแบบภาพเคลื่อนไหว 2D/3D ให้โดดเด่นและดึงดูดสายตาจากท้องถนน" },
  { icon: "event_note",         title: "Campaign Planning", desc: "วางแผนเลือกทำเล ช่วงเวลา และรูปแบบแคมเปญให้คุ้มค่า Budget ที่สุด" },
];

const whyUs = [
  { icon: "location_city",   title: "EEC Specialists",       desc: "เชี่ยวชาญพื้นที่ชลบุรีและภาคตะวันออกอย่างลึกซึ้ง ครอบคลุมจุดยุทธศาสตร์สำคัญที่มีกำลังซื้อสูง" },
  { icon: "query_stats",     title: "Data-Driven Decisions",  desc: "ใช้ข้อมูล Traffic และ Audience จริงในการช่วยลูกค้าเลือกทำเลที่แม่นยำที่สุด ลดการสูญเสียงบประมาณ" },
  { icon: "design_services", title: "Full-Service Studio",    desc: "มีทีมผลิตสื่อโฆษณาครบวงจร ทั้ง Motion Graphics และ Anamorphic 3D ที่สร้าง Impact ได้จริง" },
];

const gallery = [
  {
    src: "https://lh3.googleusercontent.com/aida/ADBb0uh5MB61uc5uscXh2-ZwaRaBn8IpziZrSaZoxGaTlyohKy6xcgUDrvnlQrxSdhllqJhhujs0ZHuGyDSXMtLwR64wpXl1EqJcGHa0w5SCjGmKpVYG9XiEpqO3GuL0aL76sbdqlmdWmRowqIZOk1jnGrt058D5pq8H6vyMbbwfXSu1cSM7KsTt-oAH9KUK0-oepqJC6AuieogepbJRcAjk1DpPVLf7eAiBvxASS12TNyApzWYv-0TYKB305uo",
    alt: "Daylight Shot",
    title: "Daylight Clarity",
    sub: "Sukhumvit Main Road",
  },
  {
    src: "https://lh3.googleusercontent.com/aida/ADBb0uhFWwvThcMEI0OTDgPROsXUAO8-XrH4HNZNulN_QNQsaXXPr5qVRuhPVttKD0J8jA4l_3CWmw6w_yoeHsw9OjJmNki4b7TnQbxHlr9DbRjnPkZD3eyffI2k8xqN89sV_PGGovO92gvbgBD-einyVORlR1R7yZHBhfiOgOYz1vVo5ZqGgTDont9GP9W8dFFBSC-19frrVEDYUUJ3KB8b2PdWU7WcG_DLNXZGW-9hQqBKhz1XUET_lzctKdE",
    alt: "Night Shot",
    title: "Vibrant Night Life",
    sub: "Pattaya Central Hub",
    border: true,
  },
  {
    src: "https://lh3.googleusercontent.com/aida/ADBb0uiRggagh43z7tF_b4GZSla0gM2WVOSYRBw_4VzR4zG24G6WN_uepsl4bNBLG4Dj5qd8f18qX-awS_UjTRJ_0je-cAF7Dh8f4LXWtvYoVKGKNk9nhGHtOnN2gRnZQLzeUGSheeywVeXTiXVupHpuQCubssjTlYWgMSD0vy9bLQUOqSHUUi3oYPH_DAnmArcxI6g2sJGJmgrXHaFGJO_15K9jHNujqO8CGPnum6LtYnkU3kvh0aWzsXnRpd4",
    alt: "Drone Shot",
    title: "Drone Overview",
    sub: "EEC Coverage Area",
  },
];

const steps = [
  { step: "01", title: "เลือกทำเล",     desc: "เลือกป้ายหรือพื้นที่ที่เหมาะกับกลุ่มเป้าหมายของคุณจาก Network ทั่ว EEC" },
  { step: "02", title: "ขอราคา",        desc: "ส่งรายละเอียดเพื่อรับ Package และ Slot เวลาที่เหมาะสมกับ Budget" },
  { step: "03", title: "ส่งไฟล์โฆษณา", desc: "อัปโหลด Creative File ให้ทีมตรวจสอบความสมบูรณ์และมาตรฐานสี" },
  { step: "04", title: "เริ่มแคมเปญ",  desc: "โฆษณาขึ้นป้ายตามเวลาที่จอง พร้อมรับรายงานสรุปผลแคมเปญ" },
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
    const els = document.querySelectorAll(".sr, .expand-bar");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const amount = 15;
      const x = (e.clientX / window.innerWidth - 0.5) * amount;
      const y = (e.clientY / window.innerHeight - 0.5) * amount;
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Navbar activePage="home" />

      {/* ── 1. Hero Banner ── */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">

        {/* ── Background Layer ── */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImgRef}
            alt="Hero Background"
            className="w-full h-full object-cover transition-transform duration-1000 scale-105"
            src="https://lh3.googleusercontent.com/aida/ADBb0uh5MB61uc5uscXh2-ZwaRaBn8IpziZrSaZoxGaTlyohKy6xcgUDrvnlQrxSdhllqJhhujs0ZHuGyDSXMtLwR64wpXl1EqJcGHa0w5SCjGmKpVYG9XiEpqO3GuL0aL76sbdqlmdWmRowqIZOk1jnGrt058D5pq8H6vyMbbwfXSu1cSM7KsTt-oAH9KUK0-oepqJC6AuieogepbJRcAjk1DpPVLf7eAiBvxASS12TNyApzWYv-0TYKB305uo"
          />
          <div className="absolute inset-0 hero-gradient" />

          {/* Dot-matrix overlay — billboard pixel feel */}
          <div className="absolute inset-0 hero-dot-matrix pointer-events-none" />

          {/* Ambient glow orb — pulsing red radial */}
          <div className="absolute inset-0 hero-glow-orb pointer-events-none" />

          {/* LED scan line — sweeps top→bottom like a display refresh */}
          <div
            className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
            style={{
              top: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(230,57,70,0.15) 15%, rgba(255,255,255,0.55) 50%, rgba(230,57,70,0.15) 85%, transparent 100%)",
              boxShadow: "0 0 10px 1px rgba(230,57,70,0.4)",
              animation: "led-scan 5s cubic-bezier(0.4,0,0.6,1) 0.8s infinite",
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
                Eastern Economic Corridor Pioneer
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
            Premium Digital Advertising in{" "}
            <span className="text-primary-container">Chonburi&apos;s Prime Locations</span>
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
            Media108 is a LED &amp; Digital Out-of-Home advertising platform that helps brands
            reach their target audience through verified locations, real data, and measurable campaigns.
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
              Request Quotation{" "}
              <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/network"
              className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-lg font-label-md text-label-md hover:bg-white/10 active:scale-95"
              style={{ transition: "all 200ms ease" }}
            >
              View All Locations
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
                <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">About Media108</span>
              </div>

              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-5">
                Company Introduction
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
                Media108 คือเครือข่ายสื่อโฆษณาดิจิทัลที่พัฒนาเพื่อธุรกิจในจังหวัดชลบุรี พัทยา
                บางแสน ศรีราชา และพื้นที่ EEC เราไม่ได้ขายเพียงพื้นที่บนจอ LED
                แต่ช่วยให้แบรนด์เลือกทำเลที่เหมาะสม เข้าใจกลุ่มผู้ชม
                และวางแผนโฆษณาได้อย่างมีประสิทธิภาพด้วยวิสัยทัศน์ที่ต้องการยกระดับสื่อท้องถิ่นสู่มาตรฐานสากล
              </p>

              {/* Feature chips — stagger pop-in */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "verified", label: "Smart City Network", delay: "0.45s" },
                  { icon: "insights", label: "Data-Driven Planning", delay: "0.55s" },
                ].map(({ icon, label, delay }) => (
                  <div
                    key={label}
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
                    <span
                      className="material-symbols-outlined text-primary text-2xl flex-shrink-0"
                      style={{ transition: "transform 200ms cubic-bezier(0.34,1.56,0.64,1)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.2) rotate(-5deg)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1) rotate(0deg)"; }}
                    >
                      {icon}
                    </span>
                    <span className="text-on-surface font-label-md text-[13px]">{label}</span>
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
                      <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">location_on</span>
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
              { to: 10,  suffix: "+",  label: "Billboard Network" },
              { to: 1,   suffix: "M+", label: "Daily Traffic" },
              { to: 100, suffix: "%",  label: "EEC Coverage" },
              { to: 100, suffix: "%",  label: "Estimated Impression" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`sr sr-up sr-d${i + 1} text-center p-8 ${i < 3 ? "md:border-r border-white/10" : ""}`}
              >
                <div className="font-data-mono text-5xl mb-2 text-primary font-black">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="font-label-md uppercase tracking-wider text-on-surface-variant">
                  {stat.label}
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
                <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Prime Locations</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
                Featured Billboards
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                ป้ายเด่นในจุดยุทธศาสตร์ที่เข้าถึงกลุ่มเป้าหมายสูงสุด
              </p>
            </div>
            <Link
              href="/network"
              className="sr sr-right text-primary font-label-md text-label-md border-b border-primary/20 pb-1 hover:text-white hover:border-white transition-all flex items-center group"
            >
              VIEW ALL LOCATIONS{" "}
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1" style={{ fontSize: "16px" }}>
                arrow_outward
              </span>
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
                        {bb.location}
                      </span>
                    </div>
                    <span className={`${bb.badgeClass} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                      {bb.badge}
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">{bb.desc}</p>
                  <Link
                    href={bb.href}
                    className="block w-full py-3 bg-white/5 hover:bg-primary hover:text-on-primary transition-all duration-300 rounded-lg font-label-md text-center group-hover:shadow-lg"
                    style={{ transition: "all 250ms cubic-bezier(0.34,1.56,0.64,1)" }}
                  >
                    View Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4b. Recent Campaigns Ticker ── */}
      <section className="relative bg-surface-container-lowest py-16 border-t border-border-glass overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-desktop mb-10 sr sr-up">
          <div className="flex items-center gap-3">
            <span className="w-5 h-[1px] bg-primary-container" />
            <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Trusted By</span>
            <span className="text-on-surface-variant font-label-md text-[11px] tracking-[0.1em]">— ลูกค้าที่เคยใช้บริการจริง</span>
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4">
          <div className="flex gap-3 w-max"
            style={{ animation: "ticker-scroll 30s linear infinite" }}>
            {[...campaignRow1, ...campaignRow1].map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-5 py-2 rounded-full glass-card text-on-surface font-label-md text-label-md border border-border-glass hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="flex gap-3 w-max"
            style={{ animation: "ticker-scroll 36s linear infinite reverse" }}>
            {[...campaignRow2, ...campaignRow2].map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-5 py-2 rounded-full glass-card text-on-surface-variant font-label-md text-label-md border border-border-glass hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface-container-lowest to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface-container-lowest to-transparent" />
      </section>

      {/* ── 5. Coverage Area Map ── */}
      <section className="bg-surface-container-low py-32 border-t border-border-glass" id="network">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="sr sr-left mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-[1px] bg-primary-container" />
                  <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Network Coverage</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
                  Coverage Area Map
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  เครือข่าย Media108 ครอบคลุมเส้นทางสำคัญในจังหวัดชลบุรี ตั้งแต่โซนท่องเที่ยว
                  โซนการศึกษา ไปจนถึงเส้นทางธุรกิจ เราคัดเลือกจุดที่การมองเห็นดีที่สุด
                </p>
              </div>
              <div className="space-y-6">
                {coverageAreas.map((area, i) => (
                  <div
                    key={area.title}
                    className={`sr sr-left sr-d${i + 2} flex items-center gap-4 p-5 glass-card rounded-lg hover:bg-primary/5 transition-colors cursor-pointer group`}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined">{area.icon}</span>
                    </div>
                    <div>
                      <h5 className="font-headline-md text-primary text-xl">{area.title}</h5>
                      <p className="text-on-surface-variant text-sm">{area.desc}</p>
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
                  src="https://lh3.googleusercontent.com/aida/ADBb0uh5MB61uc5uscXh2-ZwaRaBn8IpziZrSaZoxGaTlyohKy6xcgUDrvnlQrxSdhllqJhhujs0ZHuGyDSXMtLwR64wpXl1EqJcGHa0w5SCjGmKpVYG9XiEpqO3GuL0aL76sbdqlmdWmRowqIZOk1jnGrt058D5pq8H6vyMbbwfXSu1cSM7KsTt-oAH9KUK0-oepqJC6AuieogepbJRcAjk1DpPVLf7eAiBvxASS12TNyApzWYv-0TYKB305uo"
                />
              </div>
              <div className="absolute top-1/4 left-1/3 animate-bounce">
                <span className="material-symbols-outlined text-[#E63946] text-5xl">location_on</span>
              </div>
              <div
                className="absolute top-1/2 right-1/4 animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <span className="material-symbols-outlined text-primary text-5xl">location_on</span>
              </div>
              <div
                className="absolute bottom-1/3 left-1/2 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="material-symbols-outlined text-white text-5xl">location_on</span>
              </div>
              <div className="relative z-10 p-8 glass-card rounded-2xl">
                <h4 className="font-headline-md text-white mb-6">Interactive Network Map</h4>
                <p className="text-on-surface-variant mb-8 text-sm">
                  Explore our dynamic billboard network across the EEC region in high definition.
                </p>
                <button className="px-10 py-4 bg-[#E63946] text-white rounded-lg font-label-md text-label-md hover:bg-white hover:text-[#E63946] transition-all transform hover:scale-105 shadow-xl">
                  Launch Fullscreen Viewer
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
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Data Insights</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">
              Audience &amp; Traffic
            </h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-[#E63946] to-transparent mx-auto rounded-full" />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-8">
              สถิติ Reach และ Traffic รวม ที่ช่วยให้แบรนด์เลือกสื่อได้ตรงกับกลุ่มเป้าหมายอย่างแม่นยำ
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
                <span className="material-symbols-outlined text-primary">schedule</span> Peak Traffic Times
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
                <span className="material-symbols-outlined text-primary">groups</span> Audience Ratio
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
                <p className="text-sm text-on-surface-variant">Data verified by Media108 Analytics Q4 2023</p>
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
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">What We Do</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">Services Overview</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-[#E63946] to-transparent rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {services.map((svc, i) => (
              <div key={svc.title}
                className={`sr sr-scale sr-d${i + 1} glass-card p-10 rounded-xl hover:bg-primary/5 transition-all duration-300 border-t-2 border-t-transparent hover:border-t-primary group cursor-default`}>
                <span className="service-icon-hover material-symbols-outlined text-primary text-5xl mb-6 block transition-colors duration-300">
                  {svc.icon}
                </span>
                <h4 className="font-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">{svc.title}</h4>
                <p className="text-on-surface-variant font-body-md">{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="sr sr-up sr-d5 mt-16 flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/services"
              className="bg-[#E63946] text-white px-12 py-5 rounded-lg font-label-md shadow-xl hover:bg-[#d1323f] hover:-translate-y-0.5 transition-all text-center"
              style={{ transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)" }}>
              ดูบริการทั้งหมด
            </Link>
            <Link href="/contact#form"
              className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-lg font-label-md hover:bg-white/5 hover:border-white/40 transition-all text-center">
              ปรึกษาแคมเปญกับทีมขาย
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
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Our Edge</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-4">Why Media108</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full mx-auto" />
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-8 leading-relaxed">
              เราช่วยให้การลงโฆษณากลางแจ้งไม่ใช่แค่การเลือกป้ายที่มองเห็นง่าย
              แต่เป็นการเลือกทำเลและสื่อที่แม่นยำด้วยข้อมูลและเทคโนโลยี
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {whyUs.map((item, i) => (
              <div key={item.title}
                className={`sr sr-scale sr-d${i + 1} glass-card p-12 rounded-xl border-l-4 border-l-primary/30 hover:border-l-primary transition-all duration-500 shadow-lg group cursor-default`}>
                <span className="service-icon-hover material-symbols-outlined text-primary-container text-5xl mb-8 block transition-colors duration-300 group-hover:text-primary">
                  {item.icon}
                </span>
                <h4 className="font-headline-md text-on-surface mb-6 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{item.desc}</p>
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
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">On Location</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">Photo Gallery</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full mx-auto" />
            <p className="font-body-md text-on-surface-variant mt-6">
              สัมผัสบรรยากาศจริงของทำเลป้ายในเครือข่าย Media108 ทั้งช่วงกลางวันและกลางคืน
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
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Get Started</span>
              <span className="w-5 h-[1px] bg-primary-container" />
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-3">How to Buy Ads</h2>
            <div className="h-[2px] w-0 expand-bar bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full mx-auto" />
            <p className="text-on-surface-variant mt-8 font-body-lg">
              ขั้นตอนง่ายๆ ในการเริ่มแคมเปญโฆษณาดิจิทัลกับเรา
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
                <h4 className="font-headline-md text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">{s.title}</h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="sr sr-scale sr-d5 mt-20 flex justify-center">
            <Link href="/contact#form"
              className="px-16 py-6 bg-[#E63946] text-white rounded-lg font-label-md text-label-md glow-button transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-2xl uppercase tracking-widest"
              style={{ transition: "all 250ms cubic-bezier(0.34,1.56,0.64,1)" }}>
              เริ่มจองป้ายเลย
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
          <span className="material-symbols-outlined text-[350px] text-white rotate-12">file_download</span>
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
              <span className="text-white/70 font-label-md text-[11px] tracking-[0.2em] uppercase">Free Download</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6">Download Our Media Kit</h2>
            <p className="text-white/90 font-body-lg leading-relaxed">
              ต้องการดูรายละเอียดทำเล ราคา แพ็กเกจ และข้อมูลสถิติผู้ชมอย่างละเอียด ดาวน์โหลด Media Kit
              หรือขอใบเสนอราคาที่ออกแบบเฉพาะสำหรับธุรกิจของคุณ
            </p>
          </div>
          <div className="sr sr-right sr-d2 flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            <Link href="/media-kit"
              className="bg-white text-primary-container px-12 py-5 rounded-lg font-label-md text-label-md font-bold flex items-center justify-center shadow-2xl hover:-translate-y-1 active:scale-95"
              style={{ transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)" }}>
              <span className="material-symbols-outlined mr-3">download</span> DOWNLOAD MEDIA KIT
            </Link>
            <Link href="/contact#form"
              className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-lg font-label-md text-label-md font-bold hover:bg-white/10 active:scale-95 text-center hover:-translate-y-0.5"
              style={{ transition: "all 200ms ease" }}>
              REQUEST QUOTATION
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
              <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8">Get In Touch</h2>
              <p className="text-on-surface-variant font-body-lg mb-12">
                เราพร้อมเป็นพาร์ทเนอร์สื่อโฆษณาที่จะช่วยขับเคลื่อนแคมเปญของคุณให้ประสบความสำเร็จ
                ติดต่อเราเพื่อรับคำปรึกษาฟรี
              </p>
              <div className="space-y-8">
                <a href="tel:+6638123456" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary border border-border-glass group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-3xl">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      Phone Number
                    </p>
                    <p className="text-xl text-on-surface font-headline-md">+66 (0) 38 123 456</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full bg-[#06C755] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all">
                    <span className="material-symbols-outlined text-3xl">chat</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      Line Official
                    </p>
                    <p className="text-xl text-on-surface font-headline-md">@media108</p>
                  </div>
                </a>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary border border-border-glass">
                    <span className="material-symbols-outlined text-3xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-label-md uppercase tracking-widest mb-1">
                      Head Office
                    </p>
                    <p className="text-on-surface font-body-md">Chonburi City, Thailand 20000</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-10 rounded-2xl shadow-2xl border-t-4 border-t-[#E63946]">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                      Name
                    </label>
                    <input
                      className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                      placeholder="Your Name"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                      Email
                    </label>
                    <input
                      className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                      placeholder="Email Address"
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                    Company
                  </label>
                  <input
                    className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                    placeholder="Company Name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-label-md text-on-surface-variant mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-surface-container border border-border-glass rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-on-surface"
                    placeholder="Tell us about your campaign..."
                    rows={4}
                  ></textarea>
                </div>
                <button
                  className="w-full bg-[#E63946] text-white py-4 rounded-lg font-label-md text-label-md hover:bg-[#d1323f] transition-all shadow-xl"
                  type="submit"
                >
                  SEND MESSAGE
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQzxAPAB9nOqrDOCuORJYTnRRWHgB_iOJG0f39OvN_Ma74f63ydil3zG2UkdpwdL_gCwGITmTUc2uG9iinRcyf83Sa4PEHrRizUBZ8zsgXbduZc0wpHL54kxAYoheQdcTxwqcuTyPF9ln3u5xwWj1OqEzpvNnDGgI8qvuNoXs1bbPozJ8gnDxd5Nh6Is7-g30t9PeOG9t_u1kB3qJe909_B_xV9qOwuCevQsDCcXJsZUzhe5egc4FA2FzWs8P9bRvw5qEorIHD2js"
              />
              <p className="text-on-surface-variant font-body-md pr-12 leading-relaxed">
                Leading the digital outdoor revolution in the Eastern Economic Corridor. Precision
                media solutions driven by data and impact.
              </p>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">
                Navigation
              </h6>
              <ul className="space-y-4">
                {[
                  ["Home", "/"],
                  ["Media Network", "/network"],
                  ["Our Services", "/services"],
                  ["Contact Us", "/contact"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">
                Media Focus
              </h6>
              <ul className="space-y-4">
                {[
                  "Pattaya Digital Hub",
                  "Chonburi Strategic",
                  "Bang Saen Network",
                  "EEC Industrial Belt",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-on-surface-variant hover:text-primary transition-colors font-body-md"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h6 className="text-on-surface font-label-md uppercase tracking-widest mb-8">
                Connect
              </h6>
              <div className="flex gap-4 mb-8">
                {["share", "alternate_email"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-on-surface hover:text-on-primary"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      {icon}
                    </span>
                  </a>
                ))}
              </div>
              <div className="p-4 bg-surface-container-high rounded-lg border border-border-glass">
                <p className="text-[11px] font-label-md text-on-surface-variant uppercase mb-2">
                  Subscribe to Media Kit Updates
                </p>
                <div className="flex gap-2">
                  <input
                    className="bg-transparent border border-white/10 rounded px-3 py-2 text-sm focus:border-primary outline-none flex-1"
                    placeholder="Email"
                    type="email"
                  />
                  <button className="bg-primary-container text-on-primary-container px-3 rounded hover:opacity-90">
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border-glass flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-on-surface-variant font-label-md text-sm">
              © 2024 MEDIA108. All rights reserved. Precision DOOH Media Solutions.
            </div>
            <div className="flex items-center gap-6 text-on-surface-variant font-label-md text-sm">
              <span>
                Region: <span className="text-on-surface font-bold">TH-EEC</span>
              </span>
              <span className="flex items-center gap-2">
                Status: <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>{" "}
                Optimal
              </span>
            </div>
          </div>
        </div>
      </footer>

      <GlobalCTABar />
    </>
  );
}
