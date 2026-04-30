import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import { Shield, Heart, TrendingUp, Star, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const TEAM = [
  { name: 'Rafael Díaz',    role: 'Director General',             exp: '18 años en bienes raíces',         img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { name: 'Carmen Salazar', role: 'Directora Comercial',          exp: '14 años en el mercado venezolano',  img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=300&q=80' },
  { name: 'Luis Montoya',   role: 'Asesor Senior — Caracas',      exp: '10 años cerrando negocios',         img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Daniela Ospino', role: 'Asesora — Valencia y Oriente', exp: '7 años en el sector',               img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
];

const VALUES = [
  { icon: Shield,     num: '01', title: 'Confianza',     desc: 'Cada propiedad verificada personalmente antes de publicarse. Sin sorpresas ni letra pequeña.' },
  { icon: Heart,      num: '02', title: 'Compromiso',    desc: 'No cerramos el proceso hasta encontrar exactamente lo que buscas, al precio que mereces.' },
  { icon: TrendingUp, num: '03', title: 'Transparencia', desc: 'Precios reales de mercado actualizados. Lo que ves es exactamente lo que pagas.' },
  { icon: Star,       num: '04', title: 'Excelencia',    desc: 'Servicio de primera línea adaptado al contexto venezolano, con asesores certificados.' },
];

const MILESTONES = [
  { year: '2014', event: 'Fundamos El Faro con 15 propiedades en Caracas' },
  { year: '2016', event: 'Expandimos operaciones a Valencia y Maracaibo' },
  { year: '2018', event: 'Superamos 1,000 transacciones exitosas' },
  { year: '2020', event: 'Lanzamos nuestra plataforma digital' },
  { year: '2022', event: 'Abrimos oficinas en Barcelona y Barquisimeto' },
  { year: '2024', event: 'Más de 3,000 familias encontraron su hogar con nosotros' },
];

const STATS = [
  { value: '600+',  label: 'Propiedades listadas' },
  { value: '3,000+', label: 'Clientes satisfechos' },
  { value: '15',    label: 'Ciudades activas' },
  { value: '10',    label: 'Años de trayectoria' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutPage() {
  useSEO({
    title: 'Nosotros | El Faro Inmobiliaria',
    description: 'Conoce al equipo de El Faro Inmobiliaria. Más de 10 años de experiencia en el mercado inmobiliario venezolano, 3,000+ clientes satisfechos.',
  });

  return (
    <PageTransition>
    <div className="pt-24 pb-20">

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="section-accent" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              La inmobiliaria que<br />
              <span className="text-gold-400">Venezuela necesitaba</span>
            </h1>
            <p className="text-navy-300/80 text-lg leading-relaxed mb-5">
              Nacimos en Caracas en 2014 con una misión clara: hacer que comprar, vender y alquilar propiedades en Venezuela sea simple, seguro y transparente.
            </p>
            <p className="text-navy-400 leading-relaxed mb-10">
              Hoy somos la plataforma con más propiedades verificadas del país, con presencia en Caracas, Valencia, Maracaibo, Barquisimeto y el Oriente. Nuestro equipo conoce el mercado como nadie.
            </p>

            {/* Inline stats — not a floating card */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10 py-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl font-bold text-gold-400 leading-none">{value}</p>
                  <p className="text-navy-400 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/propiedades" className="btn-primary">Ver propiedades</Link>
              <Link to="/contacto" className="btn-outline">Hablar con un asesor</Link>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
                alt="Equipo El Faro Inmobiliaria trabajando"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values — list format instead of 4 identical cards ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">

          {/* Left anchor */}
          <div className="lg:sticky lg:top-28">
            <div className="section-accent" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              Lo que nos<br />hace distintos
            </h2>
            <p className="text-navy-300/50 text-base leading-relaxed">
              Cuatro principios que guían cada consulta, cada visita y cada cierre que hacemos.
            </p>
          </div>

          {/* Right — feature rows */}
          <div>
            {VALUES.map(({ icon: Icon, num, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease }}
                className="group flex items-start gap-7 py-8"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
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
                <div className="flex-1 pt-1">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-gold-100 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-navy-300/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <div>
            <div className="section-accent" />
            <h2 className="section-title mb-4">10 años de historia</h2>
            <p className="text-navy-300/50 text-base leading-relaxed max-w-sm">
              Construyendo confianza un hogar a la vez, desde Caracas hasta todo el país.
            </p>
          </div>

          <div className="space-y-0">
            {MILESTONES.map(({ year, event }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
                className="flex gap-5 items-start"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/25 flex items-center justify-center">
                    <span className="text-gold-400 text-xs font-bold">{year.slice(2)}</span>
                  </div>
                  {i < MILESTONES.length - 1 && <div className="w-px h-8 bg-gold-500/12 mt-1" />}
                </div>
                <div className="pb-2 pt-2">
                  <span className="text-gold-500 text-sm font-semibold">{year}</span>
                  <p className="text-navy-200 mt-0.5 text-sm">{event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="mb-12">
          <div className="section-accent" />
          <h2 className="section-title">Nuestro equipo</h2>
          <p className="section-subtitle">Asesores que conocen el mercado venezolano en profundidad</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map(({ name, role, exp, img }) => (
            <div key={name} className="card group hover:border-gold-500/25 hover:-translate-y-1 transition-all duration-300">
              <div className="h-52 overflow-hidden">
                <img
                  src={img}
                  alt={`${name}, ${role} en El Faro Inmobiliaria`}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold">{name}</h3>
                <p className="text-gold-400 text-sm font-medium mt-0.5">{role}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-500/60" />
                  <span className="text-navy-500 text-xs">{exp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden text-center py-16 px-8"
          style={{ background: 'rgba(9,13,28,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 0%, rgba(196,144,58,0.08) 0%, transparent 70%)' }} />
          <div className="relative">
            <div className="section-accent mx-auto" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para encontrar tu propiedad ideal?
            </h2>
            <p className="text-navy-300/60 text-lg mb-8 max-w-lg mx-auto">
              Nuestro equipo te asesora sin compromiso ni costo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/propiedades" className="btn-primary px-8 py-4">Explorar propiedades</Link>
              <Link to="/contacto" className="btn-outline px-8 py-4">Contactar asesor</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
    </PageTransition>
  );
}
