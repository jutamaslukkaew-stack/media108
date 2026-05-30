export interface NearbyLandmark {
  icon: string;
  name: string;
  distance: string;
}

export interface RelatedBillboard {
  slug: string;
  title: string;
  subtitle: string;
  status: "Available" | "High Demand" | "Sold Out";
  img: string;
}

export interface PricingTier {
  label: string;
  name: string;
  price: string;
  unit: string;
  features: string[];
  highlight?: boolean;
  ctaLabel: string;
}

export interface BillboardData {
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  status: "Available" | "High Demand" | "Sold Out";

  // Visual preview
  imgHero?: string;
  imgDay: string;
  imgNight: string;
  imgDrone?: string;

  // Map coordinates (lat/lng for OpenStreetMap embed)
  mapLat?: number;
  mapLng?: number;

  // Strategic section description
  strategicDescription?: string;

  // Specs
  specs: { label: string; value: string }[];

  // Stories
  locationStory: string;
  audienceStory: string;
  trafficStory: string;
  businessFit: string;

  // Analytics — Traffic
  carsPerDay: string;
  motorcyclesPerDay: string;
  peakHours: string;

  // Analytics — Visibility
  visibilityBar: number; // 0-100
  viewingDistance: string;
  avgSpeed: string;
  viewingDuration: string;

  // Analytics — Audience
  ageRange: string;
  audienceBreakdown: { label: string; pct: number; color: string }[];

  // Map
  mapImg: string;
  nearby: NearbyLandmark[];

  // Pricing tiers (optional — overrides single price display)
  pricingTiers?: PricingTier[];

  // Recent campaigns that have run on this billboard
  recentCampaigns?: { name: string; category: string }[];

  // Related
  related: RelatedBillboard[];
}

