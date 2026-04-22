import { Link } from 'react-router-dom';
import { BedDouble, Bath, Car, Maximize2, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import type { Property } from '../../types/property';
import WhatsAppButton from './WhatsAppButton';

export default function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked]       = useState(false);
  const [imgError, setImgError] = useState(false);

  const fmt = (price: number, cur: string) => {
    if (cur === 'USD') return `$${price.toLocaleString('en-US')}`;
    if (cur === 'EUR') return `€${price.toLocaleString('de-DE')}`;
    return `Bs. ${price.toLocaleString()}`;
  };

  const waMsg = `Hola, vi la propiedad "${property.title}" en El Faro Inmobiliaria y me gustaría más información.`;

  return (
    <div className="card-hover group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-56 shrink-0">
        <img
          src={!imgError ? property.images[0] : 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'}
          alt={property.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={property.operation === 'alquiler' ? 'badge-rent' : 'badge-sale'}>
            {property.operation === 'alquiler' ? 'Alquiler' : 'Venta'}
          </span>
          <span className="badge bg-navy-950/70 text-navy-300 border border-white/10 capitalize backdrop-blur-sm">
            {property.type}
          </span>
          {property.featured && <span className="badge-featured">★ Destacado</span>}
        </div>

        {/* Like */}
        <button onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={liked}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-navy-950/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-navy-900 transition-all">
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'text-red-400 fill-red-400' : 'text-white/60'}`} />
        </button>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-xl leading-none drop-shadow-lg">
            {fmt(property.price, property.currency)}
            {property.operation === 'alquiler' && <span className="text-white/60 text-xs font-normal ml-1">/mes</span>}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/propiedad/${property.id}`}>
          <h3 className="text-white font-semibold text-base leading-snug mb-1.5 hover:text-gold-400 transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 text-navy-400 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-gold-500/70" />
          <span className="truncate">{property.location.zone}, {property.location.city}</span>
        </div>

        <p className="text-navy-400 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
          {property.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/5 mb-4">
          {property.features.bedrooms > 0 && (
            <div className="flex items-center gap-1 text-navy-400 text-xs">
              <BedDouble className="w-3.5 h-3.5" />
              <span>{property.features.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-navy-400 text-xs">
            <Bath className="w-3.5 h-3.5" />
            <span>{property.features.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-navy-400 text-xs">
            <Car className="w-3.5 h-3.5" />
            <span>{property.features.parking}</span>
          </div>
          <div className="flex items-center gap-1 text-navy-400 text-xs ml-auto">
            <Maximize2 className="w-3 h-3" />
            <span>{property.features.area} m²</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/propiedad/${property.id}`}
            className="flex-1 text-center py-2 text-xs font-semibold text-gold-400 border border-gold-500/30 hover:border-gold-400 hover:bg-gold-500/10 rounded-lg transition-all duration-200">
            Ver detalles
          </Link>
          <WhatsAppButton phone={property.contactPhone} message={waMsg} variant="card" className="flex-1" />
        </div>
      </div>
    </div>
  );
}
