import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Pencil, Trash2, Search, Eye, Star, Filter } from 'lucide-react';
import { useProperties } from '../../hooks/useProperties';
import type { OperationType } from '../../types/property';

export default function AdminPropertiesPage() {
  const { properties, loading } = useProperties({});
  const [search, setSearch]       = useState('');
  const [opFilter, setOpFilter]   = useState<OperationType | ''>('');
  const [deleteId, setDeleteId]   = useState<string | null>(null);

  const filtered = properties.filter((p) => {
    const q = search.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.location.city.toLowerCase().includes(q);
    const matchOp = !opFilter || p.operation === opFilter;
    return matchQ && matchOp;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Propiedades</h1>
          <p className="text-navy-400 text-sm mt-1">
            {loading ? '...' : `${properties.length} propiedades registradas`}
          </p>
        </div>
        <Link to="/admin/nueva" className="btn-primary text-sm py-2.5">
          <PlusCircle className="w-4 h-4" />
          Nueva propiedad
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-500" />
          <input
            type="text"
            placeholder="Buscar por título o ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-navy-500 shrink-0" />
          <select
            value={opFilter}
            onChange={(e) => setOpFilter(e.target.value as OperationType | '')}
            className="select-field w-auto min-w-[150px]"
          >
            <option value="">Todas</option>
            <option value="venta">En venta</option>
            <option value="alquiler">En alquiler</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-visible">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-navy-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-10 h-10 text-navy-700 mx-auto mb-3" />
            <p className="text-navy-400 font-medium">Sin resultados</p>
            <p className="text-navy-600 text-sm mt-1">Prueba con otro término de búsqueda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-navy-500 uppercase tracking-wider">Propiedad</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden md:table-cell">Tipo</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-navy-500 uppercase tracking-wider hidden sm:table-cell">Precio</th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-navy-500 uppercase tracking-wider">Estado</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-navy-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Property */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.title}
                          className="w-12 h-10 rounded-lg object-cover shrink-0 opacity-80" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-medium truncate max-w-[200px]">{p.title}</p>
                            {p.featured && <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400 shrink-0" />}
                          </div>
                          <p className="text-navy-500 text-xs mt-0.5">{p.location.zone}, {p.location.city}</p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-navy-400 text-sm capitalize">{p.type}</span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <p className="text-gold-400 text-sm font-semibold">
                        ${p.price.toLocaleString('en-US')}
                        {p.operation === 'alquiler' && <span className="text-navy-500 text-xs font-normal">/mes</span>}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        p.operation === 'venta'
                          ? 'bg-gold-500/15 text-gold-400 border border-gold-500/25'
                          : 'bg-navy-700/60 text-navy-300 border border-navy-700'
                      }`}>
                        {p.operation === 'venta' ? 'Venta' : 'Alquiler'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <a href={`/propiedad/${p.id}`} target="_blank" rel="noopener noreferrer"
                          className="p-2 text-navy-500 hover:text-navy-200 hover:bg-white/5 rounded-lg transition-all"
                          title="Ver en sitio">
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link to={`/admin/propiedades/${p.id}`}
                          className="p-2 text-navy-500 hover:text-gold-400 hover:bg-gold-500/10 rounded-lg transition-all"
                          title="Editar">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="p-2 text-navy-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDeleteId(null)} />
          <div className="relative bg-navy-900 border border-navy-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-white font-bold text-center mb-2">¿Eliminar propiedad?</h3>
            <p className="text-navy-400 text-sm text-center mb-6">
              Esta acción no se puede deshacer. La propiedad se eliminará permanentemente.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-navy flex-1 text-sm py-2.5">
                Cancelar
              </button>
              <button
                onClick={() => {
                  // TODO: connect to Firebase delete
                  setDeleteId(null);
                }}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
