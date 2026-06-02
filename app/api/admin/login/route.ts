import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_session", process.env.ADMIN_SECRET_TOKEN ?? "", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    maxAge:   60 * 60 * 8, // 8 ชั่วโมง
    path:     "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_session");
  return res;
}
