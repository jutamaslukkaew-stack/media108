"use client";

import { useState } from "react";
import { billboards } from "../data/billboards";
import type { BillboardData } from "../data/billboards";
import {
  Lock, LogOut, Edit3, CheckCircle, AlertCircle,
  MapPin, DollarSign, Activity, FileText, Copy, Download,
} from "lucide-react";

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "media108admin";

/* ─── tiny helpers ─────────────────────────────────────── */
const statusColor: Record<BillboardData["status"], string> = {
  "Available":   "bg-green-500/20 text-green-400 border-green-500/30",
  "High Demand": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Sold Out":    "bg-red-500/20 text-red-400 border-red-500/30",
};

/* ─── types ─────────────────────────────────────────────── */
type EditableFields = Pick<BillboardData, "price" | "status" | "description" | "carsPerDay" | "peakHours" | "viewingDistance" | "avgSpeed">;

/* ──────────────────────────────────────────────────────── */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError]       = useState("");
  const [edits, setEdits]       = useState<Record<string, Partial<EditableFields>>>({});
  const [saved, setSaved]       = useState<Record<string, boolean>>({});
  const [copied, setCopied]     = useState(false);

  /* ── login ── */
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASS) { setLoggedIn(true); setError(""); }
    else setError("รหัสผ่านไม่ถูกต้อง");
  }

  /* ── field change ── */
  function update(slug: string, field: keyof EditableFields, value: string) {
    setEdits(prev => ({ ...prev, [slug]: { ...prev[slug], [field]: value } }));
    setSaved(prev => ({ ...prev, [slug]: false }));
  }

  /* ── mark saved (UI only — export JSON to apply changes in code) ── */
  function markSaved(slug: string) {
    setSaved(prev => ({ ...prev, [slug]: true }));
  }

  /* ── export updated JSON ── */
  function exportJSON() {
    const updated = Object.fromEntries(
      Object.entries(billboards).map(([slug, data]) => [
        slug,
        { ...data, ...(edits[slug] ?? {}) },
      ])
    );
    const json = JSON.stringify(updated, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "billboards-updated.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── copy JSON to clipboard ── */
  async function copyJSON() {
    const updated = Object.fromEntries(
      Object.entries(billboards).map(([slug, data]) => [
        slug,
        { ...data, ...(edits[slug] ?? {}) },
      ])
    );
    await navigator.clipboard.writeText(JSON.stringify(updated, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /* ── get current value (edit state or original) ── */
  function val<K extends keyof EditableFields>(slug: string, field: K): string {
    return String((edits[slug]?.[field] ?? billboards[slug][field]) ?? "");
  }

  /* ── login screen ── */
  if (!loggedIn) return (
    <div className="min-h-screen bg-[#020b2e] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-black mb-2">
            <span className="text-[#e63946]">Media</span><span className="text-white">108</span>
          </div>
          <p className="text-gray-400 text-sm">Admin Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-9 pr-4 text-white placeholder:text-gray-600 outline-none focus:border-[#e63946] transition-colors"
              autoFocus
            />
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#e63946] hover:bg-[#c1303b] text-white font-bold py-3 rounded-lg transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );

  /* ── dashboard ── */
  return (
    <div className="min-h-screen bg-[#020b2e] text-white">
      {/* header */}
      <header className="sticky top-0 z-50 bg-[#020b2e]/95 backdrop-blur border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black">
              <span className="text-[#e63946]">Media</span><span className="text-white">108</span>
            </span>
            <span className="text-gray-500 text-sm">/ Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyJSON}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy JSON"}
            </button>
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 bg-[#e63946]/20 hover:bg-[#e63946]/30 border border-[#e63946]/30 text-[#e63946] px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors"
            >
              <LogOut size={14} /> ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* notice */}
        <div className="mb-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3">
          <FileText size={18} className="text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-300">
            <strong>วิธีใช้:</strong> แก้ไขข้อมูลด้านล่าง → กด &quot;บันทึก&quot; → กด <strong>Export JSON</strong> หรือ <strong>Copy JSON</strong>
            แล้วส่งให้ Developer นำไปอัปเดตไฟล์ <code className="bg-white/10 px-1 rounded text-xs">app/data/billboards.ts</code>
          </div>
        </div>

        {/* billboard cards */}
        <div className="space-y-6">
          {Object.entries(billboards).map(([slug, data]) => (
            <div key={slug} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {/* card header */}
              <div className="flex items-start gap-4 p-6 border-b border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.imgDay}
                  alt={data.title}
                  className="w-24 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h2 className="font-bold text-lg text-white">{data.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${statusColor[data.status]}`}>
                      {data.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin size={12} /> {data.subtitle}
                  </p>
                </div>
                {saved[slug] && (
                  <div className="flex items-center gap-1 text-green-400 text-sm shrink-0">
                    <CheckCircle size={14} /> บันทึกแล้ว
                  </div>
                )}
              </div>

              {/* editable fields */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* status */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">สถานะ</label>
                  <select
                    value={val(slug, "status")}
                    onChange={e => update(slug, "status", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"
                  >
                    <option value="Available">Available</option>
                    <option value="High Demand">High Demand</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>

                {/* price */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <DollarSign size={10} /> ราคา
                  </label>
                  <input
                    type="text"
                    value={val(slug, "price")}
                    onChange={e => update(slug, "price", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                {/* cars per day */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Activity size={10} /> รถต่อวัน
                  </label>
                  <input
                    type="text"
                    value={val(slug, "carsPerDay")}
                    onChange={e => update(slug, "carsPerDay", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                {/* peak hours */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">ชั่วโมงพีค</label>
                  <input
                    type="text"
                    value={val(slug, "peakHours")}
                    onChange={e => update(slug, "peakHours", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                {/* avg speed */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">ความเร็วเฉลี่ย</label>
                  <input
                    type="text"
                    value={val(slug, "avgSpeed")}
                    onChange={e => update(slug, "avgSpeed", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                {/* viewing distance */}
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">ระยะมองเห็น</label>
                  <input
                    type="text"
                    value={val(slug, "viewingDistance")}
                    onChange={e => update(slug, "viewingDistance", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                {/* description – full width */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Edit3 size={10} /> คำอธิบาย
                  </label>
                  <textarea
                    rows={2}
                    value={val(slug, "description")}
                    onChange={e => update(slug, "description", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#e63946] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* save button */}
              <div className="px-6 pb-5 flex justify-end">
                <button
                  onClick={() => markSaved(slug)}
                  className="flex items-center gap-2 bg-[#e63946] hover:bg-[#c1303b] text-white font-bold px-6 py-2 rounded-lg text-sm transition-colors"
                >
                  <CheckCircle size={14} /> บันทึก
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
