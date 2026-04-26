import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Property, SearchFilters } from '../types/property';
import { mockProperties } from './mockData';

const COLLECTION = 'properties';
const USE_MOCK = !import.meta.env.VITE_FIREBASE_API_KEY;

// ── Helpers ──────────────────────────────────────────────────────
function docToProperty(id: string, data: Record<string, unknown>): Property {
  return {
    id,
    title:       data.title as string,
    description: data.description as string,
    type:        data.type as Property['type'],
    operation:   data.operation as Property['operation'],
    price:       data.price as number,
    currency:    data.currency as Property['currency'],
    location:    data.location as Property['location'],
    features:    data.features as Property['features'],
    amenities:   (data.amenities as string[]) ?? [],
    images:      (data.images as string[]) ?? [],
    featured:    Boolean(data.featured),
    available:   Boolean(data.available),
    contactPhone: data.contactPhone as string,
    contactEmail: data.contactEmail as string,
    createdAt:   (data.createdAt as Timestamp)?.toDate() ?? new Date(),
    updatedAt:   (data.updatedAt as Timestamp)?.toDate() ?? new Date(),
  };
}

function matchesMock(p: Property, f: SearchFilters): boolean {
  if (f.operation    && p.operation    !== f.operation)    return false;
  if (f.propertyType && p.type         !== f.propertyType) return false;
  if (f.city         && p.location.city !== f.city)        return false;
  if (f.minPrice     && p.price < f.minPrice)              return false;
  if (f.maxPrice     && p.price > f.maxPrice)              return false;
  if (f.minBedrooms  && p.features.bedrooms < f.minBedrooms) return false;
  return true;
}

// ── Read ─────────────────────────────────────────────────────────
export async function fetchProperties(filters: SearchFilters = {}): Promise<Property[]> {
  if (USE_MOCK) {
    return mockProperties.filter((p) => p.available && matchesMock(p, filters));
  }

  try {
    let q = query(collection(db, COLLECTION), where('available', '==', true));
    if (filters.operation)    q = query(q, where('operation', '==', filters.operation));
    if (filters.propertyType) q = query(q, where('type', '==', filters.propertyType));
    if (filters.city)         q = query(q, where('location.city', '==', filters.city));

    const snap = await getDocs(q);
    let results = snap.docs.map((d) => docToProperty(d.id, d.data() as Record<string, unknown>));

    if (filters.minPrice)    results = results.filter((p) => p.price >= filters.minPrice!);
    if (filters.maxPrice)    results = results.filter((p) => p.price <= filters.maxPrice!);
    if (filters.minBedrooms) results = results.filter((p) => p.features.bedrooms >= filters.minBedrooms!);

    return results;
  } catch {
    return mockProperties.filter((p) => p.available && matchesMock(p, filters));
  }
}

export async function fetchProperty(id: string): Promise<Property | null> {
  if (USE_MOCK) {
    return mockProperties.find((p) => p.id === id) ?? null;
  }

  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (!snap.exists()) return null;
    return docToProperty(snap.id, snap.data() as Record<string, unknown>);
  } catch {
    return mockProperties.find((p) => p.id === id) ?? null;
  }
}

// ── Write (admin) ─────────────────────────────────────────────────
export async function createProperty(data: Omit<Property, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return ref.id;
}

export async function updateProperty(id: string, data: Partial<Property>): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteProperty(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

// ── Inquiries ─────────────────────────────────────────────────────
export async function saveInquiry(data: {
  name: string; phone: string; email: string;
  property: string; propertyId: string; message: string;
}): Promise<void> {
  await addDoc(collection(db, 'inquiries'), {
    ...data,
    status: 'nueva',
    createdAt: Timestamp.now(),
  });
}
