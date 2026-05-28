import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, service, message } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const timestamp = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const payload = {
      timestamp,
      name: name ?? "",
      company: company ?? "",
      phone: phone ?? "",
      email: email ?? "",
      service: service ?? "",
      message: message ?? "",
    };

    const sheetRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!sheetRes.ok) {
      const text = await sheetRes.text();
      console.error("Google Sheet write failed:", text);
      return NextResponse.json(
        { error: "Failed to save data" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API /quote error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
