import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: { absolute: "Media108 | เร็วๆ นี้" },
  robots: { index: false, follow: false },
};

export default function ComingSoon() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-8 px-4 text-center bg-background text-on-background">
      <Image src="/media-logo.png" alt="Media108" width={180} height={60} priority className="h-auto w-[180px]" />
      <div className="space-y-3 max-w-xl">
        <h1 className="font-[family-name:var(--font-montserrat)] text-3xl sm:text-4xl font-bold">
          เร็วๆ นี้
        </h1>
        <p className="text-lg opacity-80">
          เว็บไซต์ Media108 กำลังเตรียมพร้อมเปิดให้บริการ
        </p>
        <p className="text-sm opacity-60">Our website is coming soon.</p>
      </div>
      <a href="tel:0802399353" className="rounded-full border border-primary/40 px-6 py-3 text-primary hover:bg-primary/10 transition-colors">
        ติดต่อ 080-239-9353
      </a>
    </main>
  );
}
