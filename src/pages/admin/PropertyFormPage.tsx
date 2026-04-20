import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save, ArrowLeft, ImagePlus, X, Loader2, CheckCircle2, Star,
} from 'lucide-react';
import { fetchProperty } from '../../lib/api';
import type { PropertyType, OperationType } from '../../types/property';
import { VENEZUELAN_CITIES } from '../../types/property';

const PROPERTY_TYPES: PropertyType[] = ['apartamento', 'casa', 'local', 'oficina', 'terreno'];
const COMMON_AMENITIES = [
  'Piscina', 'Gimnasio', 'Seguridad 24/7', 'Planta Eléctrica', 'Agua 24/7',
  'Amoblado', 'Balcón', 'Terraza', 'Jardín', 'BBQ', 'Jacuzzi',
  'Generador', 'Cisterna', 'Ascensor', 'Portón Eléctrico', 'Depósito',
];

type FormData = {
  title: string; description: string; type: PropertyType; operation: OperationType;
  price: string; currency: string; city: string; zone: string; address: string;
  bedrooms: string; bathrooms: string; parking: string; area: string;
  amenities: string[]; featured: boolean; available: boolean;
  contactPhone: string; contactEmail: string;
};

const EMPTY: FormData = {
  title: '', description: '', type: 'apartamento', operation: 'venta',
  price: '', currency: 'USD', city: 'Caracas', zone: '', address: '',
  bedrooms: '', bathrooms: '', parking: '', area: '',
  amenities: [], featured: false, available: true,
  contactPhone: '', contactEmail: '',
};

