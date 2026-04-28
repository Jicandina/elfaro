import { lazy, Suspense } from 'react';
import { ArrowDown, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const GoldOrb = lazy(() => import('../ui/GoldOrb'));

interface Props { onSearch: () => void; }

export default function HeroSection({ onSearch }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt="Caracas skyline"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/85 to-navy-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gold-500/5 blur-[120px] animate-pulse-gold" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-navy-500/10 blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-sm font-semibold mb-8"
            >
              <Award className="w-3.5 h-3.5" />
              La inmobiliaria de confianza desde 2014
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              Tu propiedad ideal<br />
              <span className="gradient-text">te está esperando</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-navy-300/70 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Compra, vende o alquila con la inmobiliaria más confiable de Venezuela. Propiedades verificadas, asesores expertos y resultados garantizados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <button onClick={onSearch} className="btn-primary text-base px-8 py-4">
                Buscar propiedades
                <ArrowDown className="w-4 h-4" />
              </button>
              <a href="/contacto" className="btn-outline text-base px-8 py-4">
                Hablar con un asesor
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { icon: Award,  value: '10+',    label: 'Años de experiencia' },
                { icon: Users,  value: '3,000+', label: 'Clientes satisfechos' },
                { icon: Shield, value: '100%',   label: 'Propiedades verificadas' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <Icon className="w-5 h-5 text-gold-400 mx-auto lg:mx-0 mb-2" />
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-navy-400">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 w-72 h-72 lg:w-[420px] lg:h-[420px]"
          >
            <Suspense fallback={
              <div className="w-full h-full rounded-full bg-gold-500/5 border border-gold-500/10 animate-pulse" />
            }>
              <GoldOrb />
            </Suspense>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={onSearch}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-400 hover:text-gold-400 transition-colors group"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Explorar</span>
        <div className="w-5 h-8 border-2 border-current rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-current rounded-full animate-bounce" />
        </div>
      </motion.button>
    </section>
  );
}
