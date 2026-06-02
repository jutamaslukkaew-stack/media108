"use client";

import { useState, useEffect, useCallback } from "react";
import { billboards } from "../data/billboards";
import type { BillboardData } from "../data/billboards";
import {
  Lock, LogOut, Edit3, CheckCircle, AlertCircle,
  MapPin, DollarSign, Activity, FileText, Copy, Download,
  ClipboardList, RefreshCw, Phone, Mail, Building2, MessageSquare,
  ChevronDown, ChevronUp, Search,
} from "lucide-react";

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "media108admin";

/* ── types ─────────────────────────────────────────────────────────────────── */
type EditableFields = Pick<BillboardData, "price" | "status" | "description" | "carsPerDay" | "peakHours" | "viewingDistance" | "avgSpeed">;

type Quote = {
  _row: number;
  "ลำดับ": number;
  "วันเวลา (TH)": string;
  "ชื่อ-นามสกุล": string;
  "บริษัท / องค์กร": string;
  "เบอร์โทรศัพท์": string;
  "อีเมล": string;
  "บริการที่สนใจ": string;
  "ข้อความเพิ่มเติม": string;
  "สถานะ": string;
  "หมายเหตุ": string;
};

/* ── helpers ────────────────────────────────────────────────────────────────── */
const statusColor: Record<BillboardData["status"], string> = {
  "Available":   "bg-green-500/20 text-green-400 border-green-500/30",
  "High Demand": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Sold Out":    "bg-red-500/20 text-red-400 border-red-500/30",
};

const quoteStatusStyle: Record<string, string> = {
  "🟡 รอติดต่อ":      "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "🔵 ติดต่อแล้ว":    "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "🟠 เสนอราคาแล้ว":  "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "🟢 ปิดงาน":        "bg-green-500/20 text-green-300 border-green-500/30",
  "🔴 ยกเลิก":        "bg-red-500/20 text-red-300 border-red-500/30",
};

