import { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, CheckCheck, Trash2, X } from 'lucide-react';

type Status = 'nueva' | 'vista' | 'respondida';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: string;
  message: string;
  time: string;
  status: Status;
}

const MOCK_INQUIRIES: Inquiry[] = [
  { id: '1', name: 'Carlos Méndez',   phone: '+58 412-111-0001', email: 'carlos@gmail.com', property: 'Penthouse en Altamira',        message: 'Estoy interesado en visitar la propiedad este fin de semana. ¿Está disponible el sábado en la mañana?', time: 'Hace 12 min',  status: 'nueva' },
  { id: '2', name: 'Laura Castillo',  phone: '+58 414-222-0002', email: 'laura@hotmail.com', property: 'Apartamento en Las Mercedes',  message: 'Quisiera saber si el precio es negociable y si incluye el estacionamiento en el canon de alquiler.', time: 'Hace 1 hora', status: 'nueva' },
  { id: '3', name: 'Miguel Torres',   phone: '+58 416-333-0003', email: 'miguel@gmail.com', property: 'Casa en La Lagunita',           message: 'Hola, soy inversionista y busco propiedades premium en Caracas. Me gustaría más información sobre esta residencia.', time: 'Hace 3 horas', status: 'vista' },
  { id: '4', name: 'Ana Rodríguez',   phone: '+58 424-444-0004', email: 'ana@empresa.com',   property: 'Oficina Corporativa en Chacao', message: 'Representamos a una empresa internacional que busca oficinas ejecutivas en Caracas. Necesitamos más detalles.', time: 'Hace 5 horas', status: 'respondida' },
  { id: '5', name: 'Roberto Silva',   phone: '+58 412-555-0005', email: 'roberto@mail.com',  property: 'Townhouse en Los Chorros',     message: '¿La propiedad tiene generador eléctrico? ¿Cuáles son los gastos comunes mensuales?', time: 'Ayer, 4:30pm', status: 'respondida' },
  { id: '6', name: 'Isabel Moreno',   phone: '+58 414-666-0006', email: 'isabel@live.com',   property: 'Apartamento en El Rosal',      message: 'Consulta sobre la disponibilidad de la propiedad para el próximo mes. Somos dos personas sin mascotas.', time: 'Ayer, 11:00am', status: 'vista' },
];

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  nueva:      { label: 'Nueva',      className: 'bg-green-500/15 text-green-400 border border-green-500/25' },
  vista:      { label: 'Vista',      className: 'bg-navy-700/60 text-navy-300 border border-navy-700' },
  respondida: { label: 'Respondida', className: 'bg-gold-500/15 text-gold-400 border border-gold-500/25' },
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [selected, setSelected]   = useState<Inquiry | null>(null);
  const [filter, setFilter]       = useState<Status | ''>('');

  const filtered = filter ? inquiries.filter((i) => i.status === filter) : inquiries;
  const newCount = inquiries.filter((i) => i.status === 'nueva').length;

  const markAs = (id: string, status: Status) =>
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));

  const remove = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Consultas</h1>
          <p className="text-navy-400 text-sm mt-1">
            {newCount > 0
              ? <span><span className="text-green-400 font-semibold">{newCount} nuevas</span> · {inquiries.length} total</span>
              : `${inquiries.length} consultas`
            }
          </p>
        </div>
        {/* Filter tabs */}
        <div className="flex border border-white/10 rounded-xl overflow-hidden bg-navy-800/40">
          {(['', 'nueva', 'vista', 'respondida'] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${
                filter === s ? 'bg-gold-500/15 text-gold-400' : 'text-navy-400 hover:text-white'
              }`}>
              {s === '' ? 'Todas' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {filtered.length === 0 ? (
            <div className="card p-10 text-center">
              <MessageSquare className="w-8 h-8 text-navy-700 mx-auto mb-2" />
              <p className="text-navy-500 text-sm">Sin consultas</p>
            </div>
          ) : (
            filtered.map((inq) => (
              <div key={inq.id}
                onClick={() => { setSelected(inq); markAs(inq.id, 'vista'); }}
                className={`card p-4 cursor-pointer transition-all duration-200 hover:border-gold-500/20 ${
                  selected?.id === inq.id ? 'border-gold-500/30 bg-gold-500/5' : ''
                }`}>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-white text-sm font-semibold">{inq.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium ${STATUS_CONFIG[inq.status].className}`}>
                    {STATUS_CONFIG[inq.status].label}
                  </span>
                </div>
                <p className="text-gold-400/70 text-xs mb-1 truncate">{inq.property}</p>
                <p className="text-navy-400 text-xs line-clamp-2 leading-relaxed">{inq.message}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-3 h-3 text-navy-600" />
                  <span className="text-navy-600 text-xs">{inq.time}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="card p-6 space-y-5 sticky top-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white font-bold text-lg">{selected.name}</h2>
                  <p className="text-gold-400 text-sm mt-0.5">{selected.property}</p>
                </div>
                <button onClick={() => setSelected(null)}
                  className="p-1.5 text-navy-500 hover:text-white hover:bg-white/5 rounded-lg transition-all lg:hidden">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contact info */}
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-800 border border-white/5 hover:border-gold-500/20 text-navy-300 hover:text-gold-400 text-sm transition-all">
                  <Phone className="w-4 h-4" />
                  {selected.phone}
                </a>
                <a href={`mailto:${selected.email}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-800 border border-white/5 hover:border-gold-500/20 text-navy-300 hover:text-gold-400 text-sm transition-all">
                  <Mail className="w-4 h-4" />
                  {selected.email}
                </a>
              </div>

              {/* Message */}
              <div className="bg-navy-800/60 border border-white/5 rounded-xl p-4">
                <p className="text-xs text-navy-500 mb-2 font-medium uppercase tracking-wider">Mensaje</p>
                <p className="text-navy-200 text-sm leading-relaxed">{selected.message}</p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1.5 text-navy-600 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{selected.time}</span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g,'').replace(/^0/,'58')}?text=${encodeURIComponent(`Hola ${selected.name}, le contactamos de El Faro Inmobiliaria sobre su consulta.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20b957] text-white text-sm font-semibold rounded-xl transition-all">
                  <MessageSquare className="w-4 h-4" />
                  Responder por WhatsApp
                </a>
                <button
                  onClick={() => markAs(selected.id, 'respondida')}
                  className="flex items-center gap-2 px-4 py-2 bg-gold-500/15 hover:bg-gold-500/25 text-gold-400 text-sm font-semibold rounded-xl border border-gold-500/25 transition-all">
                  <CheckCheck className="w-4 h-4" />
                  Marcar respondida
                </button>
                <button
                  onClick={() => remove(selected.id)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 text-navy-500 hover:text-red-400 text-sm font-semibold rounded-xl transition-all">
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          ) : (
            <div className="card flex items-center justify-center h-64">
              <div className="text-center">
                <MessageSquare className="w-10 h-10 text-navy-700 mx-auto mb-3" />
                <p className="text-navy-500 text-sm">Selecciona una consulta para ver el detalle</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
