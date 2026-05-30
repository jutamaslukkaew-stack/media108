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
  "pattaya-sukhumvit-01": {
    slug: "pattaya-sukhumvit-01",
    tag: "Flagship Location",
    title: "Pattaya Sukhumvit 01",
    subtitle: "Sukhumvit Road, Pattaya",
    description:
      "ทำเลยุทธศาสตร์บนเส้นทางหลักพัทยา–สุขุมวิท จุดเชื่อมระหว่างกรุงเทพฯ กับพัทยา มีปริมาณจราจรกว่า 1.4 แสนคันต่อวัน",
    price: "฿45,000",
    status: "Available",

    imgHero: "/image/pattaya-sukhumvit.jpg",
    imgDay:  "/image/pattaya-sukhumvit.jpg",
    imgNight:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=80",
    imgDrone:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",

    specs: [
      { label: "Dimensions", value: "20m × 12m" },
      { label: "Resolution", value: "3840 × 2160 (4K)" },
      { label: "Pixel Pitch", value: "P6.0 SMD" },
      { label: "Media Format", value: "MP4 / H.264" },
      { label: "Loop Length", value: "15 Seconds" },
      { label: "Total Spots", value: "10 Shared" },
      { label: "Operating Hours", value: "06:00 – 24:00" },
      { label: "Smart Sync", value: "Weather-Triggered" },
    ],

    strategicDescription:
      "ตั้งอยู่ที่ 'มุมเหนือ' ของถนนสุขุมวิท ดักทราฟฟิก 100% ของรถที่เข้าพัทยาจากกรุงเทพฯ และชลบุรี — สิ่งแรกและสุดท้ายที่ผู้สัญจรทุกคันจะมองเห็น",

    locationStory:
      "ไม่ใช่แค่จอโฆษณา แต่คือ 'ประตูเข้าเมือง' จุดบรรจบของเขต EEC ที่กำลังเติบโตและแหล่งท่องเที่ยวชายฝั่งที่คึกคักที่สุดในไทย Sukhumvit 01 คือทำเลที่ทุกแบรนด์ใน EEC ต้องการ",
    audienceStory:
      "เข้าถึงกลุ่มผู้มีอำนาจตัดสินใจ ตั้งแต่เจ้าของคอนโดหรูวงศ์อมาตย์ไปจนถึงผู้บริหารระดับสูงที่เดินทางจากท่าเรือแหลมฉบัง แบรนด์คุณจะได้พูดกับกลุ่มเป้าหมายที่ขับเคลื่อนเศรษฐกิจภาคตะวันออกโดยตรง",
    trafficStory:
      "รถติดคือโอกาสของคุณ ด้วยความเร็วเฉลี่ยที่ลดลงอย่างมากในชั่วโมงเร่งด่วน โฆษณาของคุณมีเวลาเพียงพอที่จะสร้าง Impression ที่ติดตาและจดจำได้",
    businessFit:
      "เหมาะสำหรับยานยนต์ระดับพรีเมียม อสังหาริมทรัพย์ เครื่องดื่มหรู และสถาบันการเงิน ที่ต้องการสร้างการรับรู้แบรนด์ในพื้นที่ EEC ชลบุรี–พัทยา",

    carsPerDay: "142,000+",
    motorcyclesPerDay: "48,000+",
    peakHours: "16:00 – 19:00",

    visibilityBar: 82,
    viewingDistance: "400m+",
    avgSpeed: "12 km/h",
    viewingDuration: "48s",

    ageRange: "28 – 55",
    audienceBreakdown: [
      { label: "คนท้องถิ่น", pct: 45, color: "bg-white" },
      { label: "นักท่องเที่ยว", pct: 35, color: "bg-primary-container" },
      { label: "ผู้สัญจร", pct: 20, color: "bg-primary" },
    ],

    mapLat: 12.9217,
    mapLng: 100.8677,
    mapImg:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
    nearby: [
      { icon: "shopping_cart", name: "Terminal 21 Pattaya", distance: "800m" },
      { icon: "school", name: "Maryvit School", distance: "1.2 km" },
      { icon: "local_hospital", name: "Bangkok Hospital Pattaya", distance: "2.1 km" },
      { icon: "apartment", name: "Wongamat Residential Hub", distance: "3.5 km" },
    ],

    pricingTiers: [
      {
        label: "ระยะสั้น",
        name: "เริ่มต้นโฆษณา",
        price: "฿45,000",
        unit: "/สัปดาห์",
        features: ["สปอต 15 วินาที", "180 สปอต/วัน", "รายงานผลมาตรฐาน"],
        ctaLabel: "เลือกแพ็กเกจ",
      },
      {
        label: "รายเดือน",
        name: "ครองพื้นที่",
        price: "฿160,000",
        unit: "/เดือน",
        features: ["สปอต 15 วินาที", "240 สปอต/วัน", "วิเคราะห์จราจรเชิงลึก", "ปรับโฆษณาอัตโนมัติตามเวลา"],
        highlight: true,
        ctaLabel: "เริ่มลงโฆษณา",
      },
      {
        label: "เฉพาะองค์กร",
        name: "ครองสื่อเต็มรูปแบบ",
        price: "ขอใบเสนอราคา",
        unit: "",
        features: ["หมุนเวียนแบบ 1:1 เฉพาะแบรนด์", "ครองจอทั้งหมด", "ทริกเกอร์อัตโนมัติตามเซ็นเซอร์"],
        ctaLabel: "ติดต่อทีมขาย",
      },
    ],

    recentCampaigns: [
      { name: "Love Pier Beach Cafe",      category: "ร้านอาหาร & คาเฟ่" },
      { name: "ข้าวมันไก่ Love Pier",       category: "ร้านอาหาร" },
      { name: "Camera Cafe",               category: "คาเฟ่" },
      { name: "Camera Hotel",              category: "โรงแรม" },
      { name: "Portal Cafe",               category: "คาเฟ่" },
      { name: "Pool-Villa.com",            category: "พักผ่อน & รีสอร์ท" },
      { name: "Pattaya.com",               category: "ท่องเที่ยว" },
      { name: "Concert Hall",              category: "กิจกรรม & บันเทิง" },
      { name: "Wedding Hall",              category: "สถานที่จัดงาน" },
      { name: "โรงแรมแหม่ม",               category: "โรงแรม" },
      { name: "Three Bed Room",            category: "อสังหาริมทรัพย์" },
    ],

    related: [
      {
        slug: "pattaya-gateway",
        title: "Pattaya Gateway",
        subtitle: "Main Intersection · 18m × 9m",
        status: "Available",
        img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      },
      {
        slug: "eec-tech-square",
        title: "EEC Tech Square",
        subtitle: "Sri Racha Industrial · 20m × 10m",
        status: "High Demand",
        img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
      },
      {
        slug: "jomtien-coastal",
        title: "Jomtien Coastal",
        subtitle: "Beachfront Drive · 16m × 8m",
        status: "Available",
        img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      },
    ],
  },

  "pattaya-gateway": {
    slug: "pattaya-gateway",
    tag: "Pattaya Central",
    title: "Pattaya Gateway",
    subtitle: "Main Intersection",
    description:
      "ป้าย LED ขนาดใหญ่บนเส้นทางหลักพัทยา ทราฟฟิกสูงตลอด 24 ชั่วโมง เชื่อมต่อทุกย่านสำคัญของพัทยาในจุดเดียว",
    price: "ขอใบเสนอราคา",
    status: "Available",

    imgDay:  "/image/pattaya-gateway.jpg",
    imgNight:
      "https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?w=1200&q=80",

    specs: [
      { label: "Screen Size", value: "18m x 9m" },
      { label: "Resolution", value: "2880 x 1440 px" },
      { label: "Pixel Pitch", value: "P8 RGB LED" },
      { label: "Brightness", value: "7,000 Nits" },
      { label: "Audio Support", value: "Not Available" },
    ],

    locationStory: "แยกสำคัญกลางเมืองพัทยา เชื่อมต่อถนนสุขุมวิทและถนนพัทยากลาง ผู้ขับขี่ทุกคนต้องผ่านจุดนี้",
    audienceStory: "กลุ่มนักท่องเที่ยวทั้งไทยและต่างชาติ รวมถึงชาวพัทยาที่ใช้ชีวิตประจำวัน",
    trafficStory: "จุดที่มีรถหนาแน่นสูงสุดในพัทยา รถติดสัญญาณไฟช่วยเพิ่ม Dwell Time การมองเห็น",
    businessFit: "เหมาะกับแบรนด์ FMCG โรงแรม ร้านอาหาร และธุรกิจบันเทิงในย่านพัทยา",

    carsPerDay: "1,200,000",
    motorcyclesPerDay: "420,000",
    peakHours: "17:00 – 21:00 PM",

    visibilityBar: 90,
    viewingDistance: "700m",
    avgSpeed: "30 km/h",
    viewingDuration: "15s",

    ageRange: "20 – 50",
    audienceBreakdown: [
      { label: "นักท่องเที่ยว", pct: 50, color: "bg-primary-container" },
      { label: "คนท้องถิ่น", pct: 35, color: "bg-white" },
      { label: "ผู้สัญจร", pct: 15, color: "bg-primary" },
    ],

    mapLat: 12.9270,
    mapLng: 100.8831,
    mapImg:
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=1200&q=80",
    nearby: [
      { icon: "local_mall", name: "Mike Shopping Mall", distance: "0.8 km from location" },
      { icon: "beach_access", name: "Pattaya Beach", distance: "1.2 km from location" },
      { icon: "hotel", name: "Hilton Pattaya", distance: "1.5 km from location" },
    ],

    recentCampaigns: [
      { name: "ตลาดบุญเครือ",                    category: "ตลาด & ชุมชน" },
      { name: "ร้านอาหารอร่อยๆในตลาดบุญเครือ",   category: "ร้านอาหาร" },
      { name: "U Cafe",                          category: "คาเฟ่" },
      { name: "ร้านหมูแดงกิ๊ว",                  category: "ร้านอาหาร" },
      { name: "Draco",                           category: "บันเทิง & ไลฟ์สไตล์" },
      { name: "กิจกรรมแข่งหมากรุก",               category: "กิจกรรม" },
      { name: "กิจกรรมแข่งเปียโน & กีตาร์",       category: "กิจกรรม & ดนตรี" },
      { name: "Corporate Hall",                  category: "สถานที่จัดงาน" },
      { name: "รับจำนอง-ขายฝาก",                 category: "การเงิน & อสังหา" },
      { name: "โฆษณาให้นายหน้ารวมตัว",            category: "อสังหาริมทรัพย์" },
    ],

    related: [
      {
        slug: "pattaya-sukhumvit-01",
        title: "Pattaya Sukhumvit 01",
        subtitle: "Main Pattaya Route",
        status: "Available",
        img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
      },
      {
        slug: "eec-tech-square",
        title: "EEC Tech Square",
        subtitle: "Sri Racha Industrial, Chonburi",
        status: "High Demand",
        img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
      },
      {
        slug: "jomtien-coastal",
        title: "Jomtien Coastal",
        subtitle: "Beachfront Drive, Pattaya",
        status: "Available",
        img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      },
    ],
  },

  "eec-tech-square": {
    slug: "eec-tech-square",
    tag: "Sri Racha Industrial",
    title: "EEC Tech Square",
    subtitle: "Sri Racha Industrial Zone",
    description:
      "เข้าถึงกลุ่มมืออาชีพและพนักงานในนิคมอุตสาหกรรมศรีราชา หัวใจของ Eastern Economic Corridor ที่กำลังเติบโตอย่างรวดเร็ว",
    price: "฿55,000",
    status: "High Demand",

    imgDay:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
    imgNight:
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",

    specs: [
      { label: "Screen Size", value: "20m x 10m" },
      { label: "Resolution", value: "3200 x 1600 px" },
      { label: "Pixel Pitch", value: "P10 RGB LED" },
      { label: "Brightness", value: "9,000 Nits" },
      { label: "Audio Support", value: "Available" },
    ],

    locationStory: "ติดถนนสุขุมวิทในนิคมอุตสาหกรรมศรีราชา จุดยุทธศาสตร์ที่ขาเข้า-ออกของ EEC มีผู้สัญจรผ่านตลอดทั้งวัน",
    audienceStory: "วิศวกร นักธุรกิจ และพนักงานระดับสูงในโรงงานและบริษัทข้ามชาติ กลุ่มที่มีอำนาจซื้อสูง",
    trafficStory: "ชั่วโมงเร่งด่วนช่วงเช้าและเย็น กลุ่มพนักงานออฟฟิศและโรงงานใช้เส้นทางนี้ทุกวัน",
    businessFit: "เหมาะกับยานยนต์ EV, สินค้าอุตสาหกรรม, อุปกรณ์ IT, และแบรนด์ระดับพรีเมียมที่ต้องการกลุ่ม B2B",

    carsPerDay: "850,000",
    motorcyclesPerDay: "280,000",
    peakHours: "06:30 – 08:30 AM",

    visibilityBar: 92,
    viewingDistance: "1,000m",
    avgSpeed: "50 km/h",
    viewingDuration: "10s",

    ageRange: "25 – 50",
    audienceBreakdown: [
      { label: "พนักงาน/แรงงาน", pct: 55, color: "bg-white" },
      { label: "นักธุรกิจ", pct: 30, color: "bg-primary-container" },
      { label: "ผู้สัญจร", pct: 15, color: "bg-primary" },
    ],

    mapLat: 13.1328,
    mapLng: 100.9166,
    mapImg:
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=1200&q=80",
    nearby: [
      { icon: "factory", name: "Amata City Rayong", distance: "5.2 km from location" },
      { icon: "local_hospital", name: "Bangkok Hospital Sriracha", distance: "3.0 km from location" },
      { icon: "directions_boat", name: "Sriracha Ferry Port", distance: "4.1 km from location" },
    ],

    recentCampaigns: [
      { name: "รับสมัครพนักงาน SCC",   category: "HR & Corporate" },
      { name: "โฆษณา SCC เพื่อสังคม",  category: "CSR & องค์กร" },
      { name: "Printing 108",          category: "สิ่งพิมพ์ & บริการ" },
      { name: "รับสมัครพนักงาน Dev",   category: "IT & เทคโนโลยี" },
      { name: "รับพัฒนาโปรแกรม",       category: "IT & Software" },
      { name: "Chonburi108.com",       category: "สื่อออนไลน์" },
      { name: "Ai News",               category: "สื่อ & ข่าวสาร" },
      { name: "Media 108",             category: "สื่อ & โฆษณา" },
      { name: "อพาร์ทเมนท์ 3,500฿",    category: "อสังหาริมทรัพย์" },
    ],

    related: [
      {
        slug: "pattaya-sukhumvit-01",
        title: "Pattaya Sukhumvit 01",
        subtitle: "Main Pattaya Route",
        status: "Available",
        img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
      },
      {
        slug: "pattaya-gateway",
        title: "Pattaya Gateway",
        subtitle: "Main Intersection, Chonburi",
        status: "Available",
        img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      },
      {
        slug: "jomtien-coastal",
        title: "Jomtien Coastal",
        subtitle: "Beachfront Drive, Pattaya",
        status: "Available",
        img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      },
    ],
  },

  "jomtien-coastal": {
    slug: "jomtien-coastal",
    tag: "Beachfront Premium",
    title: "Jomtien Coastal",
    subtitle: "Beachfront Drive, Pattaya",
    description:
      "พื้นที่สื่อพรีเมียมริมหาดจอมเทียน สัมผัสบรรยากาศรีสอร์ทในทำเลที่มีนักท่องเที่ยวระดับบนและครอบครัวหนาแน่น",
    price: "฿38,000",
    status: "Available",

    imgDay:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
    imgNight:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",

    specs: [
      { label: "Screen Size", value: "16m x 8m" },
      { label: "Resolution", value: "2560 x 1280 px" },
      { label: "Pixel Pitch", value: "P8 RGB LED" },
      { label: "Brightness", value: "7,500 Nits" },
      { label: "Audio Support", value: "Not Available" },
    ],

    locationStory: "ริมถนนจอมเทียน-นาจอมเทียน ทำเลหน้าโรงแรมระดับ 4-5 ดาว มีนักท่องเที่ยวเดินชายหาดตลอดวัน",
    audienceStory: "นักท่องเที่ยวครอบครัวชาวไทยและต่างชาติ กลุ่มที่มีกำลังซื้อสูงและพักในย่านรีสอร์ทหรู",
    trafficStory: "ช่วงเย็นและวันหยุดมีผู้คนหนาแน่นสูงสุด เหมาะกับแคมเปญ Lifestyle และ Hospitality",
    businessFit: "เหมาะกับธุรกิจท่องเที่ยว สปา รีสอร์ท ร้านอาหาร และสินค้าแฟชั่น",

    carsPerDay: "320,000",
    motorcyclesPerDay: "180,000",
    peakHours: "16:00 – 20:00 PM",

    visibilityBar: 78,
    viewingDistance: "600m",
    avgSpeed: "35 km/h",
    viewingDuration: "14s",

    ageRange: "28 – 55",
    audienceBreakdown: [
      { label: "นักท่องเที่ยว", pct: 60, color: "bg-primary-container" },
      { label: "คนท้องถิ่น", pct: 25, color: "bg-white" },
      { label: "ชาวต่างชาติ", pct: 15, color: "bg-primary" },
    ],

    mapLat: 12.8849,
    mapLng: 100.8742,
    mapImg:
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=1200&q=80",
    nearby: [
      { icon: "beach_access", name: "Jomtien Beach", distance: "0.2 km from location" },
      { icon: "hotel", name: "Jomtien Palm Beach Hotel", distance: "0.5 km from location" },
      { icon: "local_dining", name: "Jomtien Night Market", distance: "1.0 km from location" },
    ],

    recentCampaigns: [
      { name: "เครื่องเล่น Flow Rider",   category: "สวนน้ำ & กีฬา" },
      { name: "รีสอร์ทเกาะสีชัง",          category: "ท่องเที่ยว & รีสอร์ท" },
      { name: "ร้านกาแฟเกาะสีชัง",         category: "คาเฟ่" },
      { name: "ไหว้พระเกาะสีชัง",           category: "ท่องเที่ยว & ศาสนา" },
      { name: "วัด & สถานปฏิบัติธรรม",      category: "ศาสนา & สุขภาพจิต" },
    ],

    related: [
      {
        slug: "pattaya-sukhumvit-01",
        title: "Pattaya Sukhumvit 01",
        subtitle: "Main Pattaya Route",
        status: "Available",
        img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
      },
      {
        slug: "pattaya-gateway",
        title: "Pattaya Gateway",
        subtitle: "Main Intersection, Chonburi",
        status: "Available",
        img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80",
      },
      {
        slug: "eec-tech-square",
        title: "EEC Tech Square",
        subtitle: "Sri Racha Industrial, Chonburi",
        status: "High Demand",
        img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1200&q=80",
      },
    ],
  },
};

// Helper: map services page IDs to billboard slugs
export const serviceIdToSlug: Record<string, string> = {
  "PT-CENTRAL-01": "pattaya-sukhumvit-01",
  "BS-UNI-05": "pattaya-gateway",
  "SR-MAIN-02": "eec-tech-square",
};
