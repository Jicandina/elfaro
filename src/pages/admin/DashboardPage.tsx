import { Link } from 'react-router-dom';
import { Building2, MessageSquare, Eye, TrendingUp, PlusCircle, ArrowRight, Clock } from 'lucide-react';
import { useProperties } from '../../hooks/useProperties';

const RECENT_INQUIRIES = [
  { name: 'Carlos Méndez',  property: 'Penthouse en Altamira',         time: 'Hace 12 min',   status: 'nueva' },
  { name: 'Laura Castillo', property: 'Apartamento en Las Mercedes',    time: 'Hace 1 hora',   status: 'vista' },
  { name: 'Miguel Torres',  property: 'Casa en La Lagunita',            time: 'Hace 3 horas',  status: 'nueva' },
  { name: 'Ana Rodríguez',  property: 'Oficina Corporativa en Chacao',  time: 'Hace 5 horas',  status: 'vista' },
];

export default function DashboardPage() {
  const { properties, loading } = useProperties({});

  const total      = properties.length;
  const enVenta    = properties.filter((p) => p.operation === 'venta').length;
  const enAlquiler = properties.filter((p) => p.operation === 'alquiler').length;
  const STATS = [
    { icon: Building2,    label: 'Total propiedades', value: loading ? '—' : total,      color: 'text-gold-400',  bg: 'bg-gold-500/10  border-gold-500/20' },
    { icon: TrendingUp,   label: 'En venta',           value: loading ? '—' : enVenta,   color: 'text-navy-300',  bg: 'bg-navy-700/40  border-navy-700/60' },
    { icon: Eye,          label: 'En alquiler',         value: loading ? '—' : enAlquiler, color: 'text-blue-400', bg: 'bg-blue-500/10  border-blue-500/20' },
    { icon: MessageSquare,label: 'Consultas nuevas',    value: '2',                       color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-navy-400 text-sm mt-1">
            Resumen general de El Faro Inmobiliaria
          </p>
        </div>
        <Link to="/admin/nueva" className="btn-primary text-sm py-2.5">
          <PlusCircle className="w-4 h-4" />
          Nueva propiedad
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`card p-5 border ${bg}`}>
            <div className="flex items-center justify-between mb-3">
              <Icon className={`w-5 h-5 ${color}`} />
              <span className={`text-2xl font-bold ${color}`}>{value}</span>
            </div>
            <p className="text-navy-400 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent properties */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Propiedades recientes</h2>
            <Link to="/admin/propiedades" className="text-gold-400 hover:text-gold-300 text-sm flex items-center gap-1 transition-colors">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 bg-navy-800 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {properties.slice(0, 5).map((p) => (
                <div key={p.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-800/60 transition-colors group">
                  <img src={p.images[0]} alt={p.title}
                    className="w-12 h-10 rounded-lg object-cover shrink-0 opacity-80" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{p.title}</p>
                    <p className="text-navy-500 text-xs">{p.location.zone}, {p.location.city}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-gold-400 text-sm font-semibold">
                      ${p.price.toLocaleString('en-US')}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      p.operation === 'venta'
                        ? 'bg-gold-500/15 text-gold-400'
                        : 'bg-navy-700 text-navy-300'
                    }`}>
                      {p.operation}
                    </span>
                  </div>
                  <Link to={`/admin/propiedades/${p.id}`}
                    className="opacity-0 group-hover:opacity-100 text-navy-400 hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent inquiries */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Consultas recientes</h2>
            <Link to="/admin/consultas" className="text-gold-400 hover:text-gold-300 text-sm flex items-center gap-1 transition-colors">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {RECENT_INQUIRIES.map(({ name, property, time, status }) => (
              <div key={name} className="p-3 rounded-xl bg-navy-800/40 hover:bg-navy-800/70 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-white text-sm font-medium">{name}</p>
                  {status === 'nueva' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 shrink-0">
                      Nueva
                    </span>
                  )}
                </div>
                <p className="text-navy-400 text-xs line-clamp-1">{property}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="w-3 h-3 text-navy-600" />
                  <span className="text-navy-600 text-xs">{time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-6">
        <h2 className="text-white font-semibold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Nueva propiedad',  to: '/admin/nueva',        icon: PlusCircle,    color: 'text-gold-400' },
            { label: 'Ver propiedades',  to: '/admin/propiedades',  icon: Building2,     color: 'text-navy-300' },
            { label: 'Ver consultas',    to: '/admin/consultas',    icon: MessageSquare, color: 'text-blue-400' },
            { label: 'Ir al sitio web',  to: '/',                   icon: Eye,           color: 'text-green-400', external: true },
          ].map(({ label, to, icon: Icon, color, external }) => (
            external ? (
              <a key={label} href={to} target="_blank" rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 hover:border-gold-500/20 hover:bg-gold-500/5 transition-all text-center">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-navy-300 text-xs font-medium">{label}</span>
              </a>
            ) : (
              <Link key={label} to={to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 hover:border-gold-500/20 hover:bg-gold-500/5 transition-all text-center">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-navy-300 text-xs font-medium">{label}</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
