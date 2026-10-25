import React from 'react';
import { ArrowRight, FileSpreadsheet, Percent, Clock, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BulkPromoBanner: React.FC = () => {
  const { openRFQModal, setActivePage } = useShop();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider mb-5 shadow-lg shadow-amber-500/30">
                <Percent className="w-4 h-4" />
                <span>Enterprise Volume Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
                Streamline High-Volume BOM Sourcing
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Procuring for major plant overhauls, EPC contracts, or manufacturing assembly lines? 
                Upload your project BOM or request customized volume tier pricing with flexible Net-30/60 terms.
              </p>

              {/* Modern Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Clock, text: 'Key Account Engineer' },
                  { icon: ShieldCheck, text: 'Guaranteed Shipments' },
                  { icon: FileSpreadsheet, text: 'Escrow & MTC' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-white/10 rounded-xl border border-white/10">
                    <item.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openRFQModal()}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Upload BOM / Request Bulk Quote</span>
                </button>
                <button
                  onClick={() => setActivePage('become-supplier')}
                  className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl text-base transition-all border border-white/20 backdrop-blur-sm"
                >
                  Apply for Enterprise Credit
                </button>
              </div>
            </div>

            {/* Modern Stats Card */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-2">
                Up to <span className="text-amber-400">28%</span>
              </div>
              <div className="text-sm uppercase tracking-wider font-bold text-slate-300 mb-6">
                Volume Price Reductions
              </div>
              <div className="space-y-3 text-left">
                {[
                  { label: 'Order > $10k', value: '8% - 12% Discount', color: 'text-blue-400' },
                  { label: 'Order > $25k', value: '15% - 20% Discount', color: 'text-emerald-400' },
                  { label: 'Annual Contract', value: 'Custom OEM Pricing', color: 'text-amber-400' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
