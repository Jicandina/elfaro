import { useEffect, useRef, useState } from 'react';

const STATS = [
  { target: 600,  suffix: '+',     label: 'Propiedades listadas', format: false },
  { target: 3000, suffix: '+',     label: 'Clientes satisfechos', format: true  },
  { target: 15,   suffix: '',      label: 'Ciudades activas',     format: false },
  { target: 10,   suffix: '',      label: 'Años de trayectoria',  format: false },
];

function Counter({ target, suffix, format, inView }: {
  target: number; suffix: string; format: boolean; inView: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 2000;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{format ? count.toLocaleString() : count}{suffix}</>;
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
    <section ref={ref} className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x" style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}>
          {STATS.map(({ target, suffix, format, label }) => (
            <div key={label} className="lg:px-12 first:pl-0 last:pr-0">
              <p className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight leading-none mb-3">
                <Counter target={target} suffix={suffix} format={format} inView={inView} />
              </p>
              <div className="w-6 h-px bg-gold-500/50 mb-3" />
              <p className="text-navy-300/50 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
