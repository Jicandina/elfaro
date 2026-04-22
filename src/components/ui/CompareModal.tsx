import { X, BedDouble, Bath, Car, Maximize2, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import type { Property } from '../../types/property';

const fmt = (p: number, c: string) =>
  c === 'USD' ? `$${p.toLocaleString('en-US')}` : `${p.toLocaleString()} ${c}`;

function Row({ label, values }: { label: string; values: (string | number | boolean | React.ReactNode)[] }) {
  return (
    <div className="grid border-b border-white/5 last:border-0"
      style={{ gridTemplateColumns: `140px repeat(${values.length}, 1fr)` }}>
      <div className="px-4 py-3 text-navy-500 text-xs font-medium bg-navy-900/50 flex items-center">{label}</div>
      {values.map((v, i) => (
        <div key={i} className="px-4 py-3 text-white text-sm flex items-center border-l border-white/5">
          {typeof v === 'boolean'
            ? v ? <CheckCircle2 className="w-4 h-4 text-gold-400" /> : <XCircle className="w-4 h-4 text-navy-700" />
            : v}
        </div>
      ))}
    </div>
  );
}

export default function CompareModal({ onClose }: { onClose: () => void }) {
  const { list, clear } = useCompare();
  const ps = list as Property[];

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-navy-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div>
            <h2 className="text-white font-display font-bold text-lg">Comparar propiedades</h2>
            <p className="text-navy-500 text-xs mt-0.5">{ps.length} propiedades seleccionadas</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="text-navy-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property headers */}
        <div className="grid border-b border-white/5"
          style={{ gridTemplateColumns: `140px repeat(${ps.length}, 1fr)` }}>
          <div className="bg-navy-900/50" />
          {ps.map(p => (
            <div key={p.id} className="p-4 border-l border-white/5">
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-white font-semibold text-sm line-clamp-2 mb-1">{p.title}</p>
              <div className="flex items-center gap-1 text-navy-500 text-xs">
                <MapPin className="w-3 h-3" /> {p.location.zone}, {p.location.city}
              </div>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="overflow-x-auto">
          <Row label="Precio"       values={ps.map(p => <span className="font-bold text-gold-400">{fmt(p.price, p.currency)}{p.operation === 'alquiler' ? '/mes' : ''}</span>)} />
          <Row label="Operación"    values={ps.map(p => p.operation === 'alquiler' ? 'Alquiler' : 'Venta')} />
          <Row label="Tipo"         values={ps.map(p => <span className="capitalize">{p.type}</span>)} />
          <Row label="Ciudad"       values={ps.map(p => p.location.city)} />
          <Row label="Zona"         values={ps.map(p => p.location.zone)} />
          <Row label={`Área`}       values={ps.map(p => <><Maximize2 className="w-3.5 h-3.5 inline mr-1" />{p.features.area} m²</>)} />
          <Row label="Habitaciones" values={ps.map(p => <><BedDouble className="w-3.5 h-3.5 inline mr-1" />{p.features.bedrooms}</>)} />
          <Row label="Baños"        values={ps.map(p => <><Bath className="w-3.5 h-3.5 inline mr-1" />{p.features.bathrooms}</>)} />
          <Row label="Parking"      values={ps.map(p => <><Car className="w-3.5 h-3.5 inline mr-1" />{p.features.parking}</>)} />
          <Row label="Destacado"    values={ps.map(p => p.featured)} />
          <Row label="Amenidades"   values={ps.map(p => <span className="text-xs">{p.amenities.slice(0, 3).join(', ')}{p.amenities.length > 3 ? ` +${p.amenities.length - 3}` : ''}</span>)} />
        </div>

        {/* Actions */}
        <div className="grid border-t border-white/5"
          style={{ gridTemplateColumns: `140px repeat(${ps.length}, 1fr)` }}>
          <div className="bg-navy-900/50" />
          {ps.map(p => (
            <div key={p.id} className="p-4 border-l border-white/5">
              <Link to={`/propiedad/${p.id}`} onClick={onClose}
                className="btn-primary text-xs py-2 w-full text-center block">
                Ver detalles
              </Link>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 flex justify-between items-center">
          <button onClick={() => { clear(); onClose(); }}
            className="text-navy-500 hover:text-red-400 text-xs transition-colors">
            Limpiar comparación
          </button>
          <button onClick={onClose} className="btn-navy text-sm py-2 px-4">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
