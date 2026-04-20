import { Shield, Users, TrendingUp, Star, Clock, Key } from 'lucide-react';

const REASONS = [
  {
    icon: Shield,
    title: 'Propiedades verificadas',
    description: 'Cada propiedad es inspeccionada físicamente por nuestro equipo antes de publicarse. Cero sorpresas.',
  },
  {
    icon: Users,
    title: 'Asesores certificados',
    description: 'Nuestros agentes tienen más de 8 años de experiencia promedio en el mercado inmobiliario venezolano.',
  },
  {
    icon: TrendingUp,
    title: 'Precios reales de mercado',
    description: 'Accede a valoraciones precisas basadas en datos actualizados. Ni más ni menos de lo que vale.',
  },
  {
    icon: Star,
    title: 'Servicio de excelencia',
    description: 'Atención personalizada en cada etapa del proceso. Estamos contigo desde la búsqueda hasta la firma.',
  },
  {
    icon: Clock,
    title: 'Respuesta en menos de 1 hora',
    description: 'Nuestro equipo responde rápido. Ningún cliente espera más de una hora por una consulta.',
  },
  {
    icon: Key,
    title: 'Gestión completa del cierre',
    description: 'Nos encargamos de toda la documentación legal, notaría y trámites para que tú no tengas que preocuparte.',
  },
];

export default function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="section-accent mx-auto" />
        <h2 className="section-title">¿Por qué elegir El Faro?</h2>
        <p className="section-subtitle max-w-xl mx-auto">
          Somos más que una inmobiliaria. Somos tu guía en la decisión más importante de tu vida.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map(({ icon: Icon, title, description }) => (
          <div key={title}
            className="card p-6 group hover:border-gold-500/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-300">
              <Icon className="w-6 h-6 text-gold-400" />
            </div>
            <h3 className="text-white font-bold mb-2">{title}</h3>
            <p className="text-navy-400 text-sm leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
