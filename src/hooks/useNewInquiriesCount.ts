import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useNewInquiriesCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), where('status', '==', 'nueva'));
    const unsub = onSnapshot(q, (snap) => setCount(snap.size));
    return () => unsub();
  }, []);

  return count;
}
