import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { buildWaUrl } from '../ui/WhatsAppButton';

export default function ContactCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1400&q=80"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900/95 to-navy-800" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative px-8 py-20 text-center">
          <div className="section-accent mx-auto" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            ¿Listo para dar el siguiente paso?
          </h2>
          <p className="text-navy-300/70 text-lg mb-10 max-w-xl mx-auto">
            Habla con un asesor de El Faro hoy mismo. Sin compromiso, sin costo. Solo resultados.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={buildWaUrl('584128000000', 'Hola, me gustaría hablar con un asesor de El Faro Inmobiliaria.')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20b957] text-white font-bold rounded-xl text-base transition-all duration-200 active:scale-95">
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>
            <a href="tel:+584128000000"
              className="btn-outline px-8 py-4 text-base">
              <Phone className="w-5 h-5" />
              Llamar ahora
            </a>
            <Link to="/contacto" className="btn-navy px-8 py-4 text-base">
              Formulario de contacto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
