import { useState, useRef } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { parseNLSearch } from '../../lib/nlSearch';
import type { SearchFilters } from '../../types/property';

const EXAMPLES = [
  'Apartamento 3 habitaciones en Caracas menos de $200k',
  'Casa para alquilar en Valencia desde $1000',
  'Oficina en Chacao hasta $400k',
  'Apartamento en Las Mercedes para comprar',
];

interface Props {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

export default function NLSearchBar({ onSearch, onClear }: Props) {
  const [text, setText]         = useState('');
  const [active, setActive]     = useState(false);
  const [tags, setTags]         = useState<{ label: string; color: string }[]>([]);
  const [example, setExample]   = useState(0);
  const inputRef                = useRef<HTMLInputElement>(null);

  const handleSubmit = (val = text) => {
    if (!val.trim()) return;
    const { filters, tags } = parseNLSearch(val);
    setTags(tags);
    onSearch(filters);
    setActive(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setText(''); setTags([]); onClear();
  };

  const handleExample = (ex: string) => {
    setText(ex); handleSubmit(ex); setActive(false);
  };

  return (
    <div className="relative mb-6">
      {/* Input */}
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-200 ${
        active
          ? 'border-gold-500/60 bg-navy-800 shadow-lg shadow-gold-500/10'
          : 'border-white/10 bg-navy-800/60'
      }`}>
        <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setTimeout(() => setActive(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') { setActive(false); inputRef.current?.blur(); }
          }}
          placeholder="Describe qué buscas... ej: casa 3 habitaciones en Valencia menos de $200k"
          className="flex-1 bg-transparent text-white placeholder-navy-500 text-sm outline-none"
        />
        {text && (
          <button onClick={handleClear} className="text-navy-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
        <button onClick={() => handleSubmit()}
          disabled={!text.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold disabled:opacity-40 hover:bg-gold-400 transition-all shrink-0">
          Buscar <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Detected filters */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 px-1">
          <span className="text-navy-500 text-xs">Entendí:</span>
          {tags.map((t) => (
            <span key={t.label} className={`text-xs px-2.5 py-1 rounded-full font-medium ${t.color}`}>
              {t.label}
            </span>
          ))}
        </div>
      )}

      {/* Suggestions dropdown */}
      {active && !text && (
        <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-navy-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <p className="text-navy-600 text-[10px] font-semibold uppercase tracking-wider px-4 pt-3 pb-1">
            Ejemplos de búsqueda
          </p>
          {EXAMPLES.map((ex, i) => (
            <button key={i} onClick={() => handleExample(ex)}
              className="w-full text-left px-4 py-2.5 text-sm text-navy-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-500/50 shrink-0" />
              {ex}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
