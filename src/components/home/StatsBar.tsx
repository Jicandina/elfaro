import { Building2, Users, MapPin, Award } from 'lucide-react';

const STATS = [
  { icon: Building2, value: '600+',    label: 'Propiedades listadas' },
  { icon: Users,     value: '3,000+',  label: 'Clientes satisfechos' },
  { icon: MapPin,    value: '15',      label: 'Ciudades activas' },
  { icon: Award,     value: '10 años', label: 'De trayectoria' },
];

export default function StatsBar() {
  return (
    <section className="relative py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/0 via-gold-500/5 to-navy-900/0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900/60 backdrop-blur-sm border border-gold-500/10 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-gold-400" />
                </div>
                <p className="text-4xl font-display font-bold gradient-text mb-1">{value}</p>
                <p className="text-navy-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
