"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import TabBar from "../components/TabBar";

/* ── Data ─────────────────────────────────────────────── */
const leaders = [
  {
    name: "Somchai Rattanakosin",
    title: "Chief Executive Officer",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSiwhtCiRFBbZdwsbw5XyhCWQ1etXM1uU8VZ9lbz_o9HZuRSH6OvXZsLmtehj-1vz7K9B82TUKy-S5kqfmei7x3qQzMxgMRQv0xb2YppbAumbijBm4LUt84VnKC2r5_15lpZ3l20JdiM_PnXQjjGJUDiostjR3ekcfr5s-njbRPcZWFRrcvIWfyzENDDzMV41tFSwej9I05NGZ5r6BWX_W8BC8C9kc9yZlXlVDcp-VzA5vsKl9Xj4M3Y4oXhotBLvsWi5Rp_0AGjc",
  },
  {
    name: "Patreeya Suksiri",
    title: "Director of Media Operations",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKBt0LpuVDJBejTzwP2txil_F1_d7are4iY_clKz3Hjl4RtUBahYhGqsXY6b6DyeNq7yVHBlRjyvSBotZfsumoSSorZoavKIvuVhjebvKjmUf0H9MiZnNK4fUNl52KU4Zhj_-xmafbfmX5rVXyh9hViUeIAKpC_nMNcKzcQ1McHLNjitjtVedl_hJ2bVb5EmNpwTToWuTX6ZlUmXRXe_Wz0nJzFvHgajH4O3W49YibC3MHFUrpB679l2k1OYaVq3Nwgh8mwU27o6w",
  },
  {
    name: "Anan Wongsuwan",
    title: "Head of Tech & Innovation",
    img: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=800&h=1000&fit=crop&crop=face",
  },
];

