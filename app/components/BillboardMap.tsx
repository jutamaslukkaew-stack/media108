"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BillboardData } from "../data/billboards";

interface Props {
  billboards: BillboardData[];
  t: (en: string, th: string) => string;
}

/* ── Custom SVG pin matching the site's #E63946 brand colour ── */
const makePinIcon = (highlight: boolean) =>
  L.divIcon({
    className: "",
    iconAnchor: [16, 40],
    popupAnchor: [0, -42],
    html: `
      <div style="position:relative;width:32px;height:40px">
        <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="40">
          <ellipse cx="16" cy="38" rx="6" ry="2" fill="rgba(0,0,0,0.25)"/>
          <path d="M16 0C9.373 0 4 5.373 4 12c0 8 12 26 12 26S28 20 28 12C28 5.373 22.627 0 16 0z"
            fill="${highlight ? "#ff6b6b" : "#E63946"}"
            stroke="white" stroke-width="1.5"/>
          <circle cx="16" cy="12" r="5" fill="white"/>
        </svg>
        ${highlight ? `<div style="position:absolute;top:-6px;right:-6px;width:12px;height:12px;background:#E63946;border-radius:50%;border:2px solid white;animation:pulse-ring 1.5s infinite;"></div>` : ""}
      </div>
    `,
  });

export default function BillboardMap({ billboards, t }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    /* ── Initialise map centred on EEC/Pattaya corridor ── */
    const map = L.map(mapRef.current, {
      center: [12.95, 100.89],
      zoom: 11,
      zoomControl: true,
      attributionControl: true,
    });
    leafletMap.current = map;

    /* ── Dark/satellite-style tile layer (Carto Dark) ── */
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    /* ── Add a marker for every billboard that has coords ── */
    billboards.forEach((bb) => {
      if (!bb.mapLat || !bb.mapLng) return;

      const icon = makePinIcon(bb.status === "High Demand");
      const marker = L.marker([bb.mapLat, bb.mapLng], { icon }).addTo(map);

      const statusLabel =
        bb.status === "Available"
          ? `<span style="color:#4ade80">● ว่าง</span>`
          : bb.status === "High Demand"
          ? `<span style="color:#facc15">● ความต้องการสูง</span>`
          : `<span style="color:#f87171">● จองเต็ม</span>`;

      const popup = L.popup({
        maxWidth: 280,
        className: "billboard-popup",
      }).setContent(`
        <div style="font-family:sans-serif;background:#141d3f;border-radius:12px;overflow:hidden;min-width:240px;">
          <img src="${bb.imgDay}" alt="${bb.title}"
            style="width:100%;height:120px;object-fit:cover;display:block;" />
          <div style="padding:12px 14px 14px;">
            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">
              ${statusLabel}
            </div>
            <div style="font-size:17px;font-weight:700;color:#ffffff;margin-bottom:6px;line-height:1.3;">
              ${bb.title}
            </div>
            <div style="font-size:12px;color:#94a3b8;margin-bottom:10px;">
              ${bb.subtitle}
            </div>
            <div style="display:flex;gap:8px;margin-bottom:12px;">
              <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-size:13px;font-weight:700;color:#E63946;">${bb.carsPerDay}</div>
                <div style="font-size:10px;color:#94a3b8;margin-top:2px;">ยานพาหนะ/วัน</div>
              </div>
              <div style="flex:1;background:rgba(255,255,255,0.05);border-radius:8px;padding:8px;text-align:center;">
                <div style="font-size:13px;font-weight:700;color:#E63946;">${bb.price !== "ขอใบเสนอราคา" ? bb.price : "POA"}</div>
                <div style="font-size:10px;color:#94a3b8;margin-top:2px;">เริ่มต้น/เดือน</div>
              </div>
            </div>
            <a href="/billboard/${bb.slug}"
              style="display:block;width:100%;padding:10px;background:#E63946;color:white;text-align:center;border-radius:8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;box-sizing:border-box;">
              ดูรายละเอียด →
            </a>
          </div>
        </div>
      `);

      marker.bindPopup(popup);

      /* Open popup on hover for desktop */
      marker.on("mouseover", () => marker.openPopup());
    });

    /* Fit map bounds to show all markers */
    const validBillboards = billboards.filter((bb) => bb.mapLat && bb.mapLng);
    if (validBillboards.length > 1) {
      const bounds = L.latLngBounds(
        validBillboards.map((bb) => [bb.mapLat!, bb.mapLng!] as [number, number])
      );
      map.fitBounds(bounds, { padding: [60, 60] });
    }

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, [billboards, t]);

  return (
    <>
      {/* Popup style override to match site dark theme */}
      <style>{`
        .billboard-popup .leaflet-popup-content-wrapper {
          background: #141d3f !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 12px !important;
          padding: 0 !important;
          box-shadow: 0 24px 48px rgba(0,0,0,0.6) !important;
        }
        .billboard-popup .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .billboard-popup .leaflet-popup-tip-container { display: none; }
        .billboard-popup .leaflet-popup-close-button {
          color: white !important;
          font-size: 18px !important;
          top: 6px !important;
          right: 8px !important;
          z-index: 10;
        }
        .leaflet-control-zoom a {
          background: #141d3f !important;
          color: white !important;
          border-color: rgba(255,255,255,0.15) !important;
        }
        .leaflet-control-zoom a:hover { background: #E63946 !important; }
        .leaflet-control-attribution {
          background: rgba(6,17,51,0.8) !important;
          color: #64748b !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a { color: #94a3b8 !important; }
        @keyframes pulse-ring {
          0%   { transform: scale(0.8); opacity: 1; }
          70%  { transform: scale(2);   opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "620px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
    </>
  );
}
