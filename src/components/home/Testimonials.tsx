import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Patricia Herrera',
    role: 'Compradora — Las Mercedes, Caracas',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    text: 'El equipo de El Faro fue excepcional. Encontraron exactamente lo que buscaba en tiempo récord y manejaron toda la documentación sin errores. La experiencia más fluida que he tenido comprando un inmueble.',
    rating: 5,
    featured: true,
  },
  {
    name: 'Alejandro Bravo',
    role: 'Vendedor — El Hatillo',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    text: 'Vendí mi casa en 5 semanas al precio que pedí. Los asesores conocen el mercado a la perfección.',
    rating: 5,
    featured: false,
  },
  {
    name: 'Valeria Díaz',
    role: 'Arrendataria — Chacao',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80',
    text: 'Me encontraron el espacio ideal en menos de una semana y negociaron mejores condiciones de lo que esperaba.',
    rating: 5,
    featured: false,
  },
];

export default function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="section-accent" />
        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
        <p className="section-subtitle">Más de 3,000 familias y empresas confían en nosotros</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">

        {/* Featured testimonial — large */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-8 md:p-10 flex flex-col justify-between"
          style={{ minHeight: '320px' }}
        >
          <div>
            <div className="flex gap-1 mb-6">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
              ))}
            </div>
            <p className="text-navy-100/80 text-lg leading-relaxed mb-8">
              "{featured.text}"
            </p>
          </div>
          <div className="flex items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
            <img src={featured.avatar} alt={featured.name}
              className="w-12 h-12 rounded-full object-cover" style={{ opacity: 0.85 }} />
            <div>
              <p className="text-white font-semibold">{featured.name}</p>
              <p className="text-navy-400 text-xs mt-0.5">{featured.role}</p>
            </div>
          </div>
        </motion.div>

        {/* Two smaller testimonials stacked */}
        <div className="flex flex-col gap-5">
          {rest.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card p-7 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-navy-200/70 text-sm leading-relaxed mb-6">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                <img src={t.avatar} alt={t.name}
                  className="w-10 h-10 rounded-full object-cover" style={{ opacity: 0.8 }} />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-navy-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
