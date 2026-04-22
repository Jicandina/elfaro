import { doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { mockProperties } from './mockData';

export async function seedFirestore(): Promise<{ added: number; skipped: number }> {
  let added = 0, skipped = 0;

  for (const p of mockProperties) {
    const ref = doc(db, 'properties', p.id);
    const snap = await getDoc(ref);
    if (snap.exists()) { skipped++; continue; }

    await setDoc(ref, {
      title:             p.title,
      description:       p.description,
      type:              p.type,
      operation:         p.operation,
      price:             p.price,
      currency:          p.currency,
      location:          p.location,
      features:          p.features,
      amenities:         p.amenities,
      images:            p.images,
      featured:          p.featured,
      available:         p.available,
      contactPhone:      p.contactPhone,
      contactEmail:      p.contactEmail,
      createdAt:         Timestamp.fromDate(new Date(p.createdAt)),
      updatedAt:         Timestamp.fromDate(new Date(p.updatedAt)),
    });
    added++;
  }

  return { added, skipped };
}
