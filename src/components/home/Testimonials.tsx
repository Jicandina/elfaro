import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Patricia Herrera',
    role: 'Compradora — Las Mercedes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    text: 'El equipo de El Faro fue excepcional. Encontraron exactamente lo que buscaba en tiempo récord y manejaron toda la documentación sin errores. Fue la experiencia más fluida que he tenido comprando un inmueble.',
  },
  {
    name: 'Alejandro Bravo',
    role: 'Vendedor — El Hatillo',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
    text: 'Vendí mi casa en 5 semanas al precio que pedí. Los asesores conocen el mercado a la perfección y su estrategia de marketing es de primera. Totalmente profesional y transparente en cada paso.',
  },
  {
    name: 'Valeria Díaz',
    role: 'Arrendataria — Chacao',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
    rating: 5,
    text: 'Busqué oficina en Chacao por semanas sin éxito. El Faro me encontró el espacio ideal en menos de una semana y negociaron mejores condiciones de lo que esperaba. Son mi inmobiliaria de confianza.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy-900/30 border-y border-white/5 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="section-accent mx-auto" />
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <p className="section-subtitle">Más de 3,000 familias y empresas confían en nosotros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, avatar, rating, text }) => (
            <div key={name} className="card p-7 flex flex-col hover:border-gold-500/20 transition-all duration-300">
              <Quote className="w-8 h-8 text-gold-500/25 mb-4" />
              <p className="text-navy-300/80 text-sm leading-relaxed flex-1 mb-6">"{text}"</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover opacity-80 ring-2 ring-gold-500/20" />
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-navy-500 text-xs mt-0.5">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
