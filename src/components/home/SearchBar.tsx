import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { VENEZUELAN_CITIES } from '../../types/property';
import type { SearchFilters } from '../../types/property';

interface Props { onSearch: (f: SearchFilters) => void; }

export default function SearchBar({ onSearch }: Props) {
  const [operation, setOperation] = useState<'venta' | 'alquiler'>('venta');
  const [city, setCity]           = useState('');
  const [type, setType]           = useState('');
  const [maxPrice, setMaxPrice]   = useState('');

  const submit = () => {
    const f: SearchFilters = { operation };
    if (city) f.city = city;
    if (type) f.propertyType = type as SearchFilters['propertyType'];
    if (maxPrice) f.maxPrice = Number(maxPrice);
    onSearch(f);
  };

  return (
    <div className="bg-navy-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-card overflow-hidden">
      {/* Operation tabs */}
      <div className="flex border-b border-white/5">
        {(['venta', 'alquiler'] as const).map((op) => (
          <button key={op} onClick={() => setOperation(op)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-all duration-200 ${
              operation === op
                ? 'bg-gold-500/10 text-gold-400 border-b-2 border-gold-500'
                : 'text-navy-400 hover:text-white'
            }`}>
            {op === 'venta' ? 'Comprar' : 'Alquilar'}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* City */}
        <div className="relative">
          <select value={city} onChange={(e) => setCity(e.target.value)} className="select-field pr-8">
            <option value="">Todas las ciudades</option>
            {VENEZUELAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
        </div>

        {/* Type */}
        <div className="relative">
          <select value={type} onChange={(e) => setType(e.target.value)} className="select-field pr-8">
            <option value="">Tipo de propiedad</option>
            {['apartamento', 'casa', 'local', 'oficina', 'terreno'].map((t) => (
              <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
        </div>

        {/* Price */}
        <div className="relative">
          <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="select-field pr-8">
            <option value="">Precio máximo</option>
            <option value="100000">Hasta $100,000</option>
            <option value="250000">Hasta $250,000</option>
            <option value="500000">Hasta $500,000</option>
            <option value="1000000">Hasta $1,000,000</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" />
        </div>

        {/* Search btn */}
        <button onClick={submit}
          className="btn-primary gap-2 w-full">
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </div>
    </div>
  );
}