const partnerLogos = [
  { alt: "Coca-Cola", h: "h-12", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6PoHZMlWqUk6ANVE5qFg8RYzvmmWuLwl8qWsbOyhUTwtmowBYqd9jyz39o_jgSbnsG7SK5emWp6flzUWLSs7tyVCyiXX5lpy_Vzo1Ac2Q_ShYwZmCTWgwQYMRCmfngogr6PrtbwZXEkWlYW4bnMtacCJZlwASUSJ6twrpzC0OvImgF-STAcic-bcdgwh_uQPKKObmSOUaZWdbUaxNq_LG23d-GgkR0x0aMk85JSEFm-H2FblpaEmnOV6nD37vdVoIUaLXwH18MnI" },
  { alt: "Google",    h: "h-12", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXjNs3HRtyHDSy-ez_V0csL36dOnk0GdMqQwpq_YnrSf_IoVjTiwY9zC0AZ-hGJlvbBxB3SrGwJWlvLyNbwacZ38omTIi6r1wlhDcPqw4OGnZRzZVi9ldPdc5GyB5ttfVhivfpGJxe2Vgki44wXvt6fIKKLhE4BERUkCRdkNJ9w_xdRi4HduyaQVIqWLCYotQFI14TI5bb7ycZ9VZsJSwjW_rQekrM5exgx_By9UvNgJnXyHet4K6KpXOS8rEuYRGtfUF1rq9jUJU" },
  { alt: "Toyota",    h: "h-10", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr6dN9ewDtsJvYLvVq4iKOztKbJcaXRaEuEPjvtmLH-lGFtSszoTlFWxhkrcgOYk9xUfOmJbOCgdMtkoSgFdwdXeuyAzOCl-aBS-8qQpzLJMirhx0-s_u__mbNXjBs1JRfnZt_TyUpAli6KWdWNrF6cY1LOjCjjELY5-l4HF7WqJ9BK3SybG3GqXgn34U9eeJe4-EsbNXyEpf083WxhOBi-MB14nwTZeUgz6c-mugorqmYVU3yuukCaNx6hvFRUibDJN2Ug04pQdg" },
  { alt: "Amazon",    h: "h-10", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKkOoTiNAjFiEGADVpGUd-8dhblmGNUIccbz9lx-alxOPqu-J2f8c3Z8f20pwYhl0uBs5mEHjieOaGy9qaWi8CHOWJI_Uk6U0w5hr2jNS1AngHoJPJsFS6ZfK0STohmNKWxbk424eCk__UqFcfbgtYya5yGm6sRoPo4E5EtLqmENLBgmkHhzhTHq78Y80_vqEZZHm2fC9iuD_R4JrU1DDmHTnzMPintL13b3AJBS3o6Gop2f0eXsZWz3x6d_PSDzpueiGxOut68Js" },
  { alt: "Apple",     h: "h-12", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeRdky9wVfM1kLBWeET6GJPSRqll0VdYmXxai49292vvSQagpPDuAsvvofXJW0gPS8SDuLl6JMzHzOh3osMsSG1EU8qVfK1eumvHig_YpA0NOxJ3FzzFYh0oQ6HfheEjpIstXt6Q7a7sF50fSL45xNiRibcVPpyXCr2DkuF-Y6bPazzwh4jNHplJjlC7qLj1L5Ovx7qc7ehKvoE-6Pf07ltzgTtqfFWqy7lonmC6F3Jn3nFTSUX1nc0sA6v8IaP8Z7C5h7Wmog1kk" },
];

export default function AboutPage() {
  useEffect(() => {
    /* Scroll-reveal for glass-card elements */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".glass-card").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-10", "transition-all", "duration-700", "ease-out");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar activePage="about" />

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-end pb-24 px-6 md:px-margin-desktop overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Media108 Billboard Hero"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXAcIyvYWhQFauG5XmUm0KlTMXygvTaej8_7fDuXKDRBkaJ0B5zieW88DjVCssqd_GLb6VQJ_u0wzochpGis_fXuwaL_yJ0EFMuW29-54R2BSXCXdYiqjjzkk8P4KAtIxOZXcQ0SE_YSMx9lFPay9J5ogYNd2ivKrN4iIll6HkUu5mz1jq3Qa3woKSpO_sDRxLMjX1BHpC0YI73uQ5uzRR6E7bisvCWbnxj6tl_5fzTpQC4QIU7d_l9bloaHSNgHDGNvl8x2D1Cow"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-container-max mx-auto w-full flex flex-col lg:flex-row items-end gap-16">
          {/* Left — main text */}
          <div className="flex-1 max-w-2xl">
            <span className="inline-block py-1 px-3 mb-6 bg-primary/10 border border-primary/20 text-primary font-label-md text-label-md rounded-full uppercase tracking-widest">
              Est. 2008
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-8 leading-tight">
              Redefining the{" "}
              <span className="text-primary">Urban Horizon.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-10 max-w-xl">
              Media108 is Thailand&apos;s premier DOOH and billboard network provider. We bridge the gap
              between brands and their audiences through high-impact, technologically superior media
              assets located in the nation&apos;s most strategic economic corridors.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/network"
                className="bg-primary-container text-white px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest red-glow-hover transition-all"
              >
                Explore Network
              </Link>
              <Link
                href="/media-kit"
                className="border border-white/20 text-white px-8 py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Download Kit
              </Link>
            </div>
          </div>

          {/* Right — stats panel */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-[340px]">
            {[
              { value: "16+",    label: "Years in Market",     icon: "calendar_today" },
              { value: "250+",   label: "Active Billboards",   icon: "perm_media" },
              { value: "450K+",  label: "Daily Impressions",   icon: "visibility" },
              { value: "85%",    label: "EEC Market Share",    icon: "trending_up" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
              >
                <span className="material-symbols-outlined text-primary text-2xl">{s.icon}</span>
                <div className="font-display-lg text-white text-3xl font-black leading-none">{s.value}</div>
                <div className="font-label-md text-[11px] uppercase tracking-[0.15em] text-on-surface-variant/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-24 px-6 md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Vision */}
          <div className="glass-card p-12 rounded-xl flex flex-col justify-center">
            <div className="mb-6 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl">visibility</span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6">Our Vision</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              To be the undisputed leader in media technology across Southeast Asia, transforming every
              urban surface into a canvas for meaningful brand storytelling through data-driven innovation.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-card p-12 rounded-xl flex flex-col justify-center border border-primary/20 bg-primary/5">
            <div className="mb-6 w-16 h-16 rounded-lg bg-primary flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-white mb-6">Our Mission</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Empowering advertisers with unmatched visibility and precision. We commit to maintaining the
              highest standards of hardware integrity and audience analytics to ensure every campaign
              achieves maximum ROI.
            </p>
          </div>
        </div>
      </section>

      {/* ── EEC Corridor ── */}
      <section className="py-32 px-6 md:px-margin-desktop relative">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Image */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="aspect-square glass-card rounded-2xl overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Eastern Economic Corridor"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVas6tFtrdwlaP370s6AzdHLzBCDNT8mV7GQlBCNjCOGquJtGaXzS9KJQJf1HkF2SL7rbwmf0sHM6oG9HOM8N2EUlrqS6zjULBIUW9G5oeofCtYPucRPnuFgFzjlGxwpFohsozQeWpkD-bijSONPb6fGnhAocYa4ERFAOCPMjYLcuvwwcjcbJa1fITyiYvvuDichiFokCVf90JR6kIKJPzyBKeTh2WfpIwwd8j5G2IVYEnTUvkff-DheSvYI6lLUZMZxhDuQn1b14"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-data-mono text-data-mono text-primary mb-2">Location Strategy</p>
                  <h3 className="font-headline-lg text-headline-lg text-white">Chonburi: The Gateway</h3>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h2 className="font-headline-xl text-headline-xl text-white mb-8">
                Dominating the{" "}
                <span className="text-primary">EEC Corridor.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                We recognized early that Chonburi and the Eastern Economic Corridor (EEC) represent the
                beating heart of Thailand&apos;s future economy. By concentrating our highest-fidelity digital
                assets in this zone, we offer advertisers exclusive access to a high-net-worth demographic
                of industrial leaders, international tourists, and growing middle-class residents.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">450K+</h4>
                  <p className="font-body-md text-on-surface-variant">Daily Traffic Impressions</p>
                </div>
                <div>
                  <h4 className="font-data-mono text-3xl text-primary mb-2">85%</h4>
                  <p className="font-body-md text-on-surface-variant">Market Share in EEC Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Strengths Bento ── */}
      <section className="py-32 px-6 md:px-margin-desktop bg-surface-dim">
        <div className="max-w-container-max mx-auto text-center mb-20">
          <h2 className="font-headline-xl text-headline-xl text-white mb-4">Core Strengths</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        <div
          className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
          style={{ gridAutoRows: "280px" }}
        >
          {/* Strength 1 — wide */}
          <div className="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-end group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8">
              <span className="material-symbols-outlined text-primary/30 group-hover:text-primary transition-colors text-8xl">
                precision_manufacturing
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-white mb-2">Proprietary Technology</h3>
              <p className="text-on-surface-variant max-w-md">
                Our LED boards feature custom hardware built for the tropical climate, ensuring 99.9%
                uptime and true-to-life color reproduction even in direct sunlight.
              </p>
            </div>
          </div>

          {/* Strength 2 — narrow, red */}
          <div className="md:col-span-4 bg-primary-container rounded-2xl p-8 flex flex-col justify-between shadow-xl shadow-primary/20">
            <span
              className="material-symbols-outlined text-white text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              analytics
            </span>
            <div>
              <h3 className="font-headline-md text-headline-md text-white mb-2">Audience Intelligence</h3>
              <p className="text-white/80">
                Every billboard is equipped with anonymous video analytics to provide precise demographic data.
              </p>
            </div>
          </div>

          {/* Strength 3 — narrow */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined text-primary text-5xl">verified_user</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-white mb-2">Regulatory Mastery</h3>
              <p className="text-on-surface-variant">
                100% legal compliance and structural certification for every site in our portfolio.
              </p>
            </div>
          </div>

          {/* Strength 4 — wide */}
          <div className="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffb3b1,_transparent)]" />
            <div className="relative z-10">
              <h3 className="font-headline-md text-headline-md text-white mb-2">Hyper-Local Domination</h3>
              <p className="text-on-surface-variant">
                Strategic placement at the busiest intersections and main arterial roads of Eastern
                Thailand, capturing attention where it matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="py-32 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="font-headline-xl text-headline-xl text-white mb-4">Leadership</h2>
              <p className="text-on-surface-variant font-body-lg">
                The visionaries steering Media108 toward the future of digital advertising in Thailand.
              </p>
            </div>
            <div className="hidden md:flex gap-4 mt-6 md:mt-0">
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-white">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {leaders.map((leader) => (
              <div key={leader.name} className="group">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={leader.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{
                      filter: "grayscale(1) brightness(0.72) contrast(1.25)",
                      transition: "filter 700ms ease, transform 700ms ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(0) brightness(0.85) contrast(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.filter =
                        "grayscale(1) brightness(0.72) contrast(1.25)";
                    }}
                    src={leader.img}
                  />
                  {/* Dark vignette — normalizes bright backgrounds */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 30%, rgba(6,17,51,0.55) 100%), " +
                        "linear-gradient(to top, rgba(6,17,51,0.95) 0%, rgba(6,17,51,0.2) 50%, rgba(6,17,51,0.4) 100%)",
                    }}
                  />
                  {/* Subtle primary color tint on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(230,57,70,0.12) 0%, transparent 60%)" }}
                  />
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-1">{leader.name}</h3>
                <p className="font-label-md text-label-md text-primary uppercase tracking-wider">
                  {leader.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-24 px-6 md:px-margin-desktop bg-surface-container-low border-t border-b border-border-glass">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-12">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-50 grayscale">
            {partnerLogos.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={logo.alt} alt={logo.alt} className={`${logo.h} w-auto invert`} src={logo.src} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Block ── */}
      <section className="py-20 px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto bg-primary-container rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="font-headline-xl text-headline-xl text-white mb-6">
                Ready to amplify your presence in Chonburi?
              </h2>
              <p className="font-body-lg text-white/80">
                Connect with our sales team today to receive a custom media strategy and billboard
                availability map.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                href="/contact#form"
                className="bg-white text-on-primary-container px-10 py-5 rounded-xl font-label-md text-label-md uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-xl text-center"
              >
                Contact Sales
              </Link>
              <Link
                href="/network"
                className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-label-md text-label-md uppercase tracking-widest hover:bg-white/10 transition-all text-center"
              >
                Media Network
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GlobalCTABar />

      {/* ── Footer ── */}
      <footer className="w-full py-16 px-6 md:px-margin-desktop flex flex-col items-center gap-8 bg-surface-container-lowest border-t border-border-glass pb-32 md:pb-16">
        <div className="w-full max-w-container-max grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-8 text-2xl font-black tracking-tight">
              <span className="text-primary">Media</span>
              <span className="text-white">108</span>
            </div>
            <p className="text-on-surface-variant font-body-md max-w-xs">
              Elevating the landscape of Out-of-Home advertising through precision and technology.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-headline-md text-lg mb-2">Platform</h4>
            {["Media Network", "Billboard Info", "Services"].map((l) => (
              <a key={l} className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#">
                {l}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-headline-md text-lg mb-2">Resources</h4>
            {["Download Media Kit", "Request Quotation", "Book This Billboard"].map((l) => (
              <a key={l} className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#">
                {l}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-headline-md text-lg mb-2">Connect</h4>
            {["Contact Sales", "LINE OA"].map((l) => (
              <a key={l} className="text-on-surface-variant hover:text-primary transition-colors font-body-md" href="#">
                {l}
              </a>
            ))}
            <div className="flex gap-4 mt-4">
              {["public", "alternate_email"].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-container-max pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-on-surface-variant font-body-md text-sm gap-4">
          <p>© 2024 Media108. All Rights Reserved.</p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a key={l} className="hover:text-white transition-colors" href="#">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Fixed bottom TabBar ── */}
      <TabBar />
    </>
  );
}
