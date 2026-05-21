import Link from "next/link";
import { FileText, CalendarCheck, Download, User, MessageCircle, type LucideIcon } from "lucide-react";

const items: {
  icon: LucideIcon;
  labelEn: string;
  labelTh: string;
  href: string;
  green: boolean;
  color: string;
  hover: string;
}[] = [
  {
    icon: FileText,
    labelEn: "Request Quotation",
    labelTh: "ขอใบเสนอราคา",
    href: "/contact#form",
    green: false,
    color: "text-primary",
    hover: "hover:bg-primary-container/20",
  },
  {
    icon: CalendarCheck,
    labelEn: "Book This Billboard",
    labelTh: "จองป้ายนี้",
    href: "/network",
    green: false,
    color: "text-secondary",
    hover: "hover:bg-secondary-container/20",
  },
  {
    icon: Download,
    labelEn: "Download Media Kit",
    labelTh: "ดาวน์โหลด Media Kit",
    href: "/media-kit",
    green: false,
    color: "text-on-surface-variant",
    hover: "hover:bg-surface-variant/40",
  },
  {
    icon: User,
    labelEn: "Contact Sales",
    labelTh: "ติดต่อฝ่ายขาย",
    href: "/contact#form",
    green: false,
    color: "text-on-surface-variant",
    hover: "hover:bg-surface-variant/40",
  },
  {
    icon: MessageCircle,
    labelEn: "LINE OA",
    labelTh: "ติดต่อผ่าน LINE",
    href: "#",
    green: true,
    color: "text-white",
    hover: "",
  },
];

export default function GlobalCTABar() {
  const nonGreen = items.filter((i) => !i.green);
  const green = items.find((i) => i.green)!;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] border-t border-border-glass bg-surface-glass backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">

      {/* ── Mobile layout ── */}
      <div className="md:hidden px-3 pt-2 pb-3 flex flex-col gap-2">
        {/* 2-column grid for non-green items */}
        <div className="grid grid-cols-2 gap-2">
          {nonGreen.map((item) => (
            <Link
              key={item.labelEn}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg group transition-all duration-200 ${item.hover}`}
            >
              <item.icon size={16} className={`${item.color} shrink-0`} />
              <div className="min-w-0">
                <span className={`block text-[8px] ${item.color} uppercase font-bold tracking-tight opacity-70 leading-none mb-0.5`}>
                  {item.labelEn}
                </span>
                <span className="block text-[11px] font-semibold text-on-surface leading-tight truncate">{item.labelTh}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* LINE OA — full width */}
        <Link
          href={green.href}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#06C755] hover:brightness-110 transition-all active:scale-95 shadow-md"
        >
          <green.icon size={16} className="text-white shrink-0" />
          <div className="text-left">
            <span className="block text-[8px] text-white/80 uppercase font-bold tracking-tight leading-none mb-0.5">
              {green.labelEn}
            </span>
            <span className="block text-[11px] font-semibold text-white leading-tight">{green.labelTh}</span>
          </div>
        </Link>
      </div>

      {/* ── Desktop layout (unchanged) ── */}
      <div className="hidden md:flex max-w-container-max mx-auto px-6 py-4 items-center justify-between gap-4">
        {items.map((item) =>
          item.green ? (
            <Link
              key={item.labelEn}
              href={item.href}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-[#06C755] hover:brightness-110 transition-all active:scale-95 shadow-lg"
            >
              <item.icon size={22} className="text-white" />
              <div className="text-left">
                <span className="block text-[10px] text-white/80 uppercase font-bold tracking-tighter">
                  {item.labelEn}
                </span>
                <span className="block font-label-md text-white whitespace-nowrap">{item.labelTh}</span>
              </div>
            </Link>
          ) : (
            <Link
              key={item.labelEn}
              href={item.href}
              className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg group transition-all duration-200 ${item.hover}`}
            >
              <item.icon size={22} className={`${item.color} group-hover:scale-110 transition-transform`} />
              <div className="text-left">
                <span className={`block text-[10px] ${item.color} uppercase font-bold tracking-tighter opacity-70`}>
                  {item.labelEn}
                </span>
                <span className="block font-label-md text-on-surface whitespace-nowrap">{item.labelTh}</span>
              </div>
            </Link>
          )
        )}
      </div>

    </div>
  );
}
