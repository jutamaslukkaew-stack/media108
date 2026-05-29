"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import {
  PhoneCall, Briefcase, Globe, Mail,
  MessageCircle, PlusCircle, MapPin, ChevronDown, ArrowRight, CheckCircle,
  type LucideIcon,
} from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", service: "", message: "",
  });
  const [pdpa, setPdpa] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useScrollReveal();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pdpa) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่";
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  }

  /* ── shared input/label class helpers ── */
  const inputClass = (field: string) =>
    `w-full bg-surface-container-low border rounded-lg p-4 outline-none transition-all text-on-surface placeholder:text-on-surface-variant/50 ${
      focusedField === field
        ? "border-primary ring-2 ring-primary/20"
        : "border-white/10 focus:border-primary"
    }`;
  const labelClass = (field: string) =>
    `font-label-md text-label-md uppercase tracking-widest block mb-2 transition-colors ${
      focusedField === field ? "text-primary" : "text-on-surface-variant"
    }`;

  return (
    <>
      <Navbar activePage="contact" />

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center pt-24 pb-16 px-6 md:px-margin-desktop bg-surface text-center">
        <div className="relative z-10 max-w-4xl">
          <h1
            className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight text-white"
            style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
          >
            {t("Talk to Our", "พูดคุยกับ")}{" "}
            <span className="text-primary italic">{t("Media Strategy Team", "ทีมวางกลยุทธ์สื่อของเรา")}</span>
          </h1>
          <p
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto"
            style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
          >
            {t(
              "Bridge the gap between your brand and millions of urban eyes. Our experts are ready to curate your global media footprint.",
              "บอกเราถึงเป้าหมายและงบประมาณของคุณ ทีมงานจะช่วยออกแบบกลยุทธ์สื่อและเลือกทำเลที่เหมาะสมที่สุดให้ฟรี"
            )}
          </p>
        </div>
      </section>

      {/* ── Main content grid ── */}
      <main id="form" className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 pb-32 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Contact Form (7 cols) ── */}
          <div className="sr sr-left lg:col-span-7 glass-card p-8 md:p-12 rounded-xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[2px] bg-primary shrink-0" />
              <h2 className="font-headline-md text-headline-md text-white">
                {t("Request a Quotation", "ขอใบเสนอราคา")}
              </h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <CheckCircle size={56} className="text-primary fill-current" />
                <h3 className="font-headline-md text-headline-md text-white">
                  {t("Submitted Successfully!", "ส่งข้อมูลเรียบร้อยแล้ว!")}
                </h3>
                <p className="text-on-surface-variant font-body-md max-w-sm">
                  {t(
                    "Our team will contact you within 1 business day. Thank you for trusting Media108.",
                    "ทีมงานของเราจะติดต่อกลับภายใน 1 วันทำการ ขอบคุณที่ไว้วางใจ Media108"
                  )}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError(null);
                    setForm({ name: "", company: "", phone: "", email: "", service: "", message: "" });
                    setPdpa(false);
                  }}
                  className="mt-4 border border-white/20 hover:bg-white/10 px-8 py-3 rounded-lg font-label-md text-label-md text-white transition-all"
                >
                  {t("Submit Again", "ส่งอีกครั้ง")}
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Row 1: Name + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass("name")}>{t("Full Name", "ชื่อ-นามสกุล")}</label>
                    <input
                      name="name" type="text" value={form.name} onChange={handleChange}
                      placeholder={t("John Doe", "ชื่อ นามสกุล")}
                      className={inputClass("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass("company")}>{t("Company", "บริษัท")}</label>
                    <input
                      name="company" type="text" value={form.company} onChange={handleChange}
                      placeholder={t("Your Company Ltd.", "บริษัท ของคุณ จำกัด")}
                      className={inputClass("company")}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={labelClass("phone")}>{t("Phone Number", "เบอร์โทรศัพท์")}</label>
                    <input
                      name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+66 00 000 0000"
                      className={inputClass("phone")}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass("email")}>{t("Email Address", "อีเมล")}</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="contact@company.com"
                      className={inputClass("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>

                {/* Service select */}
                <div className="space-y-2">
                  <label className={labelClass("service")}>{t("Interest / Service Type", "ประเภทบริการที่สนใจ")}</label>
                  <div className="relative">
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      className={`${inputClass("service")} appearance-none pr-10`}
                      onFocus={() => setFocusedField("service")}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">{t("Select a service or location", "เลือกบริการหรือทำเลที่สนใจ")}</option>
                      <option>{t("LED Billboard – Pattaya", "ป้าย LED – พัทยา")}</option>
                      <option>{t("LED Billboard – Sri Racha EEC", "ป้าย LED – ศรีราชา EEC")}</option>
                      <option>{t("LED Billboard – Jomtien Coastal", "ป้าย LED – จอมเทียนชายฝั่ง")}</option>
                      <option>{t("Campaign Strategy & Planning", "วางกลยุทธ์แคมเปญสื่อ")}</option>
                      <option>{t("Motion Graphic / Video Production", "Motion Graphic / ผลิตวิดีโอโฆษณา")}</option>
                      <option>{t("Full Media Package", "แพ็กเกจสื่อครบวงจร")}</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className={labelClass("message")}>{t("Additional Requirements", "ความต้องการเพิ่มเติม")}</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder={t("Tell us about your campaign goals, budget, or target audience", "บอกเราเกี่ยวกับเป้าหมายแคมเปญ งบประมาณ หรือกลุ่มเป้าหมายของคุณ")}
                    rows={4}
                    className={`${inputClass("message")} resize-none`}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* PDPA */}
                <div className="flex items-start gap-3 py-4">
                  <input
                    id="pdpa" type="checkbox" checked={pdpa} onChange={(e) => setPdpa(e.target.checked)}
                    className="mt-1 w-5 h-5 bg-surface-container-low border-white/10 rounded accent-primary cursor-pointer shrink-0"
                  />
                  <label htmlFor="pdpa" className="font-body-md text-body-md text-on-surface-variant cursor-pointer">
                    {t(
                      "I consent to the collection and processing of my personal data according to the ",
                      "ฉันยินยอมให้เก็บรวบรวมและประมวลผลข้อมูลส่วนบุคคลของฉันตาม "
                    )}
                    <a className="text-primary underline hover:text-primary/80" href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                      {t("PDPA Policy", "นโยบาย PDPA")}
                    </a>
                    {t(
                      " for the purpose of this inquiry.",
                      " เพื่อวัตถุประสงค์ในการสอบถามนี้"
                    )}
                  </label>
                </div>

                {submitError && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                    <span className="text-red-400 text-lg">⚠️</span>
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!pdpa || loading}
                  className="w-full bg-primary-container text-white font-headline-md text-headline-md py-5 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("Sending…", "กำลังส่ง…")}
                    </>
                  ) : (
                    t("Submit Proposal Request", "ส่งใบขอเสนอราคา")
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: sidebar (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* LINE OA */}
            <div className="sr sr-right sr-d1 glass-card p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <MessageCircle size={36} className="text-[#06C755]" />
                <div>
                  <h3 className="font-headline-md text-headline-md text-white">LINE Official Account</h3>
                  <p className="font-body-md text-on-surface-variant">
                    {t("Chat with us for the fastest response", "แชทกับเราเพื่อรับการตอบกลับรวดเร็วที่สุด")}
                  </p>
                </div>
              </div>
              <a
                href="https://lin.ee/NXKWYdJ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#06C755] hover:bg-[#05b14c] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-3 transition-colors font-headline-md text-headline-md"
              >
                <PlusCircle size={20} />
                {t("Add LINE OA", "เพิ่ม LINE OA")}
              </a>
            </div>

            {/* Quick links grid */}
            <div className="sr sr-right sr-d2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {([
                { icon: PhoneCall,  titleEn: "Phone",   titleTh: "โทรศัพท์",  bodyEn: "062-563-6199",                              bodyTh: "062-563-6199",                              span: false },
                { icon: Mail,       titleEn: "Email",   titleTh: "อีเมล",    bodyEn: "media.108.company@gmail.com",               bodyTh: "media.108.company@gmail.com",               span: false },
                { icon: Briefcase,  titleEn: "Careers", titleTh: "ร่วมงานกับเรา",  bodyEn: "Join the Media108 team",   bodyTh: "มาร่วมเป็นส่วนหนึ่งของทีม Media108",  span: true, arrow: true },
              ] as { icon: LucideIcon; titleEn: string; titleTh: string; bodyEn: string; bodyTh: string; span: boolean; arrow?: boolean }[]).map((item) => (
                <div
                  key={item.titleEn}
                  className={`glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer ${
                    item.span ? "col-span-1 sm:col-span-2" : ""
                  }`}
                >
                  <div className={`flex ${item.span ? "justify-between items-center" : "flex-col"}`}>
                    <div>
                      <item.icon size={22} className="text-primary mb-4 block group-hover:scale-110 transition-transform" />
                      <h4 className="font-headline-md text-headline-md text-white mb-1">{t(item.titleEn, item.titleTh)}</h4>
                      <p className="font-body-md text-on-surface-variant">{t(item.bodyEn, item.bodyTh)}</p>
                    </div>
                    {item.arrow && (
                      <ArrowRight size={20} className="text-on-surface-variant group-hover:translate-x-2 transition-transform" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Headquarters */}
            <div className="sr sr-right sr-d3 glass-card p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary p-3 rounded-full shadow-lg shadow-primary/20 shrink-0">
                  <MapPin size={20} className="text-on-primary" />
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-white">{t("Headquarters", "สำนักงานใหญ่")}</h3>
                  <p className="font-body-md text-on-surface-variant">{t("Chonburi, Thailand", "ชลบุรี, ประเทศไทย")}</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
                <p className="font-label-md text-label-md text-white mb-1">Media108 Digital Hub</p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  {t("Industrial Estate Road, 20130", "ถนนนิคมอุตสาหกรรม 20130")}
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-border-glass pt-20 pb-28">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
            {/* Brand */}
            <div className="md:col-span-1 space-y-4">
              <div className="text-2xl font-black tracking-tight">
                <span className="text-primary">Media</span><span className="text-white">108</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {t(
                  "Precision DOOH Media Solutions for the Modern Era.",
                  "เครือข่ายสื่อโฆษณา LED ชั้นนำในพื้นที่ EEC ชลบุรี–พัทยา"
                )}
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">
                {t("Navigation", "นำทาง")}
              </h5>
              <nav className="flex flex-col gap-2">
                {([
                  { en: "Home",         th: "หน้าหลัก",     href: "/" },
                  { en: "About",        th: "เกี่ยวกับเรา",  href: "/about" },
                  { en: "Media Network",th: "เครือข่ายสื่อ", href: "/network" },
                  { en: "Our Services", th: "บริการของเรา",  href: "/services" },
                  { en: "Contact Us",   th: "ติดต่อเรา",     href: "/contact" },
                ] as { en: string; th: string; href: string }[]).map((l) => (
                  <Link key={l.en} href={l.href} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
                    {t(l.en, l.th)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Media Focus */}
            <div className="space-y-4">
              <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">
                {t("Media Focus", "จุดเน้นสื่อ")}
              </h5>
              <nav className="flex flex-col gap-2">
                {([
                  { en: "Pattaya Digital Hub",  th: "พัทยา ดิจิทัล ฮับ",  href: "/billboard/pattaya-sukhumvit-01" },
                  { en: "Chonburi Strategic",   th: "ชลบุรี สตราทีจิค",    href: "/billboard/pattaya-gateway" },
                  { en: "Bang Saen Network",    th: "เครือข่ายบางแสน",     href: "/billboard" },
                  { en: "EEC Industrial Belt",  th: "เขต EEC อุตสาหกรรม",  href: "/billboard/eec-tech-square" },
                ] as { en: string; th: string; href: string }[]).map((l) => (
                  <Link key={l.en} className="text-on-surface-variant hover:text-primary transition-colors text-sm" href={l.href}>
                    {t(l.en, l.th)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h5 className="font-label-md text-label-md text-primary uppercase tracking-widest">
                {t("Connect", "ติดต่อ")}
              </h5>
              <div className="flex gap-3">
                <a href="https://lin.ee/NXKWYdJ" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded bg-surface-container flex items-center justify-center hover:bg-[#06C755]/20 transition-colors">
                  <Globe size={20} className="text-primary" />
                </a>
                <a href="mailto:media.108.company@gmail.com"
                  className="w-10 h-10 rounded bg-surface-container flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Mail size={20} className="text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border-glass flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-on-surface-variant font-label-md text-sm">
              © 2024 MEDIA108. {t("All rights reserved.", "สงวนลิขสิทธิ์ทุกประการ")} Precision DOOH Media Solutions.
            </div>
            <div className="flex items-center gap-6 text-on-surface-variant font-label-md text-sm">
              <span>Region: <span className="text-on-surface font-bold">TH-EEC</span></span>
              <span className="flex items-center gap-2">
                {t("Status", "สถานะ")}:{" "}
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{" "}
                {t("Optimal", "ปกติ")}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
