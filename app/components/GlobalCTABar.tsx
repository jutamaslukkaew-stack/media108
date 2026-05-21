import Link from "next/link";

const items = [
  {
    icon: "request_quote",
    labelEn: "Request Quotation",
    labelTh: "ขอใบเสนอราคา",
    href: "/contact#form",
    green: false,
    color: "text-primary",
    hover: "hover:bg-primary-container/20",
  },
  {
    icon: "event_available",
    labelEn: "Book This Billboard",
    labelTh: "จองป้ายนี้",
    href: "/network",
    green: false,
    color: "text-secondary",
    hover: "hover:bg-secondary-container/20",
  },
  {
    icon: "download",
    labelEn: "Download Media Kit",
    labelTh: "ดาวน์โหลด Media Kit",
    href: "/media-kit",
    green: false,
    color: "text-on-surface-variant",
    hover: "hover:bg-surface-variant/40",
  },
  {
    icon: "person",
    labelEn: "Contact Sales",
    labelTh: "ติดต่อฝ่ายขาย",
    href: "/contact#form",
    green: false,
    color: "text-on-surface-variant",
    hover: "hover:bg-surface-variant/40",
  },
  {
    icon: "chat",
    labelEn: "LINE OA",
    labelTh: "ติดต่อผ่าน LINE",
    href: "#",
    green: true,
    color: "text-white",
    hover: "",
  },
];

export default function GlobalCTABar() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] border-t border-border-glass bg-surface-glass backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-container-max mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {items.map((item) =>
          item.green ? (
            <Link
              key={item.labelEn}
              href={item.href}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-[#06C755] hover:brightness-110 transition-all active:scale-95 shadow-lg"
            >
              <span
                className="material-symbols-outlined text-white text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
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
              <span
                className={`material-symbols-outlined ${item.color} text-2xl group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </span>
              <div className="text-left">
                <span
                  className={`block text-[10px] ${item.color} uppercase font-bold tracking-tighter opacity-70`}
                >
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
