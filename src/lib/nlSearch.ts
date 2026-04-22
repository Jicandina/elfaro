import type { SearchFilters, PropertyType } from '../types/property';

const CITIES: [string, string][] = [
  ['caracas', 'Caracas'], ['valencia', 'Valencia'], ['maracaibo', 'Maracaibo'],
  ['barquisimeto', 'Barquisimeto'], ['maracay', 'Maracay'], ['barcelona', 'Barcelona'],
  ['puerto la cruz', 'Puerto La Cruz'], ['lecheria', 'Barcelona'], ['lecherías', 'Barcelona'],
  ['maturin', 'Maturín'], ['maturín', 'Maturín'],
];

function parsePrice(text: string): number | null {
  const m = text.match(/\$?\s*(\d[\d.,]*)\s*(k|mil|m(?=illones?)?)?/);
  if (!m) return null;
  let n = parseFloat(m[1].replace(/,/g, ''));
  const suffix = (m[2] ?? '').toLowerCase();
  if (suffix === 'k' || suffix === 'mil') n *= 1000;
  if (suffix === 'm') n *= 1000000;
  return n;
}

export interface NLResult {
  filters: SearchFilters;
  tags: { label: string; color: string }[];
}

export function parseNLSearch(text: string): NLResult {
  const t = text.toLowerCase();
  const filters: SearchFilters = {};
  const tags: { label: string; color: string }[] = [];

  // Operation
  if (/alquil|arrendar|arriend|rent/.test(t)) {
    filters.operation = 'alquiler';
    tags.push({ label: 'Alquiler', color: 'bg-navy-700 text-navy-200' });
  } else if (/compr|venta|vender/.test(t)) {
    filters.operation = 'venta';
    tags.push({ label: 'Venta', color: 'bg-gold-500/20 text-gold-300' });
  }

  // Type
  const types: [RegExp, PropertyType, string][] = [
    [/apartamento|apto\b|piso\b/, 'apartamento', 'Apartamento'],
    [/\bcasa\b|residencia|chalet|unifamiliar/, 'casa', 'Casa'],
    [/\blocal\b|comercial|tienda/, 'local', 'Local'],
    [/oficina/, 'oficina', 'Oficina'],
    [/terreno|lote|parcela/, 'terreno', 'Terreno'],
  ];
  for (const [re, val, label] of types) {
    if (re.test(t)) {
      filters.propertyType = val;
      tags.push({ label, color: 'bg-blue-500/15 text-blue-300' });
      break;
    }
  }

  // City
  for (const [key, city] of CITIES) {
    if (t.includes(key)) {
      filters.city = city;
      tags.push({ label: city, color: 'bg-navy-600/60 text-navy-200' });
      break;
    }
  }

  // Bedrooms: "3 habitaciones", "4 cuartos", "2 hab"
  const bedM = t.match(/(\d+)\s*(?:hab(?:itacion(?:es)?)?|cuartos?|rooms?)/);
  if (bedM) {
    filters.minBedrooms = parseInt(bedM[1]);
    tags.push({ label: `${bedM[1]}+ hab.`, color: 'bg-purple-500/15 text-purple-300' });
  }

  // Max price
  const maxRe = /(?:menos de|hasta|máximo|max(?:imo)?|no más de|por debajo de)\s*([\d.,k mil$m]+)/;
  const maxM = t.match(maxRe);
  if (maxM) {
    const price = parsePrice(maxM[1]);
    if (price) {
      filters.maxPrice = price;
      tags.push({ label: `Hasta $${price.toLocaleString()}`, color: 'bg-green-500/15 text-green-300' });
    }
  }

  // Min price
  const minRe = /(?:desde|más de|mínimo|min(?:imo)?|a partir de|sobre)\s*([\d.,k mil$m]+)/;
  const minM = t.match(minRe);
  if (minM) {
    const price = parsePrice(minM[1]);
    if (price) {
      filters.minPrice = price;
      tags.push({ label: `Desde $${price.toLocaleString()}`, color: 'bg-green-500/15 text-green-300' });
    }
  }

  return { filters, tags };
}
