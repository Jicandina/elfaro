import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import FaroLogo from '../ui/FaroLogo';

const NAV = [
  { label: 'Inicio',       to: '/' },
  { label: 'Propiedades',  to: '/propiedades' },
  { label: 'Nosotros',     to: '/nosotros' },
  { label: 'Contacto',     to: '/contacto' },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobile, setMobile]       = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMobile(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy-950/95 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">

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
                    ? 'text-gold-400 bg-gold-500/10'
                    : 'text-navy-200 hover:text-white hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+584128000000"
              className="flex items-center gap-2 text-sm text-navy-300 hover:text-gold-400 transition-colors">
              <Phone className="w-4 h-4" />
              +58 412-800-0000
            </a>
            <Link to="/contacto" className="btn-primary text-sm py-2.5 px-5">
              Publicar propiedad
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-navy-200 hover:text-white transition-colors"
            onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden bg-navy-950/98 backdrop-blur-md border-t border-white/5 px-4 py-4 space-y-1">
          {NAV.map((link) => {
            const active = link.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.to.replace(/s$/, ''));
            return (
            <Link key={link.to} to={link.to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active ? 'bg-gold-500/10 text-gold-400' : 'text-navy-200 hover:bg-white/5'
              }`}>
              {link.label}
            </Link>
            );
          })}
          <div className="pt-2">
            <Link to="/contacto" className="btn-primary w-full text-sm py-3">
              Publicar propiedad
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
