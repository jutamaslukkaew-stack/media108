"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type NavPage = "home" | "about" | "network" | "billboard" | "services" | "media-kit" | "contact" | "blog";

interface NavbarProps {
  activePage?: NavPage;
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
          ? "bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_#E8E8E8] py-2"
          : "bg-white border-b border-[#E8E8E8] py-0"
      }`}
    >
      <div className="flex items-center h-16 w-full max-w-container-max mx-auto px-margin-desktop">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 mr-12">
          <span className="text-[#E63946] font-black text-xl tracking-tight uppercase font-[family-name:var(--font-montserrat)]">MEDIA</span>
          <span className="text-[#111111] font-black text-xl tracking-tight font-[family-name:var(--font-montserrat)]">108</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-7 flex-1">
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <Link
                key={link.page}
                href={link.href}
                className={`relative text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors pb-0.5 ${
                  isActive
                    ? "text-[#E63946]"
                    : "text-[#333333] hover:text-[#111111]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#E63946] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Language + CTA */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <div className="flex items-center rounded border border-[#DDDDDD] overflow-hidden text-[11px] font-bold tracking-widest">
            <button
              onClick={() => setLang("th")}
              className={`px-3 py-1.5 transition-all ${
                lang === "th"
                  ? "bg-[#111111] text-white"
                  : "text-[#777777] hover:bg-[#F5F5F5]"
              }`}
            >
              TH
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-all ${
                lang === "en"
                  ? "bg-[#111111] text-white"
                  : "text-[#777777] hover:bg-[#F5F5F5]"
              }`}
            >
              EN
            </button>
          </div>

          <Link
            href="/contact#form"
            className="bg-[#E63946] text-white px-5 py-2 text-[12px] font-bold uppercase tracking-widest hover:bg-[#c9313d] active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            {t("Contact Sales", "ติดต่อฝ่ายขาย")}
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3 ml-auto">
          <div className="flex items-center rounded border border-[#DDDDDD] overflow-hidden text-[10px] font-bold">
            <button
              onClick={() => setLang("th")}
              className={`px-2 py-1.5 transition-all ${lang === "th" ? "bg-[#111111] text-white" : "text-[#777777]"}`}
            >
              TH
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1.5 transition-all ${lang === "en" ? "bg-[#111111] text-white" : "text-[#777777]"}`}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="text-[#111111] p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E8E8E8] bg-white">
          <div className="flex flex-col px-5 py-3 gap-0.5">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <Link
                  key={link.page}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-3 text-sm font-medium transition-all border-l-2 ${
                    isActive
                      ? "text-[#E63946] border-[#E63946] bg-[#FEF2F2]"
                      : "text-[#333333] border-transparent hover:text-[#111111] hover:bg-[#F7F7F7]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact#form"
              onClick={() => setMobileOpen(false)}
              className="mt-3 text-center bg-[#E63946] text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#c9313d] transition-all"
            >
              {t("Contact Sales", "ติดต่อฝ่ายขาย")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
