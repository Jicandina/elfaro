import { useEffect, useRef, useState } from 'react';

const STATS = [
  { target: 600,  suffix: '+',     label: 'Propiedades listadas', format: false },
  { target: 3000, suffix: '+',     label: 'Clientes satisfechos', format: true },
  { target: 15,   suffix: '',      label: 'Ciudades activas',     format: false },
  { target: 10,   suffix: ' años', label: 'De trayectoria',       format: false },
];

function Counter({ target, suffix, format, inView }: {
  target: number; suffix: string; format: boolean; inView: boolean;
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
    <section className="bg-stone-900 py-16">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-700/50">
          {STATS.map(({ target, suffix, format, label }) => (
            <div key={label} className="text-center px-8 py-4">
              <p className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter target={target} suffix={suffix} format={format} inView={inView} />
              </p>
              <p className="text-stone-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
