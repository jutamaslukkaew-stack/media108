import Link from "next/link";
import { FileText, MousePointerClick, Download, HelpCircle, MessageCircle, type LucideIcon } from "lucide-react";

const tabs: { icon: LucideIcon; label: string; href: string; cls: string }[] = [
  {
    icon: FileText,
    label: "ขอใบเสนอราคา",
    href: "/contact#form",
    cls: "bg-surface-bright hover:bg-primary",
  },
  {
    icon: MousePointerClick,
    label: "จองป้ายนี้",
    href: "/network",
    cls: "bg-surface-bright hover:bg-primary",
  },
  {
    icon: Download,
    label: "ดาวน์โหลด Media Kit",
    href: "/media-kit",
    cls: "bg-surface-bright hover:bg-primary",
  },
  {
    icon: HelpCircle,
    label: "ติดต่อฝ่ายขาย",
    href: "/contact#form",
    cls: "bg-primary-container shadow-lg shadow-primary/20 hover:scale-105",
  },
  {
    icon: MessageCircle,
    label: "LINE OA",
    href: "#",
    cls: "bg-[#06C755] hover:brightness-110",
  },
];

export default function TabBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-surface-container/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex flex-wrap justify-center items-center gap-4">
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-label-md text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${tab.cls}`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
