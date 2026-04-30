import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Camera, Users, Briefcase } from 'lucide-react';
import FaroLogo from '../ui/FaroLogo';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5">
            <FaroLogo className="mb-5" />
            <p className="text-navy-400 text-sm leading-relaxed max-w-xs">
              Desde 2014, guiando a familias y empresas hacia la propiedad perfecta en Venezuela. Confianza, transparencia y resultados.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Camera,    href: '#', label: 'Instagram' },
                { icon: Users,     href: '#', label: 'Facebook' },
                { icon: Briefcase, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/15 border border-white/5 hover:border-gold-500/30 flex items-center justify-center text-navy-400 hover:text-gold-400 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio',               to: '/' },
                { label: 'Propiedades',           to: '/propiedades' },
                { label: 'Apartamentos en venta', to: '/propiedades?operacion=venta&tipo=apartamento' },
                { label: 'Alquileres Caracas',    to: '/propiedades?operacion=alquiler&ciudad=Caracas' },
                { label: 'Nosotros',              to: '/nosotros' },
                { label: 'Contacto',              to: '/contacto' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+584128000000" className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                    +58 412-800-0000
                  </a>
                  <p className="text-navy-600 text-xs mt-0.5">Lun–Sáb, 8am–6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <a href="mailto:info@elfaro.com.ve" className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                  info@elfaro.com.ve
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-navy-400 text-sm">
                  Las Mercedes, Caracas, Venezuela
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-600 text-xs">
            © {new Date().getFullYear()} El Faro Inmobiliaria. Todos los derechos reservados.
          </p>
          <p className="text-navy-600 text-xs">Hecho con dedicación en Venezuela 🇻🇪</p>
        </div>
      </div>
    </footer>
  );
}
