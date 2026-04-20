import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Property } from '../../types/property';
import PropertyCard from '../ui/PropertyCard';

function Skeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-56 bg-navy-800" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-navy-800 rounded w-3/4" />
        <div className="h-3 bg-navy-800 rounded w-1/2" />
        <div className="h-3 bg-navy-800 rounded w-full" />
        <div className="h-3 bg-navy-800 rounded w-2/3" />
      </div>
    </div>
  );
}

interface Props {
  properties: Property[];
  loading?: boolean;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

export default function FeaturedProperties({
  properties,
  loading = false,
  title = 'Propiedades Destacadas',
  subtitle = 'Las mejores oportunidades del mercado',
  showViewAll = true,
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="section-accent" />
          <h2 className="section-title">{title}</h2>
          <p className="text-navy-400 mt-2">{subtitle}</p>
        </div>
        {showViewAll && (
          <Link to="/propiedades"
            className="hidden sm:flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors group">
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-navy-400">No se encontraron propiedades.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}

      {showViewAll && (
        <div className="text-center mt-10 sm:hidden">
          <Link to="/propiedades" className="btn-outline">
            Ver todas las propiedades
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