export default function PropertyFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm]         = useState<FormData>(EMPTY);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [loading, setLoading]   = useState(isEdit);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProperty(id).then((p) => {
      if (!p) return;
      setForm({
        title: p.title, description: p.description, type: p.type, operation: p.operation,
        price: String(p.price), currency: p.currency, city: p.location.city,
        zone: p.location.zone, address: p.location.address ?? '',
        bedrooms: String(p.features.bedrooms), bathrooms: String(p.features.bathrooms),
        parking: String(p.features.parking), area: String(p.features.area),
        amenities: p.amenities, featured: p.featured, available: p.available,
        contactPhone: p.contactPhone, contactEmail: p.contactEmail,
      });
      setImageUrls(p.images.length > 0 ? p.images : ['']);
    }).finally(() => setLoading(false));
  }, [id]);

  const set = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleAmenity = (a: string) =>
    set('amenities', form.amenities.includes(a)
      ? form.amenities.filter((x) => x !== a)
      : [...form.amenities, a]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000)); // TODO: Firebase save
    setSaving(false);
    setSaved(true);
    setTimeout(() => navigate('/admin/propiedades'), 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-7 h-7 text-gold-400 animate-spin" />
      </div>
    );
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="card p-6 space-y-4">
      <h2 className="text-white font-semibold border-b border-white/5 pb-3">{title}</h2>
      {children}
    </div>
  );

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs text-navy-400 font-medium mb-1.5">
        {label}{required && <span className="text-gold-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)}
          className="p-2 text-navy-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Editar propiedad' : 'Nueva propiedad'}
          </h1>
          <p className="text-navy-400 text-sm mt-0.5">
            {isEdit ? 'Modifica los datos de la propiedad' : 'Completa el formulario para publicar'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic info */}
        <Section title="Información básica">
          <Field label="Título de la propiedad" required>
            <input type="text" required value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Ej: Apartamento de lujo en Altamira"
              className="input-field" />
          </Field>

          <Field label="Descripción" required>
            <textarea rows={4} required value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe la propiedad con detalle..."
              className="input-field resize-none" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tipo de propiedad" required>
              <select value={form.type} onChange={(e) => set('type', e.target.value as PropertyType)}
                className="select-field">
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </Field>
            <Field label="Operación" required>
              <select value={form.operation} onChange={(e) => set('operation', e.target.value as OperationType)}
                className="select-field">
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Price */}
        <Section title="Precio">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Precio" required>
              <input type="number" required min="0" value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="0" className="input-field" />
            </Field>
            <Field label="Moneda">
              <select value={form.currency} onChange={(e) => set('currency', e.target.value)}
                className="select-field">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="VES">VES (Bs.)</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Location */}
        <Section title="Ubicación">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Ciudad" required>
              <select value={form.city} onChange={(e) => set('city', e.target.value)}
                className="select-field">
                {VENEZUELAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Zona / Urbanización" required>
              <input type="text" required value={form.zone}
                onChange={(e) => set('zone', e.target.value)}
                placeholder="Ej: Altamira, Las Mercedes..."
                className="input-field" />
            </Field>
          </div>
          <Field label="Dirección completa">
            <input type="text" value={form.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Ej: Av. Luis Roche, Res. Torre Ámbar, Piso 12"
              className="input-field" />
          </Field>
        </Section>

        {/* Features */}
        <Section title="Características">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {([
              { key: 'bedrooms',  label: 'Habitaciones' },
              { key: 'bathrooms', label: 'Baños' },
              { key: 'parking',   label: 'Estacionamientos' },
              { key: 'area',      label: 'Área (m²)' },
            ] as const).map(({ key, label }) => (
              <Field key={key} label={label}>
                <input type="number" min="0" value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder="0" className="input-field" />
              </Field>
            ))}
          </div>
        </Section>

        {/* Amenities */}
        <Section title="Amenidades">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMMON_AMENITIES.map((a) => (
              <button key={a} type="button" onClick={() => toggleAmenity(a)}
                className={`text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                  form.amenities.includes(a)
                    ? 'border-gold-500/50 bg-gold-500/10 text-gold-300'
                    : 'border-white/10 bg-navy-800/40 text-navy-400 hover:border-navy-600 hover:text-navy-200'
                }`}>
                {a}
              </button>
            ))}
          </div>
        </Section>

        {/* Images */}
        <Section title="Imágenes (URLs)">
          <p className="text-navy-500 text-xs -mt-2">
            Ingresa las URLs de las imágenes. Conecta Firebase Storage para subida directa.
          </p>
          <div className="space-y-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input type="url" value={url}
                  onChange={(e) => {
                    const next = [...imageUrls];
                    next[i] = e.target.value;
                    setImageUrls(next);
                  }}
                  placeholder="https://..."
                  className="input-field flex-1" />
                {imageUrls.length > 1 && (
                  <button type="button"
                    onClick={() => setImageUrls(imageUrls.filter((_, j) => j !== i))}
                    className="p-2 text-navy-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setImageUrls([...imageUrls, ''])}
              className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors mt-1">
              <ImagePlus className="w-4 h-4" />
              Agregar imagen
            </button>
          </div>
        </Section>

        {/* Contact */}
        <Section title="Datos de contacto">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Teléfono de contacto">
              <input type="tel" value={form.contactPhone}
                onChange={(e) => set('contactPhone', e.target.value)}
                placeholder="+58 412-000-0000" className="input-field" />
            </Field>
            <Field label="Correo de contacto">
              <input type="email" value={form.contactEmail}
                onChange={(e) => set('contactEmail', e.target.value)}
                placeholder="info@elfaro.com.ve" className="input-field" />
            </Field>
          </div>
        </Section>

        {/* Options */}
        <Section title="Opciones de publicación">
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => set('featured', !form.featured)}
                className={`w-10 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-gold-500' : 'bg-navy-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.featured ? 'left-[18px]' : 'left-0.5'}`} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-gold-400" />
                  <span className="text-white text-sm font-medium">Propiedad destacada</span>
                </div>
                <p className="text-navy-500 text-xs">Aparece primero en el listado</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => set('available', !form.available)}
                className={`w-10 h-6 rounded-full transition-colors relative ${form.available ? 'bg-green-500' : 'bg-navy-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${form.available ? 'left-[18px]' : 'left-0.5'}`} />
              </div>
              <div>
                <span className="text-white text-sm font-medium">Disponible</span>
                <p className="text-navy-500 text-xs">Visible en el sitio web</p>
              </div>
            </label>
          </div>
        </Section>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)} className="btn-navy px-6">
            Cancelar
          </button>
          <button type="submit" disabled={saving || saved}
            className="btn-primary px-8 disabled:opacity-70">
            {saved ? (
              <><CheckCircle2 className="w-4 h-4" /> Guardado</>
            ) : saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
            ) : (
              <><Save className="w-4 h-4" /> {isEdit ? 'Guardar cambios' : 'Publicar propiedad'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
