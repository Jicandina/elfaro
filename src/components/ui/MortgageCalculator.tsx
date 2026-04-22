import { useState, useMemo } from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';

interface Props { price: number; currency: string; }

export default function MortgageCalculator({ price, currency }: Props) {
  const [open, setOpen]     = useState(true);
  const [down, setDown]     = useState(20);
  const [years, setYears]   = useState(15);
  const [rate, setRate]     = useState(7);

  const calc = useMemo(() => {
    const principal = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return { monthly: principal / n, principal, total: principal, interest: 0 };
    const monthly  = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total    = monthly * n;
    const interest = total - principal;
    return { monthly, principal, total, interest };
  }, [price, down, years, rate]);

  const fmt = (n: number) =>
    currency === 'USD' ? `$${Math.round(n).toLocaleString('en-US')}` : `${Math.round(n).toLocaleString()} ${currency}`;

  return (
    <div className="card overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/2 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold text-sm">Calculadora de financiamiento</p>
            {!open && <p className="text-navy-500 text-xs">Cuota mensual estimada: <span className="text-gold-400 font-semibold">{fmt(calc.monthly)}/mes</span></p>}
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-navy-500" /> : <ChevronDown className="w-4 h-4 text-navy-500" />}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5">
          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Down payment */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-navy-400 font-medium">Pago inicial</label>
                <span className="text-xs text-gold-400 font-bold">{down}%</span>
              </div>
              <input type="range" min={5} max={80} value={down}
                onChange={e => setDown(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer" />
              <p className="text-xs text-navy-600 mt-1">{fmt(price * down / 100)}</p>
            </div>

            {/* Years */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-navy-400 font-medium">Plazo</label>
                <span className="text-xs text-gold-400 font-bold">{years} años</span>
              </div>
              <input type="range" min={1} max={30} value={years}
                onChange={e => setYears(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer" />
              <p className="text-xs text-navy-600 mt-1">{years * 12} cuotas</p>
            </div>

            {/* Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-navy-400 font-medium">Tasa anual</label>
                <span className="text-xs text-gold-400 font-bold">{rate}%</span>
              </div>
              <input type="range" min={1} max={25} step={0.5} value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer" />
              <p className="text-xs text-navy-600 mt-1">{(rate / 12).toFixed(2)}% mensual</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5">
            {[
              { label: 'Cuota mensual',      value: fmt(calc.monthly),  highlight: true  },
              { label: 'Monto financiado',   value: fmt(calc.principal), highlight: false },
              { label: 'Total a pagar',      value: fmt(calc.total),    highlight: false },
              { label: 'Total intereses',    value: fmt(calc.interest), highlight: false },
            ].map(({ label, value, highlight }) => (
              <div key={label} className={`text-center p-3 rounded-xl border ${
                highlight ? 'bg-gold-500/10 border-gold-500/30' : 'bg-navy-800/60 border-white/5'
              }`}>
                <p className={`font-bold text-sm ${highlight ? 'text-gold-400' : 'text-white'}`}>{value}</p>
                <p className="text-navy-500 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-navy-700 text-xs">* Estimación referencial. Consulta con un asesor financiero.</p>
        </div>
      )}
    </div>
  );
}
