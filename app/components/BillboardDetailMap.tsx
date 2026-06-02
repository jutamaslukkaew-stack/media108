"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface NearbyPlace {
  icon: string;
  name: string;
  distance: string;
}

interface Props {
  lat: number;
  lng: number;
  title: string;
  nearby: NearbyPlace[];
}

/** Parse distance string like "500m" | "1.2 km" → metres */
function parseDistanceM(d: string): number {
  const km = d.match(/([\d.]+)\s*km/i);
  if (km) return parseFloat(km[1]) * 1000;
  const m = d.match(/([\d.]+)\s*m/i);
  if (m) return parseFloat(m[1]);
  return 500;
}

/** Offset lat/lng by distance (metres) in a given bearing (degrees) */
function offsetLatLng(lat: number, lng: number, distM: number, bearingDeg: number): [number, number] {
  const R = 6371000;
  const bearing = (bearingDeg * Math.PI) / 180;
  const dLat = (distM * Math.cos(bearing)) / R;
  const dLng = (distM * Math.sin(bearing)) / (R * Math.cos((lat * Math.PI) / 180));
  return [lat + (dLat * 180) / Math.PI, lng + (dLng * 180) / Math.PI];
}

/** Emoji for each place type */
const placeEmoji: Record<string, string> = {
  shopping_cart: "🛒",
  school: "🎓",
  local_hospital: "🏥",
  apartment: "🏢",
  local_mall: "🏬",
  beach_access: "🏖️",
  hotel: "🏨",
  factory: "🏭",
  directions_boat: "⛵",
  local_dining: "🍽️",
  directions_car: "🚗",
  business: "💼",
  location_city: "🏙️",
  local_cafe: "☕",
};

export default function BillboardDetailMap({ lat, lng, title, nearby }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
    });
    leafletMap.current = map;

    /* ── CartoDB Voyager tiles (light, readable) ── */
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    /* ── Custom zoom control (bottom-right) ── */
    L.control.zoom({ position: "bottomright" }).addTo(map);

    /* ── Billboard marker (pulsing) ── */
    const billboardIcon = L.divIcon({
      className: "",
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      html: `
        <div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
          <div style="
            position:absolute;inset:0;border-radius:50%;
            background:rgba(230,57,70,0.35);
            animation:bb-pulse 2s ease-out infinite;
          "></div>
          <div style="
            position:absolute;inset:6px;border-radius:50%;
            background:rgba(230,57,70,0.2);
            animation:bb-pulse 2s ease-out infinite 0.4s;
          "></div>
          <div style="
            width:20px;height:20px;border-radius:50%;
            background:#E63946;border:3px solid #fff;
            box-shadow:0 0 12px rgba(230,57,70,0.9);
            position:relative;z-index:1;
          "></div>
        </div>
      `,
    });

    L.marker([lat, lng], { icon: billboardIcon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family:sans-serif;padding:4px 2px;">
          <div style="font-size:11px;color:#E63946;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px;">📺 ป้าย LED Media108</div>
          <div style="font-size:14px;font-weight:700;color:#fff;">${title}</div>
        </div>`,
        { className: "bb-popup" }
      );

    /* ── Nearby place markers — spread evenly around billboard ── */
    const bearings = [0, 60, 120, 180, 240, 300];
    nearby.forEach((place, i) => {
      const bearing = bearings[i % bearings.length];
      const distM = parseDistanceM(place.distance);
      const [pLat, pLng] = offsetLatLng(lat, lng, distM, bearing);
      const emoji = placeEmoji[place.icon] ?? "📍";

      const placeIcon = L.divIcon({
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div style="
            width:36px;height:36px;border-radius:50%;
            background:#1e2a4a;border:2px solid rgba(255,255,255,0.25);
            display:flex;align-items:center;justify-content:center;
            font-size:16px;box-shadow:0 4px 12px rgba(0,0,0,0.5);
            transition:transform .15s;
          ">${emoji}</div>
        `,
      });

      L.marker([pLat, pLng], { icon: placeIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;padding:4px 2px;">
            <div style="font-size:14px;font-weight:700;color:#fff;">${emoji} ${place.name}</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:2px;">${place.distance} from billboard</div>
            <a href="https://www.google.com/maps/search/${encodeURIComponent(place.name)}/@${lat},${lng},16z"
               target="_blank"
               style="display:inline-block;margin-top:8px;padding:5px 12px;background:#E63946;color:white;
                      border-radius:6px;font-size:11px;font-weight:700;text-decoration:none;">
              เปิดใน Google Maps ↗
            </a>
          </div>`,
          { className: "bb-popup" }
        );
    });

    /* ── Dashed circle showing ~search radius ── */
    if (nearby.length > 0) {
      const maxDist = Math.max(...nearby.map((p) => parseDistanceM(p.distance)));
      L.circle([lat, lng], {
        radius: maxDist * 1.1,
        color: "rgba(230,57,70,0.4)",
        fillColor: "rgba(230,57,70,0.05)",
        fillOpacity: 1,
        weight: 1.5,
        dashArray: "6 6",
      }).addTo(map);
    }

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, [lat, lng, title, nearby]);

  return (
    <>
      <style>{`
        .bb-popup .leaflet-popup-content-wrapper {
          background: #0f1b35 !important;
          border: 1px solid rgba(255,255,255,0.15) !important;
          border-radius: 10px !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.6) !important;
          color: white !important;
        }
        .bb-popup .leaflet-popup-content { margin: 10px 14px !important; }
        .bb-popup .leaflet-popup-tip { background: #0f1b35 !important; }
        .bb-popup .leaflet-popup-close-button { color: #94a3b8 !important; top: 6px !important; right: 8px !important; }
        .leaflet-control-zoom a {
          background: #1e2a4a !important; color: white !important;
          border-color: rgba(255,255,255,0.15) !important; font-weight: 700 !important;
        }
        .leaflet-control-zoom a:hover { background: #E63946 !important; }
        .leaflet-control-attribution {
          background: rgba(15,27,53,0.8) !important; color: #64748b !important; font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: #94a3b8 !important; }
        @keyframes bb-pulse {
          0%   { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
      <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "400px" }} />
    </>
  );
}
