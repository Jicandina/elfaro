import { motion } from 'framer-motion';
import { Shield, Award, Users, Bed, Maximize2, MapPin } from 'lucide-react';

interface Props { onSearch: () => void; }

const TRUST = [
  { icon: Award,  value: '10+',    label: 'Años de experiencia' },
  { icon: Users,  value: '3,000+', label: 'Clientes' },
  { icon: Shield, value: '100%',   label: 'Verificadas' },
];

export default function HeroSection({ onSearch }: Props) {
  return (
    <section className="min-h-[100dvh] flex flex-col lg:flex-row">

      {/* LEFT — editorial white panel */}
      <div className="flex-1 bg-white flex items-center lg:max-w-[52%]">
        <div className="w-full px-8 md:px-14 xl:px-20 pt-28 pb-16">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs font-bold tracking-[0.25em] uppercase text-amber-600 mb-8"
          >
            El Faro Inmobiliaria · Venezuela
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl xl:text-[5.5rem] font-bold text-stone-900 leading-[1.02] tracking-tight mb-7"
          >
            Tu próxima<br />
            propiedad<br />
            <span className="text-amber-600">te espera.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="text-stone-500 text-lg max-w-sm mb-10 leading-relaxed"
          >
            Compra, vende o alquila con la inmobiliaria más confiable de Venezuela.
            Propiedades verificadas, asesores expertos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <button onClick={onSearch} className="btn-primary px-8 py-3.5 text-base">
              Buscar propiedades
            </button>
            <a href="/contacto" className="btn-outline px-8 py-3.5 text-base">
              Hablar con un asesor
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-8 pt-8 border-t border-stone-100"
          >
            {TRUST.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-display font-bold text-stone-900 text-lg leading-none">{value}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* RIGHT — full-bleed property image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative h-72 lg:h-auto lg:flex-1 overflow-hidden bg-stone-200"
      >
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85"
          alt="Propiedad premium en Venezuela"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Floating property card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-6 left-6 right-6 md:left-8 md:bottom-8 md:right-auto md:w-80 bg-white rounded-2xl p-5 shadow-xl"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-stone-900 text-sm">Penthouse · Altamira</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-stone-400" />
                <p className="text-stone-400 text-xs">Caracas, Venezuela</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
              Destacado
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                <Bed className="w-3.5 h-3.5" /> 3 hab.
              </div>
              <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                <Maximize2 className="w-3.5 h-3.5" /> 180m²
              </div>
            </div>
            <p className="font-display font-bold text-stone-900 text-base">$285,000</p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
