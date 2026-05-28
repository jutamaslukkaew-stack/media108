"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { billboards } from "../data/billboards";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import { Map, List, SlidersHorizontal, ChevronDown, Eye, ChevronsDown } from "lucide-react";

const allBillboards = Object.values(billboards);

/* ── Per-slug metadata to match Stitch card layout ── */
const meta: Record<string, { zoneEn: string; zoneTh: string; audienceEn: string; audienceTh: string; id: string; typeEn: string; typeTh: string }> = {
  "pattaya-sukhumvit-01": { zoneEn: "Main Pattaya Route",    zoneTh: "เส้นทางหลักพัทยา",    audienceEn: "HNW Travelers",      audienceTh: "นักเดินทางกำลังซื้อสูง", id: "PY-SKV-01", typeEn: "Large Format LED", typeTh: "LED ขนาดใหญ่" },
  "pattaya-gateway":      { zoneEn: "Central Intersection",  zoneTh: "สี่แยกกลาง",           audienceEn: "Tourists & Locals",  audienceTh: "นักท่องเที่ยวและคนท้องถิ่น", id: "PY-GW-04", typeEn: "Landmark LED", typeTh: "LED แลนด์มาร์ค" },
  "jomtien-coastal":      { zoneEn: "Coastal Strip",         zoneTh: "ย่านชายฝั่ง",           audienceEn: "Tourists & Expats",  audienceTh: "นักท่องเที่ยวและชาวต่างชาติ", id: "JT-CST-03", typeEn: "Digital Static", typeTh: "ดิจิทัลสแตติก" },
};

/* ── Map pin positions (% within the map image) ── */
const pins: Record<string, { top: string; left: string }> = {
  "pattaya-sukhumvit-01": { top: "28%", left: "33%" },
  "pattaya-gateway":      { top: "50%", left: "54%" },
  "jomtien-coastal":      { top: "65%", left: "42%" },
};

/* ── Status badge ── */
const badgeCls: Record<string, string> = {
  Available:    "bg-[#E63946] text-white",
  "High Demand":"bg-[#8d9194] text-[#262a2d]",
  "Sold Out":   "bg-white/20 text-white",
};