export const billboards: Record<string, BillboardData> = {
  /* ════════════════════════════════════════════════════════
     BANGSAEN ZONE  (3 sites)
  ════════════════════════════════════════════════════════ */
  "bangsaen-galaxy-junction": {
    slug: "bangsaen-galaxy-junction",
    tag: "บางแสน",
    title: "แยกแกแล็คซี่ บางแสน",
    subtitle: "ถนนลงหาดบางแสน, ชลบุรี",
    description: "จุดเข้าหาดบางแสนที่มีรถชะลอหน้าไฟแดง เป็นเส้นหลักเข้าแหล่งท่องเที่ยวชายฝั่งที่คึกคักที่สุดของชลบุรี",
    price: "฿28,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    imgDrone: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "14m × 7m" },
      { label: "Resolution",      value: "1920 × 960" },
      { label: "Pixel Pitch",     value: "P8.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "8 Shared" },
      { label: "Operating Hours", value: "06:00 – 24:00" },
    ],
    locationStory: "แยกที่รถทุกคันต้องหยุดรอไฟแดงก่อนลงหาดบางแสน ป้ายตรงนี้คือสิ่งแรกที่นักท่องเที่ยวเห็นก่อนถึงชายหาด",
    audienceStory: "นักท่องเที่ยวสุดสัปดาห์, นักศึกษามหาวิทยาลัยบูรพา และชุมชนท้องถิ่นแสนสุข รวมกว่า 80,000 คนต่อวัน",
    trafficStory: "ไฟแดงบริเวณนี้ทำให้รถหยุดนาน 60–90 วินาที สร้าง Impression คุณภาพสูงต่อโฆษณา",
    businessFit: "เหมาะกับร้านอาหาร รีสอร์ท ผลิตภัณฑ์ FMCG และบริการท้องถิ่น",
    carsPerDay: "80,000+",
    motorcyclesPerDay: "30,000+",
    peakHours: "08:00 – 11:00, 16:00 – 20:00",
    visibilityBar: 78,
    viewingDistance: "300m+",
    avgSpeed: "10 km/h",
    viewingDuration: "60s",
    ageRange: "18 – 45",
    audienceBreakdown: [
      { label: "นักท่องเที่ยว", pct: 50, color: "bg-primary" },
      { label: "นักศึกษา",      pct: 30, color: "bg-primary-container" },
      { label: "คนพื้นที่",     pct: 20, color: "bg-white" },
    ],
    mapLat: 13.2841, mapLng: 100.9168,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "beach_access",  name: "หาดบางแสน",           distance: "500m" },
      { icon: "school",        name: "มหาวิทยาลัยบูรพา",    distance: "1.5 km" },
      { icon: "shopping_cart", name: "ตลาดบางแสน",          distance: "800m" },
    ],
    related: [
      { slug: "bangsaen-burapha-university", title: "บางแสน ม.บูรพา",       subtitle: "บางแสน, ชลบุรี", status: "Available", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" },
      { slug: "pattaya-dolphin-roundabout",  title: "วงเวียนปลาโลมา พัทยา", subtitle: "พัทยาเหนือ",     status: "Available", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
    ],
  },

  "bangsaen-burapha-university": {
    slug: "bangsaen-burapha-university",
    tag: "บางแสน",
    title: "บางแสน หน้า ม.บูรพา",
    subtitle: "ถนนลงหาดบางแสน หน้ามหาวิทยาลัยบูรพา",
    description: "ใกล้มหาวิทยาลัยบูรพาและชุมชนรอบมหาวิทยาลัย มีรถเข้า-ออกบางแสนตลอดวัน กลุ่มเป้าหมายหลักคือนักศึกษาและผู้ปกครอง",
    price: "฿25,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "12m × 6m" },
      { label: "Resolution",      value: "1920 × 960" },
      { label: "Pixel Pitch",     value: "P8.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "8 Shared" },
      { label: "Operating Hours", value: "06:00 – 23:00" },
    ],
    locationStory: "หน้ามหาวิทยาลัยบูรพา จุดบรรจบของนักศึกษากว่า 20,000 คน และนักท่องเที่ยวที่เดินทางสู่หาดบางแสนทุกวัน",
    audienceStory: "นักศึกษา ผู้ปกครอง และชุมชนรอบมหาวิทยาลัย รวมถึงนักท่องเที่ยวที่ใช้เส้นทางนี้",
    trafficStory: "รถเข้า-ออกมหาวิทยาลัยตลอด 18 ชั่วโมง ช่วงเช้าและเย็นมีปริมาณจราจรหนาแน่นเป็นพิเศษ",
    businessFit: "เหมาะกับแอปพลิเคชัน สถาบันการศึกษา Fast Food และสินค้าไลฟ์สไตล์สำหรับวัยรุ่น",
    carsPerDay: "65,000+",
    motorcyclesPerDay: "25,000+",
    peakHours: "07:30 – 09:00, 16:30 – 18:30",
    visibilityBar: 74,
    viewingDistance: "280m+",
    avgSpeed: "15 km/h",
    viewingDuration: "45s",
    ageRange: "18 – 35",
    audienceBreakdown: [
      { label: "นักศึกษา",    pct: 55, color: "bg-primary" },
      { label: "ผู้ปกครอง",   pct: 25, color: "bg-primary-container" },
      { label: "นักท่องเที่ยว", pct: 20, color: "bg-white" },
    ],
    mapLat: 13.2856, mapLng: 100.9250,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "school",       name: "มหาวิทยาลัยบูรพา",  distance: "100m" },
      { icon: "beach_access", name: "หาดบางแสน",         distance: "1.2 km" },
      { icon: "local_cafe",   name: "ย่านร้านอาหารนักศึกษา", distance: "300m" },
    ],
    related: [
      { slug: "bangsaen-galaxy-junction", title: "แยกแกแล็คซี่ บางแสน", subtitle: "บางแสน, ชลบุรี", status: "Available", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
      { slug: "bangsaen-tech-college",    title: "บางแสน วิทยาลัยเทคนิค", subtitle: "บางแสน, ชลบุรี", status: "Available", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
    ],
  },

  "bangsaen-tech-college": {
    slug: "bangsaen-tech-college",
    tag: "บางแสน",
    title: "วิทยาลัยเทคนิคบางแสน ฝั่งสุขุมวิท",
    subtitle: "ทางเข้าวิทยาลัยเทคนิคบางแสน, สุขุมวิท",
    description: "จุดเชื่อมถนนสุขุมวิทสู่บางแสน มีสถานศึกษาและรถผ่านจากเมืองชลบุรี–ศรีราชาตลอดวัน",
    price: "฿22,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "10m × 5m" },
      { label: "Resolution",      value: "1920 × 960" },
      { label: "Pixel Pitch",     value: "P8.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "8 Shared" },
      { label: "Operating Hours", value: "06:00 – 22:00" },
    ],
    locationStory: "ทางเข้าวิทยาลัยเทคนิคบางแสนบนถนนสุขุมวิท เส้นหลักที่เชื่อมชลบุรี–ศรีราชา–บางแสน",
    audienceStory: "นักเรียนอาชีวศึกษา รถสัญจรสุขุมวิท และผู้อยู่อาศัยในย่านชุมชนโดยรอบ",
    trafficStory: "ถนนสุขุมวิทเป็นเส้นทางหลักของภาคตะวันออก มีรถผ่านตลอด 18 ชั่วโมง",
    businessFit: "เหมาะกับโรงเรียนกวดวิชา อาหาร เครื่องนุ่งห่ม และสินค้าวัยรุ่น",
    carsPerDay: "55,000+",
    motorcyclesPerDay: "20,000+",
    peakHours: "07:00 – 09:00, 16:00 – 18:00",
    visibilityBar: 70,
    viewingDistance: "250m+",
    avgSpeed: "40 km/h",
    viewingDuration: "22s",
    ageRange: "15 – 40",
    audienceBreakdown: [
      { label: "นักเรียน/นักศึกษา", pct: 50, color: "bg-primary" },
      { label: "ผู้สัญจรสุขุมวิท",  pct: 35, color: "bg-primary-container" },
      { label: "คนพื้นที่",          pct: 15, color: "bg-white" },
    ],
    mapLat: 13.2800, mapLng: 100.9200,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "school",        name: "วิทยาลัยเทคนิคบางแสน", distance: "50m" },
      { icon: "directions_car", name: "ถนนสุขุมวิท",          distance: "0m" },
      { icon: "beach_access",  name: "หาดบางแสน",             distance: "2.5 km" },
    ],
    related: [
      { slug: "bangsaen-galaxy-junction",    title: "แยกแกแล็คซี่ บางแสน",    subtitle: "บางแสน, ชลบุรี", status: "Available", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
      { slug: "chonburi-tech-college-sukhumvit", title: "วิทยาลัยเทคโนโลยีชลบุรี", subtitle: "เมืองชลบุรี",     status: "Available", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80" },
    ],
  },

  /* ════════════════════════════════════════════════════════
     MUEANG CHONBURI ZONE  (2 sites)
  ════════════════════════════════════════════════════════ */
  "chonburi-tech-college-sukhumvit": {
    slug: "chonburi-tech-college-sukhumvit",
    tag: "เมืองชลบุรี",
    title: "วิทยาลัยเทคโนโลยีชลบุรี ถนนสุขุมวิท",
    subtitle: "หน้าวิทยาลัยเทคโนโลยีชลบุรี, ถนนสุขุมวิท",
    description: "ติดถนนสุขุมวิทใจกลางเมืองชลบุรี เหมาะกับรถวิ่งผ่านระยะไกล ใกล้ย่านการศึกษาและเมือง",
    price: "฿30,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "16m × 8m" },
      { label: "Resolution",      value: "1920 × 960" },
      { label: "Pixel Pitch",     value: "P6.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "10 Shared" },
      { label: "Operating Hours", value: "06:00 – 24:00" },
    ],
    locationStory: "บนถนนสุขุมวิทหน้าวิทยาลัยเทคโนโลยีชลบุรี เส้นเลือดใหญ่ที่เชื่อมทุกอำเภอในชลบุรี",
    audienceStory: "นักเรียน ผู้ปกครอง และรถที่เดินทางเข้าเมืองชลบุรีจากทิศเหนือและใต้",
    trafficStory: "ถนนสุขุมวิทบริเวณนี้มีรถผ่านกว่า 90,000 คันต่อวัน ครอบคลุมทั้งรถส่วนตัวและรถโดยสาร",
    businessFit: "เหมาะกับโรงเรียนกวดวิชา ประกันภัย รถยนต์ และสินค้าอุปโภคบริโภค",
    carsPerDay: "90,000+",
    motorcyclesPerDay: "35,000+",
    peakHours: "07:00 – 09:00, 17:00 – 19:00",
    visibilityBar: 80,
    viewingDistance: "400m+",
    avgSpeed: "45 km/h",
    viewingDuration: "32s",
    ageRange: "20 – 50",
    audienceBreakdown: [
      { label: "ผู้สัญจรสุขุมวิท", pct: 55, color: "bg-primary" },
      { label: "นักเรียน/ผู้ปกครอง", pct: 30, color: "bg-primary-container" },
      { label: "คนในเมืองชลบุรี",   pct: 15, color: "bg-white" },
    ],
    mapLat: 13.3611, mapLng: 100.9809,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "school",           name: "วิทยาลัยเทคโนโลยีชลบุรี", distance: "50m" },
      { icon: "directions_car",   name: "ถนนสุขุมวิท",             distance: "0m" },
      { icon: "location_city",    name: "เมืองชลบุรี",              distance: "2 km" },
    ],
    related: [
      { slug: "chonburi-city-school-zone", title: "โรงเรียนกลางเมืองชลบุรี", subtitle: "เมืองชลบุรี", status: "Available", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80" },
      { slug: "sriracha-robinson-junction", title: "แยก Robinson ศรีราชา", subtitle: "ศรีราชา",     status: "Available", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
    ],
  },

  "chonburi-city-school-zone": {
    slug: "chonburi-city-school-zone",
    tag: "เมืองชลบุรี",
    title: "โซนโรงเรียนกลางเมืองชลบุรี",
    subtitle: "ใกล้ รร.ชลกันยานุกูล–ชลราษฎรอำรุง, เมืองชลบุรี",
    description: "โซนโรงเรียนใหญ่ 2 แห่งกลางเมืองชลบุรี เหมาะกับกลุ่มครอบครัว นักเรียน ผู้ปกครอง และคนทำงาน",
    price: "฿28,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "14m × 7m" },
      { label: "Resolution",      value: "1920 × 960" },
      { label: "Pixel Pitch",     value: "P8.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "8 Shared" },
      { label: "Operating Hours", value: "06:00 – 22:00" },
    ],
    locationStory: "หน้าโรงเรียนชลกันยานุกูลและชลราษฎรอำรุง สองโรงเรียนดังกลางเมืองชลบุรีที่นักเรียนรวมกันกว่า 5,000 คน",
    audienceStory: "ครอบครัว ผู้ปกครอง และคนทำงานในเมืองชลบุรี รวมถึงรถที่ผ่านเส้นทางหลักของเมือง",
    trafficStory: "ชั่วโมงเร่งด่วนเช้า-เย็น มีปริมาณจราจรหนาแน่นจากการรับ-ส่งนักเรียนและคนทำงาน",
    businessFit: "เหมาะกับร้านค้าเครื่องเขียน อาหาร ประกันชีวิต สถาบันกวดวิชา และสินค้าครอบครัว",
    carsPerDay: "75,000+",
    motorcyclesPerDay: "28,000+",
    peakHours: "07:00 – 08:30, 15:30 – 18:00",
    visibilityBar: 76,
    viewingDistance: "320m+",
    avgSpeed: "20 km/h",
    viewingDuration: "55s",
    ageRange: "25 – 50",
    audienceBreakdown: [
      { label: "ครอบครัว/ผู้ปกครอง", pct: 45, color: "bg-primary" },
      { label: "คนทำงาน",             pct: 35, color: "bg-primary-container" },
      { label: "นักเรียน",            pct: 20, color: "bg-white" },
    ],
    mapLat: 13.3627, mapLng: 100.9834,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "school",        name: "รร.ชลกันยานุกูล",     distance: "200m" },
      { icon: "school",        name: "รร.ชลราษฎรอำรุง",     distance: "400m" },
      { icon: "location_city", name: "ตลาดกลางเมืองชลบุรี", distance: "800m" },
    ],
    related: [
      { slug: "chonburi-tech-college-sukhumvit", title: "วิทยาลัยเทคโนโลยีชลบุรี", subtitle: "เมืองชลบุรี", status: "Available", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
      { slug: "sriracha-robinson-junction",       title: "แยก Robinson ศรีราชา",     subtitle: "ศรีราชา",     status: "Available", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
    ],
  },

  /* ════════════════════════════════════════════════════════
     SI RACHA ZONE  (3 sites)
  ════════════════════════════════════════════════════════ */
  "sriracha-robinson-junction": {
    slug: "sriracha-robinson-junction",
    tag: "ศรีราชา",
    title: "แยก Robinson ศรีราชา",
    subtitle: "ถนนสุขุมวิท หน้า Robinson Sriracha",
    description: "แลนด์มาร์กกลางเมืองศรีราชา รถสุขุมวิทหนาแน่นและมีคนเข้าออกห้างสูง ทำเลระดับพรีเมียมของศรีราชา",
    price: "฿40,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    imgDrone: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "18m × 10m" },
      { label: "Resolution",      value: "3840 × 2160 (4K)" },
      { label: "Pixel Pitch",     value: "P6.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "10 Shared" },
      { label: "Operating Hours", value: "06:00 – 24:00" },
    ],
    locationStory: "แยกหน้า Robinson Sriracha คือหัวใจของเมืองศรีราชา รถจากสุขุมวิทและถนนเชื่อมทุกสายต้องผ่านจุดนี้",
    audienceStory: "คนทำงานในนิคมอุตสาหกรรม ครอบครัวที่มาช้อปปิ้ง และผู้สัญจรทั้งไทยและต่างชาติ (ชาวญี่ปุ่น เกาหลี)",
    trafficStory: "แยกที่มีไฟจราจรและมีรถรวมกว่า 120,000 คันต่อวัน ทั้งรถยนต์นั่ง รถบรรทุก และรถโดยสาร",
    businessFit: "เหมาะกับแบรนด์นิตยสาร รถยนต์ อสังหาฯ อาหาร ร้านค้าปลีก และบริการชาวต่างชาติ",
    carsPerDay: "120,000+",
    motorcyclesPerDay: "40,000+",
    peakHours: "07:30 – 09:00, 17:00 – 19:00",
    visibilityBar: 88,
    viewingDistance: "400m+",
    avgSpeed: "15 km/h",
    viewingDuration: "55s",
    ageRange: "22 – 55",
    audienceBreakdown: [
      { label: "คนทำงาน/นิคม", pct: 50, color: "bg-primary" },
      { label: "ครอบครัว",     pct: 30, color: "bg-primary-container" },
      { label: "ต่างชาติ",     pct: 20, color: "bg-white" },
    ],
    mapLat: 13.1281, mapLng: 100.9239,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "shopping_cart",  name: "Robinson Sriracha",       distance: "50m" },
      { icon: "directions_car", name: "ถนนสุขุมวิท",            distance: "0m" },
      { icon: "business",       name: "นิคมอุตสาหกรรมศรีราชา", distance: "5 km" },
    ],
    related: [
      { slug: "sriracha-central-mall",      title: "Central Si Racha",     subtitle: "ศรีราชา", status: "Available", img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80" },
      { slug: "sriracha-assumption-school", title: "แยกอัสสัมชัญ ศรีราชา", subtitle: "ศรีราชา", status: "Available", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80" },
    ],
  },

  "sriracha-central-mall": {
    slug: "sriracha-central-mall",
    tag: "ศรีราชา",
    title: "โซน Central Si Racha",
    subtitle: "ถนนสุขุมวิท หน้า Central Si Racha",
    description: "จุดรวมคนและรถสูงสุดในศรีราชา เหมาะกับแบรนด์ร้านอาหาร คาเฟ่ อสังหาฯ คลินิก และบริการท้องถิ่น",
    price: "฿42,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    imgDrone: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "20m × 10m" },
      { label: "Resolution",      value: "3840 × 2160 (4K)" },
      { label: "Pixel Pitch",     value: "P6.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "10 Shared" },
      { label: "Operating Hours", value: "06:00 – 24:00" },
    ],
    locationStory: "หน้า Central Si Racha บนสุขุมวิท ศูนย์รวมการค้าที่ใหญ่ที่สุดในศรีราชา รองรับฐานลูกค้าจากทุกกลุ่ม",
    audienceStory: "ครอบครัว คนทำงาน นักช้อป และนักท่องเที่ยว ครบทุก Demographic ที่แบรนด์ต้องการ",
    trafficStory: "จุดรวมรถสูงสุดในศรีราชา ทั้งรถส่วนตัว รถรับจ้าง และรถขนส่ง มีผู้คนผ่านกว่า 130,000 คัน/วัน",
    businessFit: "เหมาะกับ Mass Market ทุกประเภท ทั้ง FMCG อาหาร ท่องเที่ยว และอสังหาริมทรัพย์",
    carsPerDay: "130,000+",
    motorcyclesPerDay: "45,000+",
    peakHours: "10:00 – 21:00",
    visibilityBar: 90,
    viewingDistance: "450m+",
    avgSpeed: "20 km/h",
    viewingDuration: "60s",
    ageRange: "20 – 55",
    audienceBreakdown: [
      { label: "ครอบครัว/นักช้อป", pct: 45, color: "bg-primary" },
      { label: "คนทำงาน",           pct: 35, color: "bg-primary-container" },
      { label: "นักท่องเที่ยว",     pct: 20, color: "bg-white" },
    ],
    mapLat: 13.1297, mapLng: 100.9215,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "shopping_cart",  name: "Central Si Racha",        distance: "50m" },
      { icon: "local_hospital", name: "คลินิกและโรงพยาบาลย่าน", distance: "300m" },
      { icon: "business",       name: "อาคารสำนักงานรอบห้าง",   distance: "200m" },
    ],
    related: [
      { slug: "sriracha-robinson-junction", title: "แยก Robinson ศรีราชา", subtitle: "ศรีราชา", status: "Available",    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
      { slug: "sriracha-assumption-school", title: "แยกอัสสัมชัญ ศรีราชา", subtitle: "ศรีราชา", status: "Available", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80" },
    ],
  },

  "sriracha-assumption-school": {
    slug: "sriracha-assumption-school",
    tag: "ศรีราชา",
    title: "แยกโรงเรียนอัสสัมชัญ ศรีราชา",
    subtitle: "ถนนสุขุมวิท หน้าโรงเรียนอัสสัมชัญศรีราชา",
    description: "โรงเรียนใหญ่และเป็นจุดที่คนพื้นที่รู้จักดี รถชะลอเข้าเมืองและผ่านสุขุมวิท เหมาะกับกลุ่มครอบครัวและการศึกษา",
    price: "฿32,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "14m × 8m" },
      { label: "Resolution",      value: "1920 × 960" },
      { label: "Pixel Pitch",     value: "P8.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "8 Shared" },
      { label: "Operating Hours", value: "06:00 – 22:00" },
    ],
    locationStory: "หน้าโรงเรียนอัสสัมชัญศรีราชา โรงเรียนที่เป็นแลนด์มาร์กและเป็นที่รู้จักของทุกคนในศรีราชา",
    audienceStory: "นักเรียน ผู้ปกครอง และคนทำงานที่สัญจรบนสุขุมวิทเข้า-ออกเมืองศรีราชาทุกวัน",
    trafficStory: "เป็นจุดที่รถชะลอก่อนเข้าเมืองศรีราชา ผสานกับปริมาณจราจรช่วงรับ-ส่งนักเรียน",
    businessFit: "เหมาะกับสถาบันการศึกษา ประกันชีวิต สินค้าแม่และเด็ก และบริการครอบครัว",
    carsPerDay: "95,000+",
    motorcyclesPerDay: "35,000+",
    peakHours: "06:30 – 08:30, 15:00 – 17:30",
    visibilityBar: 80,
    viewingDistance: "350m+",
    avgSpeed: "25 km/h",
    viewingDuration: "50s",
    ageRange: "25 – 50",
    audienceBreakdown: [
      { label: "ผู้ปกครอง/ครอบครัว", pct: 50, color: "bg-primary" },
      { label: "คนทำงาน",             pct: 35, color: "bg-primary-container" },
      { label: "นักเรียน",            pct: 15, color: "bg-white" },
    ],
    mapLat: 13.1265, mapLng: 100.9255,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "school",        name: "โรงเรียนอัสสัมชัญศรีราชา", distance: "50m" },
      { icon: "local_hospital", name: "โรงพยาบาลศรีราชา",        distance: "1.2 km" },
      { icon: "shopping_cart", name: "ตลาดและร้านค้าย่าน",       distance: "400m" },
    ],
    related: [
      { slug: "sriracha-robinson-junction", title: "แยก Robinson ศรีราชา", subtitle: "ศรีราชา", status: "Available", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
      { slug: "sriracha-central-mall",      title: "Central Si Racha",     subtitle: "ศรีราชา", status: "Available", img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80" },
    ],
  },

  /* ════════════════════════════════════════════════════════
     PATTAYA ZONE  (2 new sites)
  ════════════════════════════════════════════════════════ */
  "pattaya-dolphin-roundabout": {
    slug: "pattaya-dolphin-roundabout",
    tag: "พัทยา",
    title: "วงเวียนปลาโลมา – Terminal 21 พัทยา",
    subtitle: "พัทยาเหนือ, ถนนสุขุมวิท",
    description: "จุดนักท่องเที่ยวสูงมาก เป็นทางเข้าเมืองพัทยาและใกล้แลนด์มาร์กสำคัญ ทั้ง Terminal 21 และ Walking Street",
    price: "฿55,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    imgDrone: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "20m × 12m" },
      { label: "Resolution",      value: "3840 × 2160 (4K)" },
      { label: "Pixel Pitch",     value: "P6.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "10 Shared" },
      { label: "Operating Hours", value: "06:00 – 02:00" },
      { label: "Smart Sync",      value: "Weather-Triggered" },
    ],
    locationStory: "วงเวียนปลาโลมาคือ 'ประตูพัทยา' ที่รถทุกคันต้องผ่านเมื่อเข้าจากสุขุมวิท ตรงข้ามกับ Terminal 21 Pattaya",
    audienceStory: "นักท่องเที่ยวไทยและต่างชาติจากทั่วโลก คนงาน ผู้อยู่อาศัยในพัทยา รวมกว่า 200,000 คนต่อวัน",
    trafficStory: "จุดที่มีนักท่องเที่ยวหนาแน่นที่สุดในพัทยา โดยเฉพาะช่วงเย็นถึงดึก ปริมาณคนสูงมากตลอดสัปดาห์",
    businessFit: "เหมาะกับโรงแรม ทัวร์ คาสิโน คอนโด ร้านอาหาร และแบรนด์ Luxury",
    carsPerDay: "200,000+",
    motorcyclesPerDay: "60,000+",
    peakHours: "11:00 – 14:00, 18:00 – 24:00",
    visibilityBar: 95,
    viewingDistance: "500m+",
    avgSpeed: "10 km/h",
    viewingDuration: "90s",
    ageRange: "25 – 60",
    audienceBreakdown: [
      { label: "นักท่องเที่ยวต่างชาติ", pct: 50, color: "bg-primary" },
      { label: "นักท่องเที่ยวไทย",     pct: 30, color: "bg-primary-container" },
      { label: "คนพัทยา",              pct: 20, color: "bg-white" },
    ],
    mapLat: 12.9430, mapLng: 100.8730,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "shopping_cart",  name: "Terminal 21 Pattaya",    distance: "300m" },
      { icon: "hotel",          name: "Centara Grand Pattaya",   distance: "500m" },
      { icon: "beach_access",   name: "หาดพัทยาเหนือ",         distance: "800m" },
    ],
    related: [
      { slug: "pattaya-central-junction",  title: "แยกพัทยากลาง",        subtitle: "พัทยา", status: "Available", img: "https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?w=800&q=80" },
      { slug: "sriracha-robinson-junction",title: "แยก Robinson ศรีราชา", subtitle: "ศรีราชา", status: "Available", img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
    ],
  },

  "pattaya-central-junction": {
    slug: "pattaya-central-junction",
    tag: "พัทยา",
    title: "แยกพัทยากลาง",
    subtitle: "ถนนสุขุมวิท × ถนนพัทยากลาง",
    description: "เส้นตัดหลักเข้าเมืองพัทยากลาง มีรถสัญจรและธุรกิจริมถนนจำนวนมาก ทำเลสำคัญสำหรับทุกแบรนด์ที่มุ่งเป้าพัทยา",
    price: "฿50,000",
    status: "Available",
    imgDay:   "https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?w=1200&q=80",
    imgNight: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    imgDrone: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    specs: [
      { label: "Dimensions",      value: "20m × 12m" },
      { label: "Resolution",      value: "3840 × 2160 (4K)" },
      { label: "Pixel Pitch",     value: "P6.0 SMD" },
      { label: "Media Format",    value: "MP4 / H.264" },
      { label: "Loop Length",     value: "15 Seconds" },
      { label: "Total Spots",     value: "10 Shared" },
      { label: "Operating Hours", value: "06:00 – 02:00" },
    ],
    locationStory: "แยกพัทยากลางคือจุดตัดหลักระหว่างสุขุมวิทและถนนพัทยากลาง ซึ่งนำสู่ชายหาดและย่านธุรกิจ",
    audienceStory: "นักท่องเที่ยว คนทำงาน นักเรียน และรถเข้าเมืองพัทยาจากทั้งสองทิศทาง",
    trafficStory: "แยกไฟแดงที่มีปริมาณจราจรหนาแน่นตลอดวัน โดยเฉพาะช่วงกลางวันและค่ำ",
    businessFit: "เหมาะกับโรงแรม รีสอร์ท ร้านอาหาร อสังหาฯ คอนโด และบริการนักท่องเที่ยว",
    carsPerDay: "160,000+",
    motorcyclesPerDay: "55,000+",
    peakHours: "10:00 – 13:00, 18:00 – 23:00",
    visibilityBar: 92,
    viewingDistance: "450m+",
    avgSpeed: "12 km/h",
    viewingDuration: "75s",
    ageRange: "20 – 60",
    audienceBreakdown: [
      { label: "นักท่องเที่ยว", pct: 55, color: "bg-primary" },
      { label: "คนทำงาน",      pct: 25, color: "bg-primary-container" },
      { label: "คนพื้นที่",    pct: 20, color: "bg-white" },
    ],
    mapLat: 12.9300, mapLng: 100.8780,
    mapImg: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "beach_access",   name: "หาดพัทยากลาง",    distance: "600m" },
      { icon: "shopping_cart",  name: "Royal Garden Plaza", distance: "800m" },
      { icon: "hotel",          name: "โรงแรมย่านพัทยากลาง", distance: "300m" },
    ],
    related: [
      { slug: "pattaya-dolphin-roundabout",  title: "วงเวียนปลาโลมา", subtitle: "พัทยาเหนือ", status: "Available", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
      { slug: "sriracha-central-mall",       title: "Central Si Racha", subtitle: "ศรีราชา",     status: "Available", img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&q=80" },
    ],
  },
};

// Helper: map services page IDs to billboard slugs
export const serviceIdToSlug: Record<string, string> = {
  "PT-CENTRAL-01": "pattaya-dolphin-roundabout",
  "BS-UNI-05":     "bangsaen-burapha-university",
  "SR-MAIN-02":    "sriracha-robinson-junction",
};
