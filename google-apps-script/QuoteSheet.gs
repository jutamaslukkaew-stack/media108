/**
 * Media108 – Quote Form → Google Sheets
 * ======================================
 * วิธีติดตั้ง:
 * 1. เปิดไฟล์ Google Sheets ที่ชื่อ "Media.108 รายชื่อข้อมูลลูกค้า"
 * 2. ไปที่เมนู Extensions → Apps Script
 * 3. ลบ code เดิมทั้งหมด แล้ววาง code นี้แทน
 * 4. กด 💾 Save → ตั้งชื่อ Project: "Media108 Quote Hook"
 * 5. กด Deploy → New deployment
 *      - Type:             Web App
 *      - Execute as:       Me
 *      - Who has access:   Anyone
 * 6. กด Deploy → อนุมัติ Permission → Copy URL
 * 7. วาง URL ใน .env.local ของโปรเจกต์:
 *      GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 * 8. Restart dev server: npm run dev
 */

// ─── ตั้งค่า ───────────────────────────────────────────────────────────────────
var SHEET_NAME = "รายชื่อลูกค้า";   // ชื่อ tab ใน Google Sheets (จะสร้างให้อัตโนมัติ)

var HEADERS = [
  "ลำดับ",
  "วันเวลา (TH)",
  "ชื่อ-นามสกุล",
  "บริษัท / องค์กร",
  "เบอร์โทรศัพท์",
  "อีเมล",
  "บริการที่สนใจ",
  "ข้อความเพิ่มเติม",
  "สถานะ",        // รอติดต่อ / ติดต่อแล้ว / เสนอราคาแล้ว / ปิดงาน
  "หมายเหตุ"
];

// ─── รับข้อมูลจากฟอร์ม ────────────────────────────────────────────────────────
function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // ── สร้าง tab ใหม่ถ้ายังไม่มี ──
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      setupHeader(sheet);
    }

    var data = JSON.parse(e.postData.contents);

    // นับลำดับจากแถวที่มีอยู่ (หักหัวตาราง 1 แถว)
    var nextRow = sheet.getLastRow();           // แถวล่าสุดที่มีข้อมูล
    var rowNum  = (nextRow < 1 ? 0 : nextRow); // ถ้าแถวแรกเป็น header → 0 ลูกค้า

    sheet.appendRow([
      rowNum,                                              // ลำดับ
      data.timestamp || thaiNow(),                        // วันเวลา
      data.name      || "",                               // ชื่อ
      data.company   || "",                               // บริษัท
      data.phone     || "",                               // เบอร์โทร
      data.email     || "",                               // อีเมล
      data.service   || "",                               // บริการ
      data.message   || "",                               // ข้อความ
      "🟡 รอติดต่อ",                                      // สถานะเริ่มต้น
      ""                                                  // หมายเหตุ (ว่าง)
    ]);

    // ── ส่งอีเมลแจ้งเตือนเมื่อมีใบเสนอราคาใหม่ ──
    MailApp.sendEmail({
      to:       "media.108.company@gmail.com",
      subject:  "📋 ใบเสนอราคาใหม่จาก " + (data.name || "ลูกค้า") + " – Media108",
      htmlBody: buildEmailHtml(data, rowNum),
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── ทดสอบ: เปิด URL ใน browser ──────────────────────────────────────────────
function doGet() {
  return ContentService
    .createTextOutput("✅ Media108 Quote Webhook กำลังทำงาน")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ─── ตั้ง style หัวตาราง ──────────────────────────────────────────────────────
function setupHeader(sheet) {
  sheet.appendRow(HEADERS);

  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground("#1a1a2e");
  headerRange.setFontColor("#e63946");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);

  // ตั้งความกว้างแต่ละคอลัมน์
  var widths = [60, 160, 160, 180, 130, 200, 200, 250, 120, 200];
  for (var i = 0; i < widths.length; i++) {
    sheet.setColumnWidth(i + 1, widths[i]);
  }

  // เพิ่ม dropdown สถานะในคอลัมน์ที่ 9 (สถานะ) สำหรับแถว 2 ถึง 500
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "🟡 รอติดต่อ",
      "🔵 ติดต่อแล้ว",
      "🟠 เสนอราคาแล้ว",
      "🟢 ปิดงาน",
      "🔴 ยกเลิก"
    ], true)
    .build();
  sheet.getRange(2, 9, 499, 1).setDataValidation(rule);
}

// ─── helpers ─────────────────────────────────────────────────────────────────
function thaiNow() {
  return new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
}

function buildEmailHtml(data, rowNum) {
  return [
    "<div style='font-family:sans-serif;max-width:600px'>",
    "<h2 style='color:#e63946;margin-bottom:4px'>📋 ใบขอเสนอราคาใหม่</h2>",
    "<p style='color:#666;margin-top:0'>Media108 – ลูกค้าลำดับที่ " + rowNum + "</p>",
    "<table style='border-collapse:collapse;width:100%;margin-top:16px'>",
    tr("วันเวลา",        data.timestamp || thaiNow()),
    tr("ชื่อ-นามสกุล",  data.name),
    tr("บริษัท",        data.company),
    tr("เบอร์โทร",      data.phone),
    tr("อีเมล",         data.email),
    tr("บริการที่สนใจ", data.service),
    tr("ข้อความ",       data.message),
    "</table>",
    "<div style='margin-top:24px;padding:12px 16px;background:#f0f9ff;border-radius:8px;border-left:4px solid #e63946'>",
    "<p style='margin:0;font-size:13px;color:#333'>",
    "ดูข้อมูลทั้งหมดได้ใน Google Sheets: <b>Media.108 รายชื่อข้อมูลลูกค้า</b>",
    "</p></div>",
    "<hr style='margin-top:24px'><p style='color:#aaa;font-size:11px'>Media108 CRM – automated message</p>",
    "</div>"
  ].join("");
}

function tr(label, value) {
  return [
    "<tr>",
    "<td style='padding:8px 12px;background:#f5f5f5;font-weight:bold;border:1px solid #ddd;width:140px;color:#333'>",
    label,
    "</td>",
    "<td style='padding:8px 12px;border:1px solid #ddd;color:#333'>",
    (value || "<span style='color:#aaa'>-</span>"),
    "</td></tr>"
  ].join("");
}
