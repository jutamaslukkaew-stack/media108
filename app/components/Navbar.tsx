"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type NavPage = "home" | "about" | "network" | "billboard" | "services" | "media-kit" | "contact" | "blog";

interface NavbarProps {
  activePage?: NavPage;
}

function LangToggle({ size = "md" }: { size?: "sm" | "md" }) {
  const { lang, setLang } = useLanguage();
  const px = size === "sm" ? "px-2 py-1" : "px-2.5 py-1.5";
  const textSize = size === "sm" ? "text-[10px]" : "text-[11px]";
  const flagSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="flex items-center rounded border border-[#ffb3b1]/40 overflow-hidden">
      {(["th", "en"] as const).map((code) => {
        const flag = code === "th" ? "🇹🇭" : "🇺🇸";
        const label = code === "th" ? "TH" : "EN";
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`flex items-center gap-1 ${px} transition-all ${
              active ? "bg-[#ffb3b1] text-[#061133]" : "text-white/50 hover:bg-[#ffb3b1]/10"
            }`}
          >
            <span className={flagSize}>{flag}</span>
            <span className={`${textSize} font-bold tracking-widest`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: { label: string; href: string; page: NavPage }[] = [
    { label: t("Home", "หน้าหลัก"),              href: "/",          page: "home"      },
    { label: t("About", "เกี่ยวกับเรา"),          href: "/about",     page: "about"     },
    { label: t("Media Network", "เครือข่ายสื่อ"), href: "/network",   page: "network"   },
    { label: t("Billboards", "ป้ายทั้งหมด"),      href: "/billboard", page: "billboard" },
    { label: t("Services", "บริการ"),             href: "/services",  page: "services"  },
    { label: t("Media Kit", "ราคา & Media Kit"),  href: "/media-kit", page: "media-kit" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#061133]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.08)] py-2"
          : "bg-[#061133] border-b border-white/10 py-0"
      }`}
    >
      {/* ── Desktop row ── */}
      <div className="hidden md:flex items-center h-16 w-full max-w-container-max mx-auto px-margin-desktop">
        <Link href="/" className="flex items-center shrink-0 mr-12">
          <span className="text-[#ffb3b1] font-black text-xl tracking-tight uppercase font-[family-name:var(--font-montserrat)]">MEDIA</span>
          <span className="text-white font-black text-xl tracking-tight font-[family-name:var(--font-montserrat)]">108</span>
        </Link>

        <div className="flex items-center justify-evenly flex-1 px-4">
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <Link key={link.page} href={link.href}
                className={`relative text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors pb-0.5 ${
                  isActive ? "text-[#E63946]" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {isActive && <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#E63946] rounded-full" />}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <LangToggle />
          <Link href="/contact#form" className="bg-[#E63946] text-white px-5 py-2 text-[12px] font-bold uppercase tracking-widest hover:bg-[#c9313d] active:scale-95 transition-all duration-200 whitespace-nowrap rounded">
            {t("Contact Sales", "ติดต่อฝ่ายขาย")}
          </Link>
        </div>
      </div>

      {/* ── Mobile row 1: Logo + TH/EN ── */}
      <div className="md:hidden flex items-center justify-between px-4 h-12">
        <Link href="/" className="flex items-center">
          <span className="text-[#ffb3b1] font-black text-lg tracking-tight uppercase font-[family-name:var(--font-montserrat)]">MEDIA</span>
          <span className="text-white font-black text-lg tracking-tight font-[family-name:var(--font-montserrat)]">108</span>
        </Link>
        <LangToggle size="sm" />
      </div>

      {/* ── Mobile row 2: Nav tabs (scrollable) ── */}
      <div className="md:hidden border-t border-white/10 overflow-x-auto scrollbar-none">
        <div className="flex w-full">
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <Link key={link.page} href={link.href}
                className={`relative flex flex-1 items-center justify-center px-2 py-3 whitespace-nowrap text-[13px] font-semibold transition-colors ${
                  isActive ? "text-[#E63946]" : "text-white/60"
                }`}
              >
                {link.label}
                {isActive && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E63946] rounded-full" />}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
