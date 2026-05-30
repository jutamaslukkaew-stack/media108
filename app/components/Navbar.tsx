"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type NavPage = "home" | "about" | "network" | "billboard" | "services" | "media-kit" | "contact";

interface NavbarProps {
  activePage?: NavPage;
}

export default function Navbar({ activePage = "home" }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: { label: string; href: string; page: NavPage }[] = [
    { label: t("Home", "หน้าหลัก"),              href: "/",          page: "home"      },
    { label: t("About", "เกี่ยวกับเรา"),          href: "/about",     page: "about"     },
    { label: t("Media Network", "เครือข่ายสื่อ"), href: "/network",   page: "network"   },
    { label: t("Billboards", "ป้ายทั้งหมด"),      href: "/billboard", page: "billboard" },
    { label: t("Services", "บริการ"),             href: "/services",  page: "services"  },
    { label: t("Media Kit", "ราคา & Media Kit"),  href: "/media-kit", page: "media-kit" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("main-nav");
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.classList.add("py-2");
        nav.classList.remove("py-4");
      } else {
        nav.classList.remove("py-2");
        nav.classList.add("py-4");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      className="backdrop-blur-xl border-b border-border-glass shadow-md sticky top-0 z-50 w-full transition-all duration-300 py-3 bg-surface/95"
    >
      <div className="flex items-center justify-between w-full max-w-container-max mx-auto px-margin-desktop">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-primary font-black text-2xl tracking-tight uppercase">MEDIA</span>
          <span className="text-white font-black text-2xl tracking-tight">108</span>
        </Link>

        {/* ── Nav links (center) ── */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <Link
                key={link.page}
                href={link.href}
                className={
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1 font-label-md text-label-md whitespace-nowrap"
                    : "text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md whitespace-nowrap"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Right: Language toggle + CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center rounded-lg border border-blue-500/40 overflow-hidden text-[11px] font-label-md font-bold tracking-widest">
            <button
              onClick={() => setLang("th")}
              className={`px-3 py-2 transition-all ${lang === "th" ? "bg-blue-600 text-white" : "text-white hover:bg-white/10"}`}
            >
              TH
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-2 transition-all ${lang === "en" ? "bg-blue-600 text-white" : "text-white hover:bg-white/10"}`}
            >
              EN
            </button>
          </div>

          <Link
            href="/contact#form"
            className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            {t("Contact Sales", "ติดต่อฝ่ายขาย")}
          </Link>
        </div>

        {/* ── Mobile: lang toggle + hamburger ── */}
        <div className="md:hidden flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-blue-500/40 overflow-hidden text-[10px] font-label-md font-bold">
            <button
              onClick={() => setLang("th")}
              className={`px-2 py-1.5 transition-all ${lang === "th" ? "bg-blue-600 text-white" : "text-white"}`}
            >
              TH
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1.5 transition-all ${lang === "en" ? "bg-blue-600 text-white" : "text-white"}`}
            >
              EN
            </button>
          </div>
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-on-surface p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* ── Mobile Dropdown Menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-glass bg-surface/98 backdrop-blur-xl">
          <div className="flex flex-col px-5 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <Link
                  key={link.page}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact#form"
              onClick={() => setMobileOpen(false)}
              className="mt-3 text-center bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wider hover:brightness-110 transition-all"
            >
              {t("Contact Sales", "ติดต่อฝ่ายขาย")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
