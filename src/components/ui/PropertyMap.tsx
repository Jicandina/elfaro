import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '../../types/property';

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CITY_COORDS: Record<string, [number, number]> = {
  'Caracas':        [10.4806, -66.9036],
  'Valencia':       [10.1639, -68.0000],
  'Maracaibo':      [10.6666, -71.6124],
  'Barquisimeto':   [10.0678, -69.3474],
  'Barcelona':      [10.1333, -64.6833],
  'Puerto La Cruz': [10.2133, -64.6333],
  'Maracay':        [10.2469, -67.5967],
  'Maturín':        [9.7500,  -63.1833],
};

function idOffset(id: string): number {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return (h / 0xffff - 0.5) * 0.06;
}

function getCoords(p: Property): [number, number] {
  if (p.location.lat && p.location.lng) return [p.location.lat, p.location.lng];
  const base = CITY_COORDS[p.location.city] ?? [10.4806, -66.9036];
  return [base[0] + idOffset(p.id), base[1] + idOffset(p.id + 'lng')];
}

function makeIcon(operation: string) {
  const color = operation === 'venta' ? '#c9973a' : '#4a9eff';
  return L.divIcon({
    className: '',
    html: `<div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      background:${color};border:3px solid white;
      transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

const fmt = (p: number, c: string) =>
  c === 'USD' ? `$${p.toLocaleString('en-US')}` : `${p.toLocaleString()} ${c}`;

interface Props { properties: Property[]; }

export default function PropertyMap({ properties }: Props) {
  const center: [number, number] = [10.2, -66.5];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl" style={{ height: 520 }}>
      <MapContainer center={center} zoom={6} style={{ height: '100%', width: '100%' }}
        className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {properties.map((p) => (
          <Marker key={p.id} position={getCoords(p)} icon={makeIcon(p.operation)}>
            <Popup className="property-popup">
              <div style={{ minWidth: 200, fontFamily: 'inherit' }}>
                <img src={p.images[0]} alt={p.title}
                  style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                <p style={{ fontWeight: 700, fontSize: 13, color: '#fff', marginBottom: 2 }}>{p.title}</p>
                <p style={{ fontSize: 11, color: '#8899aa', marginBottom: 6 }}>
                  {p.location.zone}, {p.location.city}
                </p>
                <p style={{ fontWeight: 700, color: '#c9973a', marginBottom: 8 }}>
                  {fmt(p.price, p.currency)}
                  {p.operation === 'alquiler' ? '/mes' : ''}
                </p>
                <a href={`/propiedad/${p.id}`}
                  style={{
                    display: 'block', textAlign: 'center', padding: '6px 12px',
                    background: '#c9973a', color: '#0a0f1e', borderRadius: 8,
                    fontSize: 12, fontWeight: 700, textDecoration: 'none',
                  }}>
                  Ver detalles →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
