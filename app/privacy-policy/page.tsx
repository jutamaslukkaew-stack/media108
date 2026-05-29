"use client";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-24 text-on-surface">
        <h1 className="text-3xl font-black text-white mb-2">นโยบายความเป็นส่วนตัว</h1>
        <p className="text-on-surface-variant mb-10 text-sm">Privacy Policy – Media108 | อัปเดตล่าสุด: พฤษภาคม 2026</p>

        <div className="space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-lg mb-3">1. ข้อมูลที่เก็บรวบรวม</h2>
            <p>Media108 เก็บรวบรวมข้อมูลส่วนบุคคลที่คุณให้ไว้ผ่านแบบฟอร์มขอใบเสนอราคา ได้แก่ ชื่อ-นามสกุล บริษัท เบอร์โทรศัพท์ อีเมล และข้อความเพิ่มเติม เพื่อใช้ในการติดต่อกลับและเสนอบริการสื่อโฆษณา</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">2. วัตถุประสงค์การใช้ข้อมูล</h2>
            <p>ข้อมูลของคุณจะถูกใช้เพื่อ (1) ติดต่อกลับเกี่ยวกับใบเสนอราคา (2) ปรับปรุงบริการของเรา และ (3) ส่งข้อมูลข่าวสารเกี่ยวกับสื่อโฆษณา (หากได้รับความยินยอม)</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">3. การแบ่งปันข้อมูล</h2>
            <p>Media108 จะไม่ขาย โอน หรือเปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สาม ยกเว้นในกรณีที่จำเป็นตามกฎหมาย</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">4. ระยะเวลาการเก็บข้อมูล</h2>
            <p>ข้อมูลจะถูกเก็บไว้ตราบเท่าที่จำเป็นสำหรับวัตถุประสงค์ที่ระบุ หรือตามที่กฎหมายกำหนด</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">5. สิทธิ์ของเจ้าของข้อมูล</h2>
            <p>คุณมีสิทธิ์เข้าถึง แก้ไข ลบ หรือคัดค้านการประมวลผลข้อมูลส่วนบุคคลของคุณ โดยติดต่อเราได้ที่ <a href="mailto:media.108.company@gmail.com" className="text-primary underline">media.108.company@gmail.com</a></p>
          </section>
          <section>
            <h2 className="text-white font-bold text-lg mb-3">6. ติดต่อ</h2>
            <p>Media108 | โทร: <a href="tel:+66625636199" className="text-primary">062-563-6199</a> | LINE: <a href="https://lin.ee/NXKWYdJ" className="text-primary" target="_blank" rel="noopener noreferrer">@media108</a></p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/contact" className="text-primary hover:underline text-sm">← กลับหน้าติดต่อ</Link>
        </div>
      </main>
    </>
  );
}
