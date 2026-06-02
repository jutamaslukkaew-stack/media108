import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // ตรวจ session cookie
  const session = req.cookies.get("admin_session")?.value;
  if (session !== process.env.ADMIN_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const token      = process.env.ADMIN_SECRET_TOKEN;

  if (!webhookUrl || !token) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  try {
    const res  = await fetch(`${webhookUrl}?token=${token}`, { cache: "no-store" });
    const json = await res.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("Admin quotes fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 502 });
  }
}
