import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import FaroLogo from '../ui/FaroLogo';
import { useFavorites } from '../../hooks/useFavorites';

const NAV = [
  { label: 'Inicio',      to: '/' },
  { label: 'Propiedades', to: '/propiedades' },
  { label: 'Explorar',    to: '/explorar' },
  { label: 'Nosotros',    to: '/nosotros' },
  { label: 'Contacto',    to: '/contacto' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile]     = useState(false);
  const location = useLocation();
  const { count: favCount } = useFavorites();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMobile(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-0' : 'py-0'
      }`}
      style={scrolled ? {
        background: 'rgba(4,8,16,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      } : {
        background: 'linear-gradient(to bottom, rgba(4,8,16,0.7) 0%, transparent 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between py-5">

          <Link to="/">
            <FaroLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((link) => {
              const active = link.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.to.replace(/s$/, ''));
              return (
                <Link key={link.to} to={link.to}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-gold-400 bg-gold-500/8'
                      : 'text-navy-200/70 hover:text-white hover:bg-white/5'
                  }`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/favoritos" aria-label="Favoritos"
              className="relative p-2 text-navy-300/60 hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-500 text-navy-950 text-[10px] font-bold flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>
            <Link to="/contacto" className="btn-primary text-sm py-2.5 px-5 ml-2">
              Publicar propiedad
            </Link>
          </div>

          <button className="md:hidden p-2 text-navy-200 hover:text-white transition-colors"
            onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden px-4 py-4 space-y-1"
          style={{ background: 'rgba(4,8,16,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {NAV.map((link) => {
            const active = link.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.to.replace(/s$/, ''));
            return (
              <Link key={link.to} to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? 'text-gold-400 bg-gold-500/8' : 'text-navy-200/70 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link to="/contacto" className="btn-primary w-full text-sm py-3 justify-center">
              Publicar propiedad
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
