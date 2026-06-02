"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import GlobalCTABar from "../components/GlobalCTABar";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import { getAllPosts } from "../data/posts";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

export default function BlogPage() {
  useScrollReveal();
  const { t } = useLanguage();

  const categories = [
    t("All", "ทั้งหมด"),
    t("Advertising Guide", "คู่มือโฆษณา"),
    t("Tourism & Hotel", "ท่องเที่ยว & โรงแรม"),
    t("SME & Local Business", "SME & ธุรกิจท้องถิ่น"),
    t("Real Estate", "อสังหาริมทรัพย์"),
  ];
  const posts = getAllPosts();

  return (
    <>
      <Navbar activePage="blog" />
      <main className="min-h-screen bg-background pb-24">

        {/* Hero */}
        <section className="relative pt-28 pb-16 px-margin-desktop overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-highest/50 to-transparent" />
          <div className="relative max-w-container-max mx-auto">
            <div className="sr sr-up">
              <span className="text-primary font-label-md text-[11px] tracking-[0.2em] uppercase mb-3 block">
                {t("Insights & Articles", "บทความและข้อมูลเชิงลึก")}
              </span>
              <h1 className="font-headline-xl text-headline-xl text-white mb-4">
                {t("Media & Advertising", "สื่อโฆษณา")} <span className="text-primary-container">{t("Insights", "& ข้อมูลเชิงลึก")}</span>
              </h1>
              <div className="h-1 w-20 bg-primary rounded-full mb-6" />
              <p className="text-on-surface-variant font-body-lg max-w-2xl">
                {t(
                  "Practical guides, location insights and marketing tips for businesses advertising in Chonburi–Pattaya.",
                  "คู่มือ ข้อมูลทำเล และเทคนิคการตลาดสำหรับธุรกิจที่ต้องการโฆษณาในชลบุรี–พัทยา"
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="max-w-container-max mx-auto px-margin-desktop">

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`text-xs px-4 py-2 rounded-full border font-bold transition-all ${
                  cat === t("All", "ทั้งหมด")
                    ? "bg-primary-container border-primary-container text-white"
                    : "border-white/10 text-outline hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {posts[0] && (
            <Link href={`/blog/${posts[0].slug}`} className="block mb-10 group">
              <div className="sr sr-up glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-container/30 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={posts[0].coverImage}
                      alt={posts[0].titleTh}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60" />
                    <span className="absolute top-4 left-4 bg-primary-container text-white text-xs font-bold px-3 py-1 rounded-full">
                      {t("Featured", "แนะนำ")}
                    </span>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                      {t(posts[0].categoryEn, posts[0].category)}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-white mb-4 group-hover:text-primary-container transition-colors">
                      {t(posts[0].titleEn, posts[0].titleTh)}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3">
                      {posts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-outline text-xs">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {posts[0].date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {posts[0].readTime}</span>
                      </div>
                      <span className="text-primary-container text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t("Read more", "อ่านต่อ")} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className={`sr sr-up sr-d${i + 1} glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-container/30 transition-all h-full flex flex-col`}>
                  <div className="relative aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.titleTh}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
                      {t(post.categoryEn, post.category)}
                    </span>
                    <h3 className="font-headline-md text-white mb-3 group-hover:text-primary-container transition-colors line-clamp-2">
                      {t(post.titleEn, post.titleTh)}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 text-outline text-xs">
                        <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                      </div>
                      <span className="text-primary-container text-xs font-bold flex items-center gap-1">
                        {t("Read", "อ่าน")} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center py-24 text-outline">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p>{t("No articles yet", "ยังไม่มีบทความ")}</p>
            </div>
          )}
        </section>
      </main>
      <GlobalCTABar />
    </>
  );
}