export default function BillboardListingPage() {
  const { t } = useLanguage();
  const [areaFilter, setAreaFilter] = useState("All Regions");
  const [audienceFilter, setAudienceFilter] = useState("Universal");
  const [mediaFilter, setMediaFilter] = useState("All Formats");
  const [viewMode, setViewMode] = useState<"map" | "list">("list");
  const [sortBy, setSortBy] = useState("Popularity");
  const [visibleCount, setVisibleCount] = useState(6);

  useScrollReveal();

  /* Parallax ref */
  const mapImgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handler = () => {
      if (mapImgRef.current) {
        mapImgRef.current.style.transform = `translateY(${window.pageYOffset * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const filtered = useMemo(() => allBillboards, []);
  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <Navbar activePage="billboard" />

      {/* ── MAP HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "90vh", maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
      >
        {/* Map background */}
        <div className="absolute inset-0 bg-[#050b24]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={mapImgRef}
            alt="EEC Corridor Map"
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80"
          />
        </div>

        {/* Location Pins */}
        {allBillboards.map((bb) => {
          const pin = pins[bb.slug];
          if (!pin) return null;
          const info = meta[bb.slug];
          return (
            <div
              key={bb.slug}
              className="absolute group cursor-pointer z-20"
              style={{ top: pin.top, left: pin.left }}
            >
              {/* Pulse dot */}
              <div
                className="w-5 h-5 bg-[#E63946] rounded-full border-2 border-white/20"
                style={{ animation: "pulse-pin 2s infinite", boxShadow: "0 0 20px rgba(230,57,70,0.3)" }}
              />
              {/* Tooltip popup */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-none">
                <div
                  className="p-3 rounded-xl shadow-2xl w-64"
                  style={{ backdropFilter: "blur(12px)", background: "rgba(30,40,74,0.95)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={bb.imgDay} alt={bb.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h4 className="text-white font-bold text-sm font-display-lg">{bb.title}</h4>
                  <p className="text-on-surface-variant text-[10px] mb-2">
                    ID: {info?.id} | {bb.carsPerDay} {t("Reach", "การเข้าถึง")}
                  </p>
                  <div className="w-full py-2 bg-[#E63946] text-white text-[10px] font-bold uppercase rounded-lg text-center">
                    {t("View Details", "ดูรายละเอียด")}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full px-16 flex flex-col items-start justify-end pb-32 pointer-events-none">
          <h1
            className="text-white max-w-3xl mb-4 drop-shadow-2xl font-display-lg"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s both" }}
          >
            {t("Dominate the", "ครองพื้นที่")}{" "}
            <span style={{ color: "#E63946" }}>{t("EEC Corridor", "EEC Corridor")}</span>
          </h1>
          <p
            className="font-body-lg text-on-surface-variant max-w-xl p-4 rounded-lg"
            style={{ background: "rgba(6,17,51,0.4)", backdropFilter: "blur(4px)", animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
          >
            {t(
              "Interactive coverage map of Thailand's premier DOOH inventory. Select a pin to view location data and performance metrics.",
              "แผนที่ครอบคลุมแบบอินเทอร์แอคทีฟของสินค้าคงคลัง DOOH ชั้นนำของไทย เลือกพินเพื่อดูข้อมูลตำแหน่งและตัวชี้วัดประสิทธิภาพ"
            )}
          </p>
        </div>
      </section>

      {/* ── FILTER SYSTEM ── */}
      <div className="max-w-[1440px] mx-auto px-16 relative z-50 -mt-28">
        <div
          className="p-6 rounded-2xl flex flex-wrap lg:flex-nowrap items-end gap-6"
          style={{ backdropFilter: "blur(12px)", background: "rgba(30,40,74,0.95)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}
        >
          {/* Filter Dropdowns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Area */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest px-1">
                {t("Area", "พื้นที่")}
              </label>
              <select
                className="bg-[#050b24] border border-white/10 rounded-lg py-3 px-4 text-white outline-none cursor-pointer"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
              >
                <option>{t("All Regions", "ทุกภูมิภาค")}</option>
                <option>Pattaya</option>
                <option>Bang Saen</option>
                <option>Sri Racha</option>
                <option>Chonburi</option>
              </select>
            </div>
            {/* Audience */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest px-1">
                {t("Target Audience", "กลุ่มเป้าหมาย")}
              </label>
              <select
                className="bg-[#050b24] border border-white/10 rounded-lg py-3 px-4 text-white outline-none cursor-pointer"
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
              >
                <option>{t("Universal", "ทั่วไป")}</option>
                <option>{t("Tourists", "นักท่องเที่ยว")}</option>
                <option>{t("Students", "นักศึกษา")}</option>
                <option>{t("Professionals", "มืออาชีพ")}</option>
              </select>
            </div>
            {/* Media Type */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-[11px] text-on-surface-variant uppercase tracking-widest px-1">
                {t("Media Type", "ประเภทสื่อ")}
              </label>
              <select
                className="bg-[#050b24] border border-white/10 rounded-lg py-3 px-4 text-white outline-none cursor-pointer"
                value={mediaFilter}
                onChange={(e) => setMediaFilter(e.target.value)}
              >
                <option>{t("All Formats", "ทุกรูปแบบ")}</option>
                <option>{t("Large Format LED", "LED ขนาดใหญ่")}</option>
                <option>{t("Digital Pylons", "Digital Pylons")}</option>
                <option>{t("University Network", "เครือข่ายมหาวิทยาลัย")}</option>
              </select>
            </div>
          </div>

          {/* Map / List Toggle */}
          <div
            className="flex items-center rounded-lg p-1 border border-white/10 h-[52px]"
            style={{ background: "#050b24" }}
          >
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all font-label-md text-[14px] ${viewMode === "map" ? "text-white" : "text-on-surface-variant hover:text-white"}`}
              style={viewMode === "map" ? { background: "#E63946", boxShadow: "0 0 20px rgba(230,57,70,0.3)" } : {}}
            >
              <Map size={20} />
              {t("Map View", "มุมมองแผนที่")}
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all font-label-md text-[14px] ${viewMode === "list" ? "text-white" : "text-on-surface-variant hover:text-white"}`}
              style={viewMode === "list" ? { background: "#E63946", boxShadow: "0 0 20px rgba(230,57,70,0.3)" } : {}}
            >
              <List size={20} />
              {t("List View", "มุมมองรายการ")}
            </button>
          </div>

          {/* Tune button */}
          <button
            className="p-3.5 rounded-lg border border-white/20 transition-all active:scale-95 hover:bg-white/10 text-white"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* ── INVENTORY GRID ── */}
      <main className="max-w-[1440px] mx-auto px-16 py-20" style={{ background: "#061133" }}>
        {/* Section header */}
        <div className="sr sr-up flex justify-between items-end mb-12">
          <div>
            <h2 className="text-white font-display-lg" style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              {t("Interactive Media Catalog", "แคตตาล็อกสื่ออินเทอร์แอคทีฟ")}
            </h2>
            <p className="text-on-surface-variant mt-2 font-body-md">
              {t(
                "Click map pins for live previews or browse our complete collection below.",
                "คลิกพินบนแผนที่เพื่อดูตัวอย่างสด หรือเลือกดูคอลเลกชันทั้งหมดด้านล่าง"
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-on-surface-variant font-label-md text-[14px]">{t("Sort by:", "เรียงตาม:")}</span>
            <button className="flex items-center gap-2 text-white font-label-md text-[14px]">
              {t(sortBy, sortBy === "Popularity" ? "ความนิยม" : sortBy)}
              <ChevronDown size={18} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((bb, i) => {
            const info = meta[bb.slug] ?? { zoneEn: "—", zoneTh: "—", audienceEn: "—", audienceTh: "—", id: bb.slug.toUpperCase(), typeEn: "Digital LED", typeTh: "ดิจิทัล LED" };
            const badge = badgeCls[bb.status] ?? "bg-white/20 text-white";
            return (
              <div
                key={bb.slug}
                className={`sr sr-scale sr-d${Math.min(i % 3 + 1, 5)} group rounded-2xl overflow-hidden border border-white/10 hover:border-[#E63946]/50 transition-all duration-500 flex flex-col relative`}
                style={{ background: "#141d3f", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
              >
                {/* Clickable overlay */}
                <a
                  href={`/billboard/${bb.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`${t("View", "ดู")} ${bb.title} ${t("details", "รายละเอียด")}`}
                />

                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: "256px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={bb.title}
                    src={bb.imgDay}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute top-4 right-4 ${badge} font-label-md text-[10px] px-3 py-1 rounded-full uppercase tracking-tight`}>
                    {bb.status === "Available" ? t("Available", "ว่าง") :
                     bb.status === "High Demand" ? t("High Demand", "ต้องการสูง") :
                     t("Sold Out", "จองเต็ม")}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Eye size={18} className="text-white" />
                    <span className="text-white font-bold text-[12px]">
                      {bb.carsPerDay} {t("Daily Reach", "การเข้าถึงต่อวัน")}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <div>
                    <h3 className="text-white font-display-lg mb-1" style={{ fontSize: "24px", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                      {bb.title}
                    </h3>
                    <p className="text-on-surface-variant font-label-md text-[12px] uppercase">
                      ID: {info.id} | {t(info.typeEn, info.typeTh)}
                    </p>
                  </div>

                  {/* Specs row */}
                  <div className="space-y-2 py-4 border-y border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant font-body-md text-[14px]">{t("Zone", "โซน")}</span>
                      <span className="text-white font-label-md text-[14px]">{t(info.zoneEn, info.zoneTh)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant font-body-md text-[14px]">{t("Primary Audience", "กลุ่มผู้ชมหลัก")}</span>
                      <span className="text-white font-label-md text-[14px]">{t(info.audienceEn, info.audienceTh)}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <p className="text-on-surface-variant font-label-md text-[10px] uppercase mb-1">
                      {t("Starting From", "เริ่มต้นที่")}
                    </p>
                    <p className="text-white font-bold text-xl tracking-tight font-display-lg">
                      {bb.price !== "ขอใบเสนอราคา" ? `${bb.price}/Mo` : t("POA", "สอบถามราคา")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="group flex items-center gap-4 border border-white/10 rounded-full px-12 py-5 transition-all hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <span className="text-white font-label-md uppercase tracking-[0.2em] text-[14px]">
                {t("Load More Inventory", "โหลดเพิ่มเติม")}
              </span>
              <ChevronsDown size={20} className="text-[#E63946] group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer
        className="w-full px-16 py-12 flex flex-col items-center gap-2 border-t border-white/5 mt-20"
        style={{ background: "#020b2e" }}
      >
        <div className="font-display-lg font-bold text-on-surface mb-4 text-2xl">Media108</div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {([
            { en: "Privacy Policy",   th: "นโยบายความเป็นส่วนตัว", href: "#" },
            { en: "Terms of Service", th: "ข้อกำหนดการใช้งาน",      href: "#" },
            { en: "Sustainability",   th: "ความยั่งยืน",            href: "#" },
            { en: "Careers",          th: "ร่วมงานกับเรา",           href: "#" },
          ] as { en: string; th: string; href: string }[]).map((l) => (
            <Link key={l.en} href={l.href} className="text-on-surface-variant hover:text-primary transition-colors text-[16px]">
              {t(l.en, l.th)}
            </Link>
          ))}
        </div>
        <div className="text-secondary opacity-80 text-[16px]">
          © 2024 Media108 DOOH. {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")}
        </div>
      </footer>

      <GlobalCTABar />

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse-pin {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(230,57,70,0.7); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 10px rgba(230,57,70,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(230,57,70,0); }
        }
      `}</style>
    </>
  );
}
