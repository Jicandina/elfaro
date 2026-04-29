import { Shield, Users, TrendingUp, Star, Clock, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const REASONS = [
  { icon: Shield,     num: '01', title: 'Propiedades verificadas',      description: 'Cada propiedad es inspeccionada físicamente antes de publicarse. Sin sorpresas, sin letra pequeña.' },
  { icon: Users,      num: '02', title: 'Asesores certificados',        description: 'Más de 8 años de experiencia promedio en el mercado inmobiliario venezolano.' },
  { icon: TrendingUp, num: '03', title: 'Precios reales de mercado',    description: 'Valoraciones basadas en datos actualizados. Ni más ni menos de lo que realmente vale.' },
  { icon: Star,       num: '04', title: 'Servicio de excelencia',       description: 'Atención personalizada en cada etapa. Desde la búsqueda hasta la firma del contrato.' },
  { icon: Clock,      num: '05', title: 'Respuesta en menos de 1 hora', description: 'Ningún cliente espera más de una hora por una consulta. Respondemos rápido, siempre.' },
  { icon: Key,        num: '06', title: 'Gestión completa del cierre',  description: 'Documentación legal, notaría y trámites. Nos encargamos de todo para que tú no tengas que preocuparte.' },
];

export default function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-28">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-20 items-start">

        {/* Left — sticky anchor */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-28"
        >
          <div className="section-accent" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Por qué elegir<br />
            <span className="text-gold-400">El Faro</span>
          </h2>
          <p className="text-navy-300/50 text-base leading-relaxed">
            Somos más que una inmobiliaria. Somos tu guía en la decisión más importante de tu vida.
          </p>

          {/* decorative line */}
          <div className="mt-12 w-px h-24 bg-gradient-to-b from-gold-500/30 to-transparent hidden lg:block" />
        </motion.div>

        {/* Right — feature rows */}
        <div>
          {REASONS.map(({ icon: Icon, num, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-7 py-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* number + icon */}
              <div className="flex flex-col items-center gap-3 w-12 shrink-0 pt-0.5">
                <span className="font-display text-[11px] font-bold tracking-widest text-navy-600 group-hover:text-gold-500/50 transition-colors duration-300">
                  {num}
                </span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-gold-500/10"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <Icon className="w-4 h-4 text-navy-400 group-hover:text-gold-400 transition-colors duration-300" />
                </div>
              </div>

              {/* text */}
              <div className="flex-1 pt-1">
                <h3 className="text-white font-semibold mb-2 group-hover:text-gold-100 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-navy-300/50 text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
