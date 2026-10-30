import React from 'react';
import { ArrowRight, FileSpreadsheet, Percent, Clock, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BulkPromoBanner: React.FC = () => {
  const { openRFQModal, setActivePage } = useShop();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-3xl bg-[#111624] text-white p-8 sm:p-14 overflow-hidden border border-[#1E2A3A]">

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
          {/* Red glow accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8181E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C8181E]/20 text-[#F87171] text-xs font-bold uppercase tracking-wider mb-5 border border-[#C8181E]/30">
                <Percent className="w-3.5 h-3.5" />
                <span>Enterprise Volume Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-black text-white tracking-tight leading-tight mb-5">
                Streamline High-Volume<br />BOM Sourcing
              </h2>

              <p className="text-[15px] text-[#A8B4C2] leading-relaxed mb-8 max-w-2xl">
                Procuring for major plant overhauls, EPC contracts, or manufacturing assembly lines? 
                Upload your project BOM or request customised volume pricing with flexible Net-30/60 terms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Clock,           text: 'Key Account Engineer' },
                  { icon: ShieldCheck,     text: 'Guaranteed Shipments'  },
                  { icon: FileSpreadsheet, text: 'Escrow & MTC'          },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-white/5 rounded-xl border border-white/10">
                    <item.icon className="w-4 h-4 text-[#C8181E] flex-shrink-0" />
                    <span className="text-xs text-[#D1D9E2] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openRFQModal()}
                  className="flex-1 sm:flex-none bg-[#C8181E] hover:bg-[#A81216] text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all shadow-[0_4px_16px_rgba(200,24,30,0.3)] hover:shadow-[0_8px_24px_rgba(200,24,30,0.4)] flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Upload BOM / Request Bulk Quote</span>
                </button>
                <button
                  onClick={() => setActivePage('become-supplier')}
                  className="flex-1 sm:flex-none bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-4 rounded-2xl text-sm transition-all border border-white/15"
                >
                  Apply for Enterprise Credit
                </button>
              </div>
            </div>

            {/* Stats card */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-1">
                Up to <span className="text-[#C8181E]">28%</span>
              </div>
              <div className="text-xs uppercase tracking-wider font-bold text-[#A8B4C2] mb-6">
                Volume Price Reductions
              </div>
              <div className="space-y-3 text-left">
                {[
                  { label: 'Order > $10k',    value: '8% – 12% Discount',   color: 'text-[#60A5FA]' },
                  { label: 'Order > $25k',    value: '15% – 20% Discount',  color: 'text-emerald-400' },
                  { label: 'Annual Contract', value: 'Custom OEM Pricing',   color: 'text-[#C8181E]'  },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                    <span className="text-sm text-[#A8B4C2]">{item.label}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
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
