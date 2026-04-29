import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';

interface Props { onSearch: () => void; }

const TRUST = [
  { icon: Award,  value: '10+',    label: 'Años en el mercado' },
  { icon: Users,  value: '3,000+', label: 'Clientes satisfechos' },
  { icon: Shield, value: '100%',   label: 'Propiedades verificadas' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection({ onSearch }: Props) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden">

      {/* ── Full-bleed property image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90"
          alt="Propiedad premium en Venezuela"
          className="w-full h-full object-cover"
          style={{ opacity: 0.65 }}
        />
        {/* cinematic gradient — reveals image at top, text-safe at bottom */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #040810 18%, rgba(4,8,16,0.7) 50%, rgba(4,8,16,0.15) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(4,8,16,0.6) 0%, transparent 60%)' }} />
      </div>

      {/* ── Main content — anchored to bottom ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-36 pt-40">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gold-400 text-[11px] font-bold tracking-[0.3em] uppercase mb-7"
        >
          El Faro Inmobiliaria · Venezuela
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="font-display font-bold text-white leading-[0.95] tracking-tight mb-8"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
        >
          Encuentra
          <br />
          tu hogar
          <br />
          <span className="text-gold-400">ideal.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-5xl"
        >
          <p className="text-navy-200/55 text-lg leading-relaxed max-w-sm">
            La inmobiliaria de confianza en Venezuela.
            Propiedades verificadas en Caracas, Valencia, Maracaibo y más.
          </p>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button onClick={onSearch} className="btn-primary">
              Explorar propiedades
              <ArrowRight className="w-4 h-4" />
            </button>
            <a href="/contacto" className="btn-outline">
              Hablar con un asesor
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Trust strip — fixed to bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ background: 'rgba(4,8,16,0.75)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {TRUST.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-gold-500/70 shrink-0" />
                <div>
                  <p className="font-display font-bold text-white text-base leading-none">{value}</p>
                  <p className="text-navy-300/50 text-[11px] mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <button
            onClick={onSearch}
            className="hidden md:flex items-center gap-3 text-navy-400/60 hover:text-navy-200 transition-colors group"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase">Explorar</span>
            <div className="w-5 h-8 border border-current rounded-full flex justify-center pt-1.5 opacity-60">
              <div className="w-0.5 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </button>
        </div>
      </motion.div>

    </section>
  );
}
