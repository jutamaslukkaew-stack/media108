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
 *      ADMIN_SECRET_TOKEN=media108admin2025
 * 8. Restart dev server: npm run dev
 */

// ─── ตั้งค่า ───────────────────────────────────────────────────────────────────
var SHEET_NAME  = "รายชื่อลูกค้า";
var ADMIN_TOKEN = "media108admin2025"; // ← ต้องตรงกับ ADMIN_SECRET_TOKEN ใน .env.local

var HEADERS = [
  "ลำดับ", "วันเวลา (TH)", "ชื่อ-นามสกุล", "บริษัท / องค์กร",
  "เบอร์โทรศัพท์", "อีเมล", "บริการที่สนใจ", "ข้อความเพิ่มเติม",
  "สถานะ", "หมายเหตุ"
];

// ─── รับข้อมูลจากฟอร์ม (POST) ────────────────────────────────────────────────
function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { sheet = ss.insertSheet(SHEET_NAME); setupHeader(sheet); }

    var data   = JSON.parse(e.postData.contents);
    var rowNum = sheet.getLastRow();

    sheet.appendRow([
      rowNum,
      data.timestamp || thaiNow(),
      data.name      || "",
      data.company   || "",
      data.phone     || "",
      data.email     || "",
      data.service   || "",
      data.message   || "",
      "🟡 รอติดต่อ",
      ""
    ]);

    MailApp.sendEmail({
      to:       "media.108.company@gmail.com",
      subject:  "📋 ใบเสนอราคาใหม่จาก " + (data.name || "ลูกค้า") + " – Media108",
      htmlBody: buildEmailHtml(data, rowNum),
    });

    return jsonOut({ result: "success" });
  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return jsonOut({ result: "error", message: err.message });
  }
}

// ─── ส่งข้อมูลกลับให้ Admin Panel (GET) ──────────────────────────────────────
function doGet(e) {
  var token = e && e.parameter && e.parameter.token;
  if (token !== ADMIN_TOKEN) {
    return jsonOut({ error: "Unauthorized" });
  }
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return jsonOut({ data: [], total: 0 });

    var values = sheet.getDataRange().getValues();
    if (values.length <= 1) return jsonOut({ data: [], total: 0 });

    var headers = values[0];
    var rows = values.slice(1).map(function(row, i) {
      var obj = { _row: i + 2 };
      headers.forEach(function(h, j) { obj[h] = row[j]; });
      return obj;
    }).reverse(); // เรียงจากใหม่สุด

    return jsonOut({ data: rows, total: rows.length });
  } catch (err) {
    return jsonOut({ error: err.message });
  }
}

// ─── ตั้ง style หัวตาราง ──────────────────────────────────────────────────────
function setupHeader(sheet) {
  sheet.appendRow(HEADERS);
  var r = sheet.getRange(1, 1, 1, HEADERS.length);
  r.setBackground("#1a1a2e"); r.setFontColor("#e63946");
  r.setFontWeight("bold"); r.setFontSize(11);
  r.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  [60,160,160,180,130,200,200,250,120,200].forEach(function(w,i){ sheet.setColumnWidth(i+1,w); });
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["🟡 รอติดต่อ","🔵 ติดต่อแล้ว","🟠 เสนอราคาแล้ว","🟢 ปิดงาน","🔴 ยกเลิก"], true).build();
  sheet.getRange(2, 9, 499, 1).setDataValidation(rule);
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function thaiNow() {
  return new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
}
function buildEmailHtml(data, rowNum) {
  return ["<div style='font-family:sans-serif;max-width:600px'>",
    "<h2 style='color:#e63946'>📋 ใบขอเสนอราคาใหม่</h2>",
    "<p style='color:#666'>Media108 – ลูกค้าลำดับที่ "+rowNum+"</p>",
    "<table style='border-collapse:collapse;width:100%;margin-top:16px'>",
    tr("วันเวลา",data.timestamp||thaiNow()), tr("ชื่อ-นามสกุล",data.name),
    tr("บริษัท",data.company), tr("เบอร์โทร",data.phone),
    tr("อีเมล",data.email), tr("บริการที่สนใจ",data.service),
    tr("ข้อความ",data.message), "</table></div>"].join("");
}
function tr(label, value) {
  return "<tr><td style='padding:8px 12px;background:#f5f5f5;font-weight:bold;border:1px solid #ddd;width:140px'>"+
    label+"</td><td style='padding:8px 12px;border:1px solid #ddd'>"+(value||"-")+"</td></tr>";
}
