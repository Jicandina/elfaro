import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/home/HeroSection';
import SearchBar from '../components/home/SearchBar';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyUs from '../components/home/WhyUs';
import StatsBar from '../components/home/StatsBar';
import Testimonials from '../components/home/Testimonials';
import ContactCTA from '../components/home/ContactCTA';
import { useProperties } from '../hooks/useProperties';
import type { SearchFilters } from '../types/property';
import { useSEO } from '../hooks/useSEO';

const CATEGORIES = [
  { title: 'Apartamentos en venta',   count: '200+ propiedades', to: '/propiedades?operacion=venta&tipo=apartamento',    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',  badge: 'Venta' },
  { title: 'Casas y residencias',      count: '120+ propiedades', to: '/propiedades?operacion=venta&tipo=casa',           img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', badge: 'Venta' },
  { title: 'Alquileres en Caracas',    count: '180+ propiedades', to: '/propiedades?operacion=alquiler&ciudad=Caracas',   img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',  badge: 'Alquiler' },
  { title: 'Locales y oficinas',       count: '85+ propiedades',  to: '/propiedades?tipo=local',                          img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',  badge: 'Comercial' },
];

export default function HomePage() {
  useSEO({
    title: 'El Faro Inmobiliaria — Tu hogar en Venezuela',
    description: 'Compra, vende o alquila propiedades en Venezuela con El Faro Inmobiliaria. Más de 10 años de experiencia, propiedades verificadas en Caracas, Valencia, Maracaibo y más.',
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<SearchFilters>({});
  const { properties, loading } = useProperties(filters);

  const scrollToSearch = () =>
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const featured = properties.filter((p) => p.featured);
  const hasFilters = Object.keys(filters).length > 0;

  return (
    <PageTransition>
      <>
      <HeroSection onSearch={scrollToSearch} />

      {/* Search */}
      <div ref={searchRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SearchBar onSearch={setFilters} />
      </div>

      {/* Featured / Results */}
      <FeaturedProperties
        properties={hasFilters ? properties : featured.length >= 3 ? featured : properties.slice(0, 6)}
        loading={loading}
        title={hasFilters ? 'Resultados de búsqueda' : 'Propiedades Destacadas'}
        subtitle={hasFilters
          ? `${properties.length} propiedad${properties.length !== 1 ? 'es' : ''} encontrada${properties.length !== 1 ? 's' : ''}`
          : 'Selección premium de los mejores inmuebles del mercado'}
      />

      {/* Why Us */}
      <WhyUs />

      {/* Stats */}
      <StatsBar />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-accent" />
            <h2 className="section-title">Explora por categoría</h2>
          </div>
          <Link to="/propiedades"
            className="hidden sm:flex items-center gap-2 text-navy-400 hover:text-gold-400 text-sm font-medium transition-colors">
            Ver todo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.title} to={cat.to}
              className="relative overflow-hidden rounded-2xl h-60 group cursor-pointer"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <img src={cat.img} alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50 group-hover:opacity-60" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(4,8,16,0.92) 0%, rgba(4,8,16,0.3) 60%, transparent 100%)' }} />
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <span className={`${cat.badge === 'Alquiler' ? 'badge-rent' : 'badge-sale'} mb-3 self-start`}>
                  {cat.badge}
                </span>
                <h3 className="text-white font-semibold text-lg font-display leading-tight">{cat.title}</h3>
                <p className="text-gold-500/60 text-xs mt-1.5 font-medium tracking-wide">{cat.count}</p>
              </div>
              {/* hover arrow */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                style={{ background: 'rgba(196,144,58,0.15)', border: '1px solid rgba(196,144,58,0.3)' }}>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <ContactCTA />
      </>
    </PageTransition>
  );
}
