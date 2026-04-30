import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Camera, Users, Briefcase } from 'lucide-react';
import FaroLogo from '../ui/FaroLogo';

const SOCIAL = [
  { icon: Camera,    href: '#', label: 'Instagram de El Faro Inmobiliaria' },
  { icon: Users,     href: '#', label: 'Facebook de El Faro Inmobiliaria' },
  { icon: Briefcase, href: '#', label: 'LinkedIn de El Faro Inmobiliaria' },
];

const NAV_LINKS = [
  { label: 'Inicio',               to: '/' },
  { label: 'Propiedades',           to: '/propiedades' },
  { label: 'Apartamentos en venta', to: '/propiedades?operacion=venta&tipo=apartamento' },
  { label: 'Alquileres Caracas',    to: '/propiedades?operacion=alquiler&ciudad=Caracas' },
  { label: 'Nosotros',              to: '/nosotros' },
  { label: 'Contacto',              to: '/contacto' },
];

const CONTACT = [
  { icon: Phone, title: 'Teléfono', value: '+58 412-800-0000', href: 'tel:+584128000000', sub: 'Lun–Sáb, 8am–6pm' },
  { icon: Mail,  title: 'Correo',   value: 'info@elfaro.com.ve', href: 'mailto:info@elfaro.com.ve', sub: null },
  { icon: MapPin,title: 'Oficina',  value: 'Las Mercedes, Caracas', href: '#', sub: null },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 mt-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5">
            <FaroLogo className="mb-5" />
            <p className="text-navy-400 text-sm leading-relaxed max-w-xs">
              Desde 2014, guiando a familias y empresas hacia la propiedad perfecta en Venezuela. Confianza, transparencia y resultados.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/15 border border-white/5 hover:border-gold-500/30 flex items-center justify-center text-navy-400 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav className="md:col-span-3" aria-label="Navegación del footer">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              {CONTACT.map(({ icon: Icon, title, value, href, sub }) => (
                <li key={title} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  <div>
                    <a href={href} className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                      {value}
                    </a>
                    {sub && <p className="text-navy-600 text-xs mt-0.5">{sub}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-navy-600 text-xs">
            &copy; {new Date().getFullYear()} El Faro Inmobiliaria. Todos los derechos reservados.
          </p>
          <p className="text-navy-600 text-xs">Hecho con dedicación en Venezuela</p>
        </div>
      </div>
    </footer>
  );
}
