import { createContext, useContext, useState } from 'react';
import type { Property } from '../types/property';

interface CompareCtx {
  list: Property[];
  add: (p: Property) => void;
  remove: (id: string) => void;
  isIn: (id: string) => boolean;
  clear: () => void;
}

const Ctx = createContext<CompareCtx>({} as CompareCtx);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<Property[]>([]);

  const add = (p: Property) => {
    if (list.length >= 3 || list.some(x => x.id === p.id)) return;
    setList(prev => [...prev, p]);
  };

  const remove = (id: string) => setList(prev => prev.filter(x => x.id !== id));
  const isIn   = (id: string) => list.some(x => x.id === id);
  const clear  = () => setList([]);

  return <Ctx.Provider value={{ list, add, remove, isIn, clear }}>{children}</Ctx.Provider>;
}

export const useCompare = () => useContext(Ctx);
