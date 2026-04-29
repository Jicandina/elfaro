import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Bed, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props { onSearch: () => void; }

const ease = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  { value: '10+', label: 'Años activos' },
  { value: '3,000+', label: 'Clientes' },
  { value: '600+', label: 'Propiedades' },
];

export default function HeroSection({ onSearch }: Props) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden">

      {/* ── LEFT — editorial content panel ── */}
      <div className="relative z-10 flex flex-col justify-center
                      w-full md:w-[46%] lg:w-[42%]
                      px-8 md:px-12 lg:px-16 xl:px-20
                      pt-32 pb-16 md:py-0
                      bg-navy-950">

        {/* thin vertical accent line on the right edge of the panel */}
        <div className="absolute top-0 right-0 w-px h-full
                        bg-gradient-to-b from-transparent via-gold-500/25 to-transparent
                        hidden md:block" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-gold-500/70 text-[10px] font-bold tracking-[0.35em] uppercase mb-8"
          >
            El Faro · Inmobiliaria · Venezuela
          </motion.p>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease }}
            className="font-display font-bold text-white leading-[1.02] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)' }}
          >
            Propiedades
            <br />
            excepcionales
            <br />
            <span className="text-gold-400">en Venezuela.</span>
          </motion.h1>

          {/* body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="text-navy-300/50 text-[0.95rem] leading-relaxed mb-10 max-w-[340px]"
          >
            Más de una década conectando familias con su hogar ideal.
            Propiedades verificadas en Caracas, Valencia, Maracaibo y más.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52, ease }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <button onClick={onSearch} className="btn-primary">
              Explorar propiedades
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/contacto" className="btn-outline">
              Hablar con un asesor
            </Link>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-8 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            {TRUST.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display font-bold text-white text-xl leading-none mb-1">{value}</p>
                <p className="text-navy-500 text-[11px]">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT — property image panel ── */}
      <div className="relative flex-1 min-h-[55vw] md:min-h-0 overflow-hidden">

        {/* main image */}
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85"
          alt="Residencia premium — El Faro Inmobiliaria"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* subtle gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(4,8,16,0.35) 0%, transparent 40%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(4,8,16,0.6) 0%, transparent 35%)' }} />

        {/* floating featured property card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="absolute bottom-8 left-6 md:bottom-10 md:left-8 max-w-[260px]"
          style={{
            background: 'rgba(4,8,16,0.88)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '1rem',
          }}
        >
          {/* mini thumbnail */}
          <div className="relative rounded-xl overflow-hidden mb-3 h-28">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80"
              alt="Residencia Las Mercedes"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-2 left-2 badge-sale text-[10px] px-2 py-0.5">
              Destacada
            </span>
          </div>

          <p className="text-white font-semibold text-sm leading-tight mb-1">
            Residencia en Las Mercedes
          </p>

          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3 text-navy-400" />
            <p className="text-navy-400 text-[11px]">Caracas, Venezuela</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gold-400 font-bold text-sm">$485,000</p>
            <div className="flex items-center gap-3 text-navy-400 text-[11px]">
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3" /> 4
              </span>
              <span className="flex items-center gap-1">
                <Square className="w-3 h-3" /> 350m²
              </span>
            </div>
          </div>
        </motion.div>

        {/* city label top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="absolute top-8 right-8 text-right"
        >
          <p className="text-white/30 text-[10px] tracking-[0.25em] uppercase">
            Caracas · Venezuela
          </p>
        </motion.div>

      </div>
    </section>
  );
}
