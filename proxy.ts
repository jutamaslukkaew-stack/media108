import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ปิดเว็บชั่วคราว: ทุกหน้าจะแสดง /coming-soon
// เปิดเว็บจริงเมื่อพร้อม: ตั้ง env MAINTENANCE_MODE=false แล้ว deploy ใหม่ (หรือลบไฟล์นี้)
const MAINTENANCE = process.env.MAINTENANCE_MODE !== "false";

export function proxy(request: NextRequest) {
  if (!MAINTENANCE) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.rewrite(url);
}

export const config = {
  // ยกเว้น: หน้า coming-soon เอง, admin, api, ไฟล์ระบบ และไฟล์รูป/static
  matcher: [
    "/((?!coming-soon|admin|api|_next/static|_next/image|favicon.ico|robots.txt|media-logo.png|.*\\.(?:png|jpg|jpeg|webp|svg|gif|ico|pdf)$).*)",
  ],
};
