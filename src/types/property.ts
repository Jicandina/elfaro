export type PropertyType = 'apartamento' | 'casa' | 'local' | 'oficina' | 'terreno';
export type OperationType = 'venta' | 'alquiler';
export type Currency = 'USD' | 'EUR' | 'VES';

export interface PropertyLocation {
  city: string;
  zone: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  operation: OperationType;
  price: number;
  currency: Currency;
  location: PropertyLocation;
  features: PropertyFeatures;
  amenities: string[];
  images: string[];
  featured: boolean;
  available: boolean;
  contactPhone: string;
  contactEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  operation?: OperationType;
  propertyType?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
}

export const VENEZUELAN_CITIES = [
  'Caracas', 'Valencia', 'Maracaibo', 'Barquisimeto',
  'Maracay', 'Barcelona', 'Puerto La Cruz', 'Maturín',
];
