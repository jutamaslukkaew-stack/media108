"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  LayoutGrid, MousePointerClick, Palette, Sparkles, Film, Plane,
  Camera, Share2, Target, Store, Coffee, HeartPulse, Briefcase,
  Hotel, Utensils, Map, Building2, Home, HardHat, Ticket, PartyPopper,
  Trophy, Globe, Radio, type LucideIcon,
} from "lucide-react";

/* ── Service cards data ─────────────────────────────────── */
const services: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: LayoutGrid,      title: "LED Billboard Advertising",    desc: "ลงโฆษณาบนป้าย LED เดี่ยวหรือหลายจุด ทั่วพื้นที่ยุทธศาสตร์สำคัญ" },
  { icon: MousePointerClick, title: "Digital Out-of-Home Campaign", desc: "วาง Campaign หลายป้ายพร้อมกัน เพื่อสร้างการรับรู้ที่ทรงพลังในวงกว้าง" },
  { icon: Palette,         title: "Ad Creative Design",           desc: "ออกแบบ Artwork สำหรับป้าย LED โดยเฉพาะ เน้นความสวยงามและดึงดูดสายตา" },
  { icon: Sparkles,        title: "Motion Graphic",               desc: "ภาพเคลื่อนไหวสำหรับจอ LED ที่ถูกออกแบบมาเพื่อความลื่นไหลและโดดเด่น" },
  { icon: Film,            title: "Video Production",             desc: "ผลิตวิดีโอโฆษณาคุณภาพสูง ตั้งแต่การเขียนบทไปจนถึงการตัดต่อ" },
  { icon: Plane,           title: "Drone Production",             desc: "ถ่าย Drone สำหรับสถานที่หรือสินค้า เพื่อมุมมองที่กว้างขวางและอลังการ" },
  { icon: Camera,          title: "Photography",                  desc: "บริการถ่ายภาพสินค้าและบริการระดับ Professional เพื่อภาพลักษณ์แบรนด์ที่ดี" },
  { icon: Share2,          title: "Social Media Content",         desc: "ผลิตเนื้อหาสำหรับ Facebook, TikTok, YouTube และ Instagram อย่างครบวงจร" },
  { icon: Target,          title: "Campaign Strategy",            desc: "วางแผนสื่อและเลือกป้ายให้เหมาะกับเป้าหมาย ด้วยการวิเคราะห์ข้อมูลเชิงลึก" },
];

/* ── Package data ───────────────────────────────────────── */
const packages: {
  title: string;
  recommended: boolean;
  labelColor: string;
  accentBorder: string;
  items: { icon: LucideIcon; label: string }[];
}[] = [
  {
    title: "SME Starter",
    recommended: false,
    labelColor: "text-primary-fixed-dim",
    accentBorder: "border-t-secondary/30",
    items: [
      { icon: Store,      label: "ร้านอาหาร" },
      { icon: Coffee,     label: "คาเฟ่" },
      { icon: HeartPulse, label: "คลินิก" },
      { icon: Briefcase,  label: "ธุรกิจท้องถิ่น" },
    ],
  },
  {
    title: "Tourism Campaign",
    recommended: true,
    labelColor: "text-primary",
    accentBorder: "border-t-primary",
    items: [
      { icon: Hotel,   label: "โรงแรม" },
      { icon: Utensils, label: "ร้านอาหารพัทยา" },
      { icon: Map,     label: "แหล่งท่องเที่ยว" },
    ],
  },
  {
    title: "Real Estate Launch",
    recommended: false,
    labelColor: "text-primary-fixed-dim",
    accentBorder: "border-t-secondary/30",
    items: [
      { icon: Building2, label: "คอนโด" },
      { icon: Home,      label: "บ้านจัดสรร" },
      { icon: HardHat,   label: "โครงการใหม่" },
    ],
  },
  {
    title: "Event Promotion",
    recommended: false,
    labelColor: "text-primary-fixed-dim",
    accentBorder: "border-t-secondary/30",
    items: [
      { icon: Ticket,      label: "Concert" },
      { icon: PartyPopper, label: "Festival" },
      { icon: Trophy,      label: "Sport Event" },
    ],
  },
];

