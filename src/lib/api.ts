import type { Property, SearchFilters } from '../types/property';
import { mockProperties } from './mockData';

function matchesFilters(p: Property, f: SearchFilters): boolean {
  if (f.operation && p.operation !== f.operation) return false;
  if (f.propertyType && p.type !== f.propertyType) return false;
  if (f.city && p.location.city !== f.city) return false;
  if (f.minPrice && p.price < f.minPrice) return false;
  if (f.maxPrice && p.price > f.maxPrice) return false;
  if (f.minBedrooms && p.features.bedrooms < f.minBedrooms) return false;
  return true;
}

export async function fetchProperties(filters: SearchFilters = {}): Promise<Property[]> {
  await new Promise((r) => setTimeout(r, 400));
  return mockProperties.filter((p) => p.available && matchesFilters(p, filters));
}

export async function fetchProperty(id: string): Promise<Property | null> {
  await new Promise((r) => setTimeout(r, 300));
  return mockProperties.find((p) => p.id === id) ?? null;
}