/* ══════════════════════════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError]       = useState("");
  const [activeTab, setActiveTab] = useState<"quotes" | "billboards">("quotes");

  /* ── billboard editor state ── */
  const [edits, setEdits]   = useState<Record<string, Partial<EditableFields>>>({});
  const [saved, setSaved]   = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  /* ── quote state ── */
  const [quotes, setQuotes]       = useState<Quote[]>([]);
  const [quotesLoading, setQL]    = useState(false);
  const [quotesError, setQE]      = useState("");
  const [expandedRow, setExpanded] = useState<number | null>(null);
  const [filterStatus, setFilter] = useState("ทั้งหมด");
  const [search, setSearch]       = useState("");

  /* ── login ── */
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASS) { setLoggedIn(true); setError(""); }
    else setError("รหัสผ่านไม่ถูกต้อง");
  }

  /* ── fetch quotes ── */
  const fetchQuotes = useCallback(async () => {
    setQL(true); setQE("");
    try {
      // ใช้ session cookie จากการ login (เก็บ password ใน cookie แบบง่าย)
      const res  = await fetch("/api/admin/quotes");
      if (res.status === 401) {
        // ถ้า API ยังไม่ set cookie → ลอง fallback ด้วย header
        setQE("กรุณาตั้งค่า GOOGLE_SHEET_WEBHOOK_URL ใน .env.local และ deploy Apps Script ก่อน");
        setQL(false); return;
      }
      const json = await res.json();
      if (json.error) { setQE(json.error); }
      else { setQuotes(json.data ?? []); }
    } catch {
      setQE("ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบการตั้งค่า");
    }
    setQL(false);
  }, []);

  useEffect(() => { if (loggedIn && activeTab === "quotes") fetchQuotes(); }, [loggedIn, activeTab, fetchQuotes]);

  /* ── billboard helpers ── */
  function update(slug: string, field: keyof EditableFields, value: string) {
    setEdits(prev => ({ ...prev, [slug]: { ...prev[slug], [field]: value } }));
    setSaved(prev => ({ ...prev, [slug]: false }));
  }
  function markSaved(slug: string) { setSaved(prev => ({ ...prev, [slug]: true })); }
  function exportJSON() {
    const updated = Object.fromEntries(
      Object.entries(billboards).map(([slug, data]) => [slug, { ...data, ...(edits[slug] ?? {}) }])
    );
    const blob = new Blob([JSON.stringify(updated, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), { href: url, download: "billboards-updated.json" });
    a.click(); URL.revokeObjectURL(url);
  }
  async function copyJSON() {
    const updated = Object.fromEntries(
      Object.entries(billboards).map(([slug, data]) => [slug, { ...data, ...(edits[slug] ?? {}) }])
    );
    await navigator.clipboard.writeText(JSON.stringify(updated, null, 2));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }
  function val<K extends keyof EditableFields>(slug: string, field: K): string {
    return String((edits[slug]?.[field] ?? (billboards as Record<string, BillboardData>)[slug]?.[field]) ?? "");
  }

  /* ── derived quote data ── */
  const statusOptions = ["ทั้งหมด", "🟡 รอติดต่อ", "🔵 ติดต่อแล้ว", "🟠 เสนอราคาแล้ว", "🟢 ปิดงาน", "🔴 ยกเลิก"];
  const filteredQuotes = quotes.filter(q => {
    const matchStatus = filterStatus === "ทั้งหมด" || q["สถานะ"] === filterStatus;
    const matchSearch = !search || [q["ชื่อ-นามสกุล"], q["บริษัท / องค์กร"], q["อีเมล"], q["เบอร์โทรศัพท์"]]
      .join(" ").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statCounts = {
    total:     quotes.length,
    pending:   quotes.filter(q => q["สถานะ"] === "🟡 รอติดต่อ").length,
    contacted: quotes.filter(q => q["สถานะ"] === "🔵 ติดต่อแล้ว").length,
    closed:    quotes.filter(q => q["สถานะ"] === "🟢 ปิดงาน").length,
  };

  /* ── login screen ─────────────────────────────────────────────────────────── */
  if (!loggedIn) return (
    <div className="min-h-screen bg-[#020b2e] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-black mb-2">
            <span className="text-[#e63946]">Media</span><span className="text-white">108</span>
          </div>
          <p className="text-gray-400 text-sm">Admin Panel — ระบบหลังบ้าน</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-9 pr-4 text-white placeholder:text-gray-600 outline-none focus:border-[#e63946] transition-colors"
              autoFocus
            />
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={14}/> {error}</div>}
          <button type="submit" className="w-full bg-[#e63946] hover:bg-[#c1303b] text-white font-bold py-3 rounded-lg transition-colors">
            เข้าสู่ระบบ →
          </button>
        </form>
      </div>
    </div>
  );

  /* ── dashboard ─────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#020b2e] text-white">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#020b2e]/95 backdrop-blur border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="text-xl font-black hover:opacity-80 transition-opacity">
              <span className="text-[#e63946]">Media</span><span className="text-white">108</span>
            </a>
            <span className="text-gray-500 text-sm hidden sm:block">/ Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            {activeTab === "billboards" && (
              <>
                <button onClick={copyJSON} className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg text-xs transition-colors">
                  {copied ? <CheckCircle size={13} className="text-green-400"/> : <Copy size={13}/>}
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
                <button onClick={exportJSON} className="flex items-center gap-1.5 bg-[#e63946]/20 hover:bg-[#e63946]/30 border border-[#e63946]/30 text-[#e63946] px-3 py-2 rounded-lg text-xs transition-colors">
                  <Download size={13}/> Export
                </button>
              </>
            )}
            <a href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors px-2 border border-white/10 rounded-lg py-2 hover:border-white/30">
              ← <span>เว็บไซต์</span>
            </a>
            <button onClick={() => setLoggedIn(false)} className="flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors px-2">
              <LogOut size={14}/> <span className="hidden sm:block">ออก</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 mb-6 w-fit">
          {[
            { key: "quotes",     label: "ใบเสนอราคา",  icon: ClipboardList },
            { key: "billboards", label: "จัดการป้าย",   icon: Edit3 },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === key ? "bg-[#e63946] text-white shadow-lg" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={15}/> {label}
              {key === "quotes" && statCounts.pending > 0 && (
                <span className="bg-yellow-400 text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                  {statCounts.pending}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════ */}
        {/* TAB: ใบเสนอราคา                            */}
        {/* ════════════════════════════════════════════ */}
        {activeTab === "quotes" && (
          <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "ทั้งหมด",      value: statCounts.total,     color: "text-white",       bg: "bg-white/5" },
                { label: "รอติดต่อ",     value: statCounts.pending,   color: "text-yellow-400",  bg: "bg-yellow-500/10" },
                { label: "ติดต่อแล้ว",   value: statCounts.contacted, color: "text-blue-400",    bg: "bg-blue-500/10" },
                { label: "ปิดงานแล้ว",   value: statCounts.closed,    color: "text-green-400",   bg: "bg-green-500/10" },
              ].map(s => (
                <div key={s.label} className={`${s.bg} border border-white/10 rounded-xl p-5`}>
                  <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {statusOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setFilter(opt)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-bold transition-all ${
                      filterStatus === opt
                        ? "bg-[#e63946] border-[#e63946] text-white"
                        : "border-white/10 text-gray-400 hover:text-white"
                    }`}
                  >{opt}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
                  <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="ค้นหาชื่อ / อีเมล / เบอร์..."
                    className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#e63946] w-56 transition-colors"
                  />
                </div>
                <button
                  onClick={fetchQuotes}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <RefreshCw size={13} className={quotesLoading ? "animate-spin" : ""}/> รีเฟรช
                </button>
              </div>
            </div>

            {/* Error / Loading */}
            {quotesError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300 text-sm flex gap-3">
                <AlertCircle size={18} className="shrink-0 mt-0.5"/>
                <div>
                  <p className="font-bold mb-1">ไม่สามารถโหลดข้อมูลได้</p>
                  <p>{quotesError}</p>
                  <p className="mt-2 text-red-400/70 text-xs">
                    💡 ต้องตั้งค่า GOOGLE_SHEET_WEBHOOK_URL + ADMIN_SECRET_TOKEN ใน .env.local และ deploy Apps Script ก่อน
                  </p>
                </div>
              </div>
            )}

            {quotesLoading && (
              <div className="text-center py-16 text-gray-500">
                <RefreshCw size={24} className="animate-spin mx-auto mb-3"/>
                กำลังโหลดข้อมูล...
              </div>
            )}

            {/* Quote cards */}
            {!quotesLoading && !quotesError && filteredQuotes.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <ClipboardList size={40} className="mx-auto mb-4 opacity-30"/>
                <p>ยังไม่มีใบเสนอราคา</p>
              </div>
            )}

            {!quotesLoading && filteredQuotes.map((q, i) => (
              <div key={q._row} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                {/* Row header */}
                <button
                  className="w-full flex items-center gap-4 p-5 text-left"
                  onClick={() => setExpanded(expandedRow === i ? null : i)}
                >
                  {/* Number */}
                  <span className="text-gray-500 text-sm font-mono w-6 shrink-0">#{q["ลำดับ"] || i+1}</span>

                  {/* Name + company */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{q["ชื่อ-นามสกุล"] || "-"}</p>
                    <p className="text-sm text-gray-400 truncate">{q["บริษัท / องค์กร"] || "ไม่ระบุบริษัท"}</p>
                  </div>

                  {/* Service */}
                  <span className="hidden md:block text-xs text-gray-400 max-w-[160px] truncate">
                    {q["บริการที่สนใจ"] || "-"}
                  </span>

                  {/* Date */}
                  <span className="hidden lg:block text-xs text-gray-500 shrink-0">{q["วันเวลา (TH)"] || "-"}</span>

                  {/* Status */}
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-bold shrink-0 ${quoteStatusStyle[q["สถานะ"]] ?? "bg-gray-500/20 text-gray-300 border-gray-500/30"}`}>
                    {q["สถานะ"] || "-"}
                  </span>

                  {/* Expand */}
                  {expandedRow === i ? <ChevronUp size={16} className="text-gray-400 shrink-0"/> : <ChevronDown size={16} className="text-gray-400 shrink-0"/>}
                </button>

                {/* Expanded detail */}
                {expandedRow === i && (
                  <div className="border-t border-white/10 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { icon: Phone,        label: "เบอร์โทรศัพท์",    value: q["เบอร์โทรศัพท์"],    link: `tel:${q["เบอร์โทรศัพท์"]}` },
                      { icon: Mail,         label: "อีเมล",              value: q["อีเมล"],              link: `mailto:${q["อีเมล"]}` },
                      { icon: Building2,    label: "บริษัท / องค์กร",    value: q["บริษัท / องค์กร"],   link: null },
                      { icon: FileText,     label: "บริการที่สนใจ",     value: q["บริการที่สนใจ"],     link: null },
                      { icon: ClipboardList,label: "วันเวลา",            value: q["วันเวลา (TH)"],      link: null },
                      { icon: MessageSquare,label: "หมายเหตุ",           value: q["หมายเหตุ"] || "-",   link: null },
                    ].map(({ icon: Icon, label, value, link }) => (
                      <div key={label}>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Icon size={11}/> {label}
                        </p>
                        {link && value ? (
                          <a href={link} className="text-[#e63946] hover:underline text-sm font-bold">{value}</a>
                        ) : (
                          <p className="text-sm text-white">{value || "-"}</p>
                        )}
                      </div>
                    ))}

                    {/* Message full width */}
                    {q["ข้อความเพิ่มเติม"] && (
                      <div className="sm:col-span-2 lg:col-span-3 bg-white/5 rounded-lg p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <MessageSquare size={11}/> ข้อความเพิ่มเติม
                        </p>
                        <p className="text-sm text-gray-200 leading-relaxed">{q["ข้อความเพิ่มเติม"]}</p>
                      </div>
                    )}

                    <div className="sm:col-span-2 lg:col-span-3 pt-2 border-t border-white/5">
                      <p className="text-xs text-gray-600">
                        💡 เปลี่ยนสถานะได้โดยตรงใน Google Sheets · อัปเดตอัตโนมัติเมื่อกด รีเฟรช
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════════════════════════════ */}
        {/* TAB: จัดการป้าย                            */}
        {/* ════════════════════════════════════════════ */}
        {activeTab === "billboards" && (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
              <FileText size={18} className="text-blue-400 shrink-0 mt-0.5"/>
              <p className="text-sm text-blue-300">
                แก้ไขข้อมูล → กด <strong>บันทึก</strong> → กด <strong>Export JSON</strong> หรือ <strong>Copy JSON</strong>
                แล้วส่งให้ Developer อัปเดตไฟล์ <code className="bg-white/10 px-1 rounded text-xs">app/data/billboards.ts</code>
              </p>
            </div>

            {Object.entries(billboards).map(([slug, data]) => (
              <div key={slug} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-start gap-4 p-6 border-b border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.imgDay} alt={data.title} className="w-24 h-16 object-cover rounded-lg shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2 className="font-bold text-lg text-white">{data.title}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${statusColor[data.status]}`}>{data.status}</span>
                    </div>
                    <p className="text-sm text-gray-400 flex items-center gap-1"><MapPin size={12}/> {data.subtitle}</p>
                  </div>
                  {saved[slug] && <div className="flex items-center gap-1 text-green-400 text-sm shrink-0"><CheckCircle size={14}/> บันทึกแล้ว</div>}
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* status */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">สถานะ</label>
                    <select value={val(slug, "status")} onChange={e => update(slug, "status", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors">
                      <option value="Available">Available</option>
                      <option value="High Demand">High Demand</option>
                      <option value="Sold Out">Sold Out</option>
                    </select>
                  </div>
                  {/* price */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><DollarSign size={10}/> ราคา</label>
                    <input type="text" value={val(slug, "price")} onChange={e => update(slug, "price", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"/>
                  </div>
                  {/* cars per day */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Activity size={10}/> รถต่อวัน</label>
                    <input type="text" value={val(slug, "carsPerDay")} onChange={e => update(slug, "carsPerDay", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"/>
                  </div>
                  {/* peak hours */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">ชั่วโมงพีค</label>
                    <input type="text" value={val(slug, "peakHours")} onChange={e => update(slug, "peakHours", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"/>
                  </div>
                  {/* avg speed */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">ความเร็วเฉลี่ย</label>
                    <input type="text" value={val(slug, "avgSpeed")} onChange={e => update(slug, "avgSpeed", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"/>
                  </div>
                  {/* viewing distance */}
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">ระยะมองเห็น</label>
                    <input type="text" value={val(slug, "viewingDistance")} onChange={e => update(slug, "viewingDistance", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"/>
                  </div>
                  {/* description */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1"><Edit3 size={10}/> คำอธิบาย</label>
                    <textarea rows={2} value={val(slug, "description")} onChange={e => update(slug, "description", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors resize-none"/>
                  </div>
                </div>

                <div className="px-6 pb-5 flex justify-end">
                  <button onClick={() => markSaved(slug)}
                    className="flex items-center gap-2 bg-[#e63946] hover:bg-[#c1303b] text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors">
                    <CheckCircle size={14}/> บันทึก
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
