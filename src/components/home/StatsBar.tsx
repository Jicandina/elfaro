import { useEffect, useRef, useState } from 'react';
import { Building2, Users, MapPin, Award } from 'lucide-react';

const STATS = [
  { icon: Building2, target: 600,  suffix: '+',     label: 'Propiedades listadas' },
  { icon: Users,     target: 3000, suffix: '+',     label: 'Clientes satisfechos', format: true },
  { icon: MapPin,    target: 15,   suffix: '',      label: 'Ciudades activas' },
  { icon: Award,     target: 10,   suffix: ' años', label: 'De trayectoria' },
];

function Counter({ target, suffix, format, inView }: {
  target: number; suffix: string; format?: boolean; inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  const display = format ? count.toLocaleString('en-US') : count;
  return <>{display}{suffix}</>;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/0 via-gold-500/5 to-navy-900/0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="bg-navy-900/60 backdrop-blur-sm border border-gold-500/10 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, target, suffix, format, label }) => (
              <div key={label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-gold-400" />
                </div>
                <p className="text-4xl font-display font-bold gradient-text mb-1">
                  <Counter target={target} suffix={suffix} format={format} inView={inView} />
                </p>
                <p className="text-navy-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