export default function ServicesPage() {
  useScrollReveal();
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlxPMO48JJWcqQJz0me9oV6FxNAayF4EIcbAh7TapQiE4d0j-lUPRqLrls0eEtTBrVdQ7o-q0kcRWxUiy1kCg1c6wyxDjoiZUXXyLYHtbwloDPrcgJ-1Tzn6of2UsCDcg9zvjqsudQMdMArn207g7cRDsvydPdCY9vpK4qGzp6VOkFZdbs6LvbBaTrBCI3ZkaN1qDgVfhU7DWbYoHGTjtnC9t5GzTFDZ3JBG62Y3E4rmQIOq6_rZYXVU88T7deuK3jTrtIpN8tQWY"
            />
          </div>

          <div className="relative z-20 max-w-4xl">
            <span
              className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}
            >
              Our Services
            </span>
            <h1
              className="font-display-lg text-display-lg mb-6 leading-tight text-white"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.18s both" }}
            >
              นำเสนอบริการเป็นมากกว่า<br />&ldquo;ขายพื้นที่โฆษณา&rdquo;
            </h1>
            <p
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10"
              style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.32s both" }}
            >
              Media108 ยกระดับแบรนด์ของคุณด้วยโซลูชันสื่อดิจิทัลนอกบ้านแบบครบวงจร ตั้งแต่การวางกลยุทธ์
              การออกแบบ ไปจนถึงการผลิตเนื้อหาคุณภาพสูงระดับ Cinematic
            </p>
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.44s both" }}
            >
              <a
                href="#packages"
                className="bg-primary-container text-white px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:-translate-y-px transition-all"
              >
                ดูแพ็กเกจแนะนำ
              </a>
              <a
                href="#services"
                className="px-8 py-4 rounded-lg font-label-md text-label-md border border-white/20 hover:bg-white/10 transition-all uppercase tracking-wider text-white"
              >
                บริการทั้งหมด
              </a>
            </div>
          </div>
        </section>

        {/* ── Services Grid ── */}
        <section id="services" className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="sr sr-up mb-16">
            <h2 className="font-headline-xl text-headline-xl mb-4 text-white">บริการระดับมืออาชีพ</h2>
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
                <p className="font-body-md text-on-surface-variant">{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="packages" className="py-24 bg-surface-container-low border-y border-white/5">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="sr sr-up text-center mb-16">
              <h2 className="font-headline-xl text-headline-xl mb-4 text-white">Packages ที่ควรนำเสนอ</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                แพ็กเกจที่ออกแบบมาเพื่อตอบโจทย์ธุรกิจทุกขนาดและทุกอุตสาหกรรม
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
                  <p className={`${pkg.labelColor} font-bold mb-6`}>เหมาะสำหรับ:</p>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.items.map((item) => (
                      <li key={item.label} className="flex items-start">
                        <item.icon size={20} className="text-primary mr-3 shrink-0 mt-0.5" />
                        <span className="font-body-md text-on-surface-variant">{item.label}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.recommended ? (
                    <button className="w-full py-4 rounded-lg bg-primary-container text-white font-label-md text-label-md uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:-translate-y-px transition-all">
                      สอบถามข้อมูล
                    </button>
                  ) : (
                    <button className="w-full py-4 rounded-lg border border-white/20 hover:bg-white/10 transition-all font-label-md text-label-md uppercase tracking-wider text-white">
                      เลือกแพ็กเกจนี้
                    </button>
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
              ต้องการแผนสื่อที่ตอบโจทย์เฉพาะคุณ?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
              เราไม่ได้แค่ขายพื้นที่ แต่เราช่วยคุณวางแผนเพื่อให้ทุกวินาทีบนหน้าจอมีความหมายและคุ้มค่ากับการลงทุนมากที่สุด
            </p>
            <Link
              href="/network"
              className="inline-block bg-primary-container text-white px-12 py-5 rounded-lg font-headline-md text-headline-md hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] hover:-translate-y-px transition-all active:scale-95"
            >
              เริ่มต้นโครงการของคุณ
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
              ยกระดับแบรนด์ผ่านสื่อดิจิทัลนอกบ้านที่มีความแม่นยำสูงและการผลิตที่เปี่ยมคุณภาพ
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
            <h4 className="text-primary font-label-md text-label-md uppercase tracking-widest mb-2">Network</h4>
            {["Network Map", "Global Offices", "Case Studies"].map((l) => (
              <a key={l} className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm" href="#">
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-label-md text-label-md uppercase tracking-widest mb-2">Company</h4>
            {["Careers", "Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm" href="#">
                {l}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-label-md text-label-md uppercase tracking-widest mb-2">Contact</h4>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-sm" href="#">
              Contact Sales
            </a>
            <p className="text-on-surface-variant text-sm">สำนักงานใหญ่: ชลบุรี, ประเทศไทย</p>
            <p className="text-on-surface-variant text-sm">+66 (0) 108 108 108</p>
          </div>
        </div>
        <div className="px-margin-desktop py-8 border-t border-white/5 text-center text-on-surface-variant text-xs opacity-60">
          © 2024 Media108. All rights reserved. Precision in Digital Out-of-Home.
        </div>
      </footer>
    </>
  );
}
