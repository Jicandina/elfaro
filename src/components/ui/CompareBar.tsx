import { useState } from 'react';
import { X, Scale, Trash2 } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import CompareModal from './CompareModal';

export default function CompareBar() {
  const { list, remove, clear } = useCompare();
  const [open, setOpen] = useState(false);

  if (list.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900/98 backdrop-blur-md border-t border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Scale className="w-4 h-4 text-gold-400 shrink-0" />
          <p className="text-navy-400 text-xs shrink-0">Comparando {list.length}/3</p>

          <div className="flex gap-2 flex-1 overflow-x-auto">
            {list.map(p => (
              <div key={p.id} className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg bg-navy-800 border border-white/10 shrink-0">
                <img src={p.images[0]} alt={p.title}
                  className="w-8 h-8 rounded object-cover" />
                <span className="text-white text-xs font-medium max-w-[100px] truncate">{p.title}</span>
                <button onClick={() => remove(p.id)}
                  aria-label="Quitar de comparación"
                  className="text-navy-500 hover:text-red-400 transition-colors p-0.5">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {Array.from({ length: 3 - list.length }).map((_, i) => (
              <div key={i} className="w-32 h-10 rounded-lg border border-dashed border-navy-700 flex items-center justify-center shrink-0">
                <span className="text-navy-700 text-xs">+ propiedad</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={clear}
              aria-label="Limpiar comparación"
              className="p-2 text-navy-500 hover:text-red-400 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setOpen(true)} disabled={list.length < 2}
              className="btn-primary text-sm py-2 px-4 disabled:opacity-40 disabled:cursor-not-allowed">
              Comparar {list.length < 2 ? `(mín. 2)` : 'ahora'}
            </button>
          </div>
        </div>
      </div>

      {open && <CompareModal onClose={() => setOpen(false)} />}
    </>
  );
}
