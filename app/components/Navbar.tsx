"use client";

import { useEffect } from "react";
import Link from "next/link";

type NavPage = "home" | "about" | "network" | "billboard" | "services" | "media-kit" | "contact";

interface NavbarProps {
  activePage?: NavPage;
}

const navLinks: { label: string; href: string; page: NavPage }[] = [
  { label: "Home",          href: "/",          page: "home"      },
  { label: "About",         href: "/about",     page: "about"     },
  { label: "Media Network", href: "/network",   page: "network"   },
  { label: "Billboard Listing", href: "/billboard", page: "billboard" },
  { label: "Services",      href: "/services",  page: "services"  },
  { label: "Media Kit & Pricing", href: "/media-kit", page: "media-kit" },
];

export default function Navbar({ activePage = "home" }: NavbarProps) {
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
          <span className="text-primary font-black text-2xl tracking-tight">Media</span>
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

        {/* ── Right: CTA ── */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact#form"
            className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-label-md text-label-md uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            Contact Sales
          </Link>
        </div>

        {/* ── Mobile menu ── */}
        <div className="md:hidden">
          <span className="material-symbols-outlined text-on-surface text-3xl">menu</span>
        </div>

      </div>
    </nav>
  );
}
