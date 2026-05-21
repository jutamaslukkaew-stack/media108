"use client";

import React, { use, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import GlobalCTABar from "../../components/GlobalCTABar";
import { billboards } from "../../data/billboards";
import type { BillboardData } from "../../data/billboards";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import {
  ArrowRight, Download, Play, MapPin, BookOpen, Users, TrendingUp,
  Handshake, CheckCircle, ArrowUpRight, ShoppingCart, GraduationCap,
  Hospital, Building2, Store, Umbrella, Hotel, Factory, Ship, Utensils,
  type LucideIcon,
} from "lucide-react";

/* ── Map material-symbol strings → Lucide components ── */
const iconMap: Record<string, LucideIcon> = {
  shopping_cart:  ShoppingCart,
  school:         GraduationCap,
  local_hospital: Hospital,
  apartment:      Building2,
  local_mall:     Store,
  beach_access:   Umbrella,
  hotel:          Hotel,
  factory:        Factory,
  directions_boat: Ship,
  local_dining:   Utensils,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BillboardDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const data = billboards[slug];
  if (!data) notFound();
  return <BillboardDetail data={data!} />;
}

/* ─────────────────────────────────────────────────────── */
function BillboardDetail({ data }: { data: BillboardData }) {
  useScrollReveal();

  useEffect(() => {
    const onScroll = () => {
      const img = document.getElementById("hero-bg-img");
      if (img) img.style.transform = `translateY(${window.pageYOffset * 0.35}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); };
  }, []);

  const heroImg = data.imgHero ?? data.imgNight ?? data.imgDay;

  return (
    <>
      <Navbar activePage="billboard" />

      <main className="kinetic-bg w-full pb-24">

        {/* ── 1. Hero ── */}
        <section className="relative min-h-[85vh] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="hero-bg-img"
              alt={data.title}
              className="w-full h-full object-cover will-change-transform"
              src={heroImg}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-desktop pb-20">
            <div className="flex flex-col gap-6 max-w-3xl">
              <div
                className="flex items-center gap-3 flex-wrap"
                style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
              >
                <span className="px-3 py-1 bg-primary-container/20 border border-primary-container/30 rounded-full text-primary-container text-xs font-bold uppercase tracking-widest">
                  {data.tag}
                </span>
                <span className="text-outline text-xs font-data-mono uppercase tracking-widest">{data.subtitle}</span>
              </div>
              <h1
                className="font-headline-xl text-headline-xl text-white leading-none"
                style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s both" }}
              >
                {data.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-primary-container">{data.title.split(" ").slice(-2).join(" ")}</span>
              </h1>
              <p
                className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed"
                style={{ animation: "hero-entry 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
              >
                {data.description}
              </p>
              <div
                className="flex flex-wrap gap-4 pt-4"
                style={{ animation: "hero-entry 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s both" }}
              >
                <button className="bg-primary-container hover:brightness-110 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(230,57,70,0.3)]">
                  Request Immediate Quote
                  <ArrowRight size={18} />
                </button>
                <button className="glass-card hover:bg-white/10 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all">
                  <Download size={18} />
                  Download Media Kit
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Visual Performance ── */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">Visual Performance</h2>
              <p className="text-outline">Engineered for 24/7 visibility in any atmospheric condition.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sr sr-up space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Day View" className="w-full h-full object-cover" src={data.imgDay} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center text-on-surface-variant">Day Visibility (10,000 Nits)</p>
            </div>
            <div className="sr sr-up space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Night View" className="w-full h-full object-cover brightness-75" src={data.imgNight} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center text-on-surface-variant">Night Impact (Dynamic Contrast)</p>
            </div>
            <div className="sr sr-up space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden glass-card relative group cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Drone View" className="w-full h-full object-cover opacity-60" src={data.imgDrone ?? data.imgDay} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary-container/20 border border-primary-container/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={36} className="text-primary-container fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center text-on-surface-variant">Drone Fly-through Preview</p>
            </div>
          </div>
        </section>

        {/* ── 3. Strategic Dominance ── */}
        <section className="py-24 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="sr sr-left space-y-8">
              <h2 className="font-headline-lg text-headline-lg text-white">
                Strategic <span className="text-primary-container">Dominance</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {data.strategicDescription ?? data.locationStory}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.nearby.map((place) => {
                  const PlaceIcon = iconMap[place.icon] ?? MapPin;
                  return (
                  <div key={place.name} className="flex items-start gap-4">
                    <PlaceIcon size={20} className="text-primary-container mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">{place.name}</p>
                      <p className="text-sm text-outline">{place.distance}</p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
            <div className="sr sr-right glass-card rounded-2xl overflow-hidden aspect-square relative border border-white/10">
              <div className="absolute inset-0 bg-[#0A1128] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`Map – ${data.title}`}
                  className="w-full h-full object-cover opacity-50 grayscale contrast-125"
                  src={data.mapImg}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-primary-container rounded-full animate-ping absolute inset-0 opacity-75" />
                  <div className="w-8 h-8 bg-primary-container rounded-full relative flex items-center justify-center border-4 border-surface shadow-2xl">
                    <MapPin size={12} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Performance Data ── */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg text-white mb-12">Performance Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Daily Reach", value: data.carsPerDay, sub: "Estimated Daily Impressions", accent: true },
              { label: "Avg. Speed", value: data.avgSpeed, sub: "Ensuring Long Exposure", accent: false },
              { label: "View Duration", value: data.viewingDuration, sub: "Continuous Line-of-sight", accent: false },
              { label: "Peak Window", value: data.peakHours.split("–")[0].trim(), sub: "Rush Hour Saturation", accent: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`sr sr-up glass-card p-8 rounded-2xl ${item.accent ? "border-l-4 border-l-primary-container" : ""}`}
              >
                <p className="text-outline text-xs uppercase tracking-widest mb-4">{item.label}</p>
                <p className="font-data-mono text-3xl text-white mb-2">{item.value}</p>
                <p className="text-sm text-on-surface-variant">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Audience Insights ── */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row gap-24">
              <div className="sr sr-left flex-1 space-y-8">
                <h2 className="font-headline-lg text-headline-lg text-white">
                  Audience <span className="text-primary-container">Composition</span>
                </h2>
                <div className="space-y-6">
                  {data.audienceBreakdown.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>{item.label}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sr sr-right flex-1 glass-card p-12 rounded-2xl flex flex-col justify-center items-center text-center">
                <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                  <div
                    className="absolute inset-0 rounded-full border-[12px] border-primary-container"
                    style={{
                      background: `conic-gradient(transparent ${data.visibilityBar * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                    }}
                  />
                  <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />
                  <span className="font-data-mono text-3xl text-white relative z-10">{data.visibilityBar}%</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-2">High Impact Score</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Proprietary score based on visibility, dwell time, and demographic value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. The Sales Story ── */}
        <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { icon: BookOpen,    title: "The Location Story", body: data.locationStory },
              { icon: Users,       title: "The Audience Story", body: data.audienceStory },
              { icon: TrendingUp,  title: "The Traffic Story",  body: data.trafficStory },
              { icon: Handshake,   title: "Business Fit",       body: data.businessFit },
            ] as { icon: LucideIcon; title: string; body: string }[]).map((item) => (
              <div
                key={item.title}
                className="sr sr-up p-10 border border-border-glass rounded-2xl hover:border-primary-container/40 transition-colors"
              >
                <item.icon size={36} className="text-primary-container mb-6 block" />
                <h3 className="font-headline-md text-headline-md text-white mb-4">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Technical Specifications ── */}
        <section className="py-24 bg-surface-container-highest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <h2 className="font-headline-lg text-headline-lg text-white mb-12">Technical Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-glass border border-border-glass rounded-2xl overflow-hidden">
              {data.specs.map((spec) => (
                <div key={spec.label} className="bg-surface p-8">
                  <p className="text-outline text-xs uppercase mb-2 tracking-wide">{spec.label}</p>
                  <p className={`font-data-mono text-lg ${spec.label === "Smart Sync" ? "text-primary-container" : "text-white"}`}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="sr sr-up mt-8 flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg glass-card border border-border-glass text-white font-bold hover:bg-white/10 transition-all">
                <Download size={18} />
                Download Media Kit (PDF)
              </button>
            </div>
          </div>
        </section>

        {/* ── 8. Investment Tiers ── */}
        {data.pricingTiers && (
          <section className="py-24 max-w-container-max mx-auto px-margin-desktop">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-white mb-4">Investment Tiers</h2>
              <p className="text-on-surface-variant">Flexible options tailored for campaign scale and duration.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`sr sr-up glass-card p-10 rounded-2xl flex flex-col items-center text-center relative overflow-hidden ${tier.highlight ? "border border-primary-container/60" : ""}`}
                >
                  {tier.highlight && (
                    <div className="absolute top-0 right-0 bg-primary-container text-white px-4 py-1 text-xs font-bold uppercase tracking-tight">
                      Most Popular
                    </div>
                  )}
                  <p className="text-xs uppercase tracking-widest mb-6 text-outline">{tier.label}</p>
                  <p className="font-headline-md text-headline-md text-white mb-2">{tier.name}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-headline-lg text-headline-lg text-primary-container">{tier.price}</span>
                    {tier.unit && <span className="text-sm text-outline">{tier.unit}</span>}
                  </div>
                  <ul className="space-y-4 mb-10 text-on-surface-variant w-full text-left">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-400 flex-shrink-0 fill-green-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-auto w-full py-4 rounded-lg font-bold transition-all ${
                      tier.highlight
                        ? "bg-primary-container text-white hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] active:scale-95"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {tier.ctaLabel}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 8b. Recent Campaigns ── */}
        {data.recentCampaigns && data.recentCampaigns.length > 0 && (
          <section className="py-20 bg-surface-container-lowest border-t border-border-glass">
            <div className="max-w-container-max mx-auto px-margin-desktop">
              <div className="sr sr-up mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-[1px] bg-primary-container" />
                  <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase">Real Campaigns</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-white mb-2">ตัวอย่างแคมเปญบนป้ายนี้</h2>
                <p className="text-on-surface-variant text-sm">แบรนด์และธุรกิจที่เคยลงโฆษณาจริงบนป้ายนี้</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {data.recentCampaigns.map((c, i) => (
                  <div
                    key={i}
                    className="sr sr-up glass-card rounded-xl p-4 border border-border-glass hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0 group-hover:bg-primary-container transition-colors" />
                      <div>
                        <p className="text-on-surface font-semibold text-sm leading-snug mb-1">{c.name}</p>
                        <p className="text-on-surface-variant text-[11px] tracking-wide uppercase">{c.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 9. Related Billboards ── */}
        <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">Related Locations</h2>
              <p className="text-on-surface-variant">ขยายขอบเขตการเข้าถึงด้วยป้ายใกล้เคียงในโครงข่าย Media Network</p>
            </div>
            <Link href="/network" className="text-primary-container font-bold flex items-center gap-2 hover:underline whitespace-nowrap text-sm uppercase tracking-widest">
              View All <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.related.map((rel) => (
              <div key={rel.slug} className="sr sr-scale glass-card rounded-2xl overflow-hidden group">
                <div className="h-56 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={rel.img}
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded text-white text-xs font-bold uppercase backdrop-blur ${
                    rel.status === "High Demand" ? "bg-primary-container/80" : "bg-surface-container-highest/80"
                  }`}>
                    {rel.status}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline-md text-headline-md text-white mb-1">{rel.title}</h3>
                  <p className="text-on-surface-variant mb-6">{rel.subtitle}</p>
                  <Link
                    href={`/billboard/${rel.slug}`}
                    className="block w-full text-center bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg border border-white/10 transition-colors font-bold text-sm"
                  >
                    ดูรายละเอียดป้ายนี้
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="bg-surface-container-lowest border-t border-white/10 py-24 pb-36">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div>
            <div className="text-2xl font-black tracking-tight mb-6">
              <span className="text-primary-container">Media</span><span className="text-white">108</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Precision DOOH Media Solutions for high-level advertisers and agency partners.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">Quick Links</h4>
            {["Privacy Policy", "Terms of Service", "Contact Support", "Global Network"].map((l) => (
              <a key={l} className="text-on-surface-variant hover:text-primary-container transition-colors text-sm" href="#">{l}</a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">Contact</h4>
            <p className="text-on-surface-variant text-sm">info@media108.com</p>
            <p className="text-on-surface-variant text-sm">+66 (0) 108 108 108</p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-primary-container font-bold text-xs uppercase tracking-widest mb-2">Social</h4>
            <div className="flex gap-4">
              {["FB", "IG", "LN"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-white transition-all text-sm font-bold">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-desktop mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-xs">© 2024 Media108. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="text-on-surface-variant text-xs">GLOBAL PARTNER PROGRAM</span>
            <span className="text-on-surface-variant text-xs">ISO 27001 CERTIFIED</span>
          </div>
        </div>
      </footer>
    </>
  );
}
