"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import GlobalCTABar from "../../components/GlobalCTABar";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { getPostBySlug, getAllPosts } from "../../data/posts";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  useScrollReveal();
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Navbar activePage="blog" />
      <main className="min-h-screen bg-background pb-24">

        {/* Hero */}
        <section className="relative pt-24 pb-0 overflow-hidden">
          <div className="absolute inset-0 h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.titleTh}
              className="w-full h-full object-cover opacity-30 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>

          <div className="relative max-w-3xl mx-auto px-margin-desktop pt-12 pb-10">
            {/* Back */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-outline hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> {" บทความทั้งหมด"}
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-outline text-xs"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-1.5 text-outline text-xs"><Clock size={12} /> {post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">
              {post.titleTh}
            </h1>

            {/* Excerpt */}
            <p className="text-on-surface-variant text-lg leading-relaxed border-l-4 border-primary-container/60 pl-5">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-margin-desktop">
          <div
            className="prose-media text-on-surface-variant leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Keywords */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2 items-center">
              <Tag size={14} className="text-outline" />
              {post.keywords.map((kw) => (
                <span key={kw} className="text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant border border-white/5">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-10 glass-card rounded-2xl p-8 border border-primary-container/20 bg-primary-container/5">
            <h3 className="font-headline-md text-white mb-3">
              สนใจลงโฆษณาป้าย LED ในชลบุรี–พัทยา?
            </h3>
            <p className="text-on-surface-variant text-sm mb-6">
              ทีม Media108 พร้อมให้คำแนะนำและจัดทำใบเสนอราคาให้ฟรี ไม่มีข้อผูกมัด
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-primary-container text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-primary transition-colors"
              >
                ขอใบเสนอราคาฟรี →
              </Link>
              <Link
                href="/billboard"
                className="border border-white/20 text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-white/5 transition-colors"
              >
                ดูทำเลป้ายทั้งหมด
              </Link>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="max-w-container-max mx-auto px-margin-desktop mt-16">
            <h2 className="font-headline-lg text-white mb-6">บทความที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <div className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary-container/30 transition-all flex gap-4 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.coverImage}
                      alt={p.titleTh}
                      className="w-24 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                    <div>
                      <span className="text-primary text-xs font-bold uppercase tracking-widest">{p.category}</span>
                      <h3 className="text-white text-sm font-bold mt-1 group-hover:text-primary-container transition-colors line-clamp-2">
                        {p.titleTh}
                      </h3>
                      <span className="text-primary-container text-xs flex items-center gap-1 mt-2">
                        อ่านต่อ <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <GlobalCTABar />
    </>
  );
}
