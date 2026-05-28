/**
 * Media108 – Quote Form → Google Sheets
 * ======================================
 * วิธีติดตั้ง:
 * 1. เปิด Google Sheets ใหม่ → Extensions → Apps Script
 * 2. วาง code นี้ทั้งหมดแทน code เดิม
 * 3. กด Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy URL ที่ได้ → วางใน .env.local:
 *    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/...
 */

var SHEET_NAME = "Quotes"; // ชื่อ Sheet ที่จะบันทึก (จะสร้างอัตโนมัติถ้ายังไม่มี)

var HEADERS = [
  "วันเวลา (TH)",
  "ชื่อ-นามสกุล",
  "บริษัท",
  "เบอร์โทรศัพท์",
  "อีเมล",
  "บริการที่สนใจ",
  "ข้อความเพิ่มเติม"
];

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // สร้าง Sheet ใหม่ถ้ายังไม่มี
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);

      // ตั้ง style หัวตาราง
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground("#1a1a2e");
      headerRange.setFontColor("#e63946");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, HEADERS.length, 180);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp  || new Date().toLocaleString("th-TH"),
      data.name       || "",
      data.company    || "",
      data.phone      || "",
      data.email      || "",
      data.service    || "",
      data.message    || ""
    ]);

    // แจ้งเตือนอีเมล (optional — ลบ comment ถ้าต้องการ)
    // MailApp.sendEmail({
    //   to: "media.108.company@gmail.com",
    //   subject: "📋 ใบเสนอราคาใหม่จาก " + (data.name || "ลูกค้า"),
    //   htmlBody: buildEmailHtml(data),
    // });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ทดสอบได้โดยรัน doGet จาก browser
function doGet() {
  return ContentService
    .createTextOutput("Media108 Quote Webhook is running ✅")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ฟังก์ชัน helper สำหรับส่งอีเมล (ถ้าเปิดใช้งาน)
function buildEmailHtml(data) {
  return [
    "<h2 style='color:#e63946'>📋 ใบขอเสนอราคาใหม่ – Media108</h2>",
    "<table style='border-collapse:collapse;width:100%'>",
    row("วันเวลา",        data.timestamp),
    row("ชื่อ-นามสกุล",  data.name),
    row("บริษัท",        data.company),
    row("เบอร์โทร",      data.phone),
    row("อีเมล",         data.email),
    row("บริการที่สนใจ", data.service),
    row("ข้อความ",       data.message),
    "</table>",
    "<hr><p style='color:#888;font-size:12px'>Media108 CRM System</p>"
  ].join("");
}

function row(label, value) {
  return "<tr><td style='padding:8px 12px;background:#f5f5f5;font-weight:bold;border:1px solid #ddd;width:160px'>"
    + label + "</td><td style='padding:8px 12px;border:1px solid #ddd'>"
    + (value || "-") + "</td></tr>";
}
